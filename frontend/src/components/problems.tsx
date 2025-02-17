import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Link} from "react-router-dom"
import * as Icons from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

interface Problem {
  id: string
  name: string
  difficulty: "Easy" | "Medium" | "Hard"
  solved: boolean
  points: number
}

export function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([])

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contests/getAllProblems",{
          withCredentials: true
        });
        if(response.status===200) {
          const formattedProblems = response.data.problems.map((p: any) => ({
            id: p._id,
            name: p.name,
            difficulty: p.difficulty,
            points: p.points,
            solved: true
          }));

          setProblems(formattedProblems)
        }
      } catch (error) {
        console.error("Failed to fetch problems", error)
      }
    }

    fetchProblems()
  },[])
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Problems</h1>
        <Button asChild>
          <Link to="/contests">View Contests</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell>{problem.solved ? <Icons.Check className="h-5 w-5 text-green-500" /> : null}</TableCell>
              <TableCell>
                <Link to={`/problems/${problem.id}`} className="text-primary hover:underline">
                  {problem.name}
                </Link>
              </TableCell>
              <TableCell>
                <span
                  className={
                    problem.difficulty === "Easy"
                      ? "text-green-500"
                      : problem.difficulty === "Medium"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }
                >
                  {problem.difficulty}
                </span>
              </TableCell>
              <TableCell>{problem.points}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

