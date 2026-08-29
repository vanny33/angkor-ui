"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils/cn";
import { slideDownVariants } from "../utils/animations";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
  renderOption?: (option: SelectOption) => React.ReactNode;
  locale?: "km" | "en";
  animated?: boolean;
  className?: string;
  id?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      defaultValue,
      placeholder,
      label,
      helperText,
      error,
      required = false,
      searchable = false,
      clearable = false,
      disabled = false,
      emptyMessage,
      searchPlaceholder,
      renderOption,
      locale = "km",
      animated = true,
      className,
      id,
    },
    ref
  ) => {
    // Controlled / Uncontrolled state
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
    const isControlled = value !== undefined;
    const activeValue = isControlled ? value : uncontrolledValue;

    // Popover open state
    const [isOpen, setIsOpen] = React.useState(false);

    // Search query state
    const [searchQuery, setSearchQuery] = React.useState("");

    // Keyboard focus index inside options list
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    // Generate unique IDs
    const generatedId = React.useId();
    const selectId = id || `select-${generatedId}`;
    const helperId = `helper-${selectId}`;
    const errorId = `error-${selectId}`;

    const handleSelect = (val: string) => {
      if (!isControlled) {
        setUncontrolledValue(val);
      }
      if (onChange) {
        onChange(val);
      }
      setIsOpen(false);
      setSearchQuery("");
      setFocusedIndex(-1);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelect("");
    };

    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    // Reset focused index when filtered list changes
    React.useEffect(() => {
      setFocusedIndex(-1);
    }, [filteredOptions]);

    // Find currently selected option
    const selectedOption = options.find((opt) => opt.value === activeValue);

    // Default localized messages
    const defaultSearchPlaceholder =
      searchPlaceholder || (locale === "km" ? "ស្វែងរក..." : "Search...");
    const defaultEmptyMessage =
      emptyMessage || (locale === "km" ? "រកមិនឃើញជម្រើសទេ" : "No options found");
    const defaultPlaceholder =
      placeholder || (locale === "km" ? "ជ្រើសរើស..." : "Select...");

    // Keyboard navigation handler
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (!isOpen) {
        if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= filteredOptions.length ? 0 : next;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? filteredOptions.length - 1 : next;
          });
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            const opt = filteredOptions[focusedIndex];
            if (!opt.disabled) {
              handleSelect(opt.value);
            }
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setSearchQuery("");
          break;
      }
    };

    const hasError = !!error;
    const hasHelper = !!helperText;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "text-sm font-medium leading-none select-none",
              hasError && "text-destructive"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <button
              ref={ref}
              id={selectId}
              disabled={disabled}
              onKeyDown={handleKeyDown}
              aria-invalid={hasError}
              aria-describedby={
                hasError ? errorId : hasHelper ? helperId : undefined
              }
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-pointer",
                hasError && "border-destructive focus:ring-destructive",
                className
              )}
            >
              <span className={cn("block truncate", !selectedOption && "text-muted-foreground")}>
                {selectedOption ? selectedOption.label : defaultPlaceholder}
              </span>

              <span className="flex items-center gap-1.5 ml-2 text-muted-foreground shrink-0">
                {clearable && activeValue && !disabled && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="hover:text-foreground focus:outline-none rounded-sm"
                    aria-label="Clear selection"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
              </span>
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={4}
              className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[220px] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none"
            >
              <AnimatePresence>
                <motion.div
                  variants={slideDownVariants}
                  initial={animated ? "initial" : false}
                  animate="animate"
                  exit="exit"
                  className="flex flex-col max-h-[300px] overflow-hidden"
                >
                  {/* Search Bar */}
                  {searchable && (
                    <div className="flex items-center border-b border-border px-2.5 py-2">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <input
                        type="text"
                        placeholder={defaultSearchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex h-7 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  )}

                  {/* Options List */}
                  <div className="overflow-y-auto py-1 flex-1">
                    {filteredOptions.length === 0 ? (
                      <div className="py-6 text-center text-sm text-muted-foreground select-none">
                        {defaultEmptyMessage}
                      </div>
                    ) : (
                      filteredOptions.map((option, idx) => {
                        const isSelected = option.value === activeValue;
                        const isFocused = idx === focusedIndex;

                        return (
                          <button
                            key={option.value}
                            disabled={option.disabled}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            onMouseEnter={() => setFocusedIndex(idx)}
                            className={cn(
                              "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none text-left disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
                              isFocused && "bg-accent text-accent-foreground",
                              isSelected && "font-medium"
                            )}
                          >
                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                              {isSelected && <Check className="h-4 w-4" />}
                            </span>
                            {renderOption ? (
                              renderOption(option)
                            ) : (
                              <span className="block truncate">{option.label}</span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Footer Messages */}
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
    );
  }
);

Select.displayName = "Select";

export { Select };
