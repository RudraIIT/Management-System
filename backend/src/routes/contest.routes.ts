import { Router } from "express";
import { createContest, getContest, getAllContest, addProblem, getAllProblems, getProblem } from "../controllers/contest.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();

router.post("/createContest",isAuthenticatedUser, createContest);
router.get("/getContest/:id", getContest);
router.get("/getAllContest", getAllContest);
router.put("/addProblem/:id", isAuthenticatedUser, addProblem);
router.get("/getAllProblems",isAuthenticatedUser, getAllProblems);
router.get("/getProblem/:id", isAuthenticatedUser, getProblem);

export default router;