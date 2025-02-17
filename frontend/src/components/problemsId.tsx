import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Editor from '@monaco-editor/react'
import axios from "axios"

interface problem {
  name: string,
  difficulty: string,
  description: string,
  examples: [
    {
      input: string,
      output: string,
      explanation: string
    }
  ],
  constraints: string[]
}

// const problemData = {
//   id: "1",
//   title: "Two Sum",
//   difficulty: "Easy",
//   description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.`,
//   examples: [
//     {
//       input: "nums = [2,7,11,15], target = 9",
//       output: "[0,1]",
//       explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
//     },
//   ],
//   constraints: ["2 <= nums.length <= 104", "-109 <= nums[i] <= 109", "-109 <= target <= 109"],
// }

export function ProblemPage() {
  const [code, setCode] = useState("")

  const [problemStatement, setProblemStatement] = useState<problem | null>(null)

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/contests/getProblem/${id}`, {
          withCredentials: true
        });

        const problem = response.data.problem;
        console.log("Problem data:", problem)
        if (problem && typeof problem === "object") {
          setProblemStatement({
            name: problem.name,
            difficulty: problem.difficulty,
            description: problem.description,
            examples: problem.examples || [],
            constraints: problem.constraints || [],
          });
          setCode(problem.template.join("\n"));
        } else {
          console.error("Invalid problem data format:", response.data.problem);
        }
      } catch (error) {
        console.error("Failed to fetch problem statement:", error)
      }
    }

    fetchProblem()
  }, [])

  const handleSubmit = async () => {
    // Add your submission logic here
    console.log("Submitting code:", code)
  }

  return (
    <div className="container py-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{problemStatement?.name}</h1>
            <span
              className={
                problemStatement?.difficulty === "Easy"
                  ? "text-green-500"
                  : problemStatement?.difficulty === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
              }
            >
              {problemStatement?.difficulty}
            </span>
          </div>
          <div className="prose dark:prose-invert">
            <p>{problemStatement?.description}</p>
            <h3>Examples:</h3>
            {problemStatement?.examples?.map((example, index) => (
              <div key={index} className="space-y-2">
                <p>
                  <strong>Input:</strong> {example.input}
                </p>
                <p>
                  <strong>Output:</strong> {example.output}
                </p>
                {example.explanation && (
                  <p>
                    <strong>Explanation:</strong> {example.explanation}
                  </p>
                )}
              </div>
            ))}
            <h3>Constraints:</h3>
            <ul>
              {problemStatement?.constraints?.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-[600px] border rounded-lg overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="cpp"
              theme="vs-dark"
              value={code}
              onChange={(value: any) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Submit Solution</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

