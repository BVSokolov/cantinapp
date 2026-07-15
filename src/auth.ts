import * as jose from "jose";

const jwks = jose.createRemoteJWKSet(
  new URL(
    `${process.env.NEXT_PUBLIC_NEON_AUTH_BASE_URL}/.well-known/jwks.json`,
  ),
);

export async function verifyToken(token: string) {
  const { payload } = await jose.jwtVerify(token, jwks);
  return payload;
}
