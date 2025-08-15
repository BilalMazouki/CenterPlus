"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingLabelSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  error?: string
  required?: boolean
  className?: string
}

export function FloatingLabelSelect({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  className,
}: FloatingLabelSelectProps) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0
  const shouldFloat = isFocused || hasValue

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-2 rounded-lg transition-all duration-200 focus:outline-none appearance-none cursor-pointer",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400",
            isFocused && !error && "shadow-lg shadow-blue-500/25",
          )}
        >
          <option value="" disabled hidden></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <motion.label
          animate={{
            top: shouldFloat ? "0.5rem" : "50%",
            fontSize: shouldFloat ? "0.75rem" : "1rem",
            transform: shouldFloat ? "translateY(0)" : "translateY(-50%)",
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "absolute left-4 pointer-events-none transition-colors duration-200",
            shouldFloat
              ? error
                ? "text-red-500"
                : isFocused
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400"
              : "text-slate-500 dark:text-slate-400",
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1">
          {error}
        </motion.p>
      )}
    </div>
  )
}
