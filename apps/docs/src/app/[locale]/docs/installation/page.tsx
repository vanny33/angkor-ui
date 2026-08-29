"use client";

import React from "react";
import { useTranslation } from "@/components/translation-provider";

export default function InstallationDocs() {
  const { locale } = useTranslation();

  return (
    <div className="space-y-6 max-w-4xl select-none">
      <div>
        <h1 className="text-3xl font-black mb-2">
          {locale === "en" ? "Installation Guide" : "ការណែនាំអំពីការដំឡើង"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {locale === "en"
            ? "How to set up your project and initialize Angkor UI."
            : "របៀបរៀបចំគម្រោងរបស់អ្នក និងចាប់ផ្តើមប្រើប្រាស់ Angkor UI។"}
        </p>
      </div>

      <div className="border-t border-border my-6"></div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-bold">1. {locale === "en" ? "Prerequisites" : "តម្រូវការជាមុន"}</h2>
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Angkor UI requires React 18/19, TypeScript, and Tailwind CSS. Ensure your project is set up with these first (e.g. Next.js App Router or Vite React project)."
              : "Angkor UI តម្រូវឱ្យប្រើប្រាស់ React 18/19, TypeScript និង Tailwind CSS។ សូមប្រាកដថាគម្រោងរបស់អ្នកបានដំឡើងបច្ចេកវិទ្យាទាំងនេះរួចរាល់ (ឧទាហរណ៍ គម្រោង Next.js App Router ឬ Vite React)។"}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">2. {locale === "en" ? "Run Initialization" : "ដំណើរការចាប់ផ្ដើមដំបូង (Init)"}</h2>
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Execute our CLI tool in the root of your project to automatically generate config files, install base dependencies, and configure CSS variables."
              : "ដំណើរការឧបករណ៍ CLI របស់យើងនៅក្នុងថតគោល (root) នៃគម្រោងរបស់អ្នក ដើម្បីបង្កើតឯកសារកំណត់រចនាសម្ព័ន្ធ ដំឡើង dependencies មូលដ្ឋាន និងកំណត់ CSS variables ដោយស្វ័យប្រវត្តិ។"}
          </p>
          <pre className="bg-muted p-4 rounded-lg border border-border font-mono text-sm">
            npx angkor-ui@latest init
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">3. {locale === "en" ? "Tailwind CSS Setup" : "ការកំណត់រចនាសម្ព័ន្ធ Tailwind CSS"}</h2>
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Make sure your tailwind.config.js includes the color mappings to HSL variables. The init command creates angkor-ui.json. Adjust your tailwind config to scan your component path if necessary:"
              : "សូមប្រាកដថាឯកសារ tailwind.config.js របស់អ្នករួមបញ្ចូលការភ្ជាប់ពណ៌ទៅនឹង HSL variables។ ពាក្យបញ្ជា init បង្កើតឯកសារ angkor-ui.json។ កែសម្រួលការកំណត់ tailwind ដើម្បីស្កែនកូដសមាសភាគរបស់អ្នក៖"}
          </p>
          <pre className="bg-muted p-4 rounded-lg border border-border font-mono text-sm overflow-x-auto">
{`content: [
  "./components/ui/**/*.{js,ts,jsx,tsx}",
  // ...other paths
]`}
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">4. {locale === "en" ? "Add Components" : "បន្ថែមសមាសភាគទៅក្នុងគម្រោង"}</h2>
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Once initialized, you can add any component directly by name. For example, to add the Button component:"
              : "បន្ទាប់ពីកំណត់រចនាសម្ព័ន្ធរួចរាល់ អ្នកអាចទាញយកសមាសភាគណាមួយដោយសេរី។ ឧទាហរណ៍ ដើម្បីបន្ថែមប៊ូតុង (Button)៖"}
          </p>
          <pre className="bg-muted p-4 rounded-lg border border-border font-mono text-sm">
            npx angkor-ui@latest add button
          </pre>
        </section>
      </div>
    </div>
  );
}
