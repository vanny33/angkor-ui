const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "../packages/react/src/components");
const utilsDir = path.join(__dirname, "../packages/react/src/utils");
const outputDir = path.join(__dirname, "../apps/docs/public/registry");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Mappings of npm dependencies and internal component dependencies
const componentMetadata = {
  button: {
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "motion", "@radix-ui/react-slot"],
    registryDependencies: []
  },
  input: {
    dependencies: ["clsx", "tailwind-merge", "motion", "lucide-react"],
    registryDependencies: []
  },
  checkbox: {
    dependencies: ["clsx", "tailwind-merge", "motion", "lucide-react", "@radix-ui/react-checkbox"],
    registryDependencies: []
  },
  select: {
    dependencies: ["clsx", "tailwind-merge", "motion", "lucide-react", "@radix-ui/react-popover"],
    registryDependencies: []
  },
  dialog: {
    dependencies: ["clsx", "tailwind-merge", "motion", "lucide-react", "@radix-ui/react-dialog"],
    registryDependencies: []
  },
  toast: {
    dependencies: ["clsx", "tailwind-merge", "motion", "lucide-react"],
    registryDependencies: []
  },
  tabs: {
    dependencies: ["clsx", "tailwind-merge", "motion", "@radix-ui/react-tabs"],
    registryDependencies: []
  },
  "radio-group": {
    dependencies: ["clsx", "tailwind-merge", "motion", "@radix-ui/react-radio-group"],
    registryDependencies: []
  },
  "data-table": {
    dependencies: ["clsx", "tailwind-merge", "@tanstack/react-table", "lucide-react"],
    registryDependencies: ["button", "input", "select"]
  },
  "date-picker": {
    dependencies: ["clsx", "tailwind-merge", "motion", "lucide-react", "react-day-picker", "date-fns", "@radix-ui/react-popover"],
    registryDependencies: ["button"]
  }
};

// Bilingual descriptions for each component
const componentDescriptions = {
  button: {
    en: "Beautiful, animated button component with multiple sizes and variants.",
    km: "ប៊ូតុងដ៏ស្រស់ស្អាតនិងមានចលនា ជាមួយទំហំនិងជម្រើសជាច្រើន។"
  },
  input: {
    en: "Customizable text input field with labels, errors, counters, and password toggle.",
    km: "ប្រអប់បញ្ចូលអត្ថបទអាចកែតម្រូវបាន ជាមួយស្លាក កំហុស កុងទ័រ និងប៊ូតុងបង្ហាញលេខសម្ងាត់។"
  },
  checkbox: {
    en: "Accessible checkbox component supporting standard, indeterminate, and description states.",
    km: "ប្រអប់ធីកងាយស្រួលប្រើ គាំទ្រស្ថានភាពធម្មតា មិនទាន់សម្រេច និងការពិពណ៌នា។"
  },
  select: {
    en: "Animated combobox select component with built-in search and clear actions.",
    km: "ប្រអប់ជ្រើសរើសមានចលនា ជាមួយមុខងារស្វែងរកនិងលុបជម្រើស។"
  },
  dialog: {
    en: "Compound overlay modal dialog component with keyboard escape and focus trap.",
    km: "ប្រអប់សារផ្ទាំងលេចឡើង ជាមួយការគ្រប់គ្រងក្តារចុច និងការកំណត់ទំហំផ្សេងៗ។"
  },
  toast: {
    en: "A queueable notification system with imperative triggers and promise toasts.",
    km: "ប្រព័ន្ធផ្ដល់ដំណឹងដែលអាចតម្រៀបជួរបាន ជាមួយកាតសេចក្ដីប្រកាសនិងចលនា។"
  },
  tabs: {
    en: "Flexible tab selector with sliding active indicators and persistent contents.",
    km: "ផ្ទាំងជ្រើសរើសមាតិកាដ៏បត់បែន ជាមួយសញ្ញាសម្គាល់ផ្ទាំងសកម្មនិងចលនារុញ។"
  },
  "radio-group": {
    en: "Accessible radio group inputs with card style options and dot scaling animation.",
    km: "ក្រុមប៊ូតុងមូលជ្រើសរើស ជាមួយជម្រើសរចនាប័ទ្មកាតនិងចលនាចំណុចកណ្ដាល។"
  },
  "data-table": {
    en: "TanStack Table configuration with client/server pagination, mobile responsive mode, and CSV exports.",
    km: "តារាងទិន្នន័យ TanStack Table ជាមួយការបែងចែកទំព័រ របៀបបង្ហាញលើទូរស័ព្ទ និងការទាញយក CSV។"
  },
  "date-picker": {
    en: "Khmer/English date picker wrapping React DayPicker and optional Khmer numerals.",
    km: "ប្រអប់ជ្រើសរើសកាលបរិច្ឆេទខ្មែរ/អង់គ្លេស ជាមួយលេខខ្មែរនិងប៊ូតុងកំណត់ឡើងវិញ។"
  }
};

const registryIndex = [];

// Build components registry JSONs
Object.keys(componentMetadata).forEach((name) => {
  const metadata = componentMetadata[name];
  const desc = componentDescriptions[name];

  const sourceFile = name === "date-picker" ? "date-picker.tsx" : `${name}.tsx`;
  const filePath = path.join(componentsDir, sourceFile);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");

    const registryEntry = {
      name,
      description: desc,
      dependencies: metadata.dependencies,
      registryDependencies: metadata.registryDependencies,
      files: [
        {
          name: sourceFile,
          content: content
        }
      ]
    };

    // Write individual component JSON
    fs.writeFileSync(
      path.join(outputDir, `${name}.json`),
      JSON.stringify(registryEntry, null, 2),
      "utf8"
    );

    // Add to index
    registryIndex.push({
      name,
      description: desc,
      dependencies: metadata.dependencies,
      registryDependencies: metadata.registryDependencies
    });

    console.log(`Generated registry file: ${name}.json`);
  } else {
    console.error(`Source file not found for: ${name} at ${filePath}`);
  }
});

// Write utility files to registry for manual download or CLI reference
const utils = ["cn.ts", "animations.ts"];
utils.forEach((file) => {
  const filePath = path.join(utilsDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(
      path.join(outputDir, `${file}.json`),
      JSON.stringify({ name: file, content }, null, 2),
      "utf8"
    );
    console.log(`Generated utility registry file: ${file}.json`);
  }
});

// Write registry index.json
fs.writeFileSync(
  path.join(outputDir, "index.json"),
  JSON.stringify(registryIndex, null, 2),
  "utf8"
);
console.log("Generated registry index.json successfully.");
