export {}

declare global {
  enum difficulty {
    easy,
    medium,
    hard
  }

  interface IUser {
    id: string,
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
    id: string,
    name: string,
    description: string,
    coords: [string, string]
    activity: string,
    difficulty: difficulty
  }

  interface IRoute {
    id: string,
    name: string,
    desc: string,
    locationIds: string[]
  }

  interface IReward {
    id: string,
    name: string,
    desc: string
  }
}