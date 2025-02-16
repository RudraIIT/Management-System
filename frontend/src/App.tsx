import type React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import AdminDashboard from "./components/AdminDashboard"
import UserDashboard from "./components/UserDashboard"

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

