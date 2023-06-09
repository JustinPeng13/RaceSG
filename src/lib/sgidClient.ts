import { SgidClient } from "@opengovsg/sgid-client";

const sgidClient = new SgidClient({
  //Replace with your own SGID credentials
  clientId: String(process.env.SGID_CLIENT_ID),
  clientSecret: String(process.env.SGID_CLIENT_SECRET),
  privateKey: String(process.env.SGID_PRIVATE_KEY),
  redirectUri: "http://localhost:3000/api/redirect",
});

export { sgidClient };
