import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificatePreview } from "@/components/certificate-preview"
import { Download, Eye, Loader2 } from "lucide-react"

interface ContestResult {
    contestName: string
    participantName: string
    rank: number
    totalParticipants: number
    points: number
    problemsSolved: number
    totalTime: string
    date: string
}

// const contestResult: ContestResult = {
//   contestName: "Global Coding Championship 2024",
//   participantName: "John Doe",
//   rank: 42,
//   totalParticipants: 1500,
//   points: 800,
//   problemsSolved: 4,
//   totalTime: "2:45:30",
//   date: "February 20, 2024",
// }

export function CertificatePage() {
    const location = useLocation()
    const contestResult = location.state?.contestResult as ContestResult
    const [isGenerating, setIsGenerating] = useState(false)
    const [showPreview, setShowPreview] = useState(false)

    if(!contestResult) {
        return <p className="text-red-500">Error: Contest result not found</p>
    }

    const handleDownload = async () => {
        setIsGenerating(true)
        // Add your PDF generation and download logic here
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsGenerating(false)
    }

    return (
        <div className="container max-w-4xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Certificate of Achievement</CardTitle>
                    <CardDescription>Download your certificate for completing the contest</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Contest Name</h3>
                            <p className="mt-1 text-lg font-semibold">{contestResult.contestName}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Participant</h3>
                            <p className="mt-1 text-lg font-semibold">{contestResult.participantName}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Rank</h3>
                            <p className="mt-1 text-lg font-semibold">
                                #{contestResult.rank} of {contestResult.totalParticipants}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Points Earned</h3>
                            <p className="mt-1 text-lg font-semibold">{contestResult.points} points</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Problems Solved</h3>
                            <p className="mt-1 text-lg font-semibold">{contestResult.problemsSolved} problems</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Total Time</h3>
                            <p className="mt-1 text-lg font-semibold">{contestResult.totalTime}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                        <Button variant="outline" onClick={() => setShowPreview(true)} disabled={isGenerating}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview Certificate
                        </Button>
                        <Button onClick={handleDownload} disabled={isGenerating}>
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Certificate
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <CertificatePreview open={showPreview} onOpenChange={setShowPreview} contestResult={contestResult} />
        </div>
    )
}