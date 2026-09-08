import { NextResponse } from "next/server";

const base = "https://socioryx.com";

function discovery() {
  return {
    issuer: base,
    authorization_endpoint: `${base}/api/auth/authorize`,
    token_endpoint: `${base}/api/auth/token`,
    userinfo_endpoint: `${base}/api/auth/userinfo`,
    jwks_uri: `${base}/.well-known/jwks.json`,
    registration_endpoint: `${base}/api/auth/register`,
    scopes_supported: ["openid", "profile", "email", "read", "write"],
    response_types_supported: ["code", "token", "id_token", "code token", "code id_token"],
    grant_types_supported: ["authorization_code", "refresh_token", "client_credentials"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    claims_supported: ["sub", "iss", "aud", "exp", "iat", "email", "name"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post", "none"],
    code_challenge_methods_supported: ["plain", "S256"],
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
