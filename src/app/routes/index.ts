import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BusRoutes } from "../modules/manageBus/manageBus.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/bus",
    route: BusRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
