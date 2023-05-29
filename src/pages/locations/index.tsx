import Link from "next/link";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../firebaseConfig";
import { useEffect, useState } from "react";

export default function Locations() {
  const db = getDatabase(app);

  const [locations, setLocations] = useState({});
  useEffect(() => {
    get(ref(db, "locations"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLocations(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Locations
        </h1>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {Object.entries(locations).map(([id, val]) => {
          const loc = val as ILocation;
          return (
            <Link key={id} href={`/locations/${id}`}>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-lg font-semibold leading-6 text-gray-900">
                      {loc.name}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {loc.desc}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
