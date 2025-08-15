"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

interface PricingConfirmationStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (field: string, value: string) => void
  pricingTiers: any
  selectedPlan: string
}

export function PricingConfirmationStep({
  formData,
  errors,
  updateFormData,
  pricingTiers,
  selectedPlan,
}: PricingConfirmationStepProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Choose Your Plan</h2>
        <p className="text-slate-600 dark:text-slate-400">Select the perfect plan for your center's needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(pricingTiers).map(([key, tier]: [string, any]) => {
          const isSelected = formData.selectedTier === key
          const isRecommended = key === "growth"
          const wasPreSelected = selectedPlan === key

          return (
            <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`
                relative cursor-pointer transition-all duration-300 h-full
                ${
                  isSelected
                    ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/25 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50"
                    : "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50"
                }
                ${wasPreSelected && !formData.selectedTier ? "ring-2 ring-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50" : ""}
              `}
                onClick={() => updateFormData("selectedTier", key)}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {wasPreSelected && !formData.selectedTier && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1">
                      Pre-selected
                    </Badge>
                  </div>
                )}

                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{tier.price}</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full ${isSelected ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""}`}
                    onClick={() => updateFormData("selectedTier", key)}
                  >
                    {isSelected ? "Selected" : "Select Plan"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {errors.selectedTier && <p className="text-red-500 text-sm text-center">{errors.selectedTier}</p>}

      {/* Summary */}
      {formData.selectedTier && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Application Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600 dark:text-slate-400">Center Name:</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">{formData.centerName}</p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400">Administrator:</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400">Selected Plan:</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {pricingTiers[formData.selectedTier]?.name} - {pricingTiers[formData.selectedTier]?.price}
              </p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400">Location:</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {formData.city}, {formData.state}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
