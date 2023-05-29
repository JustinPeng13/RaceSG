import { app } from "../../firebaseConfig";
import { getDatabase, ref, set, get, serverTimestamp } from "firebase/database";

// Get a reference to the Realtime Database
const db = getDatabase(app);

// Define a function to get a user from the database
const getUser = async (fullName: string) => {
  // Get a reference to the user data in the database
  const userRef = ref(db, `users/${fullName}`);

  // Get a snapshot of the user data
  const snapshot = await get(userRef);

  return snapshot.val();
};

// Define a function to set a user in the database
const setUser = async (fullName: string) => {
  const userRef = ref(db, `users/${fullName}`);

  const emptyUser: IUser = {
    fullName: fullName,
    email: "",
    points: 0,
    favouriteLocationIds: [""],
    completedLocationIds: [""],
    favouriteRouteIds: [""],
    completedRouteIds: [""],
  };

  set(userRef, emptyUser);
};

export { getUser, setUser };
