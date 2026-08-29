"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "../utils/cn";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { animated?: boolean }
>(({ className, animated = true, ...props }, ref) => {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animated && !prefersReduced;

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      asChild
      {...props}
    >
      <motion.div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
          className
        )}
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={shouldAnimate ? { opacity: 1 } : {}}
        exit={shouldAnimate ? { opacity: 0 } : {}}
        transition={{ duration: 0.2 }}
      />
    </DialogPrimitive.Overlay>
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: "sm" | "md" | "lg" | "full";
  mobileBottomSheet?: boolean;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  animated?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size = "md",
      mobileBottomSheet = false,
      showCloseButton = true,
      closeOnOutsideClick = true,
      animated = true,
      onPointerDownOutside,
      onInteractOutside,
      ...props
    },
    ref
  ) => {
    const prefersReduced = useReducedMotion();
    const shouldAnimate = animated && !prefersReduced;

    const sizeClasses = {
      sm: "sm:max-w-[384px] max-w-[95vw] rounded-lg",
      md: "sm:max-w-[512px] max-w-[95vw] rounded-lg",
      lg: "sm:max-w-[768px] max-w-[95vw] rounded-lg",
      full: "max-w-full w-full h-full rounded-none inset-0 translate-x-0 translate-y-0 top-0 left-0",
    };

    // Mobile bottom sheet styles
    const bottomSheetClasses = mobileBottomSheet
      ? "max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:top-auto max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-t-xl max-sm:rounded-b-none max-sm:w-full max-sm:max-w-full"
      : "";

    // Handlers for click outside closing config
    const handleOutsideClick = (e: Event) => {
      if (!closeOnOutsideClick) {
        e.preventDefault();
      }
    };

    // Motion variants
    const overlayVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };

    const contentVariants = {
      initial: mobileBottomSheet
        ? { opacity: 0, y: "100%" }
        : { opacity: 0, scale: 0.95, y: "-48%", x: "-50%" },
      animate: mobileBottomSheet
        ? { opacity: 1, y: 0 }
        : { opacity: 1, scale: 1, y: "-50%", x: "-50%" },
      exit: mobileBottomSheet
        ? { opacity: 0, y: "100%" }
        : { opacity: 0, scale: 0.95, y: "-48%", x: "-50%" }
    };

    // If fullscreen, variants are simple
    const fullVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };

    const currentVariants = size === "full" ? fullVariants : contentVariants;

    return (
      <DialogPortal>
        <DialogOverlay animated={animated} />
        <DialogPrimitive.Content
          ref={ref}
          asChild
          onPointerDownOutside={(e) => {
            onPointerDownOutside?.(e);
            handleOutsideClick(e);
          }}
          onInteractOutside={(e) => {
            onInteractOutside?.(e);
            handleOutsideClick(e);
          }}
          {...props}
        >
          <motion.div
            className={cn(
              "fixed z-50 grid w-full gap-4 border border-border bg-background p-6 shadow-lg duration-200 outline-none overflow-y-auto max-h-[85vh]",
              // Default positioning (centered)
              size !== "full" && "left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]",
              sizeClasses[size],
              bottomSheetClasses,
              size === "full" && "max-h-full",
              className
            )}
            initial={shouldAnimate ? currentVariants.initial : false}
            animate={shouldAnimate ? currentVariants.animate : {}}
            exit={shouldAnimate ? currentVariants.exit : {}}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {children}
            {showCloseButton && (
              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none cursor-pointer">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left select-none",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
