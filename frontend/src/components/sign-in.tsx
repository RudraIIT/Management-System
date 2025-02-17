import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import Cookies from "js-cookie"
import { useAuth } from "@/providers/AuthContextProvider"

export function SignInForm() {
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { setUser } = useAuth()

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = { email, password }
      const response = await axios.post("http://localhost:3000/api/users/login", data, {
        withCredentials: true
      });

      if (response.status === 200) {
        setIsLoading(false)
        Cookies.set("token", response.data.token, { expires: 7 })
        Cookies.set("user", response.data.user._id, { expires: 7 })
        setUser(response.data.user._id)
        router("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = { username, email, password }
      if(password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      const response = await axios.post("http://localhost:3000/api/users/register", data, {
        withCredentials: true
      });

      if(response.status === 201) {
        setIsLoading(false)
        Cookies.set("token", response.data.token, { expires: 7 })
        Cookies.set("user", response.data.user, { expires: 7 })
        setUser(response.data.user)
        router("/")
      }
    } catch (error) {
      console.log(error)
    }
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
            <form onSubmit={handleSignIn}>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your email and password to sign in to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
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
            <form onSubmit={handleSignUp}>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Enter your details to create a new account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" required value={username} onChange={(e) => {
                    e.preventDefault()
                    setUsername(e.target.value)
                  }}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => {
                    e.preventDefault()
                    setEmail(e.target.value)
                  }}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required value={password} onChange={(e) => {
                    e.preventDefault()
                    setPassword(e.target.value)
                  }}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => {
                    e.preventDefault()
                    setConfirmPassword(e.target.value)
                  }}/>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    to="/sign-in"
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

