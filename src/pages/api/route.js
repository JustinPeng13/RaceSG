import { getDatabase, ref, push } from "firebase/database";
import { app } from "../../../firebaseConfig";

export default function handler(req, res) {
  const db = getDatabase(app);
  if (req.method === "GET") {

    const newRte = push(ref(db, "routes"), {
      name: "Cool Schools",
      desc: "Be a student again, exploring campuses",
      locations: [
        ["-NWchNrEC0UWTTHFtmF1", "National University of Singapore"],
        ["-NWdIlKNkFVDg3xHF-f0", "The Hive"],
      ],
    },);
    res.redirect(`/routes/${newRte.key}`)
  }
}