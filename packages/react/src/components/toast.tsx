"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, Loader2, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "../utils/cn";
import { useToast, type ToastItem, type ToastVariant } from "../hooks/use-toast";

export interface ToasterProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  animated?: boolean;
  locale?: "km" | "en";
}

const toastIcons: Record<ToastVariant, React.ComponentType<any> | null> = {
  default: null,
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

export function Toaster({
  position = "bottom-right",
  animated = true,
  locale = "km",
}: ToasterProps) {
  const { toasts, dismiss, remove } = useToast();

  const viewportClasses = {
    "top-right": "top-0 right-0 flex-col-reverse",
    "top-left": "top-0 left-0 flex-col-reverse",
    "bottom-right": "bottom-0 right-0 flex-col",
    "bottom-left": "bottom-0 left-0 flex-col",
  };

  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed z-50 flex max-h-screen w-full md:max-w-[420px] p-4 pointer-events-none gap-3 overflow-hidden select-none",
        viewportClasses[position]
      )}
    >
      <AnimatePresence mode="popLayout">
        {toasts
          .filter((t) => t.open !== false)
          .map((toast) => (
            <ToastItemComponent
              key={toast.id}
              toast={toast}
              position={position}
              animated={animated}
              locale={locale}
              onClose={() => dismiss(toast.id)}
              onRemoveComplete={() => remove(toast.id)}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: ToastItem;
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  animated: boolean;
  locale: "km" | "en";
  onClose: () => void;
  onRemoveComplete: () => void;
}

function ToastItemComponent({
  toast,
  position,
  animated,
  locale,
  onClose,
  onRemoveComplete,
}: ToastItemProps) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animated && !prefersReduced;

  const { id, variant = "default", title, description, action, duration = 5000 } = toast;
  const Icon = toastIcons[variant];

  // Pause on hover timer logic
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = React.useRef<number>(0);
  const remainingTimeRef = React.useRef<number>(duration);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onClose();
    }, remainingTimeRef.current);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      remainingTimeRef.current -= Date.now() - startTimeRef.current;
    }
  };

  React.useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [id, duration]);

  // Translate default messages if needed
  const displayTitle = React.useMemo(() => {
    if (title) return title;
    if (variant === "success") return locale === "km" ? "រក្សាទុកដោយជោគជ័យ" : "Saved successfully";
    if (variant === "error") return locale === "km" ? "មិនអាចរក្សាទុកបានទេ" : "Unable to save";
    if (variant === "loading") return locale === "km" ? "កំពុងដំណើរការ..." : "Loading...";
    return "";
  }, [title, variant, locale]);

  // Motion animation presets matching position
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  const variants = {
    initial: {
      opacity: 0,
      x: shouldAnimate ? (isLeft ? -100 : 100) : 0,
      y: shouldAnimate ? (isTop ? -30 : 30) : 0,
      scale: shouldAnimate ? 0.9 : 1,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.15 },
    },
  };

  // Toast variant colors
  const variantStyles = {
    default: "bg-background text-foreground border-border",
    success: "bg-background border-success text-foreground",
    error: "bg-background border-destructive text-foreground",
    warning: "bg-background border-warning text-foreground",
    info: "bg-background border-info text-foreground",
    loading: "bg-background border-border text-foreground",
  };

  const iconColors = {
    default: "text-muted-foreground",
    success: "text-success",
    error: "text-destructive",
    warning: "text-amber-500",
    info: "text-info",
    loading: "text-primary animate-spin",
  };

  return (
    <motion.div
      layout
      variants={variants}
      initial={shouldAnimate ? "initial" : false}
      animate="animate"
      exit="exit"
      onAnimationComplete={(definition) => {
        if (definition === "exit") {
          onRemoveComplete();
        }
      }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
      className={cn(
        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <span className={cn("mt-0.5 shrink-0", iconColors[variant])}>
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="grid gap-1">
          {displayTitle && <h3 className="text-sm font-semibold leading-none">{displayTitle}</h3>}
          {description && <div className="text-xs opacity-90 leading-normal">{description}</div>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {action && <div className="pointer-events-auto">{action}</div>}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-sm p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground hover:opacity-100 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          style={{ opacity: 0.5 }} // Ensure always visible for clarity
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
