import type { NextApiRequest, NextApiResponse } from "next";
import { setSession, getSession } from "../../lib/store";
import { sgidClient } from "../../lib/sgidClient";
import { getCookie, setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve the authorization code from query params
  let { code, state } = req.query;

  // Retrieve the session ID from browser cookies
  const sessionId = getCookie("sessionId", { req, res });

  // Validating that the sessionID, contents in session, and auth code is present
  if (typeof sessionId !== "string") {
    return res.status(401).send("Session ID not found in browser cookies");
  } else if (!code) {
    return res.status(400).send("Authorization code not found in query params");
  }
  code = String(code);

  const session = await getSession(sessionId);

  if (!session) {
    return res.status(401).send("Session not found");
  } else if (state && state !== session.state) {
    return res.status(400).send("State does not match");
  }

  const { nonce, codeVerifier } = session;

  if (!codeVerifier || typeof codeVerifier !== "string") {
    return res.status(400).send("Code verifier not found");
  }

  // Exchange the auth code for the access token
  // At the end of this function, users are considered logged in by the sgID server
  const { accessToken, sub } = await sgidClient.callback({
    code,
    nonce,
    codeVerifier,
  });

  // Store the access token and sub
  const updatedSession = {
    ...session,
    accessToken,
    sub,
  };
  setSession(sessionId, updatedSession);

  // Set a cookie to indicate that the user is logged in
  setCookie("isLoggedIn", "true", { res });

  // res.redirect("/");
}
