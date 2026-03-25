const WINDOW_MS = {
  auth: 15 * 60 * 1000,
  chat: 60 * 1000,
  form: 5 * 60 * 1000,
};

const LIMITS = {
  auth: 10,
  chat: 20,
  form: 8,
};

const store = global.__wattpulseRateLimitStore || new Map();

if (!global.__wattpulseRateLimitStore) {
  global.__wattpulseRateLimitStore = store;
}

function getClientKey(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "local";
}

export function applyRateLimit(request, bucket = "form") {
  const key = `${bucket}:${getClientKey(request)}`;
  const now = Date.now();
  const windowMs = WINDOW_MS[bucket] || WINDOW_MS.form;
  const limit = LIMITS[bucket] || LIMITS.form;
  const entry = store.get(key);

  if (!entry || entry.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { ok: true };
  }

  if (entry.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.ceil((entry.expiresAt - now) / 1000),
    };
  }

  entry.count += 1;
  store.set(key, entry);
  return { ok: true };
}
