import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import * as state from "@/store"

export default function SchedulePage({ scheduleName }) {
  const schedules = useRecoilValue(state.schedules)
  const schedule = schedules.find(({ name }) => name === scheduleName)

  useEffect(() => {
    document.location = schedule.url
  }, [schedule.url])

  return <Navigate to="/" />
}
