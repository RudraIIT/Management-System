import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PDFViewer } from "@/components/pdf-viewer"
import { Certificate } from "@/components/certificate1"

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

interface CertificatePreviewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contestResult: ContestResult
}

export function CertificatePreview({ open, onOpenChange, contestResult }: CertificatePreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Certificate Preview</DialogTitle>
          <DialogDescription>Preview how your certificate will look</DialogDescription>
        </DialogHeader>
        <div className="aspect-[1.414] w-full">
          <PDFViewer>
            <Certificate contestResult={contestResult} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  )
}

