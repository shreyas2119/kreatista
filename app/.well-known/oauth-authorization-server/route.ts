import { NextResponse } from "next/server";

const base = "https://socioryx.com";

function discovery() {
  return {
    issuer: base,
    authorization_endpoint: `${base}/api/auth/authorize`,
    token_endpoint: `${base}/api/auth/token`,
    jwks_uri: `${base}/.well-known/jwks.json`,
    registration_endpoint: `${base}/api/auth/register`,
    scopes_supported: ["openid", "profile", "email", "read", "write"],
    response_types_supported: ["code", "token", "id_token", "code token"],
    grant_types_supported: ["authorization_code", "refresh_token", "client_credentials"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post", "none"],
    code_challenge_methods_supported: ["plain", "S256"],
    // agent_auth block for auth.md spec
    agent_auth: {
      skill: "https://socioryx.com/.well-known/agent-skills/socioryx-api/SKILL.md",
      register_uri: `${base}/api/auth/register`,
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["bearer_token"],
      },
      claim_uri: `${base}/api/auth/claim`,
      revocation_uri: `${base}/api/auth/revoke`,
      events_supported: ["credential_revoked"],
    },
  };
}

export async function GET() {
  return NextResponse.json(discovery(), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
