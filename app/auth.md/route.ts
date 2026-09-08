export async function GET() {
  const md = `# auth.md — Socioryx

> Agent registration and authentication for Socioryx APIs.

## Audience
AI agents and automated clients that need to call Socioryx protected APIs.

## Discovery
- Protected resource metadata: \`https://socioryx.com/.well-known/oauth-protected-resource\`
- Authorization server metadata: \`https://socioryx.com/.well-known/oauth-authorization-server\`
- OpenID configuration: \`https://socioryx.com/.well-known/openid-configuration\`
- JWKS: \`https://socioryx.com/.well-known/jwks.json\`

## Registration
- **Register**: \`POST https://socioryx.com/api/auth/register\` — anonymous registration supported.
- **Claim**: \`POST https://socioryx.com/api/auth/claim\`
- **Revoke**: \`POST https://socioryx.com/api/auth/revoke\`

Supported identity types: \`anonymous\` with \`bearer_token\` credentials.

## Usage
Include the issued token in the \`Authorization: Bearer <token>\` header when calling:

- \`POST /api/contact\`
- \`POST /api/audit/report\`
- \`GET /api/uptime\`

## Scopes
\`read\`, \`write\`, \`openid\`, \`profile\`, \`email\`

## Notes
This is a public discovery stub. No real token issuance is required for public endpoints. Replace with your IdP when enabling protected APIs.
`;
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
