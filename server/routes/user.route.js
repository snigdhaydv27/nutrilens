import { Router } from "express";
import { getUserById, registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/user.auth.middleware.js";

const router = Router();

router.route("/:id").get(getUserById);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// protected routes
router.route("/logout").post(authenticateUser, logoutUser);


export default router;