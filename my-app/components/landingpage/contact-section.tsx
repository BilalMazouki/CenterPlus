"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
          {/* Main wave shape - bigger single smooth curve */}
          {/* theme issue */}
          <path
            d="M0,0 L0,60 C300,120 600,40 900,100 C1050,120 1150,60 1200,80 L1200,0 Z"
            fill="oklch(0.12 0 0)"
            className="drop-shadow-lg"
          />
        </svg>
      {/* Parallax Background Elements */}
      <div
        className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"
        style={{ transform: `translate(-50%, -50%) rotate(${scrollY * 0.1}deg)` }}
      />

      {/* Floating Interactive Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to transform your educational center with CenterPlus? Let&apos;s discuss how we can help you succeed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group cursor-pointer relative overflow-hidden rounded-xl p-4 hover:bg-white/5 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">Email Us</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">contact@centerplus.ma</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group cursor-pointer relative overflow-hidden rounded-xl p-4 hover:bg-white/5 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-6 h-6 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors">Call Us</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">+212 5XX-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group cursor-pointer relative overflow-hidden rounded-xl p-4 hover:bg-white/5 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-teal-500/20 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-teal-300 transition-colors">Visit Us</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Casablanca, Morocco</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <h3 className="text-white font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                Why Choose CenterPlus?
              </h3>
              <ul className="space-y-2 text-gray-400">
                {[
                  { icon: CheckCircle, text: "24/7 Customer Support", color: "text-green-400" },
                  { icon: CheckCircle, text: "Free Setup & Training", color: "text-blue-400" },
                  { icon: CheckCircle, text: "30-Day Money Back Guarantee", color: "text-purple-400" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 group/item hover:translate-x-2 transition-transform duration-300"
                  >
                    <item.icon
                      className={`w-4 h-4 ${item.color} group-hover/item:scale-110 transition-transform duration-300`}
                    />
                    <span className="group-hover/item:text-white transition-colors duration-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="group">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:bg-white/10 transition-all duration-300 group-hover:border-white/30"
                    />
                  </div>
                  <div className="group">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:bg-white/10 transition-all duration-300 group-hover:border-white/30"
                    />
                  </div>
                </div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:bg-white/10 transition-all duration-300 hover:border-white/30"
                />

                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:bg-white/10 resize-none transition-all duration-300 hover:border-white/30"
                />

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-3 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
