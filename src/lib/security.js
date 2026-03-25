import {
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [salt, key] = storedHash.split(":");
  const derivedKey = scryptSync(password, salt, 64);
  const storedKeyBuffer = Buffer.from(key, "hex");

  if (storedKeyBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedKeyBuffer, derivedKey);
}

export function createSessionToken() {
  return `${randomUUID()}-${randomBytes(24).toString("hex")}`;
}

export function createOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
