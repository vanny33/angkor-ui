import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "../button";
import { Input } from "../input";
import { Checkbox } from "../checkbox";
import { RadioGroup } from "../radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";
import { Select } from "../select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "../dialog";
import { KhmerDatePicker, toKhmerNumerals } from "../date-picker";
import { DataTable } from "../data-table";

// Mock ResizeObserver which is needed by Radix/Popover/Dialog
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Button Component", () => {
  it("renders correctly with children", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDefined();
  });

  it("handles loading state and disables the button", () => {
    render(<Button loading>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button.hasAttribute("disabled")).toBe(true);
  });

  it("triggers click handlers when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("Input Component", () => {
  it("renders label, helper text, and input field", () => {
    render(
      <Input
        label="Username"
        helperText="Enter your unique username"
        placeholder="User123"
      />
    );
    expect(screen.getByText("Username")).toBeDefined();
    expect(screen.getByText("Enter your unique username")).toBeDefined();
    expect(screen.getByPlaceholderText("User123")).toBeDefined();
  });

  it("handles character limits and counter", () => {
    render(<Input maxLength={10} defaultValue="Hello" />);
    expect(screen.getByText("5/10")).toBeDefined();
  });

  it("toggles password visibility", () => {
    render(<Input type="password" placeholder="Pass" showPasswordToggle />);
    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toBeDefined();

    const input = screen.getByPlaceholderText("Pass") as HTMLInputElement;
    expect(input.type).toBe("password");

    // Click toggle to show
    fireEvent.click(toggleButton);
    expect(input.type).toBe("text");
  });
});

describe("Checkbox Component", () => {
  it("renders with labels and triggers onChange", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        id="terms"
        label="I agree"
        description="Read carefully"
        onCheckedChange={handleChange}
      />
    );

    const label = screen.getByText("I agree");
    expect(label).toBeDefined();
    expect(screen.getByText("Read carefully")).toBeDefined();

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });
});

describe("Radio Group Component", () => {
  it("renders options and handles selection", () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup
        label="Language"
        defaultValue="km"
        onValueChange={handleChange}
        options={[
          { value: "km", label: "Khmer" },
          { value: "en", label: "English" },
        ]}
      />
    );

    expect(screen.getByText("Language")).toBeDefined();
    expect(screen.getByText("Khmer")).toBeDefined();
    expect(screen.getByText("English")).toBeDefined();

    const englishRadio = screen.getByLabelText("English");
    fireEvent.click(englishRadio);
    expect(handleChange).toHaveBeenCalledWith("en");
  });
});

describe("Tabs Component", () => {
  it("switches tabs correctly", async () => {
    const handleChange = vi.fn();
    render(
      <Tabs defaultValue="tab1" onValueChange={handleChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByText("Content 1")).toBeDefined();
    expect(screen.queryByText("Content 2")).toBeNull();

    const tab2Trigger = screen.getByRole("tab", { name: "Tab 2" });
    
    // Dispatch a complete sequence of events to activate the trigger in jsdom
    tab2Trigger.focus();
    fireEvent.mouseDown(tab2Trigger);
    fireEvent.pointerDown(tab2Trigger);
    fireEvent.mouseUp(tab2Trigger);
    fireEvent.pointerUp(tab2Trigger);
    fireEvent.click(tab2Trigger);
    fireEvent.keyDown(tab2Trigger, { key: "Enter", code: "Enter" });
    fireEvent.keyDown(tab2Trigger, { key: " ", code: "Space" });

    expect(await screen.findByText("Content 2")).toBeDefined();
    expect(screen.queryByText("Content 1")).toBeNull();
  });
});

describe("Select Component", () => {
  it("renders option list and filters based on search", () => {
    const handleChange = vi.fn();
    render(
      <Select
        options={[
          { value: "opt1", label: "Apple" },
          { value: "opt2", label: "Banana" },
        ]}
        onChange={handleChange}
        searchable
        locale="en"
      />
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.getByText("Banana")).toBeDefined();

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Apple" } });

    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.queryByText("Banana")).toBeNull();
  });
});

describe("Dialog Component", () => {
  it("opens and closes content", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Modal</DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal Header</DialogTitle>
          <p>Dialog body text</p>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByText("Modal Header")).toBeNull();

    const trigger = screen.getByText("Open Modal");
    fireEvent.click(trigger);

    expect(screen.getByText("Modal Header")).toBeDefined();
    expect(screen.getByText("Dialog body text")).toBeDefined();
  });
});

describe("Khmer Date Picker", () => {
  it("converts digits to Khmer numerals", () => {
    expect(toKhmerNumerals("2026-08-29")).toBe("២០២៦-០៨-២៩");
  });

  it("renders correctly with placeholder", () => {
    render(<KhmerDatePicker placeholder="Select a day" locale="en" />);
    expect(screen.getByRole("button", { name: /select a day/i })).toBeDefined();
  });
});

describe("Data Table", () => {
  it("renders correctly with header and row cells", () => {
    const columns = [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
    ];
    const data = [
      { id: "1", name: "Angkor Wat" },
      { id: "2", name: "Bayon Temple" },
    ];

    render(<DataTable columns={columns} data={data} locale="en" />);

    expect(screen.getAllByText("Name").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Angkor Wat").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Bayon Temple").length).toBeGreaterThan(0);
  });
});
