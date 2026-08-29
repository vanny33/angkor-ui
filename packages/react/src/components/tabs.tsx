"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../utils/cn";

// Context to share variant, orientation and persistent option
interface TabsContextProps {
  variant?: "underline" | "pill" | "outline";
  orientation?: "horizontal" | "vertical";
  persistent?: boolean;
  activeValue: string;
  setActiveValue: (value: string) => void;
  animated?: boolean;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be rendered inside <Tabs>");
  }
  return context;
}

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: "underline" | "pill" | "outline";
  persistent?: boolean;
  animated?: boolean;
}

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  (
    {
      className,
      variant = "underline",
      orientation = "horizontal",
      persistent = false,
      animated = true,
      defaultValue,
      value,
      onValueChange,
      children,
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

    // Auto select first tab if none specified
    React.useEffect(() => {
      if (!activeValue && children) {
        const triggers = React.Children.toArray(children)
          .flatMap((child: any) =>
            child.type?.displayName === "TabsList" ? React.Children.toArray(child.props.children) : []
          )
          .filter((trigger: any) => trigger.props?.value);
        if (triggers.length > 0) {
          handleValueChange((triggers[0] as any).props.value);
        }
      }
    }, [children, activeValue]);

    return (
      <TabsContext.Provider
        value={{
          variant,
          orientation,
          persistent,
          activeValue,
          setActiveValue: handleValueChange,
          animated,
        }}
      >
        <TabsPrimitive.Root
          ref={ref}
          value={activeValue}
          onValueChange={handleValueChange}
          orientation={orientation}
          className={cn(
            "flex gap-4",
            orientation === "vertical" ? "flex-row" : "flex-col",
            className
          )}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant, orientation } = useTabsContext();

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center text-muted-foreground select-none overflow-x-auto overflow-y-hidden max-w-full scrollbar-none",
        // Orientation styles
        orientation === "vertical" ? "flex-col items-stretch border-r border-border" : "flex-row",
        // Variant base styles
        variant === "underline" && (orientation === "horizontal" ? "border-b border-border w-full justify-start" : ""),
        variant === "pill" && "bg-muted p-1 rounded-lg w-fit",
        variant === "outline" && "border border-border p-1 rounded-lg w-fit bg-background",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode;
  counter?: number | string;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, value, icon, counter, disabled, ...props }, ref) => {
  const { variant, orientation, activeValue, animated } = useTabsContext();
  const isActive = activeValue === value;
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animated && !prefersReduced;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none text-muted-foreground hover:text-foreground",
        // Underline styles
        variant === "underline" &&
          (orientation === "horizontal"
            ? "border-b-2 border-transparent pb-3 pt-2 px-4 rounded-none"
            : "border-r-2 border-transparent pr-4 pl-3 py-3 rounded-none text-left justify-start"),
        variant === "underline" && isActive && "text-foreground",
        // Pill styles
        (variant === "pill" || variant === "outline") && "rounded-md px-3 py-1.5",
        (variant === "pill" || variant === "outline") && isActive && "text-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {/* Sliding Active Background/Underline Indicator using Motion */}
      {isActive && shouldAnimate && (
        <motion.div
          layoutId={`active-indicator-${variant}`}
          className={cn(
            "absolute z-0",
            variant === "underline" &&
              (orientation === "horizontal"
                ? "bottom-0 left-0 right-0 h-[2px] bg-primary"
                : "right-0 top-0 bottom-0 w-[2px] bg-primary"),
            variant === "pill" && "inset-0 bg-background rounded-md shadow-sm",
            variant === "outline" && "inset-0 bg-muted rounded-md"
          )}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Content wrapper to stay on top of the indicator */}
      <span className="relative z-10 flex items-center gap-1.5">
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
        {counter !== undefined && (
          <span
            className={cn(
              "text-xs px-1.5 py-0.5 rounded-full font-bold select-none",
              isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {counter}
          </span>
        )}
      </span>
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, value, ...props }, ref) => {
  const { persistent, activeValue } = useTabsContext();
  const isActive = activeValue === value;

  // Custom persistent behavior: render elements but hide them via display:none
  if (persistent) {
    return (
      <div
        ref={ref as any}
        style={{ display: isActive ? "block" : "none" }}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <TabsPrimitive.Content
      ref={ref}
      value={value}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
