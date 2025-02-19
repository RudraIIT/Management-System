import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";


export function AddProblemPage() {
    const router = useNavigate();
    const params = useParams();
    const { toast } = useToast();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [points, setPoints] = useState(100);
    const [constraints, setConstraints] = useState("");
    const [template, setTemplate] = useState("");
    const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
    const [examples, setExamples] = useState([{ input: "", output: "", explanation: "" }]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addExample = () => {
        setExamples([...examples, { input: "", output: "", explanation: "" }]);
    };

    const removeExample = (index: number) => {
        if (examples.length > 1) {
            setExamples(examples.filter((_, i) => i !== index));
        }
    };

    const updateExample = (index: number, field: "input" | "output" | "explanation", value: string) => {
        const newExamples = [...examples];
        newExamples[index][field] = value;
        setExamples(newExamples);
    };

    const addTestCase = () => {
        setTestCases([...testCases, { input: "", output: "" }]);
    };

    const removeTestCase = (index: number) => {
        if (testCases.length > 1) {
            setTestCases(testCases.filter((_, i) => i !== index));
        }
    };

    const updateTestCase = (index: number, field: "input" | "output", value: string) => {
        const newTestCases = [...testCases];
        newTestCases[index][field] = value;
        setTestCases(newTestCases);
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Submitting form...", { title, description, difficulty, points, constraints, template, testCases, examples });
        try {
            const response = await axios.put(
                `http://localhost:3000/api/contests/addProblem/${params.id}`,
                {
                    name: title,
                    description,
                    difficulty,
                    points,
                    constraints,
                    template,
                    testcases: testCases,
                    examples
                },
                {
                    withCredentials: true
                }
            );

            if (response.status === 201) {
                console.log(response.data);
                toast({
                    title: "Problem added successfully",
                    description: "The problem has been added successfully to the contest.",
                    className: "bg-blue-500 text-white",
                })
            }

        } catch (error) {
            console.log("Error in adding problem:", error);
        }
        setIsSubmitting(false);
        // router(`/contests/${params.id}`);
    };

    return (
        <div className="container max-w-4xl py-10">
            <h1 className="text-3xl font-bold">Add Problem</h1>
            <form onSubmit={onSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Problem Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Input placeholder="Problem Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Textarea placeholder="Problem Description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[200px]" />

                        <div>
                            <h4 className="text-sm font-medium">Points</h4>
                            <Input placeholder="Points" type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
                        </div>

                        <div>
                            <h4 className="text-sm font-medium">Difficulty</h4>
                            <Input placeholder="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                        </div>

                        <div>
                            <h4 className="text-sm font-medium">Constraints</h4>
                            <Textarea placeholder="Constraints (e.g., 1 ≤ N ≤ 1000)" value={constraints} onChange={(e) => setConstraints(e.target.value)} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Examples</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {examples.map((example, index) => (
                            <div key={index} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">Example {index + 1}</h4>
                                    {examples.length > 1 && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeExample(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Textarea placeholder="Input" value={example.input} onChange={(e) => updateExample(index, "input", e.target.value)} />
                                    <Textarea placeholder="Output" value={example.output} onChange={(e) => updateExample(index, "output", e.target.value)} />
                                    <Textarea placeholder="Explanation (optional)" value={example.explanation} onChange={(e) => updateExample(index, "explanation", e.target.value)} />
                                </div>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addExample} className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add Example
                        </Button>
                    </CardContent>

                    <CardHeader>
                        <CardTitle>Test Cases</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {testCases.map((testCase, index) => (
                            <div key={index} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">Test Case {index + 1}</h4>
                                    {testCases.length > 1 && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeTestCase(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Textarea placeholder="Input" value={testCase.input} onChange={(e) => updateTestCase(index, "input", e.target.value)} />
                                    <Textarea placeholder="Output" value={testCase.output} onChange={(e) => updateTestCase(index, "output", e.target.value)} />
                                </div>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addTestCase} className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add Test Case
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="Write a code template (e.g., function definition for Python, main function for C++)"
                            value={template}
                            onChange={(e) => setTemplate(e.target.value)}
                            className="min-h-[150px]"
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => router(-1)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Adding Problem..." : "Add Problem"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
