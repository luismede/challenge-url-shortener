import { Hono } from "hono";
import shortenUrlRoutes from "./routes/shorten-url.routes";

const app = new Hono();

app.route("/", shortenUrlRoutes);

export default app;
