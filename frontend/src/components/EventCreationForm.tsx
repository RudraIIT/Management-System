import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"

const EventCreationForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="event-name">Event Name</Label>
        <Input id="event-name" placeholder="Enter event name" />
      </div>
      <div>
        <Label htmlFor="event-description">Event Description</Label>
        <Textarea id="event-description" placeholder="Enter event description" />
      </div>
      <div>
        <Label htmlFor="start-date">Start Date</Label>
        <DatePicker />
      </div>
      <div>
        <Label htmlFor="end-date">End Date</Label>
        <DatePicker />
      </div>
      <div>
        <Label htmlFor="max-participants">Max Participants</Label>
        <Input id="max-participants" type="number" placeholder="Enter max participants" />
      </div>
      <Button type="submit">Create Event</Button>
    </form>
  )
}

export default EventCreationForm

