"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SignInForm() {
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your authentication logic here
    setTimeout(() => {
      setIsLoading(false)
      router("/problems")
    }, 1000)
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your email and password to sign in to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Don&apos;t have an account?{" "}
                  
                <Link to="#" className="text-primary hover:underline" onClick={() => document.querySelector('[value="signup"]')?.dispatchEvent(new Event("click"))}>
                    Sign Up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Enter your details to create a new account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    to="#"
                    className="text-primary hover:underline"
                    onClick={() => document.querySelector('[value="signin"]')?.dispatchEvent(new Event("click"))}
                  >
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

