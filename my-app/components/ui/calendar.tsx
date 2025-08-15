"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type SimpleCalendarProps = {
  className?: string
  value?: Date
  onChange?: (date: Date) => void
}

function Calendar({ className, value, onChange }: SimpleCalendarProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    value ? toInputDateString(value) : ""
  )

  React.useEffect(() => {
    if (value) setInternalValue(toInputDateString(value))
  }, [value])

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button variant="ghost" size="icon" type="button" aria-label="Previous month">
        <ChevronLeftIcon className="size-4" />
      </Button>
      <div className="relative inline-flex items-center gap-2">
        <input
          className={cn(
            "rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          )}
          type="date"
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value)
            const next = fromInputDateString(e.target.value)
            if (next && onChange) onChange(next)
          }}
        />
        <ChevronDownIcon className="size-4 text-muted-foreground pointer-events-none" />
      </div>
      <Button variant="ghost" size="icon" type="button" aria-label="Next month">
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  )
}

function CalendarDayButton(props: React.ComponentProps<typeof Button>) {
  return <Button variant="ghost" size="icon" {...props} />
}

function toInputDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function fromInputDateString(value: string): Date | null {
  if (!value) return null
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return null
  const dt = new Date(y, m - 1, d)
  return isNaN(dt.getTime()) ? null : dt
}

export { Calendar, CalendarDayButton }
