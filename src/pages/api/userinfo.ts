// Not needed for current version of app

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, setSession } from "../../lib/store";
import { sgidClient } from "../../lib/sgidClient";
import { getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve the session ID from browser cookies
  const sessionId = getCookie("sessionId", { req, res });

  if (typeof sessionId !== "string") {
    return res.status(401).send("Session ID not found in browser cookies");
  }

  // Retrieve the access token from memory using the session ID
  const session = await getSession(sessionId);

  if (!session) {
    return res.status(401).send("Session not found");
  }
  const { accessToken, sub, isLoggedIn } = session;

  if (!accessToken || typeof accessToken !== "string") {
    return res.status(400).send("Access token not in session");
  } else if (!sub || typeof sub !== "string") {
    return res.status(400).send("Sub not in session");
  }

  // Request user info using the access token
  const { data } = await sgidClient.userinfo({ accessToken, sub });

  // Store user info in the in-memory store
  const updatedSession = {
    ...session,
    userInfo: data,
  };
  setSession(sessionId, updatedSession);

  const { accessToken: _, nonce: __, ...dataToReturn } = updatedSession;

  // Include the isLoggedIn status in the returned object
  const response = {
    isLoggedIn: updatedSession.isLoggedIn,
    ...dataToReturn,
  };

  // Return the user info
  res.json(response);
}
