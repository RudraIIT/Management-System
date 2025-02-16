"use client"

import type React from "react"

import { useState } from "react"

export const DatePicker: React.FC = () => {
  const [date, setDate] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  return <input type="date" value={date} onChange={handleChange} />
}

