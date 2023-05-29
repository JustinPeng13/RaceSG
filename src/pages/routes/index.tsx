import Link from "next/link";

const rteArray: IRoute[] = [
  {
    name: "Nature",
    desc: "A route for nature-loving adventurers",
    locationIds: ["loc1"],
  },
  {
    name: "Schools",
    desc: "Visit cool campuses",
    locationIds: ["loc2"],
  },
];

export default function Routes() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Routes
        </h1>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {rteArray.map((rte) => (
          <Link key={rte.name} href={`/routes/1`}>
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
        ))}
      </ul>
    </>
  );
}
