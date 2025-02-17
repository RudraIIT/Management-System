import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Link} from "react-router-dom"
import * as Icons from "lucide-react"

interface Problem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  solved: boolean
  acceptance: number
}

const problems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    solved: true,
    acceptance: 75,
  },
  {
    id: "2",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    solved: false,
    acceptance: 45,
  },
  {
    id: "3",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    solved: false,
    acceptance: 25,
  },
]

export function ProblemsPage() {
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
            <TableHead>Acceptance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell>{problem.solved ? <Icons.Check className="h-5 w-5 text-green-500" /> : null}</TableCell>
              <TableCell>
                <Link to={`/problems/${problem.id}`} className="text-primary hover:underline">
                  {problem.title}
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
              <TableCell>{problem.acceptance}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

