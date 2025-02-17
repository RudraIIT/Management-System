import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Editor from '@monaco-editor/react'

const problemData = {
  id: "1",
  title: "Two Sum",
  difficulty: "Easy",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
  ],
  constraints: ["2 <= nums.length <= 104", "-109 <= nums[i] <= 109", "-109 <= target <= 109"],
}

export function ProblemPage() {
  const [code, setCode] = useState(`function twoSum(nums: number[], target: number): number[] {
    // Write your code here
}`)

  const { id } = useParams<{ id: string }>();

  const handleSubmit = async () => {
    // Add your submission logic here
    console.log("Submitting code:", code)
  }

  return (
    <div className="container py-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{problemData.title}</h1>
            <span
              className={
                problemData.difficulty === "Easy"
                  ? "text-green-500"
                  : problemData.difficulty === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
              }
            >
              {problemData.difficulty}
            </span>
          </div>
          <div className="prose dark:prose-invert">
            <p>{problemData.description}</p>
            <h3>Examples:</h3>
            {problemData.examples.map((example, index) => (
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
              {problemData.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-[600px] border rounded-lg overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="typescript"
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

