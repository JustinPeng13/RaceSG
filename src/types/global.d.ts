export { }

declare global {
  interface IUser {
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    points: number,
    favouriteLocationIds: string[],
    completedLocationIds: string[],
    favouriteRouteIds: string[],
    completedRouteIds: string[],
    rewards: string[],
    joinedDate: Date
  }

  interface ILocation {
    name: string,
    desc: string,
    latitude: string,
    longitude: string,
    activity: string,
    difficulty: 'Easy' | 'Medium' | 'Hard'
  }

  interface IRoute {
    name: string,
    desc: string,
    locationIds: string[]
  }

  interface IReward {
    name: string,
    desc: string
  }
}