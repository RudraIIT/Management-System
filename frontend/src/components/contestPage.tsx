import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle } from "lucide-react"
import { useParams } from "react-router-dom"
import axios from "axios"

interface Problem {
    id: string
    title: string
    difficulty: "Easy" | "Medium" | "Hard"
    points: number
    solved: boolean
    attempted: boolean
}

interface Participant {
    rank: number
    username: string
    score: number
    solved: number
    totalTime: string
}

// const contestData = {
//     id: "1",
//     title: "Global Coding Championship 2024",
//     startTime: "2024-03-15T14:00:00Z",
//     duration: "04:00:00",
//     participants: 1234,
//     problems: [
//         {
//             id: "1",
//             title: "Array Sum Pairs",
//             difficulty: "Easy",
//             points: 100,
//             solved: false,
//             attempted: true,
//         },
//         {
//             id: "2",
//             title: "Binary Tree Maximum Path",
//             difficulty: "Medium",
//             points: 200,
//             solved: true,
//             attempted: true,
//         },
//         {
//             id: "3",
//             title: "Dynamic Programming Challenge",
//             difficulty: "Hard",
//             points: 300,
//             solved: false,
//             attempted: false,
//         },
//         {
//             id: "4",
//             title: "String Manipulation",
//             difficulty: "Easy",
//             points: 100,
//             solved: false,
//             attempted: false,
//         },
//     ] as Problem[],
//     leaderboard: [
//         {
//             rank: 1,
//             username: "tourist",
//             score: 600,
//             solved: 3,
//             totalTime: "1:23:45",
//         },
//         {
//             rank: 2,
//             username: "ecnerwala",
//             score: 500,
//             solved: 2,
//             totalTime: "1:45:30",
//         },
//         {
//             rank: 3,
//             username: "Benq",
//             score: 400,
//             solved: 2,
//             totalTime: "2:15:20",
//         },
//     ] as Participant[],
// }

interface Contest {
    id: string
    title: string
    startTime: string
    duration: string
    endTime: string
    participants: number
    problems: Problem[]
    leaderboard: Participant[]
}

