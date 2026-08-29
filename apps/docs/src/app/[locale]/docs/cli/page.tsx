"use client";

import React from "react";
import { useTranslation } from "@/components/translation-provider";

export default function CliDocs() {
  const { locale } = useTranslation();

  return (
    <div className="space-y-6 max-w-4xl select-none">
      <div>
        <h1 className="text-3xl font-black mb-2">
          {locale === "en" ? "CLI Commands" : "ពាក្យបញ្ជា CLI របស់ Angkor UI"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {locale === "en"
            ? "Automate your workflow with the angkor-ui command-line interface."
            : "សម្រួលដល់ការងាររបស់អ្នកជាមួយកម្មវិធីបញ្ជា CLI របស់ Angkor UI។"}
        </p>
      </div>

      <div className="border-t border-border my-6"></div>

      <div className="space-y-8">
        {/* Init Command */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-mono text-primary">init</h2>
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Initializes the project workspace config. It prompts for aliases, stylesheet paths, and theme selections. Generates utility files (cn.ts, animations.ts) and appends HSL theme variables to your global CSS."
              : "ចាប់ផ្តើមរៀបចំរចនាសម្ព័ន្ធគម្រោង។ វានឹងសួររកទីតាំង alias ទីតាំងឯកសារ CSS និងជម្រើសស្បែកពណ៌។ បង្កើតឯកសារជំនួយ (cn.ts, animations.ts) និងបញ្ចូល HSL variables ទៅក្នុង CSS របស់អ្នក។"}
          </p>
          <pre className="bg-muted p-4 rounded-lg border border-border font-mono text-sm">
            npx angkor-ui@latest init
          </pre>
        </section>

        {/* List Command */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-mono text-primary">list</h2>
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Queries the component registry and lists all available components with bilingual descriptions."
              : "ស្វែងរកសមាសភាគនៅក្នុង registry និងបង្ហាញបញ្ជីឈ្មោះសមាសភាគទាំងអស់ជាមួយការពិពណ៌នាជាពីរភាសា។"}
          </p>
          <pre className="bg-muted p-4 rounded-lg border border-border font-mono text-sm">
            npx angkor-ui@latest list
          </pre>
        </section>

        {/* Add Command */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-mono text-primary">add</h2>
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Downloads specified component(s) from the registry. Resolves dependencies (both npm dependencies and internal components), prompts before overwriting existing files, and writes component code directly to your project."
              : "ទាញយកសមាសភាគដែលបានបញ្ជាក់ពី registry។ វានឹងដោះស្រាយ dependencies (ទាំងកញ្ចប់ npm និងសមាសភាគទាក់ទងគ្នាផ្សេងទៀត) សួរមុនពេលជំនួសកូដចាស់ និងសរសេរកូដសមាសភាគទៅក្នុងគម្រោងរបស់អ្នកផ្ទាល់។"}
          </p>
          <pre className="bg-muted p-4 rounded-lg border border-border font-mono text-sm">
{`npx angkor-ui@latest add button
npx angkor-ui@latest add checkbox tabs
npx angkor-ui@latest add radio-group`}
          </pre>
        </section>
      </div>
    </div>
  );
}
