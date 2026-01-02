import { Hono } from "hono";
import UrlAcessEvents from "../model/url-acess-events.model";
import Url from "../model/url.model";
import { hashIp } from "../utils/hashIp";


const analyticsRoutes = new Hono();

export async function recordEvent({ code, ip, userAgent }) {
  const urlExists = await Url.findOne({ code });
  if (!urlExists) {
    return null;
  }

  return await UrlAcessEvents.create({
    code,
    ipHash: hashIp(ip),
    userAgent,
  });
}

analyticsRoutes.get("/analytics/:code", async (c) => {
  const code = c.req.param("code");
  const lastAccess = await UrlAcessEvents.findOne({ code })
    .sort({ createdAt: -1 })
    .select('createdAt')
    .lean()


  if (!lastAccess) {
    return c.json({ error: "Short URL code not found" });
  }

  const countAccess = await UrlAcessEvents.countDocuments({ code });

  const response = {
    code: code,
    totalAcess: countAccess,
    lastAcess: lastAccess?.createdAt
  }

  return c.json(response, 200);
})

export default analyticsRoutes;
