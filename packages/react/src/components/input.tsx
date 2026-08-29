"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../utils/cn";
import { shakeVariants } from "../utils/animations";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  requiredIndicator?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  animated?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      requiredIndicator = false,
      leftIcon,
      rightIcon,
      showPasswordToggle = true,
      animated = true,
      disabled,
      required,
      id,
      onChange,
      value,
      defaultValue,
      maxLength,
      ...props
    },
    ref
  ) => {
    const prefersReduced = useReducedMotion();
    const shouldAnimate = animated && !prefersReduced;

    // Password visibility state
    const [showPassword, setShowPassword] = React.useState(false);
    const isPasswordType = type === "password";
    const currentType = isPasswordType && showPassword ? "text" : type;

    // Character counter state
    const [charCount, setCharCount] = React.useState(0);

    // Generate unique accessible IDs
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const labelId = `label-${inputId}`;
    const helperId = `helper-${inputId}`;
    const errorId = `error-${inputId}`;

    // Compute character length on change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      } else if (defaultValue !== undefined) {
        setCharCount(String(defaultValue).length);
      }
    }, [value, defaultValue]);

    const hasError = !!error;
    const hasHelper = !!helperText;

    // Build aria-describedby list
    const describedBy = [];
    if (hasHelper) describedBy.push(helperId);
    if (hasError) describedBy.push(errorId);

    const inputElement = (
      <input
        ref={ref}
        type={currentType}
        id={inputId}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        aria-invalid={hasError}
        aria-describedby={describedBy.length > 0 ? describedBy.join(" ") : undefined}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          leftIcon && "pl-10",
          (rightIcon || (isPasswordType && showPasswordToggle)) && "pr-10",
          hasError && "border-destructive focus-visible:ring-destructive",
          className
        )}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />
    );

    const wrapperContent = (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 flex items-center text-muted-foreground pointer-events-none">
            {leftIcon}
          </div>
        )}

        {inputElement}

        {isPasswordType && showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 flex items-center text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : (
          rightIcon && (
            <div className="absolute right-3 flex items-center text-muted-foreground pointer-events-none">
              {rightIcon}
            </div>
          )
        )}
      </div>
    );

    return (
      <div className="w-full flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none",
              hasError && "text-destructive"
            )}
          >
            {label}
            {required && requiredIndicator && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input Wrapper with shake animation on error */}
        {shouldAnimate && hasError ? (
          <motion.div variants={shakeVariants} animate="animate">
            {wrapperContent}
          </motion.div>
        ) : (
          wrapperContent
        )}

        {/* Bottom Elements: Helper, Error, and Character Counter */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col gap-1">
            {hasError && (
              <span id={errorId} className="text-xs text-destructive font-medium">
                {error}
              </span>
            )}
            {hasHelper && !hasError && (
              <span id={helperId} className="text-xs text-muted-foreground">
                {helperText}
              </span>
            )}
          </div>

          {maxLength && (
            <span className="text-xs text-muted-foreground whitespace-nowrap self-end select-none">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
