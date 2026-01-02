import { Hono } from "hono";
import shortenUrlRoutes from "./routes/shorten-url.routes";
import analyticsRoutes from "./routes/analytics.routes";

const app = new Hono();

app.route("/", shortenUrlRoutes);
app.route("/", analyticsRoutes)

export default app;
