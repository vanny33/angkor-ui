"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../utils/cn";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
  error?: string;
  animated?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      label,
      description,
      error,
      checked,
      defaultChecked,
      onCheckedChange,
      animated = true,
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique IDs
    const generatedId = React.useId();
    const checkboxId = id || `checkbox-${generatedId}`;
    const descId = `desc-${checkboxId}`;
    const errorId = `error-${checkboxId}`;

    const prefersReduced = useReducedMotion();
    const shouldAnimate = animated && !prefersReduced;

    const hasError = !!error;
    const hasDesc = !!description;

    return (
      <div className="flex gap-2.5 items-start">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : hasDesc ? descId : undefined
          }
          className={cn(
            "peer h-5 w-5 shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground flex items-center justify-center cursor-pointer select-none bg-background",
            hasError && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator asChild>
            <motion.span
              className="flex items-center justify-center text-current"
              initial={shouldAnimate ? { scale: 0.5, opacity: 0 } : false}
              animate={shouldAnimate ? { scale: 1, opacity: 1 } : {}}
              exit={shouldAnimate ? { scale: 0.5, opacity: 0 } : {}}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {checked === "indeterminate" ? (
                <Minus className="h-3.5 w-3.5 stroke-[3px]" />
              ) : (
                <Check className="h-3.5 w-3.5 stroke-[3px]" />
              )}
            </motion.span>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {(label || description || error) && (
          <div className="grid gap-1.5 leading-none select-none">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  "text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-75 cursor-pointer",
                  disabled && "cursor-not-allowed opacity-50",
                  hasError && "text-destructive"
                )}
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </label>
            )}

            {description && (
              <span
                id={descId}
                className={cn(
                  "text-xs text-muted-foreground",
                  disabled && "opacity-50"
                )}
              >
                {description}
              </span>
            )}

            {hasError && (
              <span id={errorId} className="text-xs text-destructive font-medium">
                {error}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
