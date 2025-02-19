import Contest from "../models/contest.model.js";
import Problem from "../models/problems.model.js";

export const createContest = async(req: any,res: any) => {
    try {
        const {name, description, startTime, endTime} = req.body;
        const createdBy = req.user.id;
        const contest = await Contest.create({
            name,
            description,
            startTime,
            endTime,
            createdBy,
        });

        if(!contest) {
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
        console.log("Error in creating contest",error);
    }
}

export const getContest = async(req: any,res: any) => {
    try {
        const contest = await Contest.findById(req.params.id).populate("description startTime endTime problems participants createdBy");
        if(!contest) {
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
        console.log("Error in getting contest",error);
    }
}

export const getAllContest = async(req: any,res: any) => {
    try {
        const contests = await Contest.find();
        if(!contests) {
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
        console.log("Error in getting contests",error);
    }
}

export const addProblem = async(req: any,res: any) => {
    try {
        const contest = await Contest.findById(req.params.id);
        if(!contest) {
            console.log("Contest not found");
            return res.status(404).json({
                success: false,
                message: "Contest not found",
            });
        }

        const {name, description, difficulty, points, examples, constraints, template, testcases} = req.body;

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

        contest.problems.push(problem._id);
        await contest.save();

        res.status(201).json({
            success: true,
            message: "Problem added to contest successfully",
            data: contest,
        });

    } catch (error) {
        console.log("Error in adding problem to contest",error);
    }
}

export const getAllProblems = async(req: any, res: any) => {
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

export const getProblem = async(req: any, res: any) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);

        if(!problem) {
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

export const registerContest = async(req: any, res: any) => {
    try {
        const { id } = req.params;
        const contest = await Contest.findById(id);
        const user = req.user.id;

        if(!contest) {
            return res.status(404).json({
                success: false,
                message: "Contest not found",
            });
        }

        contest.participants.push(user);

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