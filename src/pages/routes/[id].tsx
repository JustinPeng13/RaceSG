import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Route = () => {
  const router = useRouter();

  const [rte, setRte] = useState<IRoute>({
    name: "",
    desc: "",
    locations: [["", ""]],
  });

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const db = getDatabase(app);
    var pid = "";
    if (router.query.hasOwnProperty("id")) {
      pid = router.query.id as string;
    }
    console.log("hi", router.query);
    get(ref(db, `routes/${pid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRte(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.query]);

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <button
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          onClick={handleGoBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.707 3.293a1 1 0 0 1 0 1.414L6.414 9H16a1 1 0 0 1 0 2H6.414l4.293 4.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
      </div>
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Route</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {rte.name}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Description
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {rte.desc}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Number of Locations
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {rte.locations.length}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Locations
          </dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              className="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              {rte.locations.map(([id, name], index) => {
                return (
                  <Link key={id} href={`/locations/${id}`}>
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{name}</span>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Route;
