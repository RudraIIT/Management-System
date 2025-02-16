import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const LiveLeaderboard: React.FC = () => {
  // Mock data for leaderboard
  const leaderboardData = [
    { rank: 1, name: "John Doe", score: 100 },
    { rank: 2, name: "Jane Smith", score: 95 },
    { rank: 3, name: "Bob Johnson", score: 90 },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboardData.map((entry) => (
          <TableRow key={entry.rank}>
            <TableCell>{entry.rank}</TableCell>
            <TableCell>{entry.name}</TableCell>
            <TableCell>{entry.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default LiveLeaderboard

