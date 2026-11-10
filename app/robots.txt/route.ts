export async function GET() {
  const body = `# Robots for Socioryx
User-agent: *
Allow: /
Disallow: /api/
Disallow: /itachi-7x9k/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /itachi-7x9k/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: ChatGPT-User
Allow: /
Disallow: /api/
Disallow: /itachi-7x9k/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: Google-Extended
Allow: /
Disallow: /api/
Disallow: /itachi-7x9k/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: anthropic-ai
Allow: /
Disallow: /api/
Disallow: /itachi-7x9k/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: ClaudeBot
Allow: /
Disallow: /api/
Disallow: /itachi-7x9k/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: PerplexityBot
Allow: /
Disallow: /api/
Disallow: /itachi-7x9k/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: CCBot
Allow: /
Disallow: /api/
Disallow: /itachi-7x9k/
Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: https://socioryx.com/sitemap.xml
Agentmap: https://socioryx.com/.well-known/ai-catalog.json
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
