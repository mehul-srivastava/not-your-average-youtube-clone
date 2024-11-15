import { Hono } from "hono";

const app = new Hono();

/* TODO: webhooks */
app.get("/progress-handler", (c) => {
  return c.text("Hello Hono!");
});

export default app;
