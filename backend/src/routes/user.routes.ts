import { Router } from "express";
import { register ,loginUser ,logout } from "../controllers/user.controller.js";

const router = Router();

router.post("/register",register);
router.post("/login",loginUser);
router.get("/logout",logout);

export default router;