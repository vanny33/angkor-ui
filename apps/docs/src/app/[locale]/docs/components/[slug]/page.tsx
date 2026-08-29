import { notFound } from "next/navigation";
import { Locale } from "@/components/translation-provider";
import { ComponentPageClient } from "@/components/component-page-client";
import { componentsData } from "@/data/components-data";

interface ComponentPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export function generateStaticParams() {
  const slugs = [
    "button",
    "input",
    "select",
    "dialog",
    "toast",
    "data-table",
    "date-picker",
    "checkbox",
    "tabs",
    "radio-group"
  ];
  const locales = ["en", "km"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { locale, slug } = await params;
  const comp = componentsData[slug];

  if (!comp) {
    notFound();
  }

  return <ComponentPageClient locale={locale} slug={slug} />;
}
