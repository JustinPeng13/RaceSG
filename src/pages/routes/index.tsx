import Link from "next/link";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../firebaseConfig";
import { useEffect, useState } from "react";

export default function Routes() {
  const db = getDatabase(app);

  const [routes, setRoutes] = useState({});
  useEffect(() => {
    get(ref(db, "routes"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRoutes(snapshot.val());
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
          Routes
        </h1>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {Object.entries(routes).map(([id, val]) => {
          const rte = val as IRoute;
          return (
            <Link key={id} href={`/routes/${id}`}>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-lg font-semibold leading-6 text-gray-900">
                      {rte.name}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {rte.desc}
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
