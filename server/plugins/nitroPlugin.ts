import type { RenderResponse } from "nitropack";
import helmet from "helmet";

const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "https://lh3.googleusercontent.com/"],
    },
  },
  strictTransportSecurity: true,
  xFrameOptions: true,
});

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", (res, { event }) => {
    const response = res as RenderResponse;
    delete response.headers["x-powered-by"];

    helmetMiddleware(event.node.req, event.node.res, () => {});
  });
});
