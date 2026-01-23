/**
 * CONTENT ANALYZER - REAL BACKEND
 * Analyzes content for SEO without external APIs
 */

import { Context } from 'npm:hono';

/**
 * Analyze content for SEO
 */
export async function analyzeContent(c: Context) {
  try {
    const { content, url, targetKeywords } = await c.req.json();

    if (!content) {
      return c.json({ success: false, error: 'Content is required' });
    }

    // Remove HTML tags for text analysis
    const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = textContent.split(/\s+/).filter((w: string) => w.length > 0);
    const wordCount = words.length;

    // Calculate readability (Flesch-Kincaid)
    const sentences = textContent.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);
    const sentenceCount = sentences.length || 1;
    const syllables = words.reduce((acc: number, word: string) => acc + countSyllables(word), 0);
    
    const fleschKincaid = Math.max(0, Math.min(100, 
      206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount)
    ));
    
    const readabilityGrade = getReadabilityGrade(fleschKincaid);
    const readabilityDifficulty = getReadabilityDifficulty(fleschKincaid);

    // Analyze heading structure
    const h1Count = (content.match(/<h1/gi) || []).length;
    const h2Count = (content.match(/<h2/gi) || []).length;
    const h3Count = (content.match(/<h3/gi) || []).length;
    const h4Count = (content.match(/<h4/gi) || []).length;
    
    const headingIssues = [];
    if (h1Count === 0) headingIssues.push('Missing H1 tag');
    if (h1Count > 1) headingIssues.push(`Multiple H1 tags detected (${h1Count})`);
    if (h2Count === 0) headingIssues.push('No H2 headings found');
    if (wordCount > 500 && h2Count < 2) headingIssues.push('Add more H2 headings to break up content');

    // Analyze images
    const images = content.match(/<img[^>]*>/gi) || [];
    const totalImages = images.length;
    const imagesWithoutAlt = images.filter((img: string) => !img.includes('alt=')).length;
    const imageIssues = [];
    if (totalImages === 0 && wordCount > 300) imageIssues.push('Add images to enhance content');
    if (imagesWithoutAlt > 0) imageIssues.push(`${imagesWithoutAlt} image${imagesWithoutAlt > 1 ? 's' : ''} missing alt text`);

    // Analyze links
    const internalLinks = (content.match(/href=["'](?!http|\/\/|mailto:|tel:)/gi) || []).length;
    const externalLinks = (content.match(/href=["']https?:\/\//gi) || []).length;
    const totalLinks = internalLinks + externalLinks;
    const linkIssues = [];
    if (totalLinks === 0 && wordCount > 300) linkIssues.push('Add internal/external links');
    if (internalLinks === 0 && wordCount > 300) linkIssues.push('Add internal links to other pages');
    if (externalLinks > 0 && externalLinks > internalLinks * 2) {
      linkIssues.push('Too many external links vs internal links');
    }

    // Keyword analysis
    const keywordAnalysis = targetKeywords ? analyzeKeywords(textContent, targetKeywords) : null;

    // Calculate overall SEO score
    let score = 50; // Base score

    // Word count scoring
    if (wordCount >= 300) score += 10;
    if (wordCount >= 600) score += 5;
    if (wordCount >= 1000) score += 5;
    if (wordCount >= 1500) score += 5;

    // Readability scoring
    if (fleschKincaid >= 60) score += 10;
    if (fleschKincaid >= 70) score += 5;

    // Heading scoring
    if (h1Count === 1) score += 10;
    if (h2Count >= 2) score += 5;
    if (h3Count >= 2) score += 5;

    // Image scoring
    if (totalImages > 0) score += 5;
    if (imagesWithoutAlt === 0) score += 5;

    // Link scoring
    if (internalLinks >= 3) score += 5;
    if (externalLinks >= 1 && externalLinks <= 5) score += 5;

    // Keyword scoring
    if (keywordAnalysis) {
      if (keywordAnalysis.density >= 1 && keywordAnalysis.density <= 3) score += 10;
    }

    score = Math.min(100, score);

    // Generate recommendations
    const recommendations = [];
    if (wordCount < 300) recommendations.push('Increase content to at least 300 words');
    if (wordCount < 600) recommendations.push('Aim for 600+ words for better SEO');
    if (fleschKincaid < 60) recommendations.push('Simplify content for better readability');
    if (h1Count === 0) recommendations.push('Add an H1 heading');
    if (h1Count > 1) recommendations.push('Use only one H1 per page');
    if (h2Count < 2) recommendations.push('Add H2 headings to structure content');
    if (totalImages === 0 && wordCount > 300) recommendations.push('Add relevant images');
    if (imagesWithoutAlt > 0) recommendations.push('Add alt text to all images');
    if (internalLinks < 3) recommendations.push('Add more internal links');
    if (keywordAnalysis && keywordAnalysis.density < 1) {
      recommendations.push(`Increase "${targetKeywords}" keyword density`);
    }
    if (keywordAnalysis && keywordAnalysis.density > 3) {
      recommendations.push(`Reduce "${targetKeywords}" keyword density (avoid over-optimization)`);
    }

    const analysis = {
      summary: {
        wordCount,
        sentenceCount,
        avgWordsPerSentence: Math.round(wordCount / sentenceCount),
        score,
        grade: getScoreGrade(score)
      },
      readability: {
        fleschKincaid: Math.round(fleschKincaid),
        grade: readabilityGrade,
        difficulty: readabilityDifficulty
      },
      headings: {
        h1Count,
        h2Count,
        h3Count,
        h4Count,
        issues: headingIssues
      },
      images: {
        total: totalImages,
        missingAlt: imagesWithoutAlt,
        withAlt: totalImages - imagesWithoutAlt,
        issues: imageIssues
      },
      links: {
        total: totalLinks,
        internal: internalLinks,
        external: externalLinks,
        issues: linkIssues
      },
      keywords: keywordAnalysis,
      recommendations,
      analyzedAt: new Date().toISOString()
    };

    return c.json({
      success: true,
      analysis
    });

  } catch (error: any) {
    console.error('Content analysis error:', error);
    return c.json({
      success: false,
      error: error.message || 'Failed to analyze content'
    });
  }
}

/**
 * Count syllables in a word (approximate)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  
  // Remove silent e
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  // Count vowel groups
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

/**
 * Get readability grade level
 */
function getReadabilityGrade(score: number): string {
  if (score >= 90) return '5th grade';
  if (score >= 80) return '6th grade';
  if (score >= 70) return '7th grade';
  if (score >= 60) return '8th-9th grade';
  if (score >= 50) return '10th-12th grade';
  if (score >= 30) return 'College';
  return 'College graduate';
}

/**
 * Get readability difficulty
 */
function getReadabilityDifficulty(score: number): string {
  if (score >= 80) return 'Easy';
  if (score >= 60) return 'Medium';
  if (score >= 40) return 'Difficult';
  return 'Very Difficult';
}

/**
 * Get SEO score grade
 */
function getScoreGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'C+';
  if (score >= 65) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

/**
 * Analyze keyword usage
 */
function analyzeKeywords(content: string, targetKeyword: string) {
  const lowerContent = content.toLowerCase();
  const lowerKeyword = targetKeyword.toLowerCase();
  
  // Count occurrences
  const regex = new RegExp(lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = lowerContent.match(regex) || [];
  const count = matches.length;
  
  // Calculate density
  const words = content.split(/\s+/).length;
  const density = (count / words) * 100;
  
  // Check placement
  const inTitle = lowerContent.substring(0, 100).includes(lowerKeyword);
  const inFirstParagraph = lowerContent.substring(0, 300).includes(lowerKeyword);
  
  return {
    keyword: targetKeyword,
    count,
    density: Math.round(density * 10) / 10,
    inTitle,
    inFirstParagraph,
    status: density >= 1 && density <= 3 ? 'optimal' : 
            density < 1 ? 'low' : 'high'
  };
}
