import Cors from "cors";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebaseConfig";

// This file act as a server-side proxy for the Firebase sign up using email endpoint

const auth = getAuth(app);

// Initialize the cors middleware
const cors = Cors({
  methods: ["POST", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Get email and password from request body
  const { email, password } = req.body;

  // Create new user account using Firebase
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
