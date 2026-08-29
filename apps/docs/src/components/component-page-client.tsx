"use client";

import * as React from "react";
import { Terminal, Eye, Code, Shield } from "lucide-react";
import { componentsData } from "@/data/components-data";
import { Locale } from "@/components/translation-provider";
import { PreviewCard } from "@/components/preview-card";
import { CodeBlock } from "@/components/code-block";

interface ComponentPageClientProps {
  locale: Locale;
  slug: string;
}

export function ComponentPageClient({ locale, slug }: ComponentPageClientProps) {
  const comp = componentsData[slug];

  if (!comp) {
    return (
      <div className="p-4 border border-destructive bg-destructive/10 rounded-md">
        Component not found: {slug}
      </div>
    );
  }

  const enHeadings = {
    install: "Installation",
    usage: "Usage Example",
    props: "Props Reference",
    propName: "Prop",
    propType: "Type",
    propDefault: "Default",
    propDesc: "Description",
    a11y: "Accessibility (a11y)",
    styling: "Custom Styling Accent",
  };

  const kmHeadings = {
    install: "របៀបដំឡើង",
    usage: "ឧទាហរណ៍នៃការប្រើប្រាស់",
    props: "លក្ខណៈសម្បត្តិ (Props Reference)",
    propName: "ឈ្មោះ Prop",
    propType: "ប្រភេទ",
    propDefault: "តម្លៃលំនាំដើម",
    propDesc: "ការពិពណ៌នា",
    a11y: "លទ្ធភាពប្រើប្រាស់ (Accessibility)",
    styling: "ការកំណត់រចនាប័ទ្មផ្ទាល់ខ្លួន",
  };

  const h = locale === "km" ? kmHeadings : enHeadings;

  return (
    <div className="space-y-10 max-w-4xl select-none">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black">{comp.name}</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {comp.desc[locale]}
        </p>
      </div>

      <div className="border-t border-border"></div>

      {/* Live Preview Container */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          {locale === "en" ? "Live Preview" : "ការបង្ហាញផ្ទាល់"}
        </h2>
        <PreviewCard locale={locale}>
          {comp.renderPreview(locale)}
        </PreviewCard>
      </section>

      {/* Installation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          {h.install}
        </h2>
        <CodeBlock code={comp.installCmd} />
      </section>

      {/* Usage Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          {h.usage}
        </h2>
        <CodeBlock code={comp.codeExample} />
      </section>

      {/* Props Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{h.props}</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/50 font-semibold text-left">
              <tr>
                <th className="px-4 py-3">{h.propName}</th>
                <th className="px-4 py-3">{h.propType}</th>
                <th className="px-4 py-3">{h.propDefault}</th>
                <th className="px-4 py-3">{h.propDesc}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comp.props.map((prop, idx) => (
                <tr key={idx} className="hover:bg-muted/10">
                  <td className="px-4 py-3 font-mono text-xs text-primary font-bold">{prop.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-pre">{prop.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground/80">{prop.default}</td>
                  <td className="px-4 py-3 text-muted-foreground">{prop.desc[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Custom Styling Accent */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{h.styling}</h2>
        <div className="flex flex-col gap-4 p-6 border border-border bg-card rounded-lg shadow-sm">
          <div className="flex items-center justify-center p-6 border border-dashed border-border rounded-lg bg-muted/20 w-full">
            {comp.renderCustomStyle()}
          </div>
          <div className="w-full">
            <CodeBlock code={comp.customStyleCode} />
          </div>
        </div>
      </section>

      {/* Accessibility Notes */}
      <section className="space-y-3 bg-primary/5 border border-primary/10 p-6 rounded-lg">
        <h2 className="text-lg font-bold flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" />
          {h.a11y}
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-normal">
          {comp.a11yNotes[locale].map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
