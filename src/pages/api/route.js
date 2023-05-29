import { getDatabase, ref, push } from "firebase/database";
import { app } from "../../../firebaseConfig";

export default function handler(req, res) {
  const db = getDatabase(app);
  if (req.method === "POST") {
    const body = JSON.parse(JSON.stringify(req.body));

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log("body: ", body);

    const newRte = push(ref(db, "routes"), body);
    res.redirect(`/routes/${newRte.key}`)
  }
}
