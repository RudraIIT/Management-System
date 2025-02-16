import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventCreationForm from "./EventCreationForm"
import LiveLeaderboard from "./LiveLeaderboard"
import CertificateGeneration from "./CertificateGeneration"

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Tabs defaultValue="create-event">
        <TabsList>
          <TabsTrigger value="create-event">Create Event</TabsTrigger>
          <TabsTrigger value="leaderboard">Live Leaderboard</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        <TabsContent value="create-event">
          <Card>
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>Set up a new coding contest or hackathon</CardDescription>
            </CardHeader>
            <CardContent>
              <EventCreationForm />
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
        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Generation</CardTitle>
              <CardDescription>Generate and distribute certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificateGeneration />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard

