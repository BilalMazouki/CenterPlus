"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

// TODO: Add Supabase imports when ready
// import { createClient } from '@supabase/supabase-js'

interface PricingStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (field: string, value: string) => void
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small educational centers",
    price: "$29",
    period: "/month",
    icon: Star,
    popular: false,
    features: [
      "Up to 50 students",
      "Up to 5 teachers",
      "Basic student management",
      "Attendance tracking",
      "Basic reports",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Ideal for growing educational institutions",
    price: "$79",
    period: "/month",
    icon: Zap,
    popular: true,
    features: [
      "Up to 200 students",
      "Up to 20 teachers",
      "Advanced analytics & reports",
      "Course content management",
      "Parent notifications",
      "Payment tracking",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large educational institutions",
    price: "$199",
    period: "/month",
    icon: Crown,
    popular: false,
    features: [
      "Unlimited students & teachers",
      "Multi-branch management",
      "Advanced course builder",
      "Automated billing & subscriptions",
      "White-label solution",
      "24/7 phone support",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
]

export function PricingStep({ formData, errors, updateFormData }: PricingStepProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // TODO: Add Supabase integration for plan analytics
  // const trackPlanSelection = async (planId: string) => {
  //   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  //
  //   // Track plan selection analytics
  //   await supabase
  //     .from('plan_analytics')
  //     .insert({
  //       plan_id: planId,
  //       selected_at: new Date().toISOString(),
  //       center_type: formData.centerType,
  //       student_count: formData.currentStudents
  //     })
  // }

  const handlePlanSelection = (planId: string) => {
    updateFormData("selectedPlan", planId)
    // TODO: Uncomment when Supabase is integrated
    // trackPlanSelection(planId)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your CenterPlus Plan</h2>
        <p className="text-gray-300">Select the perfect plan for your educational center's needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon
          const isSelected = formData.selectedPlan === plan.id

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
              }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className={cn(
                  "relative cursor-pointer transition-all duration-500 border backdrop-blur-sm group",
                  "hover:scale-105 hover:-translate-y-2 hover:shadow-2xl",
                  isSelected
                    ? "border-purple-400/50 bg-purple-500/10 shadow-2xl shadow-purple-500/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20",
                  plan.popular && "ring-2 ring-purple-500/50",
                )}
                onClick={() => handlePlanSelection(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300",
                        "bg-gradient-to-br from-purple-500/20 to-blue-500/20",
                        isSelected && "scale-110 rotate-6",
                      )}
                    >
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>

                    {isSelected && (
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={cn(
                    "absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10 opacity-0 transition-opacity duration-300",
                    "group-hover:opacity-100",
                  )}
                />
              </Card>
            </motion.div>
          )
        })}
      </div>

      {errors.selectedPlan && <p className="text-red-400 text-sm text-center mt-4">{errors.selectedPlan}</p>}

      <div className="text-center mt-8 p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
        <p className="text-gray-300 mb-2">
          <strong className="text-white">30-day free trial</strong> on all plans
        </p>
        <p className="text-sm text-gray-400">
          No credit card required. Perfect time to set up your teachers and students. Cancel anytime during the trial
          period.
        </p>
      </div>
    </motion.div>
  )
}
