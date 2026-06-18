import type { ScrapedData } from "./scraper";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

interface ScoreBreakdown {
  seo: number;
  content: number;
  branding: number;
  conversion: number;
}

export interface AuditPreview {
  score: number;
  scores: ScoreBreakdown;
  findings: { type: "positive" | "warning"; text: string }[];
}

export interface AuditReport {
  executiveSummary: string;
  scores: ScoreBreakdown;
  overallScore: number;
  findings: { type: "positive" | "warning"; text: string }[];
  seoAnalysis: {
    pageTitle: string;
    metaDescription: string;
    headingStructure: string;
    internalLinking: string;
    imageAltTags: string;
    contentDepth: string;
    technicalSeo: string;
  };
  conversionAnalysis: {
    ctaPlacement: string;
    ctaClarity: string;
    trustSignals: string;
    testimonials: string;
    socialProof: string;
    contactAccessibility: string;
    leadGeneration: string;
  };
  brandAnalysis: {
    positioningClarity: string;
    uniqueValueProposition: string;
    messagingConsistency: string;
    audienceTargeting: string;
    brandDifferentiation: string;
  };
  contentAnalysis: {
    readability: string;
    contentQuality: string;
    contentDepth: string;
    engagementPotential: string;
    audienceRelevance: string;
  };
  socialMediaPresence: string;
  videoOpportunities: string;
  quickWins: string[];
  growthRoadmap: {
    next7Days: string;
    next30Days: string;
    next90Days: string;
  };
}

function buildPreviewPrompt(data: ScrapedData): string {
  return `You are a senior growth strategist at Socioryx, a full-service content marketing agency. Analyze this website data and provide a marketing audit preview.

Website data:
- Title: ${data.title}
- Meta description: ${data.metaDescription}
- H1 headings: ${data.h1s.join(" | ")}
- H2 headings: ${data.h2s.join(" | ")}
- Page text sample: ${data.paragraphs.slice(0, 2000)}
- Images found: ${data.images.length}
- Images with alt text: ${data.images.filter((i) => i.alt).length}
- Internal links: ${data.internalLinks.length}
- External links: ${data.externalLinks.length}
- Social links found: ${data.socialLinks.length}

Return ONLY valid JSON. Do NOT include markdown code blocks, explanation, or any text outside the JSON object. ALL scores must be integer numbers (e.g., 50), NOT words (e.g., "fifty"). Use this exact structure:
{
  "scores": { "seo": integer 0-100, "content": integer 0-100, "branding": integer 0-100, "conversion": integer 0-100 },
  "findings": [{ "type": "positive" or "warning", "text": "finding description" }]
}

Scoring guidelines:
- SEO: Evaluate title, meta description, heading structure, image alt tags, content
- Content: Evaluate content quality, depth, readability, engagement potential
- Branding: Evaluate positioning clarity, messaging consistency, audience targeting
- Conversion: Evaluate CTAs, trust signals, lead generation opportunities

Provide exactly 3 findings. Be specific, actionable, and sound like an experienced marketing consultant. Do NOT be generic.`;
}

function buildReportPrompt(data: ScrapedData): string {
  return `You are a senior growth strategist at Socioryx, a full-service content marketing agency. Perform a comprehensive marketing audit of this website.

Website data:
- Title: ${data.title}
- Meta description: ${data.metaDescription}
- H1 headings: ${data.h1s.join(" | ")}
- H2 headings (first 20): ${data.h2s.slice(0, 20).join(" | ")}
- Page text: ${data.paragraphs.slice(0, 4000)}
- Images found: ${data.images.length}
- Images with alt text: ${data.images.filter((i) => i.alt).length} / ${data.images.length}
- Internal links: ${data.internalLinks.length}
- External links: ${data.externalLinks.length}
- Social links: ${data.socialLinks.join(", ") || "none found"}

Return ONLY valid JSON. Do NOT include markdown code blocks, explanation, or any text outside the JSON object. ALL scores must be integer numbers (e.g., 50), NOT words (e.g., "fifty"). Use this exact structure:
{
  "executiveSummary": "2-3 paragraph executive summary",
  "scores": { "seo": integer 0-100, "content": integer 0-100, "branding": integer 0-100, "conversion": integer 0-100 },
  "findings": [{ "type": "positive" or "warning", "text": "finding" }],
  "seoAnalysis": {
    "pageTitle": "...",
    "metaDescription": "...",
    "headingStructure": "...",
    "internalLinking": "...",
    "imageAltTags": "...",
    "contentDepth": "...",
    "technicalSeo": "..."
  },
  "conversionAnalysis": {
    "ctaPlacement": "...",
    "ctaClarity": "...",
    "trustSignals": "...",
    "testimonials": "...",
    "socialProof": "...",
    "contactAccessibility": "...",
    "leadGeneration": "..."
  },
  "brandAnalysis": {
    "positioningClarity": "...",
    "uniqueValueProposition": "...",
    "messagingConsistency": "...",
    "audienceTargeting": "...",
    "brandDifferentiation": "..."
  },
  "contentAnalysis": {
    "readability": "...",
    "contentQuality": "...",
    "contentDepth": "...",
    "engagementPotential": "...",
    "audienceRelevance": "..."
  },
  "socialMediaPresence": "...",
  "videoOpportunities": "...",
  "quickWins": ["...", "...", "...", "...", "..."],
  "growthRoadmap": {
    "next7Days": "...",
    "next30Days": "...",
    "next90Days": "..."
  }
}

Scoring (0-100):
- SEO: Based on title, meta, headings, alt tags, links, content depth
- Content: Based on quality, depth, readability, engagement, relevance
- Branding: Based on positioning, UVP, messaging, targeting, differentiation
- Conversion: Based on CTAs, trust signals, social proof, contact access, lead gen

CRITICAL: Sound like an experienced senior marketing consultant at a growth agency. Be specific, actionable, and insightful. Recommendations should naturally align with services like website development, content marketing, social media management, video production, influencer marketing, and brand strategy. Do NOT sound like a generic SEO tool.`;
}

