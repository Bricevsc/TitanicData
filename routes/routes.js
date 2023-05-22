import express from "express";
import homeController from "../controllers/home.js";
import registerController from "../controllers/register.js";
import loginController from "../controllers/login.js";
import dashboardController from "../controllers/dashboard.js"
import authController from "../controllers/auth.js";
import checkAuth from "../middlewares/checkauth.js";

const router = express.Router();

router.get("/", homeController);
router.get("/dashboard",  dashboardController);
router.get("/login", loginController);

router.post("/register", registerController);
router.post("/auth", authController);

export default router;