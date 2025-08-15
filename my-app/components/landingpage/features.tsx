"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    title: "Unified Dashboard",
    description: "Manage every center from one powerful dashboard.",
    icon: "🏢",
  },
  {
    title: "Real-Time Tracking",
    description: "Track attendance and performance in real time.",
    icon: "📊",
  },
  {
    title: "Teacher Collaboration",
    description: "Empower teachers to share homework, lessons and more.",
    icon: "👥",
  },
  {
    title: "Role-Based Access",
    description: "Give every user the right tools at the right time.",
    icon: "🔑",
  },
  {
    title: "Progress Monitoring",
    description: "Monitor student progress with precision.",
    icon: "📈",
  },
  {
    title: "Instant Communication",
    description: "Send updates instantly, keep everyone in sync.",
    icon: "💬",
  },
  {
    title: "Brand Customization",
    description: "Customize themes to match your brand perfectly.",
    icon: "🎨",
  },
  {
    title: "Secure Authentication",
    description: "Secure logins that protect every center's data.",
    icon: "🔒",
  },
  {
    title: "Smart Analytics",
    description: "Turn insights into action with clear analytics.",
    icon: "🧠",
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative  border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 rounded-2xl",
        "hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20",
        "transform-gpu hover:scale-105 hover:-translate-y-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-2xl transition-all duration-300",
            isHovered && "scale-110 rotate-6",
          )}
        >
          {feature.icon}
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">{feature.description}</p>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100",
        )}
      />
    </div>
  )
}

export default function FeaturesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black/[0.96] antialiased">
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden z-20">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="none">
          {/* Main wave shape - bigger single smooth curve */}
          {/* theme issue */}
          <path
            d="M0,0 L0,60 C300,120 600,40 900,100 C1050,120 1150,60 1200,80 L1200,0 Z"
            fill="oklch(0.12 0 0)"
            className="drop-shadow-lg"
          />
        </svg>
      </div>

      {/* Grid background - positioned below wave */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none z-10",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      {/* Spotlight effects */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <Spotlight className="-top-40 right-0 md:-top-20 md:right-60" fill="rgb(147, 51, 234)" />

      <div className="relative z-30 mx-auto w-full max-w-7xl px-4 py-20 md:py-32">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-4xl md:text-6xl font-bold text-transparent mb-6">
            Everything you need to manage
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              educational centers
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
            Streamline operations, boost engagement, and scale your educational business with our comprehensive
            management platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative rounded-2xl border border-white/[0.08] bg-black/40 p-8 md:p-12 backdrop-blur-md shadow-2xl">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Run your centers smarter — starting today.
            </h3>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of admins, teachers, and students already on CenterPlus.
            </p>

            <Link href={'apply-for-center'}>
            <Button
              size="lg"
              className={cn(
                "relative overflow-hidden bg-white text-black font-medium px-8 py-4 text-lg",
                "hover:bg-gray-100 transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10",
                "border-0  rounded-2xl",
              )}
            >
              <span className="relative z-10">Get Started now</span>
            </Button>
            </Link> 
          </div>


        </div>
        
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden z-20 w-full">
  <svg
    className="absolute bottom-0 left-0 w-full h-full"
    viewBox="0 0 1200 160"
    preserveAspectRatio="none"
  >
    {/* Main wave shape - flipped for bottom */}
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
