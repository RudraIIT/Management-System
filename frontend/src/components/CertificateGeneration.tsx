import type React from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const CertificateGeneration: React.FC = () => {
  // Mock data for participants
  const participants = [
    { id: 1, name: "John Doe", event: "Hackathon 2023", position: "1st" },
    { id: 2, name: "Jane Smith", event: "Hackathon 2023", position: "2nd" },
    { id: 3, name: "Bob Johnson", event: "Hackathon 2023", position: "3rd" },
  ]

  const generateCertificate = (participantId: number) => {
    // Handle certificate generation
    console.log(`Generating certificate for participant ${participantId}`)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>{participant.name}</TableCell>
              <TableCell>{participant.event}</TableCell>
              <TableCell>{participant.position}</TableCell>
              <TableCell>
                <Button onClick={() => generateCertificate(participant.id)}>Generate Certificate</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CertificateGeneration

