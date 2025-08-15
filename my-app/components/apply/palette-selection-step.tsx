"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Droplets, Flame, Palette, Check, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

// TODO: Add Supabase imports when ready
// import { createClient } from '@supabase/supabase-js'

interface PaletteSelectionStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (field: string, value: any) => void
  handleNextStep: () => void
}

const palettes = {
  dark: {
    name: "Dark Mode",
    description: "Professional dark theme",
    icon: Moon,
    preview: {
      bg: "from-slate-900 to-slate-800",
      card: "bg-slate-800/80 backdrop-blur-sm border border-blue-400/10",
      text: "text-slate-100",
      accent: "text-blue-400",
    },
  },
  light: {
    name: "Light Mode",
    description: "Modern light theme",
    icon: Sun,
    preview: {
      bg: "from-slate-50 via-blue-50 to-indigo-100",
      card: "bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-sm",
      text: "text-slate-700",
      accent: "text-blue-600",
    },
  },
  blue: {
    name: "Ocean Blue",
    description: "Academic blue theme",
    icon: Droplets,
    preview: {
      bg: "from-[#0A2540] via-[#0F3556] to-[#113A5D]",
      card: "bg-white/5 backdrop-blur-sm border border-cyan-400/10",
      text: "text-[#E6F7FF]",
      accent: "text-[#4DD0E1]",
    },
  },
  purple: {
    name: "Creative Purple",
    description: "Vibrant learning theme",
    icon: Flame,
    preview: {
      bg: "from-[#2A103D] via-[#341449] to-[#3B1B52]",
      card: "bg-white/5 backdrop-blur-sm border border-pink-400/10",
      text: "text-[#FDF4FF]",
      accent: "text-[#E040FB]",
    },
  },
}

const generateCustomPalette = (customColors: any) => {
  return {
    name: "Custom Theme",
    description: "Custom theme based on your selection",
    icon: Palette,
    preview: {
      bg: `from-${customColors.primary} to-${customColors.secondary}`,
      card: "bg-white/5 backdrop-blur-sm border border-blue-400/10",
      text: `text-${customColors.text}`,
      accent: `text-${customColors.accent}`,
    },
  }
}

