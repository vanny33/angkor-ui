"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker, type DateRange } from "react-day-picker";
import { format, isValid } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "../utils/cn";
import { Button } from "./button";
import { slideDownVariants } from "../utils/animations";

export interface KhmerDatePickerProps {
  mode?: "single" | "range";
  value?: Date | DateRange;
  onChange?: (date: any) => void;
  defaultValue?: Date | DateRange;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[] | ((date: Date) => boolean);
  useKhmerNumerals?: boolean;
  locale?: "km" | "en";
  isoOutput?: boolean;
  animated?: boolean;
  className?: string;
  id?: string;
}

// Map ASCII digits to Khmer numerals
export function toKhmerNumerals(val: string | number): string {
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return String(val).replace(/\d/g, (digit) => khmerDigits[parseInt(digit)]);
}

// Gregorian Khmer translation arrays
const KHMER_MONTHS = [
  "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
  "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
];

const KHMER_WEEKDAYS_SHORT = ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"];
const KHMER_WEEKDAYS_LONG = [
  "អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"
];

export const KhmerDatePicker = React.forwardRef<HTMLButtonElement, KhmerDatePickerProps>(
  (
    {
      mode = "single",
      value,
      onChange,
      defaultValue,
      placeholder,
      label,
      error,
      helperText,
      required = false,
      disabled = false,
      minDate,
      maxDate,
      disabledDates,
      useKhmerNumerals = true,
      locale = "km",
      isoOutput = false,
      animated = true,
      className,
      id,
    },
    ref
  ) => {
    // Controlled / Uncontrolled state
    const [uncontrolledSingle, setUncontrolledSingle] = React.useState<Date | undefined>(
      mode === "single" ? (defaultValue as Date) : undefined
    );
    const [uncontrolledRange, setUncontrolledRange] = React.useState<DateRange | undefined>(
      mode === "range" ? (defaultValue as DateRange) : undefined
    );

    const isControlled = value !== undefined;
    const activeSingle = isControlled ? (value as Date | undefined) : uncontrolledSingle;
    const activeRange = isControlled ? (value as DateRange | undefined) : uncontrolledRange;

    const [isOpen, setIsOpen] = React.useState(false);
    const prefersReduced = useReducedMotion();
    const shouldAnimate = animated && !prefersReduced;

    const generatedId = React.useId();
    const pickerId = id || `datepicker-${generatedId}`;
    const helperId = `helper-${pickerId}`;
    const errorId = `error-${pickerId}`;

    // Handles date selection updates
    const handleSelect = (selectedDate: any) => {
      let outputVal = selectedDate;

      // Handle ISO conversion
      if (isoOutput) {
        if (mode === "single" && selectedDate instanceof Date) {
          outputVal = format(selectedDate, "yyyy-MM-dd");
        } else if (mode === "range" && selectedDate) {
          outputVal = {
            from: selectedDate.from ? format(selectedDate.from, "yyyy-MM-dd") : undefined,
            to: selectedDate.to ? format(selectedDate.to, "yyyy-MM-dd") : undefined,
          };
        }
      }

      if (!isControlled) {
        if (mode === "single") setUncontrolledSingle(selectedDate);
        else setUncontrolledRange(selectedDate);
      }

      if (onChange) {
        onChange(outputVal);
      }

      // Close on select only in single mode
      if (mode === "single" && selectedDate) {
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelect(undefined);
    };

    const handleToday = () => {
      const today = new Date();
      handleSelect(today);
      setIsOpen(false);
    };

    // Date formatting for button display
    const formattedDisplay = React.useMemo(() => {
      if (mode === "single") {
        if (!activeSingle || !isValid(activeSingle)) return "";
        const formatted = format(activeSingle, "dd-MM-yyyy");
        return locale === "km" && useKhmerNumerals ? toKhmerNumerals(formatted) : formatted;
      } else {
        if (!activeRange?.from) return "";
        const fromFormatted = format(activeRange.from, "dd-MM-yyyy");
        const toFormatted = activeRange.to ? format(activeRange.to, "dd-MM-yyyy") : "...";
        const displayStr = `${fromFormatted} - ${toFormatted}`;
        return locale === "km" && useKhmerNumerals ? toKhmerNumerals(displayStr) : displayStr;
      }
    }, [mode, activeSingle, activeRange, locale, useKhmerNumerals]);

    // Localized button & calendar labels
    const defaultPlaceholder =
      placeholder ||
      (locale === "km"
        ? mode === "single"
          ? "ជ្រើសរើសថ្ងៃ..."
          : "ជ្រើសរើសចន្លោះថ្ងៃ..."
        : mode === "single"
        ? "Select date..."
        : "Select date range...");

    const labels = {
      today: locale === "km" ? "ថ្ងៃនេះ" : "Today",
      clear: locale === "km" ? "សម្អាត" : "Clear",
    };

    // Custom Khmer calendar rendering formatters
    const khmerLocaleFormatters = {
      formatCaption: (date: Date) => {
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const monthName = KHMER_MONTHS[monthIndex];
        const yearDisplay = useKhmerNumerals ? toKhmerNumerals(year) : year;
        return `${monthName} ${yearDisplay}`;
      },
      formatDay: (date: Date) => {
        const day = date.getDate();
        return useKhmerNumerals ? toKhmerNumerals(day) : String(day);
      },
      formatWeekdayName: (date: Date) => {
        const dayIndex = date.getDay();
        return KHMER_WEEKDAYS_SHORT[dayIndex];
      },
    };

    const hasError = !!error;
    const hasHelper = !!helperText;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={pickerId}
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
              id={pickerId}
              disabled={disabled}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : hasHelper ? helperId : undefined}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-pointer",
                hasError && "border-destructive focus:ring-destructive",
                className
              )}
            >
              <span className={cn("block truncate", !formattedDisplay && "text-muted-foreground")}>
                {formattedDisplay || defaultPlaceholder}
              </span>

              <span className="flex items-center gap-1.5 ml-2 text-muted-foreground shrink-0">
                {formattedDisplay && !disabled && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="hover:text-foreground focus:outline-none rounded-sm"
                    aria-label="Clear date"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <CalendarIcon className="h-4 w-4" />
              </span>
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={4}
              className="z-50 w-auto rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-md outline-none max-w-[95vw]"
            >
              <AnimatePresence>
                <motion.div
                  variants={slideDownVariants}
                  initial={shouldAnimate ? "initial" : false}
                  animate="animate"
                  exit="exit"
                  className="flex flex-col gap-2"
                >
                  <DayPicker
                    mode={mode as any}
                    selected={mode === "single" ? activeSingle : activeRange}
                    onSelect={handleSelect}
                    fromDate={minDate}
                    toDate={maxDate}
                    disabled={disabledDates}
                    showOutsideDays
                    captionLayout="dropdown-buttons"
                    formatters={locale === "km" ? khmerLocaleFormatters : undefined}
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-between pt-1 relative items-center px-8",
                      caption_label: "text-sm font-semibold select-none",
                      caption_dropdowns: "flex justify-center gap-1 z-10",
                      dropdown: "rounded-md border border-input bg-popover px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-ring cursor-pointer",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-input rounded-md flex items-center justify-center cursor-pointer",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex justify-between",
                      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center select-none",
                      row: "flex w-full mt-2 justify-between",
                      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-muted focus:bg-muted outline-none flex items-center justify-center cursor-pointer select-none",
                      day_range_end: "day-range-end bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground font-semibold border border-primary/20",
                      day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/30 aria-selected:text-muted-foreground aria-selected:opacity-30",
                      day_disabled: "text-muted-foreground opacity-30 pointer-events-none",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                    }}
                  />

                  {/* Today and Clear footer buttons */}
                  <div className="flex items-center justify-between border-t border-border pt-2 px-1 gap-2">
                    {mode === "single" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToday}
                        className="text-xs h-8"
                        animated={false}
                      >
                        {labels.today}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSelect(undefined)}
                      className="text-xs h-8 ml-auto text-muted-foreground"
                      animated={false}
                    >
                      {labels.clear}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Footer messages */}
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

KhmerDatePicker.displayName = "KhmerDatePicker";
