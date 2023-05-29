import { sgidClient } from "@/lib/sgidClient";
import { store } from "@/lib/store";
import { generatePkcePair } from "@opengovsg/sgid-client";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { state } = context.query;
  const sessionId = context.req.cookies.sessionId || "";

  if (!sessionId) {
    throw new Error("Session ID not found in browser's cookies");
  }

  // Generate PKCE pair
  const { codeChallenge, codeVerifier } = generatePkcePair();

  const stateString = Array.isArray(state) ? state[0] : state;
  const { url, nonce } = sgidClient.authorizationUrl({
    state: stateString,
    codeChallenge,
  });

  // Store code verifier, state, and nonce in memory
  store.set(sessionId, { state: stateString, codeVerifier, nonce });

  return {
    props: {
      url,
    },
  };
}

interface LoginProps {
  url: string;
}

function Login({ url }: LoginProps) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return <></>;
}

export default Login;