export function PaletteSelectionStep({ formData, errors, updateFormData, handleNextStep }: PaletteSelectionStepProps) {
  const selectedPalette = palettes[formData.selectedPalette as keyof typeof palettes]
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showCustomPicker, setShowCustomPicker] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [pendingTheme, setPendingTheme] = useState<string>("")
  const [customColors, setCustomColors] = useState({
    primary: "#1a1a1a",
    secondary: "#2a2a2a",
    accent: "#6366f1",
    text: "#ffffff",
  })

  useEffect(() => {
    const handleShowConfirmation = () => {
      if (formData.selectedPalette) {
        if (typeof formData.selectedPalette === "object" && formData.selectedPalette !== null) {
          setPendingTheme("custom")
        } else {
          setPendingTheme(formData.selectedPalette)
        }
        setShowConfirmationModal(true)
      }
    }

    const element = document.querySelector("[data-palette-component]")
    if (element) {
      element.addEventListener("showConfirmation", handleShowConfirmation)
      return () => element.removeEventListener("showConfirmation", handleShowConfirmation)
    }
  }, [formData.selectedPalette])

  const handleCustomColorChange = (key: string, value: string) => {
    setCustomColors((prev) => ({
      ...prev,
      [key]: value,
    }))

    const updatedColors = { ...customColors, [key]: value }
    updateFormData("selectedPalette", updatedColors)

    // TODO: Save custom colors to Supabase user preferences
  }

  const handlePaletteSelection = (key: string) => {
    if (key === "custom") {
      updateFormData("selectedPalette", customColors)
    } else {
      updateFormData("selectedPalette", key)
    }

    const selectedData = key === "custom" ? customColors : key
    console.log("Selected palette:", selectedData)

    // TODO: Track palette selection in Supabase analytics
  }

  const confirmThemeSelection = () => {
    let selectedData

    if (pendingTheme === "custom") {
      selectedData = customColors
      updateFormData("selectedPalette", customColors)
    } else if (pendingTheme) {
      selectedData = pendingTheme
      updateFormData("selectedPalette", pendingTheme)
    }

    // Log the palette data after confirmation
    console.log("Confirmed palette selection:", selectedData)

    setShowConfirmationModal(false)
    setPendingTheme("")

    handleNextStep()
  }

  const cancelThemeSelection = () => {
    setShowConfirmationModal(false)
    setPendingTheme("")
  }

  const handleCustomThemeSelection = () => {
    setShowCustomPicker(!showCustomPicker)
  }

  const PreviewComponent = ({ palette, isLarge = false }: { palette: any; isLarge?: boolean }) => (
    <div
      className={cn(
        "rounded-xl border border-white/10 backdrop-blur-sm overflow-hidden",
        palette.name === "Custom Theme" ? `bg-gradient-to-br` : `bg-gradient-to-br ${palette.preview.bg}`,
        isLarge ? "p-6 md:p-8" : "p-4 md:p-6",
      )}
      style={
        palette.name === "Custom Theme"
          ? {
              background: `linear-gradient(to bottom right, ${customColors.primary}, ${customColors.secondary})`,
            }
          : {}
      }
    >
      {/* Header */}
      <div
        className={cn(
          "backdrop-blur-sm rounded-lg border border-white/10 mb-3 md:mb-4",
          palette.preview.card,
          "p-3 md:p-4",
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg w-6 h-6 md:w-8 md:h-8" />
            <h4
              className={cn(
                "font-bold text-sm md:text-base",
                isLarge && "md:text-lg",
                palette.name === "Custom Theme" ? "" : palette.preview.text,
              )}
              style={palette.name === "Custom Theme" ? { color: customColors.text } : {}}
            >
              {formData.centerName || "Your Center"}
            </h4>
          </div>
          <div className="hidden sm:flex gap-3 md:gap-4">
            <span
              className={cn("text-xs md:text-sm", palette.name === "Custom Theme" ? "" : palette.preview.text)}
              style={palette.name === "Custom Theme" ? { color: customColors.text } : {}}
            >
              Home
            </span>
            <span
              className={cn("text-xs md:text-sm", palette.name === "Custom Theme" ? "" : palette.preview.accent)}
              style={palette.name === "Custom Theme" ? { color: customColors.accent } : {}}
            >
              Services
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className={cn(
          "backdrop-blur-sm rounded-lg border border-white/10 mb-3 md:mb-4",
          palette.preview.card,
          "p-4 md:p-6",
        )}
      >
        <h5
          className={cn(
            "font-bold mb-2 md:mb-3 text-base md:text-lg",
            isLarge && "md:text-xl",
            palette.name === "Custom Theme" ? "" : palette.preview.text,
          )}
          style={palette.name === "Custom Theme" ? { color: customColors.text } : {}}
        >
          Welcome to {formData.centerName || "Your Center"}
        </h5>
        <p
          className={cn(
            "opacity-80 mb-3 md:mb-4 text-xs md:text-sm",
            palette.name === "Custom Theme" ? "" : palette.preview.text,
          )}
          style={palette.name === "Custom Theme" ? { color: customColors.text } : {}}
        >
          Experience premium educational services designed for learning excellence.
        </p>
        <div className="flex gap-2 md:gap-3">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg px-3 py-2 md:px-4 md:py-3"
            style={
              palette.name === "Custom Theme"
                ? {
                    background: `linear-gradient(to right, ${customColors.accent}, ${customColors.accent}dd)`,
                  }
                : {}
            }
          >
            <span className="text-white font-medium text-xs md:text-sm">Enroll Now</span>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {["Mathematics", "Science"].map((service, index) => (
          <div
            key={index}
            className={cn("backdrop-blur-sm rounded-lg border border-white/10", palette.preview.card, "p-2 md:p-3")}
          >
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg w-full h-8 md:h-12 mb-1 md:mb-2" />
            <h6
              className={cn(
                "font-medium text-xs md:text-sm mb-1",
                palette.name === "Custom Theme" ? "" : palette.preview.text,
              )}
              style={palette.name === "Custom Theme" ? { color: customColors.text } : {}}
            >
              {service}
            </h6>
            <p
              className={cn("opacity-70 text-xs", palette.name === "Custom Theme" ? "" : palette.preview.text)}
              style={palette.name === "Custom Theme" ? { color: customColors.text } : {}}
            >
              Expert instruction
            </p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 md:space-y-8"
      data-palette-component
    >
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Choose Your Theme</h2>
        <p className="text-gray-300 text-base md:text-lg">Select colors that match your center's personality</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Theme Selection */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg md:text-xl font-semibold text-white">Available Themes</h3>
            <Button
              onClick={() => setShowCustomPicker(!showCustomPicker)}
              variant={showCustomPicker ? "default" : "outline"}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Palette className="w-4 h-4" />
              Custom Colors
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
            {Object.entries(palettes).map(([key, palette]) => {
              const isSelected = formData.selectedPalette === key
              const Icon = palette.icon

              return (
                <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={cn(
                      "relative cursor-pointer transition-all duration-300 border backdrop-blur-sm group p-4 md:p-6",
                      "hover:scale-[1.02] hover:shadow-xl",
                      isSelected
                        ? "border-purple-400/50 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20",
                    )}
                    onClick={() => handlePaletteSelection(key)}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div
                        className={cn(
                          "p-2 md:p-3 rounded-xl transition-all duration-300",
                          "bg-gradient-to-br from-purple-500/20 to-blue-500/20",
                          isSelected && "scale-110",
                        )}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-gray-100 group-hover:text-purple-200 transition-colors">
                          {palette.name}
                        </h4>
                        <p className="text-sm md:text-base text-gray-300 group-hover:text-gray-200 transition-colors">
                          {palette.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-2 text-purple-300 font-medium text-sm md:text-base">
                          <Check className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="hidden sm:inline">Selected</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <AnimatePresence>
            {!showCustomPicker && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-4"
              >
                <div className="flex flex-col items-center gap-3">
                  <p className="text-lg font-semibold text-purple-300">
                    Want a different style? You can choose the exact colors!
                  </p>
                  <Button
                    onClick={handleCustomThemeSelection}
                    variant="outline"
                    className="border-purple-400/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 bg-transparent"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Create Custom Theme
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {errors.selectedPalette && <p className="text-red-400 text-sm md:text-base">{errors.selectedPalette}</p>}
        </div>

        {/* Preview Section */}
        <div className="space-y-4 order-first lg:order-last">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-semibold text-white">Live Preview</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreviewModal(true)}
              className="lg:hidden flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Full Preview
            </Button>
          </div>

          {formData.selectedPalette &&
          (selectedPalette ||
            formData.selectedPalette === "custom" ||
            (typeof formData.selectedPalette === "object" && formData.selectedPalette !== null)) ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sticky top-4">
              <PreviewComponent
                palette={
                  formData.selectedPalette === "custom" ||
                  (typeof formData.selectedPalette === "object" && formData.selectedPalette !== null)
                    ? generateCustomPalette(customColors)
                    : selectedPalette
                }
                isLarge={true}
              />
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-64 md:h-96 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="text-center px-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Palette className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                </div>
                <p className="text-gray-300 mb-2 text-base md:text-lg">Select a theme to see preview</p>
                <p className="text-gray-400 text-sm md:text-base">Choose from the themes or create a custom one</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={cancelThemeSelection}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8"
              style={{
                margin: "auto",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                  <span className="text-purple-300 font-medium text-sm sm:text-base">Confirm Theme Selection</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                  {pendingTheme === "custom" ||
                  (typeof formData.selectedPalette === "object" && formData.selectedPalette !== null)
                    ? "Custom Theme"
                    : palettes[pendingTheme as keyof typeof palettes]?.name}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">
                  This is how your center will look with the selected theme
                </p>
              </div>

              {/* Preview in modal */}
              <div className="mb-6 sm:mb-8">
                <PreviewComponent
                  palette={
                    pendingTheme === "custom" ||
                    (typeof formData.selectedPalette === "object" && formData.selectedPalette !== null)
                      ? generateCustomPalette(customColors)
                      : palettes[pendingTheme as keyof typeof palettes]
                  }
                  isLarge={true}
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={cancelThemeSelection}
                  variant="outline"
                  className="flex-1 py-2.5 sm:py-3 text-base sm:text-lg border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmThemeSelection}
                  className="flex-1 py-2.5 sm:py-3 text-base sm:text-lg bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/25"
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Confirm & Continue
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal &&
          formData.selectedPalette &&
          (selectedPalette ||
            formData.selectedPalette === "custom" ||
            (typeof formData.selectedPalette === "object" && formData.selectedPalette !== null)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 lg:hidden"
              onClick={() => setShowPreviewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md max-h-[85vh] overflow-y-auto my-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {formData.selectedPalette === "custom" ||
                    (typeof formData.selectedPalette === "object" && formData.selectedPalette !== null)
                      ? "Custom Theme"
                      : selectedPalette?.name}{" "}
                    Preview
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => setShowPreviewModal(false)}>
                    Close
                  </Button>
                </div>
                <PreviewComponent
                  palette={
                    formData.selectedPalette === "custom" ||
                    (typeof formData.selectedPalette === "object" && formData.selectedPalette !== null)
                      ? generateCustomPalette(customColors)
                      : selectedPalette
                  }
                  isLarge={true}
                />
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Custom Picker */}
      <AnimatePresence>
        {showCustomPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden w-full"
          >
            <Card className="border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg shadow-purple-500/10 w-full">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 rounded-full px-4 py-2 mb-3 sm:mb-4">
                  <Palette className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-300 font-medium">Custom Theme Creator</span>
                </div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                  Design Your Perfect Colors
                </h4>
                <p className="text-gray-300 text-base md:text-lg">
                  Create a unique theme that represents your center's brand
                </p>
              </div>

              {/* Live Preview at the top of custom section */}
              <div className="mb-6 sm:mb-8">
                <h5 className="text-lg sm:text-xl font-semibold text-white mb-4 text-center">Live Preview</h5>
                <PreviewComponent palette={generateCustomPalette(customColors)} isLarge={true} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
                {Object.entries(customColors).map(([key, value]) => (
                  <div key={key} className="space-y-3">
                    <label className="block text-base md:text-lg font-medium text-gray-300 capitalize text-center">
                      {key} Color
                    </label>
                    <div className="flex flex-col items-center gap-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleCustomColorChange(key, e.target.value)}
                        className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl border-3 border-purple-400/30 bg-transparent cursor-pointer hover:border-purple-400/60 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleCustomColorChange(key, e.target.value)}
                        className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm md:text-base font-mono focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/25 transition-all text-center"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => {
                  updateFormData("selectedPalette", customColors)
                  console.log("Selected palette:", customColors)
                }}
                className={cn(
                  "w-full py-3 md:py-4 lg:py-5 text-lg md:text-xl lg:text-2xl font-semibold transition-all duration-300 rounded-xl",
                  typeof formData.selectedPalette === "object" && formData.selectedPalette !== null
                    ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/25"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20",
                )}
              >
                {typeof formData.selectedPalette === "object" && formData.selectedPalette !== null && (
                  <Check className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                )}
                Use Custom Theme
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
