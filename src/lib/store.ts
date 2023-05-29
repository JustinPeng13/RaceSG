import { app } from "../../firebaseConfig";
import { getDatabase, ref, onValue, set, DataSnapshot } from "firebase/database";

// Get a reference to the Realtime Database
const db = getDatabase(app);

type Session = {
  state?: string;
  nonce?: string;
  codeVerifier?: string;
  accessToken?: string;
  userInfo?: Record<string, string>;
  sub?: string;
};

// Define a function to get a session from the database
const getSession = async (sessionId: string) => {
  // Get a reference to the session data in the database
  const sessionRef = ref(db, `sessions/${sessionId}`);

  // Get a snapshot of the session data
  const snapshot = (await new Promise((resolve) => {
    onValue(sessionRef, (snapshot) => {
      resolve(snapshot);
    }, { onlyOnce: true });
  })) as DataSnapshot;

  return snapshot.val() as Session | undefined;
};

// Define a function to set a session in the database
const setSession = async (sessionId: string, session: Session) => {
  const sessionRef = ref(db, `sessions/${sessionId}`);

  //Set the session data in the database
  await set(sessionRef, session);
};

export { getSession, setSession };
