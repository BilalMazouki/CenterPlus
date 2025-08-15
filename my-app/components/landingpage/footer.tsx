"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";

// GSAP imports
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const socialButtonsRef = useRef<HTMLButtonElement[]>([]);
  const backgroundBlobsRef = useRef<HTMLDivElement[]>([]);
  const heartRef = useRef<SVGSVGElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Footer entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Logo animation with 3D effect
      tl.fromTo(
        logoRef.current,
        { y: 50, opacity: 0, rotationX: -90, transformOrigin: "center bottom" },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "back.out(1.7)" }
      );

      // Columns staggered animation
      columnsRef.current.forEach((column, index) => {
        if (column) {
          tl.fromTo(
            column,
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
            `-=${0.6 - index * 0.1}`
          );
        }
      });

      // Social buttons animation
      socialButtonsRef.current.forEach((button, index) => {
        if (button) {
          tl.fromTo(
            button,
            { scale: 0, rotation: -180, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(2.7)" },
            `-=${0.4 - index * 0.1}`
          );
        }
      });

      // Background blobs continuous animation
      backgroundBlobsRef.current.forEach((blob, index) => {
        if (blob) {
          gsap.to(blob, {
            rotation: 360,
            scale: () => 0.8 + Math.random() * 0.6,
            x: () => Math.random() * 100 - 50,
            y: () => Math.random() * 100 - 50,
            duration: 15 + index * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Scroll parallax for blobs
          gsap.to(blob, {
            y: () => (index % 2 === 0 ? -100 : 100),
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });

      // Heart beat animation
      if (heartRef.current) {
        gsap.to(heartRef.current, {
          scale: 1.2,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Scroll to top button hover animation
      if (scrollButtonRef.current) {
        const button = scrollButtonRef.current;
        button.addEventListener("mouseenter", () => {
          gsap.to(button, { scale: 1.1, rotation: 360, duration: 0.3, ease: "back.out(1.7)" });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, { scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.7)" });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    gsap.to(form, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setIsSubscribed(true);
        setEmail("");
        gsap.fromTo(
          ".subscription-success",
          { scale: 0, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
        );
      },
    });
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


  const handleSocialHover = (index: number) => {
    const button = socialButtonsRef.current[index];
    if (button) gsap.to(button, { scale: 1.15, rotation: 12, duration: 0.3, ease: "back.out(1.7)" });
  };
  const handleSocialLeave = (index: number) => {
    const button = socialButtonsRef.current[index];
    if (button) gsap.to(button, { scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.7)" });
  };

  return (
    <footer ref={footerRef} className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Background blobs */}
      <div ref={(el) => { if (el) backgroundBlobsRef.current[0] = el }} className="absolute top-0 left-0 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl" />
      <div ref={(el) => { if (el) backgroundBlobsRef.current[1] = el }} className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
      <div ref={(el) => { if (el) backgroundBlobsRef.current[2] = el }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-500/6 rounded-full blur-2xl" />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{ left: `${15 + i * 10}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.7}s`, animationDuration: `${2 + i * 0.3}s` }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 flex flex-col md:flex-row justify-center items-center gap-12">
  {/* Logo & Social */}
  <div ref={(el) => { if (el) columnsRef.current[0] = el }} className="flex flex-col items-center text-center">
    <h3 ref={logoRef} className="text-2xl font-bold text-white mb-4">CenterPlus</h3>
    <p className="text-gray-400 mb-6 leading-relaxed">
      Empowering educational centers across Morocco <br /> with modern management solutions.
    </p>
    <div className="flex space-x-4">
      {[{ Icon: Facebook, color: "hover:text-blue-400" }, { Icon: Twitter, color: "hover:text-sky-400" }, { Icon: Instagram, color: "hover:text-pink-400" }, { Icon: Linkedin, color: "hover:text-blue-600" }].map(({ Icon, color }, index) => (
        <button key={index} ref={(el) => { if (el) socialButtonsRef.current[index] = el }}
          className={`w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group relative overflow-hidden ${color}`}
          onMouseEnter={() => handleSocialHover(index)}
          onMouseLeave={() => handleSocialLeave(index)}
        >
          <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300" />
          <Icon className="w-5 h-5 text-gray-400 transition-all duration-300 relative z-10" />
        </button>
      ))}
    </div>
  </div>

  {/* Subscription */}
  <div ref={(el) => { if (el) columnsRef.current[3] = el }} className="flex flex-col items-center text-center">
    <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
    <p className="text-gray-400 mb-4">Get the latest updates and educational insights.</p>
    {isSubscribed ? (
      <div className="subscription-success p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <p className="text-green-400 text-sm">✓ Successfully subscribed!</p>
      </div>
    ) : (
      <form onSubmit={handleSubscribe} className="space-y-3 w-full max-w-xs">
        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:bg-white/10 transition-all duration-300 hover:border-white/30"
        />
        <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100 font-medium transition-all duration-300 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          <Mail className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
          Subscribe
        </Button>
      </form>
    )}
  </div>
</div>


        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} CenterPlus. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300">Terms of Service</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-400 flex items-center">
              Made with <Heart ref={heartRef} className="w-4 h-4 text-red-400 mx-1" /> in Morocco
            </p>
            <button ref={scrollButtonRef} onClick={scrollToTop}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300" />
              <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
