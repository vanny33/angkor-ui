"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@angkor-ui/react";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg border border-border bg-muted p-4 font-mono text-sm overflow-hidden select-text">
      <pre className="overflow-x-auto whitespace-pre pr-12 scrollbar-none max-h-[300px]">
        <code className="text-xs text-foreground/90">{code}</code>
      </pre>

      <div className="absolute right-3 top-3 opacity-80 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8 bg-background/80 hover:bg-background border-border shrink-0 cursor-pointer"
          animated={false}
          aria-label="Copy code snippet"
        >
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
