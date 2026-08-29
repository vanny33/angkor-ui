"use client";

import React from "react";
import { useTranslation } from "@/components/translation-provider";

export default function IntroductionDocs() {
  const { locale } = useTranslation();

  return (
    <div className="space-y-6 max-w-4xl select-none">
      <div>
        <h1 className="text-3xl font-black mb-2">
          {locale === "en" ? "Introduction" : "សេចក្តីផ្តើម"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {locale === "en"
            ? "Beautiful, accessible, animated copy-owned React component library for Khmer and international projects."
            : "បណ្តុំសមាសភាគ React ដ៏ស្រស់ស្អាត ងាយស្រួលប្រើប្រាស់ និងមានចលនា សម្រាប់កម្មវិធីខ្មែរ និងអន្តរជាតិ។"}
        </p>
      </div>

      <div className="border-t border-border my-6"></div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-bold">
            {locale === "en" ? "Design Philosophy" : "ទស្សនវិជ្ជានៃការរចនា"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {locale === "en"
              ? "Angkor UI is designed from the ground up to support high-quality typography for both Khmer script and English. Often, default web typography trims the top or bottom of Khmer glyphs (like subscripts or vowels) due to tight line heights. Angkor UI uses optimized custom CSS variables, explicit spacing tokens, and Noto Sans Khmer integration to ensure elegant rendering on every device."
              : "Angkor UI ត្រូវបានរចនាឡើងយ៉ាងយកចិត្តទុកដាក់បំផុតដើម្បីទ្រទ្រង់ពុម្ពអក្សរខ្មែរ និងអក្សរឡាតាំងឱ្យមានសោភ័ណភាពខ្ពស់។ ជាញឹកញាប់ ការកំណត់ពុម្ពអក្សរលំនាំដើមនៅលើគេហទំព័រតែងតែដាច់ជើងអក្សរ ឬស្រៈខាងលើ ដោយសារគម្លាតបន្ទាត់តូចពេក។ Angkor UI ដោះស្រាយបញ្ហានេះដោយប្រើប្រាស់ប្រព័ន្ធកម្ពស់បន្ទាត់ (line-height) និងគម្លាតបន្ទាត់គិតជាភាគរយ ដែលធានាបាននូវការបង្ហាញយ៉ាងស្រស់ស្អាតលើគ្រប់ឧបករណ៍។"}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">
            {locale === "en" ? "Copy-Owned Architecture" : "ស្ថាបត្យកម្មចម្លងកូដផ្ទាល់ខ្លួន"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {locale === "en"
              ? "Following a style similar to shadcn/ui, Angkor UI is NOT installed as a regular npm dependency package. Instead, you use our CLI to initialize configuration and download the source code of each component directly into your workspace. This gives you 100% ownership and flexibility to edit and customize the code to fit your project requirements."
              : "ស្រដៀងគ្នានឹងរចនាប័ទ្មរបស់ shadcn/ui ដែរ Angkor UI មិនមែនជាកញ្ចប់បណ្ណាល័យដែលត្រូវដំឡើងតាមរយៈ npm dependency ឡើយ។ ផ្ទុយទៅវិញ អ្នកប្រើប្រាស់ CLI របស់យើងដើម្បីបង្កើតការកំណត់ និងទាញយកកូដប្រភព (source code) នៃសមាសភាគនីមួយៗមកក្នុងគម្រោងរបស់អ្នកផ្ទាល់។ វិធីនេះធ្វើឱ្យអ្នកមានភាពម្ចាស់ការ ១០០% លើការកែសម្រួលកូដដើម្បីតម្រូវតាមតម្រូវការជាក់ស្តែង។"}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">
            {locale === "en" ? "Typography Guidelines" : "គោលការណ៍ណែនាំពុម្ពអក្សរ"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {locale === "en"
              ? "Angkor UI relies on Noto Sans Khmer as the primary font for Khmer script and Outfit for English. The library configures these fonts automatically in layout files. When customizing font-family, always ensure you maintain fallbacks like 'Khmer OS System' to support devices that do not have web fonts preloaded."
              : "Angkor UI ផ្អែកលើពុម្ពអក្សរ Noto Sans Khmer សម្រាប់អក្សរខ្មែរ និង Outfit សម្រាប់អក្សរអង់គ្លេស។ ប្រព័ន្ធបណ្ណាល័យកំណត់រចនាសម្ព័ន្ធពុម្ពអក្សរទាំងនេះដោយស្វ័យប្រវត្តិតាមរយៈ CSS variables។ នៅពេលកែប្រែពុម្ពអក្សរ សូមប្រាកដថាអ្នកបានរក្សាទុកពុម្ពអក្សរជំនួស (fallback) ដូចជា 'Khmer OS System' ផងដែរដើម្បីធានាការបង្ហាញលើឧបករណ៍ចាស់ៗ។"}
          </p>
        </section>
      </div>
    </div>
  );
}
