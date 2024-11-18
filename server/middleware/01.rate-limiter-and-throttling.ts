const requests = new Map();

const RATE_INTERVAL = 120000; // 2 phút
const RATE_TOKEN_PER_INTERVAL = 100; // tối đa  2 request  mổi RATE_INTERVAL

const THROTTLE_TOKEN_PER_INTERVAL = 100; // tối đa 10 request mỗi RATE_INTERVAL
const THROTTLE_TIMEOUT = 10000; // 10 giây

export default defineEventHandler(async (event) => {
  const path = event.path;

  if (path.startsWith("/api")) {
    const ip = getRequestIP(event);
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    // Lấy ra các request trong khoảng RATE_INTERVAL
    const timestamps = requests
      .get(ip)
      .filter((timestamp: number) => now - timestamp < RATE_INTERVAL);
    timestamps.push(now);

    if (timestamps.length > RATE_TOKEN_PER_INTERVAL) {
      if (
        timestamps.length >
        RATE_TOKEN_PER_INTERVAL + THROTTLE_TOKEN_PER_INTERVAL
      ) {
        throw createError({
          status: 429,
          message: "Two many requests. Please try again later. aaaaaaaa",
        });
      }

      await new Promise((resolve) => setTimeout(resolve, THROTTLE_TIMEOUT)); // throttling
    }

    // reset lại timestamps
    requests.set(ip, timestamps);
  }
});