async function callOpenRouter(prompt: string): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://socioryx.com",
      "X-Title": "Socioryx AI Marketing Audit",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  return json.choices[0].message.content;
}

function parseJsonSafely(raw: string): any {
  let jsonStr = raw.trim();

  // Try extract from markdown code block
  const codeMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeMatch) jsonStr = codeMatch[1].trim();

  // Try direct parse
  try {
    return JSON.parse(jsonStr);
  } catch {
    // Fix common AI number-word mistakes
    const wordToNum: Record<string, string> = {
      zero: "0", one: "1", two: "2", three: "3", four: "4",
      five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
      twenty: "20", thirty: "30", forty: "40", fifty: "50",
      sixty: "60", seventy: "70", eighty: "80", ninety: "90", hundred: "100",
    };
    jsonStr = jsonStr.replace(/"(\w+)"/g, (m, w) => {
      const lower = w.toLowerCase();
      return wordToNum[lower] ? wordToNum[lower] : m;
    });
    jsonStr = jsonStr.replace(/:\s*(\w+)/g, (m, w) => {
      const lower = w.toLowerCase();
      return wordToNum[lower] ? `: ${wordToNum[lower]}` : m;
    });
    // Remove trailing commas before closing braces/brackets
    jsonStr = jsonStr.replace(/,\s*}/g, "}").replace(/,\s*\]/g, "]");

    try {
      return JSON.parse(jsonStr);
    } catch {
      throw new Error("AI returned invalid JSON. Response:\n" + raw.slice(0, 500));
    }
  }
}

export async function generatePreview(data: ScrapedData): Promise<AuditPreview> {
  const prompt = buildPreviewPrompt(data);
  const raw = await callOpenRouter(prompt);
  const parsed = parseJsonSafely(raw);

  const scores: ScoreBreakdown = {
    seo: Math.min(100, Math.max(0, Math.round(Number(parsed.scores.seo) || 0))),
    content: Math.min(100, Math.max(0, Math.round(Number(parsed.scores.content) || 0))),
    branding: Math.min(100, Math.max(0, Math.round(Number(parsed.scores.branding) || 0))),
    conversion: Math.min(100, Math.max(0, Math.round(Number(parsed.scores.conversion) || 0))),
  };

  const overallScore = Math.round(
    (scores.seo + scores.content + scores.branding + scores.conversion) / 4
  );

  return {
    score: overallScore,
    scores,
    findings: (parsed.findings || []).slice(0, 3),
  };
}

export async function generateFullReport(data: ScrapedData): Promise<AuditReport> {
  const prompt = buildReportPrompt(data);
  const raw = await callOpenRouter(prompt);
  const parsed = parseJsonSafely(raw);

  const scores: ScoreBreakdown = {
    seo: Math.min(100, Math.max(0, Math.round(Number(parsed.scores.seo) || 0))),
    content: Math.min(100, Math.max(0, Math.round(Number(parsed.scores.content) || 0))),
    branding: Math.min(100, Math.max(0, Math.round(Number(parsed.scores.branding) || 0))),
    conversion: Math.min(100, Math.max(0, Math.round(Number(parsed.scores.conversion) || 0))),
  };

  const overallScore = Math.round(
    (scores.seo + scores.content + scores.branding + scores.conversion) / 4
  );

  return {
    executiveSummary: parsed.executiveSummary || "",
    scores,
    overallScore,
    findings: parsed.findings || [],
    seoAnalysis: parsed.seoAnalysis || {},
    conversionAnalysis: parsed.conversionAnalysis || {},
    brandAnalysis: parsed.brandAnalysis || {},
    contentAnalysis: parsed.contentAnalysis || {},
    socialMediaPresence: parsed.socialMediaPresence || "",
    videoOpportunities: parsed.videoOpportunities || "",
    quickWins: parsed.quickWins || [],
    growthRoadmap: parsed.growthRoadmap || { next7Days: "", next30Days: "", next90Days: "" },
  };
}
