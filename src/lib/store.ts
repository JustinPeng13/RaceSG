import { app } from "../../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";

// The sgID docs initialized an in-memory store for the server. This is an implementation where the session data is instead stored in a Database. If you would like to find out more about how the store works, take a look at the link below for a simpler example on how the sessions are stored for sgID

// https://docs.id.gov.sg/integrations-with-sgid/typescript-javascript/framework-guides/next.js-client-side-rendering#step-2-initialize-an-in-memory-store-for-sessions

// Get a reference to the Realtime Database
const db = getDatabase(app);

type Session = {
  state?: string;
  nonce?: string;
  codeVerifier?: string;
  accessToken?: string;
  userInfo?: Record<string, string>;
  sub?: string;
  isLoggedIn?: boolean;
};

// Define a function to get a session from the database
const getSession = async (sessionId: string) => {
  // Get a reference to the session data in the database
  const sessionRef = ref(db, `sessions/${sessionId}`);

  // Get a snapshot of the session data
  const snapshot = await get(sessionRef);

  return snapshot.val() as Session | undefined;
};

// Define a function to set a session in the database
const setSession = async (sessionId: string, session: Session) => {
  const sessionRef = ref(db, `sessions/${sessionId}`);

  set(sessionRef, session);
};

export { getSession, setSession };
