"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"
import { Check, ArrowLeft, ArrowRight, Building2, User, Palette, CreditCard } from "lucide-react"
import { CenterDetailsStep } from "@/components/apply/center-details-step"
import { AdminDetailsStep } from "@/components/apply/admin-details-step"
import { PaletteSelectionStep } from "@/components/apply/palette-selection-step"
import { PricingStep } from "@/components/apply/pricing-step"
import { ConfirmationScreen } from "@/components/apply/confirmation-screen"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Center Details", icon: Building2 },
  { id: 2, title: "Admin Details", icon: User },
  { id: 3, title: "Theme & Palette", icon: Palette },
  { id: 4, title: "Pricing Plan", icon: CreditCard },
]

export default function ApplyForCenter() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get("plan")

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    // Center Details
    centerName: "",
    address: "",
    city: "",
    phone: "",

    // Admin Details
    firstName: "",
    lastName: "",
    email: "",
    adminPhone: "",
    password: "",

    // Palette Selection
    selectedPalette: "",

    // Pricing
    selectedPlan: planParam || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.centerName) newErrors.centerName = "Center name is required"
      if (!formData.address) newErrors.address = "Address is required"
      if (!formData.city) newErrors.city = "City is required"
      if (!formData.phone) newErrors.phone = "Phone number is required"
    }

    if (step === 2) {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.email) newErrors.email = "Email is required"
      if (!formData.adminPhone) newErrors.adminPhone = "Phone number is required"
      if (!formData.password) newErrors.password = "Password is required"
      if (formData.password && formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long"
      }
    }

    if (step === 3) {
      if (!formData.selectedPalette) newErrors.selectedPalette = "Please select a theme palette"
    }

    if (step === 4) {
      if (!formData.selectedPlan) newErrors.selectedPlan = "Please select a pricing plan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3) {
        // Let the palette component handle the confirmation
        return
      }
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(4)) {
      setIsSubmitted(true)
    }
  }

  const updateFormData = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const progress = (currentStep / 4) * 100

  if (isSubmitted) {
    return <ConfirmationScreen formData={formData} />
  }

  return (
    <section className="relative w-full overflow-hidden bg-black/[0.96] antialiased min-h-screen">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden z-20">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="none">
          <path
            d="M0,0 L0,60 C300,120 600,40 900,100 C1050,120 1150,60 1200,80 L1200,0 Z"
            fill="oklch(0.12 0 0)"
            className="drop-shadow-lg"
          />
        </svg>
      </div>

      {/* Grid background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none z-10",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      {/* Spotlight effects */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <Spotlight className="-top-40 right-0 md:-top-20 md:right-60" fill="rgb(147, 51, 234)" />

      <div className="relative z-30 mx-auto w-full max-w-6xl px-4 py-20 md:py-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-4xl md:text-6xl font-bold text-transparent mb-6">
            Apply for Center
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
            Join our network of premium centers and customize your perfect experience
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                      isCompleted
                        ? "bg-gradient-to-br from-green-500 to-emerald-500 border-green-400 text-white shadow-lg shadow-green-500/25"
                        : isActive
                          ? "bg-gradient-to-br from-purple-500 to-blue-500 border-purple-400 text-white shadow-lg shadow-purple-500/25"
                          : "bg-white/5 border-white/10 text-gray-400 backdrop-blur-sm",
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isActive ? "text-purple-300" : isCompleted ? "text-green-300" : "text-gray-400",
                      )}
                    >
                      Step {step.id}
                    </p>
                    <p
                      className={cn(
                        "text-xs transition-colors",
                        isActive ? "text-white" : isCompleted ? "text-gray-200" : "text-gray-500",
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-white/5 mx-4 hidden sm:block" />
                  )}
                </div>
              )
            })}
          </div>
          <div className="relative">
            <div className="h-2 bg-white/5 rounded-full backdrop-blur-sm" />
            <motion.div
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/25"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Form Card */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          <div className="relative p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <CenterDetailsStep formData={formData} errors={errors} updateFormData={updateFormData} />
                )}
                {currentStep === 2 && (
                  <AdminDetailsStep formData={formData} errors={errors} updateFormData={updateFormData} />
                )}
                {currentStep === 3 && (
                  <PaletteSelectionStep
                    formData={formData}
                    errors={errors}
                    updateFormData={updateFormData}
                    handleNextStep={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
                  />
                )}
                {currentStep === 4 && (
                  <PricingStep formData={formData} errors={errors} updateFormData={updateFormData} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={cn(
                  "flex items-center gap-2 bg-white/5 border-white/10 text-gray-300 backdrop-blur-sm",
                  "hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={() => {
                    if (currentStep === 3) {
                      // Trigger confirmation modal in palette component
                      const paletteComponent = document.querySelector("[data-palette-component]")
                      if (paletteComponent) {
                        const event = new CustomEvent("showConfirmation")
                        paletteComponent.dispatchEvent(event)
                      }
                    } else {
                      nextStep()
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium",
                    "hover:from-purple-700 hover:to-blue-700 hover:scale-[1.02] transition-all duration-300",
                    "shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30",
                  )}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className={cn(
                    "flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium",
                    "hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02] transition-all duration-300",
                    "shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30",
                  )}
                >
                  Submit Application
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden z-20 w-full">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="none">
          <path
            d="M0,160 L0,100 C300,40 600,120 900,60 C1050,40 1150,100 1200,80 L1200,160 Z"
            fill="oklch(0.12 0 0)"
            className="drop-shadow-lg"
          />
        </svg>
      </div>
    </section>
  )
}
