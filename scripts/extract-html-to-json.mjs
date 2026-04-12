#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');

// Helper: trim text
function normalizeText(text) {
  return text ? text.trim() : '';
}

// Helper: extract text between tags
function extractTextBetweenTags(html, openTag, closeTag) {
  const regex = new RegExp(`<${openTag}[^>]*>([\\s\\S]*?)<\\/${closeTag}>`, 'gi');
  const match = regex.exec(html);
  return match ? normalizeText(match[1]) : '';
}

// Helper: extract attribute value
function extractAttr(html, attrName) {
  const regex = new RegExp(`${attrName}=["']([^"']*?)["']`, 'i');
  const match = regex.exec(html);
  return match ? normalizeText(match[1]) : '';
}

// Extract all text between opening and closing tags
function extractAllMatches(html, openTag, closeTag) {
  const regex = new RegExp(`<${openTag}[^>]*>([\\s\\S]*?)<\\/${closeTag}>`, 'gi');
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(normalizeText(match[1]));
  }
  return matches;
}

// Extract meta information
function extractMeta(html) {
  const title = extractTextBetweenTags(html, 'title', 'title');
  const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*?)["']/i);
  const description = descriptionMatch ? normalizeText(descriptionMatch[1]) : '';

  return { title, description };
}

// Extract image element
function extractImage(imgHtml) {
  if (!imgHtml) return null;
  const src = extractAttr(imgHtml, 'src');
  const alt = extractAttr(imgHtml, 'alt');
  return { src, alt };
}

