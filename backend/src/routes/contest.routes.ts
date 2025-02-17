import { Router } from "express";
import { createContest, getContest, getAllContest, addProblem } from "../controllers/contest.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();

router.post("/createContest",isAuthenticatedUser, createContest);
router.get("/getContest/:id", getContest);
router.get("/getAllContest", getAllContest);
router.put("/addProblem/:id", isAuthenticatedUser, addProblem);

export default router;