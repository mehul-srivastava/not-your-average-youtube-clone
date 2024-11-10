import { Hono } from "hono";

const app = new Hono();

/* Handle progress based on  */
app.get("/progress-handler", (c) => {
  return c.text("Hello Hono!");
});

export default app;
