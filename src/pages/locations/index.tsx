import Link from "next/link";

const locArray: ILocation[] = [
  {
    id: "loc1",
    name: "Jurong Bird Park",
    desc: "Jurong Bird Park was formerly an aviary and tourist attraction in Jurong, Singapore between 1971 and 2023. The largest such bird park in Asia, it covers an area of 0.2 square kilometres on the western slope of Jurong Hill, the highest point in the Jurong region.",
    coords: ["1.3187", "103.7064"],
    activity: "Take 3 pictures of birds",
    difficulty: "EASY",
  },
  {
    id: "loc2",
    name: "National University of Singapore",
    desc: "NUS Description.",
    coords: ["999", "999"],
    activity: "Complete CS Degree",
    difficulty: "HARD",
  },
];

export default function Locations() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {locArray.map((loc) => (
        <Link key={loc.id} href={`/locations/${loc.id}`}>
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
      ))}
    </ul>
  );
}
