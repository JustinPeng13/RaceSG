import Link from "next/link";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

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
      <div className="grid gap-4 mx-auto max-w-7xl px-4">
        {Object.entries(locations).map(([id, val]) => {
          const loc = val as ILocation;
          return (
            <Link key={id} href={`/locations/${id}`}>
              <Card className="p-4 flex flex-col justify-between rounded-lg shadow">
                <div>
                  <Card.Title className="text-lg font-semibold">
                    {loc.name}
                  </Card.Title>
                  <Card.Text className="text-sm text-gray-500">
                    {loc.desc}
                  </Card.Text>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
