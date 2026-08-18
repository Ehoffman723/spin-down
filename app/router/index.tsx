import { createBrowserRouter } from "react-router";
import HomeView from "../views/HomeView.tsx";
import LeaderboardView from "../views/LeaderboardView.tsx";

const router = createBrowserRouter([
  { path: "/", Component: HomeView },
  { path: "/leaderboards/:slug", Component: LeaderboardView },
]);

export default router;
