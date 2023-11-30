
const setRateLimit = require("express-rate-limit");

// Rate limit middleware
max=20
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: max,
  message: `You have exceeded your ${max} requests per minute limit.`,
  headers: true,
});

module.exports = rateLimitMiddleware;