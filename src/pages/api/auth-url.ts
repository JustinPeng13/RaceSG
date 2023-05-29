import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { store } from "../../lib/store";
import { sgidClient } from "../../lib/sgidClient";
import { setCookie } from "cookies-next";
import { generatePkcePair } from "@opengovsg/sgid-client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let { state } = req.query;
  state = String(state);

  // Generate a session ID
  const sessionId = uuidv4();

  // Generate a PKCE pair
  const { codeChallenge, codeVerifier } = generatePkcePair();

  // Generate an authorization URL
  const { url, nonce } = sgidClient.authorizationUrl({
    state,
    codeChallenge,
  });

  // Store the code verifier, state, and nonce
  store.set(sessionId, { state, nonce, codeVerifier });

  // Set the sessionID in the browser's cookies
  setCookie("sessionId", sessionId, { req, res });

  // Redirect the browser to the authorization URL
  res.redirect(url);
}