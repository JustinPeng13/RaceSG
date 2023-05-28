import Link from "next/link";

// function getUser(): IUser {
//   // firebase query
//   return user
// }

const user: IUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  email: 'johndoe@gmail.com',
  points: 100,
  favouriteLocationIds: ['loc1', 'loc2'],
  completedLocationIds: ['loc3', 'loc4'],
  favouriteRouteIds: ['rte1', 'rte2'],
  completedRouteIds: ['rte3', 'rte4'],
  rewards: ['discount1', 'prize1'],
  joinedDate: new Date()
} 

export default function Profile() {
  // const user = getUser();

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user.fullName }</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Email Address</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user.email }</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Points Accumulated</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user.points }</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Favourite Locations</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              { user.favouriteLocationIds.map(id => {
                return (
                  <Link href={`/locations/${id}`}> 
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{ id }</span>
                        </div>
                      </div>
                    </li>
                  </Link>
                )
              })}
            </ul>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Completed Locations</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              { user.completedLocationIds.map(id => {
                return (
                  <Link href={`/locations/${id}`}> 
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{ id }</span>
                        </div>
                      </div>
                    </li>
                  </Link>
                )
              })}
            </ul>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Favourite Routes</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              { user.favouriteRouteIds.map(id => {
                return (
                  <Link href={`/routes/${id}`}> 
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{ id }</span>
                        </div>
                      </div>
                    </li>
                  </Link>
                )
              })}
            </ul>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Completed Routes</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              { user.completedRouteIds.map(id => {
                return (
                  <Link href={`/routes/${id}`}> 
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{ id }</span>
                        </div>
                      </div>
                    </li>
                  </Link>
                )
              })}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  )
}
