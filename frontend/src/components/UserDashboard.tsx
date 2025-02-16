import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventList from "./EventList"
import LiveLeaderboard from "./LiveLeaderboard"

const UserDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="leaderboard">Live Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Available Events</CardTitle>
              <CardDescription>Browse and register for coding contests and hackathons</CardDescription>
            </CardHeader>
            <CardContent>
              <EventList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Live Leaderboard</CardTitle>
              <CardDescription>Track real-time contest results</CardDescription>
            </CardHeader>
            <CardContent>
              <LiveLeaderboard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UserDashboard

