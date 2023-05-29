import { getDatabase, ref, push } from "firebase/database";
import { app } from "../../../firebaseConfig";

export default function handler(req, res) {
  const db = getDatabase(app);
  if (req.method === "POST") {
    const body = JSON.parse(JSON.stringify(req.body));

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log("body: ", body);

    const newLoc = push(ref(db, "locations"), body);
    res.redirect(`/locations/${newLoc.key}`)
  }
}
