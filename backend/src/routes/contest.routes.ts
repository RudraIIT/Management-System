import { Router } from "express";
import { createContest, getContest, getAllContest, addProblem, getAllProblems, getProblem, registerContest,
    solvedProblem, getSolvedProblems, getContestLeaderboard } from "../controllers/contest.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();

router.post("/createContest",isAuthenticatedUser, createContest);
router.get("/getContest/:id", getContest);
router.get("/getAllContest", getAllContest);
router.put("/addProblem/:id", isAuthenticatedUser, addProblem);
router.get("/getAllProblems",isAuthenticatedUser, getAllProblems);
router.get("/getProblem/:id", isAuthenticatedUser, getProblem);
router.put("/registerContest/:id", isAuthenticatedUser, registerContest);
router.put("/solvedProblem/:id", isAuthenticatedUser, solvedProblem);
router.get("/getSolvedProblems", isAuthenticatedUser, getSolvedProblems);
router.get("/getContestLeaderboard/:id", isAuthenticatedUser, getContestLeaderboard);

export default router;