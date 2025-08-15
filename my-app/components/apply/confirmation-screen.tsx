"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spotlight } from "@/components/ui/spotlight"
import { CheckCircle, Download, Mail, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// TODO: Add Supabase imports when ready
// import { createClient } from '@supabase/supabase-js'
// import { useEffect, useState } from 'react'

interface ConfirmationScreenProps {
  formData: any
}

const palettes = {
  dark: { name: "Dark Mode" },
  light: { name: "Light Mode" },
  blue: { name: "Ocean Blue" },
  red: { name: "Warm Red" },
}

const plans = {
  starter: { name: "Starter", price: "$29/month" },
  growth: { name: "Growth", price: "$79/month" },
  enterprise: { name: "Enterprise", price: "$199/month" },
}

export function ConfirmationScreen({ formData }: ConfirmationScreenProps) {
  const getPaletteDisplay = () => {
    if (typeof formData.selectedPalette === "string") {
      // Predefined palette
      const selectedPalette = palettes[formData.selectedPalette as keyof typeof palettes]
      return selectedPalette?.name || formData.selectedPalette
    } else {
      // Custom palette - it's a JSON object
      return "Custom Colors"
    }
  }

  const selectedPlan = plans[formData.selectedPlan as keyof typeof plans]

  // TODO: Add Supabase integration for application submission
  // useEffect(() => {
  //   const submitApplication = async () => {
  //     const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  //
  //     // Insert application data into 'applications' table
  //     const { data, error } = await supabase
  //       .from('applications')
  //       .insert({
  //         center_name: formData.centerName,
  //         center_type: formData.centerType,
  //         admin_email: formData.email,
  //         selected_plan: formData.selectedPlan,
  //         selected_palette: formData.selectedPalette,
  //         status: 'pending',
  //         submitted_at: new Date().toISOString(),
  //         // ... all other form fields
  //       })
  //
  //     if (error) {
  //       console.error('Error submitting application:', error)
  //     } else {
  //       // Send confirmation email via Supabase Edge Function
  //       await supabase.functions.invoke('send-confirmation-email', {
  //         body: { email: formData.email, applicationId: data.id }
  //       })
  //     }
  //   }
  //
  //   submitApplication()
  // }, [formData])

  return (
    <section className="relative w-full overflow-hidden bg-black/[0.96] antialiased min-h-screen">
      {/* Grid background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none z-10",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      {/* Spotlight effects */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <Spotlight className="-top-40 right-0 md:-top-20 md:right-60" fill="rgb(34, 197, 94)" />

      <div className="relative z-30 mx-auto w-full max-w-4xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-4xl md:text-5xl font-bold text-transparent mb-4">
              Application Submitted!
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
              Thank you for applying to join our network. We've received your application and will review it within 2-3
              business days.
            </p>
          </motion.div>

          {/* Application Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl mb-8"
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

            <div className="relative p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Application Summary</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Center Information
                    </h3>
                    <div className="space-y-2 text-sm text-gray-300 pl-4">
                      <p>
                        <span className="font-medium text-white">Name:</span> {formData.centerName}
                      </p>
                      <p>
                        <span className="font-medium text-white">Address:</span> {formData.address}
                      </p>
                      <p>
                        <span className="font-medium text-white">City:</span> {formData.city}
                      </p>
                      <p>
                        <span className="font-medium text-white">Phone:</span> {formData.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Administrator
                    </h3>
                    <div className="space-y-2 text-sm text-gray-300 pl-4">
                      <p>
                        <span className="font-medium text-white">Name:</span> {formData.firstName} {formData.lastName}
                      </p>
                      <p>
                        <span className="font-medium text-white">Email:</span> {formData.email}
                      </p>
                      <p>
                        <span className="font-medium text-white">Phone:</span> {formData.adminPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Selected Options
                    </h3>
                    <div className="space-y-3 pl-4">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                          Theme: {getPaletteDisplay()}
                        </Badge>
                        {typeof formData.selectedPalette === "object" && (
                          <div className="flex items-center gap-2 ml-2">
                            <div
                              className="w-4 h-4 rounded-full border border-white/20"
                              style={{ backgroundColor: formData.selectedPalette.primary }}
                            />
                            <div
                              className="w-4 h-4 rounded-full border border-white/20"
                              style={{ backgroundColor: formData.selectedPalette.secondary }}
                            />
                            <div
                              className="w-4 h-4 rounded-full border border-white/20"
                              style={{ backgroundColor: formData.selectedPalette.accent }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                          Plan: {selectedPlan?.name} - {selectedPlan?.price}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      What's Next?
                    </h3>
                    <div className="space-y-3 pl-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">Confirmation email sent</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Review within 2-3 business days</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <ArrowRight className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Setup & onboarding upon approval</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className={cn(
                "flex items-center gap-2 bg-white/5 border-white/10 text-gray-300 backdrop-blur-sm",
                "hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300",
              )}
            >
              Return to Home
            </Button>
            <Button
              onClick={() => window.print()}
              className={cn(
                "flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium",
                "hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02] transition-all duration-300",
                "shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30",
              )}
            >
              <Download className="w-4 h-4" />
              Download Summary
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
