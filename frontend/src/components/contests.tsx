import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Link} from "react-router-dom"

interface Contest {
  id: string
  title: string
  startTime: string
  duration: string
  registered: boolean
}

const contests: Contest[] = [
  {
    id: "1",
    title: "Weekly Contest 1",
    startTime: "2024-02-20 14:00",
    duration: "2 hours",
    registered: true,
  },
  {
    id: "2",
    title: "Biweekly Contest 1",
    startTime: "2024-02-24 14:00",
    duration: "2 hours",
    registered: false,
  },
]

export function ContestsPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contests</h1>
        <Button asChild>
          <Link to="/contests/create">Create Contest</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contests.map((contest) => (
            <TableRow key={contest.id}>
              <TableCell className="font-medium">{contest.title}</TableCell>
              <TableCell>{contest.startTime}</TableCell>
              <TableCell>{contest.duration}</TableCell>
              <TableCell>
                <Button variant={contest.registered ? "secondary" : "default"} size="sm">
                  {contest.registered ? "Registered" : "Register"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

