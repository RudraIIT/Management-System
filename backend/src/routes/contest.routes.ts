import { Router } from "express";
import { createContest } from "../controllers/contest.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();

router.post("/createContest",isAuthenticatedUser, createContest);

export default router;