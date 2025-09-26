import { randomBytes } from "crypto";
import { jwtVerify, SignJWT } from "jose";

// TODO: Use env variable to store key
const base64Key = "ThK5cgWShM8t9IFzONNX++/pqXTWm/toheCZx12EuEJ7ht2hyTwBMjn8bd3n2AwN";
const key = new TextEncoder().encode(base64Key);

const JWT_ALGORITHM = 'HS384';

export async function encryptJwt(payload: any) {
  const jwt = await new SignJWT(payload)
    .setExpirationTime('7d')
    .setIssuedAt()
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .sign(key);

  return jwt;
}

export async function decryptJwt(jwt: string) {
  try {
    const { payload } = await jwtVerify(jwt, key, { algorithms: [JWT_ALGORITHM] });
    return payload;
  } catch (error) {
    return undefined;
  }
}