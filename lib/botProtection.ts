// Simple in-memory rate limiter for bot protection
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 10, windowMs = 60 * 1000) { // 10 requests per minute
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired entry
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return false;
    }

    if (entry.count >= this.maxRequests) {
      return true;
    }

    entry.count++;
    return false;
  }

  // Clean up expired entries
  cleanup() {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.store.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.store.delete(key));
  }
}

// Create global instance
const globalRateLimiter = new RateLimiter();

// Clean up every 5 minutes
setInterval(() => {
  globalRateLimiter.cleanup();
}, 5 * 60 * 1000);

export { globalRateLimiter };

// Bot detection utilities
export function detectBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /wget/i,
    /curl/i,
    /python/i,
    /requests/i,
    /automation/i,
    /phantom/i,
    /selenium/i,
    /headless/i,
  ];

  return botPatterns.some(pattern => pattern.test(userAgent));
}

export function getClientIdentifier(
  ip: string | null,
  userAgent: string | null
): string {
  // Use IP + simplified user agent for identification
  const simplifiedUA = userAgent?.substring(0, 50) || 'unknown';
  return `${ip || 'unknown'}-${simplifiedUA}`;
}

export function isValidReferer(referer: string | null, host: string | null): boolean {
  if (!referer || !host) return true; // Allow empty referer
  
  try {
    const refererUrl = new URL(referer);
    return refererUrl.hostname === host || 
           refererUrl.hostname === `www.${host}` ||
           refererUrl.hostname === host?.replace('www.', '');
  } catch {
    return false;
  }
}