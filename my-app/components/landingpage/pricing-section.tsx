"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// inside your component

const plans = {
  monthly: [
    {
      name: "Starter",
      price: "DH 199",
      period: "/month",
      description: "Perfect for small centers getting started.",
      features: [
        "Up to 100 students",
        "Basic reporting",
        "Email support",
        "Student management",
        "Class scheduling",
        "Payment tracking",
      ],
      popular: false,
    },
    {
      name: "Growth",
      price: "DH 499",
      period: "/month",
      description: "Scale up with more tools and automation.",
      features: [
        "Up to 500 students",
        "Advanced analytics",
        "Priority support",
        "Multi-center management",
        "Automated billing",
        "Custom reports",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "DH 999",
      period: "/month",
      description: "Full power and priority support for large networks.",
      originalPrice: "",
      features: [
        "Unlimited students",
        "White-label solution",
        "24/7 phone support",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ],
  yearly: [
    {
      name: "Starter",
      price: "DH 1,990",
      period: "/year",
      description: "Perfect for small centers getting started.",
      originalPrice: "DH 2,388",
      features: [
        "Up to 100 students",
        "Basic reporting",
        "Email support",
        "Student management",
        "Class scheduling",
        "Payment tracking",
      ],
      popular: false,
    },
    {
      name: "Growth",
      price: "DH 4,990",
      period: "/year",
      description: "Scale up with more tools and automation.",
      originalPrice: "DH 5,988",
      features: [
        "Up to 500 students",
        "Advanced analytics",
        "Priority support",
        "Multi-center management",
        "Automated billing",
        "Custom reports",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "DH 9,990",
      period: "/year",
      description: "Full power and priority support for large networks.",
      originalPrice: "DH 11,988",
      features: [
        "Unlimited students",
        "White-label solution",
        "24/7 phone support",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ],
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          )
        );
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentPlans = isYearly ? plans.yearly : plans.monthly;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden py-24"
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute w-2 h-2 bg-purple-500/40 rounded-full"
          style={{
            top: "10%",
            left: "10%",
            transform: `translate(${scrollY * 50}px, ${scrollY * 30}px)`,
          }}
        />
        <div
          className="absolute w-1 h-1 bg-blue-500/60 rounded-full"
          style={{
            top: "20%",
            right: "15%",
            transform: `translate(${-scrollY * 40}px, ${scrollY * 60}px)`,
          }}
        />
        <div
          className="absolute w-3 h-3 bg-teal-500/30 rounded-full"
          style={{
            bottom: "30%",
            left: "20%",
            transform: `translate(${scrollY * 70}px, ${-scrollY * 40}px)`,
          }}
        />

        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 100}px, ${
              scrollY * 80
            }px) scale(${1 + scrollY * 0.2})`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${-scrollY * 120}px, ${
              -scrollY * 60
            }px) scale(${1 + scrollY * 0.15})`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full blur-2xl"
          style={{
            transform: `translate(-50%, -50%) translate(${scrollY * 60}px, ${
              scrollY * 40
            }px) rotate(${scrollY * 45}deg)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${scrollY * 20}px, ${scrollY * 30}px)`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your center — all prices in MAD.
          </p>
        </div>

        <div
          className={cn(
            "flex items-center justify-center mb-16 transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="bg-gray-900 p-1 rounded-2xl border border-gray-800">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2 rounded-2xl text-sm font-medium transition-all duration-300",
                !isYearly
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2  text-sm font-medium transition-all duration-300 relative  ",
                isYearly
                  ? "bg-white text-black shadow-lg rounded-2xl"
                  : "text-gray-400 hover:text-white rounded-2xl"
              )}
            >
              Yearly
              <Badge className="absolute -top-5 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1">
                Save 17%
              </Badge>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={cn(
                "rounded-2xl relative bg-gray-900/50 border-gray-800 backdrop-blur-sm transition-all duration-1000 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20",
                plan.popular &&
                  "ring-2 ring-gradient-to-r from-purple-500 to-blue-500 scale-105",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              )}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}

              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur-xl" />
              )}

              <CardHeader className="relative z-10 text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 line-through mt-1">
                      {plan.originalPrice}
                    </div>
                  )}
                </div>
                <CardDescription className="text-gray-400 text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-300"
                    >
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() =>
                    router.push(
                      `/apply-for-center?plan=${encodeURIComponent(plan.name)}`
                    )
                  }
                  className={cn(
                    "w-full py-3 text-base font-medium transition-all duration-300 rounded-2xl",
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/25"
                      : "bg-white text-black hover:bg-gray-100"
                  )}
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={cn(
            "text-center mt-16 transition-all duration-1000 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-gray-500 text-sm">
            No hidden fees. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
