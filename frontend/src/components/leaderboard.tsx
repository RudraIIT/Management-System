import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface User {
  rank: number
  username: string
  rating: number
  solved: number
}

const users: User[] = [
  { rank: 1, username: "tourist", rating: 3500, solved: 1500 },
  { rank: 2, username: "Um_nik", rating: 3400, solved: 1400 },
  { rank: 3, username: "Petr", rating: 3300, solved: 1300 },
]

export function LeaderboardPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Problems Solved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.username}>
              <TableCell>{user.rank}</TableCell>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.rating}</TableCell>
              <TableCell>{user.solved}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

