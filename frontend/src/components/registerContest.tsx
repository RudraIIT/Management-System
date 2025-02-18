import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Clock, Trophy, Users } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useParams } from "react-router-dom"

interface ContestDetails {
  id: string
  title: string
  startDate: string
  duration: string
  difficulty: string
  participants: number
  rules: string[]
}

const contestDetails: ContestDetails = {
  id: "1",
  title: "Global Coding Championship 2024",
  startDate: "2024-03-15 14:00 UTC",
  duration: "4 hours",
  difficulty: "Medium-Hard",
  participants: 1234,
  rules: [
    "You must solve the problems independently.",
    "You can use any programming language supported by our platform.",
    "Each participant can submit only one solution per problem.",
    "The use of external libraries or pre-written code is not allowed.",
    "Your code will be checked for plagiarism.",
  ],
}

export function ContestRegistrationPage() {
  const router = useNavigate()
  const [acceptedRules, setAcceptedRules] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const params = useParams()

  const handleRegister = async () => {
    if (!acceptedRules) return
    setIsRegistering(true)

    // Add your registration logic here
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsRegistering(false)
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    // router(`/contests/${params.id}`)
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Register for {contestDetails.title}</CardTitle>
          <CardDescription>Review the contest details and rules before registering</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contest Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{contestDetails.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{contestDetails.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{contestDetails.participants} participants</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span>{contestDetails.difficulty} difficulty</span>
              </div>
            </div>
          </div>

          {/* Contest Rules */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contest Rules</h3>
            <ul className="list-disc pl-6 space-y-2">
              {contestDetails.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              id="terms"
              checked={acceptedRules}
              onCheckedChange={(checked) => setAcceptedRules(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept Contest Rules
              </Label>
              <p className="text-sm text-muted-foreground">
                I have read and agree to follow all contest rules and guidelines.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router(-1)}>
            Cancel
          </Button>
          <Button onClick={handleRegister} disabled={!acceptedRules || isRegistering}>
            {isRegistering ? "Registering..." : "Register for Contest"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Successful!</DialogTitle>
            <DialogDescription>
              You have successfully registered for {contestDetails.title}. The contest will begin on{" "}
              {contestDetails.startDate}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleConfirm}>View Contest Details</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

