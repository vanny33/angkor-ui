"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../utils/cn";

export interface RadioGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string;
  description?: string;
  error?: string;
  options?: RadioGroupOption[];
  orientation?: "horizontal" | "vertical";
  cardStyle?: boolean;
  required?: boolean;
  animated?: boolean;
  renderOption?: (option: RadioGroupOption, isSelected: boolean) => React.ReactNode;
}

const RadioGroupContext = React.createContext<{
  cardStyle?: boolean;
  animated?: boolean;
  activeValue?: string | null;
  setActiveValue?: (val: string) => void;
} | null>(null);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      className,
      label,
      description,
      error,
      options,
      orientation = "vertical",
      cardStyle = false,
      required = false,
      animated = true,
      renderOption,
      value,
      defaultValue,
      onValueChange,
      children,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
    const isControlled = value !== undefined;
    const activeValue = isControlled ? value : uncontrolledValue;

    const handleValueChange = (val: string) => {
      if (!isControlled) {
        setUncontrolledValue(val);
      }
      if (onValueChange) {
        onValueChange(val);
      }
    };

    const generatedId = React.useId();
    const groupId = id || `radiogroup-${generatedId}`;
    const descId = `desc-${groupId}`;
    const errorId = `error-${groupId}`;

    const hasError = !!error;
    const hasDesc = !!description;

    const groupContent = options ? (
      options.map((opt) => {
        const isSelected = opt.value === activeValue;
        return (
          <RadioGroupItem
            key={opt.value}
            value={opt.value}
            id={`${groupId}-${opt.value}`}
            disabled={opt.disabled}
            className={cn(
              cardStyle && isSelected && "border-primary bg-muted/10"
            )}
          >
            {renderOption ? (
              renderOption(opt, isSelected)
            ) : (
              <div className="grid gap-0.5 leading-none">
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                {opt.description && (
                  <span className="text-xs text-muted-foreground">{opt.description}</span>
                )}
              </div>
            )}
          </RadioGroupItem>
        );
      })
    ) : (
      children
    );

    return (
      <RadioGroupContext.Provider
        value={{
          cardStyle,
          animated,
          activeValue,
          setActiveValue: handleValueChange,
        }}
      >
        <div className="w-full flex flex-col gap-2">
          {label && (
            <label
              className={cn(
                "text-sm font-semibold leading-none select-none",
                hasError && "text-destructive"
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}

          {description && (
            <span id={descId} className="text-xs text-muted-foreground select-none">
              {description}
            </span>
          )}

          <RadioGroupPrimitive.Root
            ref={ref}
            id={groupId}
            value={activeValue}
            onValueChange={handleValueChange}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : hasDesc ? descId : undefined
            }
            className={cn(
              "grid gap-2.5",
              orientation === "horizontal" ? "grid-flow-col auto-cols-max" : "grid-cols-1",
              className
            )}
            {...props}
          >
            {groupContent}
          </RadioGroupPrimitive.Root>

          {hasError && (
            <span id={errorId} className="text-xs text-destructive font-medium">
              {error}
            </span>
          )}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  id: string;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, children, value, disabled, id, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const cardStyle = context?.cardStyle ?? false;
  const animated = context?.animated ?? true;
  const activeValue = context?.activeValue;
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animated && !prefersReduced;

  const isSelected = activeValue === value;

  const innerItem = (
    <div className="flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        disabled={disabled}
        id={id}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer select-none bg-background shrink-0",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator asChild>
          <motion.span
            className="flex items-center justify-center"
            initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { scale: 1, opacity: 1 } : {}}
            exit={shouldAnimate ? { scale: 0, opacity: 0 } : {}}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
          </motion.span>
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {children && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none cursor-pointer",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {children}
        </label>
      )}
    </div>
  );

  if (cardStyle) {
    return (
      <div
        onClick={() => {
          if (!disabled && context?.setActiveValue) {
            context.setActiveValue(value);
          }
        }}
        className={cn(
          "flex items-start rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/10 cursor-pointer select-none",
          isSelected && "border-primary",
          disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
        )}
      >
        {innerItem}
      </div>
    );
  }

  return innerItem;
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
