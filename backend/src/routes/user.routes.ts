import { Router } from "express";
import { register ,loginUser ,logout, getProfile } from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();

router.post("/register",register);
router.post("/login",loginUser);
router.get("/logout",logout);
router.get("/getProfile/:id",isAuthenticatedUser,getProfile);

export default router;