"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/supabase/supabase-js"

interface AdminDetailsStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (field: string, value: string) => void
}

export function AdminDetailsStep({ formData, errors, updateFormData }: AdminDetailsStepProps) {
  const [showPassword, setShowPassword] = useState(false)

  // TODO: Add Supabase integration for email validation and signup
  const validateEmail = async (email: string) => {
   
  
    // Check if email already exists in applications
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('applications')
      .select('email')
      .eq('email', email)
      .single()
  
    return !data // Returns true if email is available
  }

  // TODO: Add Supabase signup with password
  const signUpWithPassword = async (email: string, password: string) => {
  
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`
      }
    })
  
    if (error) {
      console.error('Error signing up:', error)
      return { success: false, error }
    }
  
    return { success: true, user: data.user }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Administrator Details</h2>
        <p className="text-gray-300">Information about the primary contact and administrator</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingLabelInput
          label="First Name"
          value={formData.firstName || ""}
          onChange={(e) => updateFormData("firstName", e.target.value)}
          error={errors.firstName}
          required
        />

        <FloatingLabelInput
          label="Last Name"
          value={formData.lastName || ""}
          onChange={(e) => updateFormData("lastName", e.target.value)}
          error={errors.lastName}
          required
        />
      </div>

      <FloatingLabelInput
        label="Email Address"
        type="email"
        value={formData.email || ""}
        onChange={(e) => updateFormData("email", e.target.value)}
        error={errors.email}
        required
      />

      <FloatingLabelInput
        label="Phone Number"
        type="tel"
        value={formData.adminPhone || ""}
        onChange={(e) => updateFormData("adminPhone", e.target.value)}
        error={errors.adminPhone}
        required
      />

      <div className="relative">
        <FloatingLabelInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password || ""}
          onChange={(e) => updateFormData("password", e.target.value)}
          error={errors.password}
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-auto p-1 text-gray-400 hover:text-white"
          onClick={() => setShowPassword(!showPassword)}
        >
        </Button>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Password must be at least 8 characters long and include uppercase, lowercase, and numbers.
      </p>
    </motion.div>
  )
}
