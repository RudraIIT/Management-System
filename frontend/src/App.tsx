import type React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { SignInForm } from "./components/sign-in"
import AdminDashboard from "./components/AdminDashboard"
import UserDashboard from "./components/UserDashboard"
import { AuthProvider, useAuth } from "./providers/AuthContextProvider"
import Layout from "@/Layout"

function AppRoutes() {
  const { user } = useAuth()

  return (
      <Routes>
        <Route path="/sign-in" element={!user ? <SignInForm /> : <Navigate to="/" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
  )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

