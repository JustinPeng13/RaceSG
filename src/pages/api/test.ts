import { app } from "../../../firebaseConfig";

import { getDatabase, ref, push } from "firebase/database";

const db = getDatabase(app);

export default function handler() {
  push(ref(db, "sessions/123444"), {
    title: true,
    author: "123",
  });
}
