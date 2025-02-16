import Contest from "../models/contest.model.js";

export const createContest = async(req: any,res: any) => {
    try {
        const {name, description, startTime, endTime} = req.body;
        const createdBy = req.user.id;
        console.log(req.user);
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
        const contest = await Contest.findById(req.params.id).populate("description createdBy");
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