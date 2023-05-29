import Cors from "cors";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebaseConfig";

// This file act as a server-side proxy for the Firebase login using email endpoint

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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).json({ user });
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case "auth/user-disabled":
        errorMessage = "The user with the given email has been disabled.";
        break;
      case "auth/invalid-email":
        errorMessage = "The email address is not valid.";
        break;
      case "auth/user-not-found":
        errorMessage = "The user is not found.";
        break;
      case "auth/wrong-password":
        errorMessage = "Wrong password.";
        break;
      default:
        errorMessage = error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
}
