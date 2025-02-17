import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

interface Submission {
  id: string
  problem: string
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded"
  language: string
  timestamp: string
}

const submissions: Submission[] = [
  {
    id: "1",
    problem: "Two Sum",
    status: "Accepted",
    language: "TypeScript",
    timestamp: "2024-02-17 14:30",
  },
  {
    id: "2",
    problem: "Longest Substring",
    status: "Wrong Answer",
    language: "TypeScript",
    timestamp: "2024-02-17 14:15",
  },
  {
    id: "3",
    problem: "Median of Arrays",
    status: "Time Limit Exceeded",
    language: "TypeScript",
    timestamp: "2024-02-17 14:00",
  },
]

export function SubmissionsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Submissions</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Problem</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <Link to={`/problems/${submission.id}`} className="text-primary hover:underline">
                  {submission.problem}
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    submission.status === "Accepted"
                      ? "success"
                      : submission.status === "Wrong Answer"
                        ? "destructive"
                        : "warning"
                  }
                >
                  {submission.status}
                </Badge>
              </TableCell>
              <TableCell>{submission.language}</TableCell>
              <TableCell>{submission.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

