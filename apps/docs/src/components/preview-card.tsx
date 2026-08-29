"use client";

import React, { useState } from "react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { Button } from "@angkor-ui/react";

interface PreviewCardProps {
  children: React.ReactNode;
  locale: "en" | "km";
}

export function PreviewCard({ children, locale }: PreviewCardProps) {
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const [isAnimated, setIsAnimated] = useState(true);

  // Clone children to inject animated={isAnimated} prop if possible
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // For groups of elements, we might have multiple children or subcomponents.
      // We can clone and override the animated prop on them.
      return React.cloneElement(child as React.ReactElement<any>, {
        animated: isAnimated,
        locale: locale,
      });
    }
    return child;
  });

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-background shadow-sm select-none">
      {/* Action Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
        <span className="text-xs font-semibold text-muted-foreground">
          {locale === "en" ? "Interactive Canvas" : "កន្លែងសាកល្បងសមាសភាគ"}
        </span>

        <div className="flex items-center gap-2">
          {/* Animated Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAnimated(!isAnimated)}
            leftIcon={<Sparkles className={`h-3.5 w-3.5 ${isAnimated ? "text-amber-500" : "text-muted-foreground"}`} />}
            className="text-xs h-8 px-2.5"
            animated={false}
          >
            {locale === "en" ? "Animation" : "ចលនា"}: {isAnimated ? "On" : "Off"}
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPreviewDark(!isPreviewDark)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            animated={false}
            aria-label="Toggle preview dark mode"
          >
            {isPreviewDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Renders content frame with toggled light/dark state classes */}
      <div
        className={`flex items-center justify-center p-8 sm:p-12 min-h-[220px] transition-colors ${
          isPreviewDark ? "dark bg-zinc-950 text-zinc-50" : "bg-background text-foreground"
        }`}
      >
        <div className="w-full flex justify-center">{childrenWithProps}</div>
      </div>
    </div>
  );
}