function TimeRemaining({ endTime }: { endTime: string }) {
    const [timeLeft, setTimeLeft] = useState("")

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const end = new Date(endTime).getTime()
            const distance = end - now

            if (distance < 0) {
                clearInterval(timer)
                setTimeLeft("Contest Ended")
                return
            }

            const hours = Math.floor(distance / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            setTimeLeft(
                `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
            )
        }, 1000)

        return () => clearInterval(timer)
    }, [endTime])

    return <div className="font-mono text-2xl font-bold">{timeLeft}</div>
}

const calculateDuration = (start: string, end: string): string => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime.getTime() - startTime.getTime();

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export function ContestPage() {
    const [contestData, setContestData] = useState<Contest | null>(null)
    const router = useNavigate()
    // const solvedCount = contestData?.problems.filter((p) => p.solved).length
    // const totalProblems = contestData?.problems.length
    // const progress = (solvedCount / totalProblems) * 100
    // const params = useParams()

    // // Calculate contest end time
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [solvedCount, setSolvedCount] = useState<number>(0);
    const [totalProblems, setTotalProblems] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const params = useParams<{ id: string }>();

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const response = await axios.get<{ data: Contest }>(
                    `http://localhost:3000/api/contests/getContest/${params.id}`,
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    console.log("response", response.data.data.problems);
                    const rawData = response.data.data;
                    const formattedContest: Contest = {
                        id: rawData._id,
                        title: rawData.name,
                        startTime: rawData.startTime,
                        duration: calculateDuration(rawData.startTime, rawData.endTime), 
                        endTime: rawData.endTime, 
                        participants: Array.isArray(rawData.participants) ? rawData.participants.length : 0, 
                        problems: rawData.problems.map((problem: any) => {
                            return {
                                id: problem._id,
                                title: problem.name,
                                difficulty: problem.difficulty,
                                points: problem.points,
                                solved: false,
                                attempted: false,
                            }
                        }),
                        leaderboard: [], 
                    };

                    setContestData(formattedContest);
                }
            } catch (error) {
                console.error("Error in getting contest", error);
            }
        };

        fetchContest();
    }, [params.id]);

    useEffect(() => {
        if (!contestData) return;

        // Parse start time
        const start = new Date(contestData.startTime);
        setStartTime(start.toISOString().replace("T", " ").substring(0, 19));

        // If startTime and date not equal to current time then redirect back to contests page
        if (start.getTime() > new Date().getTime()) {
            router("/contests");
            return;
        }

        // Parse duration and calculate end time
        if (contestData.duration) {
            const [hours, minutes, seconds] = contestData.duration.split(":").map(Number);
            const end = new Date(start.getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000);
            setEndTime(end.toISOString().replace("T", " ").substring(0, 19));
        }

        // Calculate solved problems and progress
        const solved = contestData.problems?.filter((p) => p.solved).length || 0;
        const total = contestData.problems?.length || 0;
        setSolvedCount(solved);
        setTotalProblems(total);
        setProgress(total > 0 ? (solved / total) * 100 : 0);
    }, [contestData]);

    return (
        <div className="container py-6">
            <div className="space-y-6">
                {/* Contest Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{contestData?.title}</h1>
                        <p className="text-muted-foreground">Solve challenging problems and compete with others</p>
                    </div>
                    <Card className="w-full md:w-auto">
                        <CardContent className="p-4">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Time Remaining</p>
                                {endTime && <TimeRemaining endTime={endTime} />}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contest Progress */}
                <Card>
                    <CardContent className="p-6">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Problems Solved</p>
                                <p className="text-2xl font-bold">
                                    {solvedCount}/{totalProblems}
                                </p>
                                <Progress value={progress} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Total Points</p>
                                <p className="text-2xl font-bold">
                                    {contestData?.problems.filter((p) => p.solved).reduce((acc, p) => acc + p.points, 0)}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Your Rank</p>
                                <p className="text-2xl font-bold">#42</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Participants</p>
                                <p className="text-2xl font-bold">{contestData?.participants}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Problems and Leaderboard Tabs */}
                <Tabs defaultValue="problems">
                    <TabsList>
                        <TabsTrigger value="problems">Problems</TabsTrigger>
                        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                    </TabsList>

                    <TabsContent value="problems" className="mt-6">
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">#</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Difficulty</TableHead>
                                        <TableHead>Points</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contestData?.problems.map((problem, index) => (
                                        <TableRow key={problem.id}>
                                            <TableCell>{String.fromCharCode(65 + index)}</TableCell>
                                            <TableCell className="font-medium">{problem.title}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        problem.difficulty === "Easy"
                                                            ? "success"
                                                            : problem.difficulty === "Medium"
                                                                ? "warning"
                                                                : "destructive"
                                                    }
                                                >
                                                    {problem.difficulty}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{problem.points}</TableCell>
                                            <TableCell>
                                                {problem.solved ? (
                                                    <div className="flex items-center gap-2 text-green-500">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        <span>Solved</span>
                                                    </div>
                                                ) : problem.attempted ? (
                                                    <div className="flex items-center gap-2 text-red-500">
                                                        <XCircle className="h-4 w-4" />
                                                        <span>Wrong Answer</span>
                                                    </div>
                                                ) : null}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button asChild>
                                                    <Link to={`/problems/${problem.id}`}>
                                                        {problem.attempted ? "Try Again" : "Solve"}
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="leaderboard" className="mt-6">
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">Rank</TableHead>
                                        <TableHead>Username</TableHead>
                                        <TableHead>Score</TableHead>
                                        <TableHead>Problems Solved</TableHead>
                                        <TableHead>Total Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contestData?.leaderboard.map((participant) => (
                                        <TableRow key={participant.username}>
                                            <TableCell>{participant.rank}</TableCell>
                                            <TableCell className="font-medium">{participant.username}</TableCell>
                                            <TableCell>{participant.score}</TableCell>
                                            <TableCell>{participant.solved}</TableCell>
                                            <TableCell>{participant.totalTime}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

