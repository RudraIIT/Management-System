import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"admin" | "user">("user")
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle authentication
    // For this example, we'll just navigate based on the active tab
    if (activeTab === "admin") {
      navigate("/admin")
    } else {
      navigate("/user")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to access the coding contest management system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "admin" | "user")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <form onSubmit={handleLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="user-email">Email</Label>
                    <Input id="user-email" placeholder="Enter your email" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="user-password">Password</Label>
                    <Input id="user-password" type="password" placeholder="Enter your password" />
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">
                  Login as User
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="admin">
              <form onSubmit={handleLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" placeholder="Enter admin email" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input id="admin-password" type="password" placeholder="Enter admin password" />
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">
                  Login as Admin
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">Don't have an account? Contact the administrator.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login