// Extract hero for root pages
function extractHero(html) {
  const heroMatch = html.match(/<section\s+class=["']hero-section[^"']*?["'][\s\S]*?<\/section>/i);
  if (!heroMatch) return null;

  const heroHtml = heroMatch[0];
  const imgMatch = heroHtml.match(/<img[^>]*alt=["']([^"']*?)["'][^>]*>/);
  const image = imgMatch ? { src: extractAttr(imgMatch[0], 'src'), alt: extractAttr(imgMatch[0], 'alt') } : null;

  const eyebrow = extractTextBetweenTags(heroHtml, 'p[^>]*class=["\']*hero-eyebrow', 'p');
  const h1Text = extractTextBetweenTags(heroHtml, 'h1', 'h1');
  const lead = extractTextBetweenTags(heroHtml, 'p[^>]*class=["\']*hero-lead', 'p');

  // Extract CTA buttons
  const buttonMatches = heroHtml.matchAll(/<a[^>]*href=["']([^"']*?)["'][^>]*class=["']([^"']*button[^"']*)["'][^>]*>[\s\S]*?<\/a>/gi);
  const cta = [];
  for (const match of buttonMatches) {
    const href = match[1];
    const labelMatch = match[0].match(/<div\s+class=["']button-label["']>([^<]*)<\/div>/i);
    const label = labelMatch ? normalizeText(labelMatch[1]) : '';
    if (label && href) {
      cta.push({ label, href });
    }
  }

  return {
    variant: 'full',
    image,
    eyebrow: normalizeText(eyebrow),
    heading: normalizeText(h1Text),
    subheading: normalizeText(lead),
    cta,
  };
}

// Extract featured article
function extractFeaturedArticle(html) {
  const featuredMatch = html.match(/<div\s+class=["']featured-article["'][\s\S]*?<\/div>\s*<\/div>/i);
  if (!featuredMatch) return null;

  const featuredHtml = featuredMatch[0];
  const imgMatch = featuredHtml.match(/<img[^>]*>/);
  const image = imgMatch ? extractImage(imgMatch[0]) : null;

  const tag = extractTextBetweenTags(featuredHtml, 'div[^>]*class=["\']*tag', 'div');
  const h2Text = extractTextBetweenTags(featuredHtml, 'h2', 'h2');
  const desc = extractTextBetweenTags(featuredHtml, 'p[^>]*class=["\']*paragraph-lg', 'p');
  const linkMatch = featuredHtml.match(/<a[^>]*href=["']([^"']*?)["'][^>]*class=["']*button["']*[^>]*>/i);
  const link = linkMatch ? normalizeText(linkMatch[1]) : '';

  return {
    type: 'featured-article',
    image,
    tag: normalizeText(tag),
    heading: normalizeText(h2Text),
    description: normalizeText(desc),
    link,
  };
}

// Extract ticker
function extractTicker(html) {
  const tickerMatch = html.match(/<div\s+class=["']ticker-strip["'][\s\S]*?<\/div>/i);
  if (!tickerMatch) return null;

  const tickerHtml = tickerMatch[0];
  const spans = tickerHtml.match(/<span>([^<]*)<\/span>/g) || [];
  const items = [];
  const seen = new Set();

  spans.forEach(span => {
    const text = extractTextBetweenTags(span, 'span', 'span');
    if (text && text !== '·' && !seen.has(text)) {
      seen.add(text);
      items.push(text);
    }
  });

  return {
    type: 'ticker',
    items,
  };
}

// Extract editorial index
function extractEditorialIndex(html) {
  const editMatch = html.match(/<div\s+class=["']editorial-index["'][\s\S]*?<\/div>\s*<\/div>/i);
  if (!editMatch) return null;

  const editHtml = editMatch[0];
  const itemMatches = editHtml.matchAll(/<div\s+class=["']editorial-index-item["'][\s\S]*?<\/div>/gi);
  const items = [];

  for (const match of itemMatches) {
    const itemHtml = match[0];
    const number = extractTextBetweenTags(itemHtml, 'span[^>]*class=["\']*editorial-index-number', 'span');
    const h3Text = extractTextBetweenTags(itemHtml, 'h3', 'h3');
    const pText = extractTextBetweenTags(itemHtml, 'p', 'p');

    items.push({
      number: normalizeText(number),
      heading: normalizeText(h3Text),
      text: normalizeText(pText),
    });
  }

  return items.length > 0 ? { type: 'editorial-index', items } : null;
}

// Extract FAQ list
function extractFAQList(html) {
  const faqMatch = html.match(/<div\s+class=["']faq-list["'][\s\S]*?<\/div>\s*<\/div>/i);
  if (!faqMatch) return null;

  const faqHtml = faqMatch[0];
  const itemMatches = faqHtml.matchAll(/<div\s+class=["']faq-item["'][\s\S]*?<\/div>/gi);
  const items = [];

  for (const match of itemMatches) {
    const itemHtml = match[0];
    const questionMatch = itemHtml.match(/<span>([^<]*)<\/span>/);
    const question = questionMatch ? normalizeText(questionMatch[1]) : '';
    const answerMatch = itemHtml.match(/<div\s+class=["']faq-answer["']>([^<]*(?:<[^>]*>[^<]*)*)<\/div>/i);
    const answer = answerMatch ? normalizeText(answerMatch[1].replace(/<[^>]*>/g, '')) : '';

    if (question && answer) {
      items.push({ question, answer });
    }
  }

  return items.length > 0 ? { type: 'faq-list', items } : null;
}

// Extract CTA section
function extractCTASection(html) {
  const ctaMatch = html.match(/<section\s+class=["']section[^"']*accent-section["'][\s\S]*?<\/section>/i);
  if (!ctaMatch) return null;

  const ctaHtml = ctaMatch[0];
  const h2Text = extractTextBetweenTags(ctaHtml, 'h2', 'h2');
  const pText = extractTextBetweenTags(ctaHtml, 'p[^>]*class=["\']*paragraph-xl', 'p');

  if (!h2Text) return null;

  const buttonMatches = ctaHtml.matchAll(/<a[^>]*href=["']([^"']*?)["'][^>]*class=["']([^"']*button[^"']*)["'][^>]*>[\s\S]*?<\/a>/gi);
  const cta = [];
  for (const match of buttonMatches) {
    const href = match[1];
    const labelMatch = match[0].match(/<div\s+class=["']button-label["']>([^<]*)<\/div>/i);
    const label = labelMatch ? normalizeText(labelMatch[1]) : '';
    if (label && href) {
      cta.push({ label, href });
    }
  }

  return {
    type: 'cta-section',
    heading: normalizeText(h2Text),
    subheading: normalizeText(pText),
    cta,
  };
}

// Extract gallery
function extractGallery(html) {
  // Match the gallery section with images
  const galleryMatch = html.match(/<section\s+class=["']section\s+inverse-section["'][\s\S]*?(?=<\/?section|<\/main>)/i);
  if (!galleryMatch) return null;

  const galleryHtml = galleryMatch[0];
  const imgMatches = galleryHtml.matchAll(/<img[^>]*class=["'][^"']*gallery-img[^"']*["'][^>]*>/gi);
  const items = [];

  for (const match of imgMatches) {
    const img = extractImage(match[0]);
    if (img && img.src) {
      items.push(img);
    }
  }

  return items.length > 0 ? { type: 'gallery', items } : null;
}

// Extract tab section
function extractTabSection(html) {
  const sectionMatch = html.match(/<section\s+class=["']section["'][\s\S]*?<h2[^>]*>([^<]*)<\/h2>[\s\S]*?<div\s+data-fragment=["']([^"']*)["'][^>]*><\/div>/i);
  if (!sectionMatch) return null;

  return {
    type: 'tab-section',
    heading: normalizeText(sectionMatch[1]),
    fragmentSrc: normalizeText(sectionMatch[2]),
  };
}

// Extract intro/prose sections
function extractIntroBlock(html) {
  const introMatch = html.match(/<section\s+class=["']section\s+inverse-section["'][\s\S]*?(?=<(?:section|\/main))/i);
  if (!introMatch) return null;

  const introHtml = introMatch[0];
  const h2Match = introHtml.match(/<h2[^>]*>([^<]*)<\/h2>/);
  if (!h2Match) return null;

  const heading = normalizeText(h2Match[1]);
  const paragraphs = introHtml.matchAll(/<p[^>]*class=["'][^"']*paragraph-lg[^"']*["'][^>]*>([^<]*)<\/p>/gi);
  const content = [];

  for (const match of paragraphs) {
    const text = normalizeText(match[1]);
    if (text) content.push({ type: 'p', text });
  }

  // Extract buttons
  const buttonMatches = introHtml.matchAll(/<a[^>]*href=["']([^"']*?)["'][^>]*class=["']([^"']*button[^"']*)["'][^>]*>[\s\S]*?<\/a>/gi);
  const cta = [];
  for (const match of buttonMatches) {
    const href = match[1];
    const labelMatch = match[0].match(/<div\s+class=["']button-label["']>([^<]*)<\/div>/i) ||
                       match[0].match(/>([^<]*)<\/a>/);
    const label = labelMatch ? normalizeText(labelMatch[1]) : '';
    if (label && href) {
      cta.push({ label, href });
    }
  }

  return {
    type: 'intro',
    heading,
    content: content.length > 0 ? content : [],
    cta: cta.length > 0 ? cta : [],
  };
}

// Extract fragment include
function extractFragmentInclude(html) {
  const fragMatch = html.match(/<div\s+data-fragment=["']([^"']*?)["']/);
  if (!fragMatch) return null;

  return {
    type: 'fragment-include',
    fragmentSrc: normalizeText(fragMatch[1]),
  };
}

// Extract sections from root pages
function extractPageSections(html) {
  const sections = [];

  // 1. Featured article
  const featured = extractFeaturedArticle(html);
  if (featured) sections.push(featured);

  // 2. Tab section
  const tabs = extractTabSection(html);
  if (tabs) sections.push(tabs);

  // 3. Ticker
  const ticker = extractTicker(html);
  if (ticker) sections.push(ticker);

  // 4. Intro sections
  const intros = extractAllMatches(html, 'section', 'section').map(match => {
    // Try to detect intro sections by content
    if (match.includes('container--narrow')) {
      const h2Match = match.match(/<h2[^>]*>([^<]*)<\/h2>/);
      if (h2Match) {
        const heading = normalizeText(h2Match[1]);
        const pMatches = match.matchAll(/<p[^>]*>([^<]*)<\/p>/gi);
        const content = [];
        for (const m of pMatches) {
          const text = normalizeText(m[1]);
          if (text) content.push({ type: 'p', text });
        }
        if (content.length > 0) {
          return { type: 'intro', heading, content };
        }
      }
    }
    return null;
  }).filter(x => x);

  sections.push(...intros);

  // 5. Editorial index
  const editIndex = extractEditorialIndex(html);
  if (editIndex) sections.push(editIndex);

  // 6. FAQ list
  const faqList = extractFAQList(html);
  if (faqList) sections.push(faqList);

  // 7. CTA section
  const cta = extractCTASection(html);
  if (cta) sections.push(cta);

  // 8. Gallery
  const gallery = extractGallery(html);
  if (gallery) sections.push(gallery);

  // 9. Fragment includes
  const fragMatch = html.match(/<div\s+data-fragment=["']([^"']*?)["']/);
  if (fragMatch && !sections.some(s => s.type === 'fragment-include')) {
    sections.push({
      type: 'fragment-include',
      fragmentSrc: normalizeText(fragMatch[1]),
    });
  }

  return sections;
}

// Extract root page
function extractRootPage(html) {
  const meta = extractMeta(html);
  const hero = extractHero(html);
  const sections = extractPageSections(html);

  return {
    meta: {
      ...meta,
      depth: 0,
    },
    hero,
    sections,
  };
}

// Extract blog hero
function extractBlogHero(html) {
  const heroMatch = html.match(/<section\s+class=["']hero-section["'][\s\S]*?<\/section>/i);
  if (!heroMatch) return null;

  const heroHtml = heroMatch[0];

  // Extract image
  const imgMatch = heroHtml.match(/<img[^>]*>/);
  const image = imgMatch ? extractImage(imgMatch[0]) : null;

  // Extract breadcrumbs
  const breadcrumbs = [];
  const breadcrumbMatches = heroHtml.matchAll(/<a[^>]*href=["']([^"']*?)["'][^>]*>([^<]*)<\/a>/gi);
  for (const match of breadcrumbMatches) {
    breadcrumbs.push({
      text: normalizeText(match[2]),
      href: normalizeText(match[1]),
    });
  }
  // Add current page (not a link)
  const currentPageMatch = heroHtml.match(/<nav[^>]*[\s\S]*?<span[^>]*>([^<]*)<\/span>\s*<\/nav>/i);
  if (currentPageMatch) {
    breadcrumbs.push({
      text: normalizeText(currentPageMatch[1]),
      href: null,
    });
  }

  // Extract tag
  const tagMatch = heroHtml.match(/<span\s+class=["']tag\s+blog-hero-tag["']>([^<]*)<\/span>/i);
  const tag = tagMatch ? normalizeText(tagMatch[1]) : '';

  // Extract heading
  const h1Text = extractTextBetweenTags(heroHtml, 'h1', 'h1');

  // Extract byline
  const bylineDiv = heroHtml.match(/<div\s+class=["']article-byline["'][\s\S]*?<\/div>/i);
  let byline = null;
  if (bylineDiv) {
    const bylineHtml = bylineDiv[0];
    const nameMatch = bylineHtml.match(/<p\s+class=["']article-byline-name["']>([^<]*)<\/p>/i);
    const metaMatch = bylineHtml.match(/<p\s+class=["']article-byline-meta["']>([^<]*)<\/p>/i);
    const avatarMatch = bylineHtml.match(/<img\s+src=["']([^"']*?)["'][^>]*>/i);

    byline = {
      name: nameMatch ? normalizeText(nameMatch[1]) : '',
      meta: metaMatch ? normalizeText(metaMatch[1]) : '',
      avatar: avatarMatch ? normalizeText(avatarMatch[1]) : '',
    };
  }

  return {
    variant: 'blog',
    image,
    breadcrumbs,
    tag,
    heading: normalizeText(h1Text),
    byline,
  };
}

// Extract blog article body
function extractArticleBody(html) {
  const contentMatch = html.match(/<div\s+class=["']blog-content\s+blog-content-body["'][\s\S]*?<\/div>\s*<\/div>/i);
  if (!contentMatch) return [];

  const contentHtml = contentMatch[0];
  const blocks = [];

  // Split by major elements
  const elementMatches = contentHtml.matchAll(/<(h2|h3|p|ul|ol|figure|blockquote)[^>]*>[\s\S]*?<\/\1>/gi);

  for (const match of elementMatches) {
    const fullMatch = match[0];
    const tag = match[1].toLowerCase();

    if (tag === 'p' && !fullMatch.includes('class="pull-quote')) {
      const text = normalizeText(fullMatch.replace(/<[^>]*>/g, ''));
      if (text && !text.includes('figure') && !text.includes('blockquote')) {
        blocks.push({ type: 'p', text });
      }
    } else if (tag === 'h2') {
      const text = normalizeText(fullMatch.replace(/<[^>]*>/g, ''));
      if (text) blocks.push({ type: 'h2', text });
    } else if (tag === 'h3') {
      const text = normalizeText(fullMatch.replace(/<[^>]*>/g, ''));
      if (text) blocks.push({ type: 'h3', text });
    } else if (tag === 'ul') {
      const items = [];
      const liMatches = fullMatch.matchAll(/<li>([^<]*)<\/li>/gi);
      for (const liMatch of liMatches) {
        const item = normalizeText(liMatch[1]);
        if (item) items.push(item);
      }
      if (items.length > 0) blocks.push({ type: 'ul', items });
    } else if (tag === 'ol') {
      const items = [];
      const liMatches = fullMatch.matchAll(/<li>([^<]*)<\/li>/gi);
      for (const liMatch of liMatches) {
        const item = normalizeText(liMatch[1]);
        if (item) items.push(item);
      }
      if (items.length > 0) blocks.push({ type: 'ol', items });
    } else if (tag === 'figure') {
      const imgMatch = fullMatch.match(/<img[^>]*>/);
      const figcaptionMatch = fullMatch.match(/<figcaption>([^<]*)<\/figcaption>/i);
      if (imgMatch) {
        blocks.push({
          type: 'figure',
          image: extractImage(imgMatch[0]),
          caption: figcaptionMatch ? normalizeText(figcaptionMatch[1]) : '',
        });
      }
    } else if (tag === 'blockquote' && !fullMatch.includes('pull-quote')) {
      const text = normalizeText(fullMatch.replace(/<[^>]*>/g, ''));
      if (text) blocks.push({ type: 'blockquote', text });
    }
  }

  return blocks;
}

// Extract gear + pullquote section
function extractGearPullquote(html) {
  const sectionMatch = html.match(/<section\s+class=["']section\s+secondary-section["'][\s\S]*?<\/section>/i);
  if (!sectionMatch) return null;

  const sectionHtml = sectionMatch[0];

  // Check if this section has gear list
  if (!sectionHtml.includes('blog-gear-list')) return null;

  const h3Match = sectionHtml.match(/<h3[^>]*>([^<]*)<\/h3>/);
  const gearHeading = h3Match ? normalizeText(h3Match[1]) : '';

  // Extract gear items
  const gearItems = [];
  const liMatches = sectionHtml.matchAll(/<li[^>]*>([^<]*)<\/li>/gi);
  for (const match of liMatches) {
    const item = normalizeText(match[1]);
    if (item) gearItems.push(item);
  }

  // Extract pull quote
  const pullQuoteMatch = sectionHtml.match(/<blockquote\s+class=["']pull-quote["'][\s\S]*?<\/blockquote>/i);
  let pullQuote = null;
  if (pullQuoteMatch) {
    const bodyMatch = pullQuoteMatch[0].match(/<p\s+class=["']pull-quote-body["']>([^<]*)<\/p>/i);
    const attrMatch = pullQuoteMatch[0].match(/<cite[^>]*>([^<]*)<\/cite>/i);
    pullQuote = {
      text: bodyMatch ? normalizeText(bodyMatch[1]) : '',
      attribution: attrMatch ? normalizeText(attrMatch[1]) : '',
    };
  }

  return {
    type: 'gear-pullquote',
    gearHeading,
    gearItems: gearItems.length > 0 ? gearItems : [],
    pullQuote,
  };
}

// Extract blog page
function extractBlogPage(html) {
  const meta = extractMeta(html);
  const hero = extractBlogHero(html);
  const articleBody = extractArticleBody(html);
  const gearPullquote = extractGearPullquote(html);

  // Extract gallery from inverse section
  const galleryMatch = html.match(/<section\s+class=["']section\s+inverse-section["'][\s\S]*?(?=<\/?section|<\/main>)/i);
  let gallery = null;
  if (galleryMatch) {
    const galleryHtml = galleryMatch[0];
    const imgMatches = galleryHtml.matchAll(/<img[^>]*class=["'][^"']*gallery-img[^"']*["'][^>]*>/gi);
    const items = [];
    for (const match of imgMatches) {
      const img = extractImage(match[0]);
      if (img && img.src) {
        items.push(img);
      }
    }
    if (items.length > 0) {
      gallery = { type: 'gallery', items };
    }
  }

  // Extract more stories fragment
  const moreStoriesMatch = html.match(/<div\s+data-fragment=["']([^"']*?)["'][^>]*><\/div>/);
  const moreStories = moreStoriesMatch ? {
    type: 'fragment-include',
    fragmentSrc: normalizeText(moreStoriesMatch[1]),
  } : null;

  return {
    meta: {
      ...meta,
      depth: 1,
    },
    hero,
    articleBody,
    gearPullquote,
    gallery,
    moreStories,
  };
}

// Main execution
function main() {
  const pagesDir = path.join(appRoot, 'data', 'pages');
  const blogDir = path.join(appRoot, 'data', 'blog');

  if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  // Root pages
  const rootPages = [
    'index.html',
    'about.html',
    'adventures.html',
    'community.html',
    'destinations.html',
    'expeditions.html',
    'faq.html',
    'field-notes.html',
    'gear.html',
    'sustainability.html',
  ];

  rootPages.forEach(fileName => {
    const htmlPath = path.join(appRoot, fileName);
    if (fs.existsSync(htmlPath)) {
      try {
        const html = fs.readFileSync(htmlPath, 'utf-8');
        const json = extractRootPage(html);
        const jsonFileName = fileName.replace('.html', '.json');
        const outputPath = path.join(pagesDir, jsonFileName);
        fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));
        console.log(`Extracted: ${jsonFileName}`);
      } catch (error) {
        console.error(`Error extracting ${fileName}:`, error.message);
      }
    }
  });

  // Blog pages
  const blogDir_src = path.join(appRoot, 'blog');
  if (fs.existsSync(blogDir_src)) {
    const blogFiles = fs.readdirSync(blogDir_src).filter(f => f.endsWith('.html'));

    blogFiles.forEach(fileName => {
      const htmlPath = path.join(blogDir_src, fileName);
      try {
        const html = fs.readFileSync(htmlPath, 'utf-8');
        const json = extractBlogPage(html);
        const jsonFileName = fileName.replace('.html', '.json');
        const outputPath = path.join(blogDir, jsonFileName);
        fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));
        console.log(`Extracted: blog/${jsonFileName}`);
      } catch (error) {
        console.error(`Error extracting blog/${fileName}:`, error.message);
      }
    });
  }

  console.log('Extraction complete!');
}

main();
