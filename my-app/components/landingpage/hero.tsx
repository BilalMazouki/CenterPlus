import React from 'react'
import { BackgroundLines } from '../ui/background-lines'
import { HeroHighlightDemo } from './text-bg'
import { NavbarButton } from '../ui/resizable-navbar'
import { HeroScrollDemo } from './heroscroll'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="pt-16 ">
        <div className="min-h-[40vh] lg:min-h-[80vh] flex flex-col justify-center">
          <BackgroundLines className="flex flex-col items-center justify-center w-full px-4 text-center ">
            <HeroHighlightDemo />
            <p className="mx-auto mt-3 text-sm md:text-lg text-neutral-700 dark:text-neutral-400">
              CenterPlus streamlines managing multiple educational centers,
              users, payments, attendance, and progress—all in one easy
              platform.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <NavbarButton
                variant="secondary"
                href="#features"
                className="lg:text-xl text-sm"
              >
                Learn more
              </NavbarButton>
              <Link href='apply-for-center'>
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
          </BackgroundLines>
        </div>
        <HeroScrollDemo />


      </div>
  )
}

export default Hero