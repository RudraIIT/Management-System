import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const EventList: React.FC = () => {
  // Mock data for events
  const events = [
    { id: 1, name: "Hackathon 2023", description: "Annual coding competition", date: "2023-08-15" },
    { id: 2, name: "Code Challenge", description: "Weekly coding challenge", date: "2023-07-01" },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
            <CardDescription>{event.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
          </CardContent>
          <CardFooter>
            <Button>Register</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default EventList

