export {};

declare global {
  interface IUser {
    fullName: string;
    email: string;
    points: number;
    favouriteLocationIds: string[];
    completedLocationIds: string[];
    favouriteRouteIds: string[];
    completedRouteIds: string[];
  }

  interface ILocation {
    name: string;
    desc: string;
    latitude: string;
    longitude: string;
    activity: string;
    difficulty: "Easy" | "Medium" | "Hard";
  }

  interface IRoute {
    name: string;
    desc: string;
    locations: [string, string][];
  }

  interface IReward {
    name: string;
    desc: string;
  }
}
