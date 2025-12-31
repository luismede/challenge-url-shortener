import { Hono } from "hono";
import mongoose from "mongoose";
import Url from "./model/url.model";
import ShortUniqueId from "short-unique-id";

const app = new Hono();

const BASE_URI = process.env.BASE_URI || "http://localhost:3000";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/encurtadorUrl";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error: ", err));

const uid = new ShortUniqueId({
  dictionary: "alphanum",
  length: Math.floor(Math.random() * (10 - 5 + 1)) + 6,
});

app.post("/shorten-url", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.url) {
      return c.json({ error: "URL is required" }, 400);
    }

    try {
      new URL(body.url);
    } catch {
      return c.json({ error: "Invalid URL format" }, 400);
    }

    const code = uid.rnd();

    const urlExists = await Url.findOne({ code });
    if (urlExists) {
      return c.json({ error: "Short URL code already exits, try again" });
    }

    const url = await Url.create({
      url: body.url,
      shortUrl: `${BASE_URI}/${code}`,
      code: code,
    });

    const response = {
      shortUrl: url.shortUrl,
    };

    return c.json(response, 201);
  } catch (err) {
    return c.json({ error: "Failed to create url" }, 400);
  }
});

app.get("/:code", async (c) => {
  const code = c.req.param("code");
  const document = await Url.findOne({ code });

  if (!document) {
    return c.json({ error: "Short url not found" }, 404);
  }

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7);

  if (document.createdAt < dateLimit) {
    return c.json({ message: "This url expired" }, 410);
  }

  return c.redirect(document.url);
});

export default app;
