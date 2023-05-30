// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie, getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionId = getCookie("sessionId", { req, res });

  if (typeof sessionId !== "string") {
    return res.status(400).send("Session ID not found in browser cookies");
  }

  deleteCookie("sessionId", { req, res });

  res.status(200).send('ok')
}