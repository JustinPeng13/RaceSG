import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Location = () => {
  const db = getDatabase(app);
  const router = useRouter();

  const [loc, setLoc] = useState<ILocation>({
    name: "",
    desc: "",
    latitude: "",
    longitude: "",
    activity: "",
    difficulty: 'Easy'
  });
  const [pid, setPid] = useState("")
  
  useEffect(() => {
    var pid = ""
    if (router.query.hasOwnProperty('id')) {
      pid = router.query.id as string
    }
    get(ref(db, `locations/${pid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLoc(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.query])

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Location
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {loc.name}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Description
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {loc.desc}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Coordinates
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${loc.latitude}° N, ${loc.longitude}° E`}</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Activity
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {loc.activity}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Difficulty
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {loc.difficulty}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Location;
