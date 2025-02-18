import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

interface Contest {
  id: string
  title: string
  startTime: string
  duration: string
  registered: boolean
}

export function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>()
  const router = useNavigate();
  const user = Cookies.get("user");
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contests/getAllContest", {
          withCredentials: true
        });

        if (response.status === 200) {
          // console.log("response", response.data.data);
          const fetchedContests = response.data.data.map((contest: any, index: number) => ({
            id: contest._id?.toString() || `contest-${index}`, 
            title: contest.name,
            startTime: contest.startTime
              ? new Date(contest.startTime).toISOString().replace("T", " ").substring(0, 19)
              : null,
            duration: (contest.startTime && contest.endTime)
              ? (new Date(contest.endTime).getTime() - new Date(contest.startTime).getTime()) / (1000 * 3600)
              : null,
            registered: contest.participants.includes(user)
          }));

          // console.log(fetchedContests);
          setContests(fetchedContests);
        }

      } catch (error) {
        console.log(`Error in fetching contests`, error)
      }
    }

    fetchContests()
  }, [])

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contests</h1>
        <Button asChild>
          <Link to="/create-contest">Create Contest</Link>
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
          {contests?.map((contest) => (
            <TableRow key={contest.id}>
              <TableCell className="font-medium">{contest.title}</TableCell>
              <TableCell>{contest.startTime}</TableCell>
              <TableCell>{contest.duration}</TableCell>
              <TableCell>
                <Button variant={contest.registered ? "secondary" : "default"} size="sm" onClick={(e) => { 
                  e.preventDefault();
                  if(!contest.registered) {
                    router(`/contests/register/${contest.id}`);
                  }
                }}>
                  {contest.registered ? "Registered" : "Register"}
                </Button>
              </TableCell>
              <TableCell>
                <Button size="sm" onClick={() => { router(`/contests/${contest.id}`) }}>
                  Add Problems
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

