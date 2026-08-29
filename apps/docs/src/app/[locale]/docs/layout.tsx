"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Header } from "@/components/header";
import { cn } from "@angkor-ui/react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const sections = [
    {
      title: locale === "en" ? "Getting Started" : "ចាប់ផ្តើមដំបូង",
      items: [
        { href: `/${locale}/docs`, label: locale === "en" ? "Introduction" : "សេចក្តីផ្តើម" },
        { href: `/${locale}/docs/installation`, label: locale === "en" ? "Installation" : "ការដំឡើង" },
        { href: `/${locale}/docs/cli`, label: locale === "en" ? "CLI" : "CLI របស់ Angkor UI" },
      ],
    },
    {
      title: locale === "en" ? "Components" : "សមាសភាគ (Components)",
      items: [
        { href: `/${locale}/docs/components/button`, label: "Button" },
        { href: `/${locale}/docs/components/input`, label: "Input" },
        { href: `/${locale}/docs/components/select`, label: "Select" },
        { href: `/${locale}/docs/components/dialog`, label: "Dialog" },
        { href: `/${locale}/docs/components/toast`, label: "Toast" },
        { href: `/${locale}/docs/components/data-table`, label: "Data Table" },
        { href: `/${locale}/docs/components/date-picker`, label: "Khmer Date Picker" },
        { href: `/${locale}/docs/components/checkbox`, label: "Checkbox" },
        { href: `/${locale}/docs/components/tabs`, label: "Tabs" },
        { href: `/${locale}/docs/components/radio-group`, label: "Radio Group" },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col md:flex-row gap-6 py-8">
        
        {/* Sidebar Left Navigation */}
        <aside className="w-full md:w-64 md:shrink-0 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6 select-none">
          <nav className="sticky top-24 space-y-8 text-sm">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="font-semibold text-foreground uppercase tracking-wider text-xs">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-1.5 transition-colors",
                            isActive
                              ? "text-primary font-bold"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 md:pl-4">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
