"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-background -mt-30 lg:mt-10">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Center Managment
              </span>
            </h1>
          </>
        }
      >
        <iframe
          src="https://lottie.host/embed/a6753a16-b0fc-4c8b-9a14-6cad5d9d4721/W7s9f7N3IH.lottie"
          width='100%'
          height="100%"
          style={{ border: 'none' , borderRadius: '20px' }}
        ></iframe>
      </ContainerScroll>
    </div>
  );
}

