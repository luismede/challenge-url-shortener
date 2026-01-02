import { Hono } from "hono";
import Url from "../model/url.model";
import ShortUniqueId from "short-unique-id";
import { recordEvent } from "./analytics.routes";

const BASE_URI = process.env.BASE_URI || "http://localhost:3000";
const shortenUrlRoutes = new Hono();

const uid = new ShortUniqueId({
  dictionary: "alphanum",
  length: Math.floor(Math.random() * (10 - 5 + 1)) + 6,
});

shortenUrlRoutes.post("/shorten-url", async (c) => {
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

shortenUrlRoutes.get("/:code", async (c) => {
  const code = c.req.param("code");
  const document = await Url.findOne({ code });

  if (!document) {
    return c.json({ error: "Short url not found" }, 404);
  }

  const isExpired = document.createdAt < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  if (isExpired) {
    return c.json({ message: "This url expired" }, 410);
  }

  const eventData = {
    code,
    ip: c.req.header("x-forwarded-for") || "unknown",
    userAgent: c.req.header("user-agent")
  };

  recordEvent(eventData).catch((err) => console.error(err));


  return c.redirect(document.url);
});

export default shortenUrlRoutes;
