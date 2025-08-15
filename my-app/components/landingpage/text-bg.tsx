"use client";
import { motion } from "motion/react";
import {  Highlight } from "../ui/hero-highlight";
import { FlipWords } from "../ui/flip-words";

export function HeroHighlightDemo() {
      const words = ["Manage better", "Run modern", "Organize beautiful"];

  return (

      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-3xl px-4 md:text-3xl lg:text-6xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto my-4 "
      >
         <FlipWords words={words} duration={1800} className="mozilla " /> <br /><span className='outfit text-5xl ' >centers with</span> {" "}
        <Highlight className="mozilla text-black dark:text-white rounded outfit ">
          CenterPlus
        </Highlight>
      </motion.h1>
 
  );
}
