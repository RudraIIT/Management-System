import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  duration: z.string({
    required_error: "Please select a duration.",
  })
})

export function CreateContestPage() {
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: "2"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const startDate = new Date(values.startDate);
      startDate.setUTCHours(20, 0, 0, 0); 

      const endDate = new Date(startDate.getTime() + Number(values.duration) * 60 * 60 * 1000); 

      const formatDateTime = (date: Date) => date.toISOString().slice(0, 19).replace("T", " "); 
      const data = {
        name: values.name,
        description: values.description,
        startTime: formatDateTime(startDate),
        endTime: formatDateTime(endDate)
      };

      const response = await axios.post("http://localhost:3000/api/contests/createContest", data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        setIsLoading(false);
        router("/contests");
      }
    } catch (error) {
      console.log("Error in creating contest", error);
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Contest</h1>
        <p className="text-muted-foreground">Set up your contest details and add problems.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contest Title</FormLabel>
                <FormControl>
                  <Input placeholder="Weekly Contest #123" {...field} />
                </FormControl>
                <FormDescription>Give your contest a descriptive title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Contest description and rules..." {...field} />
                </FormControl>
                <FormDescription>Describe the contest format and any special rules.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>The contest will start at 00:00 UTC on the selected date.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose how long the contest will run.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Contest"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

