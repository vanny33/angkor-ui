"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Copy, Check, Sparkles, LayoutGrid, Type, ShieldAlert, Cpu } from "lucide-react";
import { Header } from "@/components/header";
import { useTranslation } from "@/components/translation-provider";
import {
  Button,
  Input,
  Checkbox,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@angkor-ui/react";

export default function HomePage() {
  const { t, locale } = useTranslation();
  const [copied, setCopied] = useState(false);

  const initCommand = "npx angkor-ui@latest init";

  const handleCopy = () => {
    navigator.clipboard.writeText(initCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-semibold text-primary select-none">
              <Sparkles className="h-3.5 w-3.5" />
              Angkor UI v1.0.0
            </div>

            {/* Title / Subtitle */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none select-none">
                Angkor UI
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-muted-foreground select-none">
                {t("home.subtitle")}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed select-none">
                {t("home.description")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/docs`}>
                <Button size="lg" className="px-8 font-semibold">
                  {t("common.getStarted")}
                </Button>
              </Link>
              <Link href={`/${locale}/docs#components`}>
                <Button size="lg" variant="outline" className="px-8 font-semibold">
                  {t("common.viewComponents")}
                </Button>
              </Link>
            </div>

            {/* Tagline */}
            <div className="max-w-2xl mx-auto p-4 border border-dashed border-border rounded-lg bg-card/50 select-none">
              <p className="text-sm font-medium italic text-muted-foreground">
                «{t("common.tagline")}»
              </p>
            </div>

            {/* CLI Command Box */}
            <div className="max-w-md mx-auto space-y-2">
              <p className="text-xs text-muted-foreground font-medium select-none">
                {t("home.initCommand")}
              </p>
              <div className="flex items-center justify-between gap-3 bg-muted p-3.5 rounded-lg border border-border font-mono text-sm shadow-sm select-all">
                <span className="flex items-center gap-2 text-foreground/90">
                  <Terminal className="h-4 w-4 text-primary shrink-0" />
                  {initCommand}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 shrink-0"
                  animated={false}
                  aria-label="Copy command"
                >
                  {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Live Components Preview Showcase */}
        <section className="py-16 border-t border-b border-border bg-muted/20 select-none">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Interactive Preview</h2>
              <p className="text-muted-foreground">Try some of the 10 components directly in this live workspace</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Preview Card 1: Buttons & Inputs */}
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold border-b border-border pb-3">Controls & Forms</h3>
                
                {/* Buttons Showcase */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground">Button Variants</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Button variant="default">Primary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                {/* Input Showcase */}
                <div className="pt-2">
                  <Input
                    label="Bilingual Username"
                    placeholder="Enter username"
                    maxLength={15}
                    helperText="Supporting characters limit count"
                    requiredIndicator
                    required
                  />
                </div>
              </div>

              {/* Preview Card 2: Tabs & Checkbox */}
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold border-b border-border pb-3">Navigation & Checkbox</h3>

                {/* Tabs Showcase */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground">Tabs Underline & Pill</span>
                  <Tabs defaultValue="general" variant="pill">
                    <TabsList>
                      <TabsTrigger value="general">ទូទៅ (General)</TabsTrigger>
                      <TabsTrigger value="security">សុវត្ថិភាព (Security)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="p-3 bg-muted/40 border border-border rounded-md text-sm mt-3">
                      ការកំណត់ទូទៅ / General configuration panel values
                    </TabsContent>
                    <TabsContent value="security" className="p-3 bg-muted/40 border border-border rounded-md text-sm mt-3">
                      ការកំណត់សុវត្ថិភាព / Security keys and options panel
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Checkbox Showcase */}
                <div className="pt-2">
                  <Checkbox
                    id="accept-terms"
                    label="ខ្ញុំយល់ព្រមតាមលក្ខខណ្ឌ / I agree to terms"
                    description="សូមអានលក្ខខណ្ឌមុនពេលបន្ត / Read details before clicking accept."
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-center leading-none select-none">
              {t("home.featuresTitle")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Feature 1 */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-sm select-none hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LayoutGrid className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t("home.featureCopyOwnedTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("home.featureCopyOwnedDesc")}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-sm select-none hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Type className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t("home.featureKhmerTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("home.featureKhmerDesc")}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-sm select-none hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t("home.featureAnimatedTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("home.featureAnimatedDesc")}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-sm select-none hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t("home.featureAccessibleTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("home.featureAccessibleDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 bg-muted/40 select-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Angkor UI Component Library. Open-source under MIT. Made with 💛 for Cambodia & the World.
        </div>
      </footer>
    </div>
  );
}
