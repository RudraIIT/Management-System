import type React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { SignInForm } from "./components/sign-in"
import UserDashboard from "./components/UserDashboard"
import { LeaderboardPage } from "./components/leaderboard"
import { AuthProvider, useAuth } from "./providers/AuthContextProvider"
import { SubmissionsPage } from "./components/submissions"
import { ProblemsPage } from "./components/problems"
import { ProblemPage } from "./components/problemsId"
import Layout from "@/Layout"
import { ContestsPage } from "./components/contests"
import { CreateContestPage } from "./components/createContest"
import { ContestRegistrationPage } from "./components/registerContest"
import { Toaster } from "./components/ui/toaster"

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/sign-in" element={!user ? <SignInForm /> : <Navigate to="/" />} />
      <Route path="/submissions" element={user ? <SubmissionsPage /> : <Navigate to="/sign-in" />} />
      <Route path="/problems" element={user ? <ProblemsPage /> : <Navigate to="/sign-in" />} />
      <Route path="problems/:id" element={user ? <ProblemPage /> : <Navigate to="/sign-in" />} />
      <Route path="/contests" element={user ? <ContestsPage /> : <Navigate to="/sign-in" />} />
      <Route path="/leaderboard" element={user ? <LeaderboardPage /> : <Navigate to="/sign-in" />} />
      <Route path="/create-contest" element={user ? <CreateContestPage /> : <Navigate to="/sign-in" />} />
      <Route path="/contests/register/:id" element={user ? <ContestRegistrationPage /> : <Navigate to="/sign-in" />} />
    </Routes>
  )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppRoutes />
          <Toaster />
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

