"use client"

import { motion } from "framer-motion"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"

// TODO: Add Supabase imports when ready
// import { createClient } from '@supabase/supabase-js'

interface CenterDetailsStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (field: string, value: string) => void
}

export function CenterDetailsStep({ formData, errors, updateFormData }: CenterDetailsStepProps) {
  // TODO: Add Supabase integration for real-time validation
  // const validateCenterName = async (name: string) => {
  //   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  //
  //   // Check if center name already exists
  //   const { data, error } = await supabase
  //     .from('applications')
  //     .select('center_name')
  //     .eq('center_name', name)
  //     .single()
  //
  //   return !data // Returns true if name is available
  // }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Educational Center Details</h2>
        <p className="text-slate-400">Tell us about your educational institution</p>
      </div>

      <FloatingLabelInput
        label="Educational Center Name"
        value={formData.centerName || ""}
        onChange={(e) => updateFormData("centerName", e.target.value)}
        error={errors.centerName}
        required
      />

      <FloatingLabelInput
        label="Street Address"
        value={formData.address || ""}
        onChange={(e) => updateFormData("address", e.target.value)}
        error={errors.address}
        required
      />

      <FloatingLabelInput
        label="City"
        value={formData.city || ""}
        onChange={(e) => updateFormData("city", e.target.value)}
        error={errors.city}
        required
      />

      <FloatingLabelInput
        label="Phone Number"
        type="tel"
        value={formData.phone || ""}
        onChange={(e) => updateFormData("phone", e.target.value)}
        error={errors.phone}
        required
      />
    </motion.div>
  )
}
