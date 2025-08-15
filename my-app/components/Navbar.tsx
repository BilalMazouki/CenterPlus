"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

// inside your component

export function NavbarDemo() {
  const router = useRouter()
  const navItems = [
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "Pricing",
      link: "/#pricing",
    },
    {
      name: "Contact",
      link: "/#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar className="sticky top-0 w-full z-50">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton
            onClick={() =>
                    router.push(
                      `/apply-for-center`
                    )
                  }
              variant="primary"
              className="rounded-2xl hover:bg-primary hover:text-accent-foreground"
            >
             Get started now
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() =>
                    router.push(
                      `/apply-for-center`
                    )
                  }
                variant="primary"
                className="w-full"
              >
                Get started now
              </NavbarButton>
              <div className="flex w-full items-center justify-center">
                <ThemeToggle />
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  );
}


