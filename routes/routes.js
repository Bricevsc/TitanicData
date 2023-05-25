import express from "express";
import login from "../controllers/home.js";
import registerController from "../controllers/register.js";
import dashboardController from "../controllers/dashboard.js"
import validateLoginPayload from "../middlewares/validateLoginPayload.js"
import validateRegisterPayload from "../middlewares/validateRegisterPayload.js";
const router = express.Router();

router.post("/", validateLoginPayload, login);
router.get("/dashboard", dashboardController);
router.post("/register", validateRegisterPayload, registerController);





export default router;