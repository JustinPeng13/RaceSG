import { getDatabase, ref, push } from "firebase/database";
import { app } from "../../../firebaseConfig";

export default function handler(req, res) {
  const db = getDatabase(app);
  if (req.method === "GET") {

    const newRte = push(ref(db, "routes"), {
      name: "Nature",
      desc: "A route for nature-loving adventurers",
      locationIds: ["-NWch7GOUIfBGG3WJP1K", "-NWd0JZtQwE8P-geXwOR", "-NWd0cNh9lDf5Dnc1UUS"],
      locationNames:["Jurong Bird Park", "Botanic Gardens", "Gardens By The Bay"]
    },);
    res.redirect(`/routes/${newRte.key}`)
  }
}
