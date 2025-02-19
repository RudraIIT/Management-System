import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Cookies from "js-cookie"

interface Contest {
  _id: string
  name: string
  date: string
}

interface UserProfile {
  _id: string
  username: string
  email: string
  contest: Contest[]  // Adjusted from contests → contest
  createdContest: Contest[]
}

export const ProfilePage = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const user = Cookies.get("user")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3000/api/users/getProfile/${user}`,{
            withCredentials: true
        }) 
        if(response.data.success){
            setUserData(response.data)
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="container py-10">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{userData?.username}</CardTitle>
              <CardDescription>{userData?.email}</CardDescription>
            </div>
            <Button>Edit Profile</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Contests Section */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Participated Contests */}
        <Card>
          <CardHeader>
            <CardTitle>Participated Contests</CardTitle>
          </CardHeader>
          <CardContent>
            {userData?.contest?.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData?.contest?.map((contest) => (
                    <TableRow key={contest._id}>
                      <TableCell>{contest.name}</TableCell>
                      <TableCell>{new Date(contest.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No contests participated yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Created Contests */}
        <Card>
          <CardHeader>
            <CardTitle>Created Contests</CardTitle>
          </CardHeader>
          <CardContent>
            {userData?.createdContest?.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData?.createdContest?.map((contest) => (
                    <TableRow key={contest._id}>
                      <TableCell>{contest.name}</TableCell>
                      <TableCell>{new Date(contest.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No contests created yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

