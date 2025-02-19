import Contest from "../models/contest.model.js";
import Problem from "../models/problems.model.js";
import User from "../models/user.model.js";

export const createContest = async (req: any, res: any) => {
    try {
        const { name, description, startTime, endTime } = req.body;
        const createdBy = req.user.id;
        const contest = await Contest.create({
            name,
            description,
            startTime,
            endTime,
            createdBy,
        });

        const user = await User.findById(createdBy);

        if(user && contest) {
            user.createdContest.push(contest._id as any);
            await user.save();
        }

        if (!contest) {
            return res.status(400).json({
                success: false,
                message: "Contest creation failed",
            });
        }

        res.status(201).json({
            success: true,
            message: "Contest created successfully",
            data: contest,
        });
    } catch (error) {
        console.log("Error in creating contest", error);
    }
}

export const getContest = async (req: any, res: any) => {
    try {
        const contest = await Contest.findById(req.params.id).populate("description startTime endTime problems participants createdBy");
        if (!contest) {
            return res.status(404).json({
                success: false,
                message: "Contest not found",
            });
        }

        res.status(200).json({
            success: true,
            data: contest,
        });

    } catch (error) {
        console.log("Error in getting contest", error);
    }
}

export const getAllContest = async (req: any, res: any) => {
    try {
        const contests = await Contest.find();
        if (!contests) {
            return res.status(404).json({
                success: false,
                message: "Contests not found",
            });
        }

        res.status(200).json({
            success: true,
            data: contests,
        });

    } catch (error) {
        console.log("Error in getting contests", error);
    }
}

export const addProblem = async (req: any, res: any) => {
    try {
        const contest = await Contest.findById(req.params.id);
        if (!contest) {
            console.log("Contest not found");
            return res.status(404).json({
                success: false,
                message: "Contest not found",
            });
        }

        const { name, description, difficulty, points, examples, constraints, template, testcases } = req.body;

        const problem = await Problem.create({
            name,
            description,
            difficulty,
            points,
            examples,
            constraints,
            template,
            testcases
        });

        contest.problems.push(problem._id as any);
        await contest.save();

        res.status(201).json({
            success: true,
            message: "Problem added to contest successfully",
            data: contest,
        });

    } catch (error) {
        console.log("Error in adding problem to contest", error);
    }
}

export const getAllProblems = async (req: any, res: any) => {
    try {
        const problems = await Problem.find()

        return res.status(200).json({
            success: true,
            problems,
        })
    } catch (error) {
        console.log("Error in getting all problems", error);
    }
}

export const getProblem = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        return res.status(200).json({
            success: true,
            problem,
        });
    } catch (error) {
        console.log("Error in getting problem", error);
    }
}

export const registerContest = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const contest = await Contest.findById(id);
        const user = req.user.id;

        if (!contest) {
            return res.status(404).json({
                success: false,
                message: "Contest not found",
            });
        }

        contest.participants.push(user as any);

        await contest.save();

        return res.status(200).json({
            success: true,
            message: "Registered successfully",
            data: contest,
        });
    } catch (error) {
        console.log("Error in registering contest", error);
    }
}

export const solvedProblem = async (req: any, res: any) => {
    try {
        const user = req.user.id;
        const { id } = req.params;
        const userData = await User.findById(user);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        userData.problems.push({
            problem: id as any,
            solved: true,
            time: Date.now(),
        });

        await userData.save();

        return res.status(200).json({
            success: true,
            message: "Problem solved successfully",
            data: userData,
        });
    } catch (error) {
        console.log("Error in solving problem", error);
    }
}

export const getSolvedProblems = async (req: any, res: any) => {
    try {
        const user = req.user.id;
        const userData = await User.findById(user);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: userData.problems.filter((problem: any) => problem.solved === true),
        });
    } catch (error) {
        console.log("Error in getting solved problems", error);
    }
}

export const getContestLeaderboard = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const contest = await Contest.findById(id).populate({
            path: "participants",
            populate: {
                path: "problems.problem",
                model: "Problem"
            }
        });

        const startTime = contest?.startTime;

        if (!contest) {
            return res.status(404).json({
                success: false,
                message: "Contest not found",
            });
        }

        const formatTime = (seconds: number): string => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
        
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        };

        const leaderboard = contest.participants.map((participant: any) => {
            const solvedProblems = participant.problems.filter((p: any) => p.solved);
            const totalPoints = solvedProblems.reduce((sum: number, p: any) => sum + (p.problem.points || 0), 0);
            const formatTime = (seconds: number): string => {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
            
                return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
            };

            const totalTimeInSeconds = solvedProblems.reduce((sum: number, p: any) => {
                if (!p.time) return sum; 
                const solvedAt = new Date(p.time).getTime();
                const start = startTime ? new Date(startTime).getTime() : 0;
                const timeTaken = Math.max(0, Math.floor((solvedAt - start) / 1000)); 
                
                return sum + timeTaken;
            }, 0);
            
            // Convert to hh:mm:ss
            const totalTime = formatTime(totalTimeInSeconds);
            
            return {
                userId: participant._id,
                username: participant.username,
                totalPoints,
                totalTime,
                solved: solvedProblems.length,
            };
        });

        leaderboard.sort((a, b) => {
            if (b.totalPoints !== a.totalPoints) {
                return b.totalPoints - a.totalPoints;
            }
            const timeA = a.totalTime.split(":").reduce((acc: number, time: string) => (60 * acc) + +time, 0);
            const timeB = b.totalTime.split(":").reduce((acc: number, time: string) => (60 * acc) + +time, 0);
            return timeA - timeB;
        });

        return res.status(200).json({
            success: true,
            data: leaderboard,
        });

    } catch (error) {
        console.log("Error in getting contest leaderboard", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
