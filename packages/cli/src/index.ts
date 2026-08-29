#!/usr/bin/env node
import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import pc from "picocolors";
import prompts from "prompts";

const program = new Command();

// Determine registry location (checks local filesystem dev environment, otherwise uses localhost or docs URL)
const LOCAL_REGISTRY = path.resolve(__dirname, "../../../apps/docs/public/registry");
const REMOTE_REGISTRY = "http://localhost:3000/registry";

async function getRegistryData(file: string): Promise<any> {
  if (fs.existsSync(LOCAL_REGISTRY)) {
    const filePath = path.join(LOCAL_REGISTRY, file);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  }

  // Fallback to fetch
  try {
    const res = await fetch(`${REMOTE_REGISTRY}/${file}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error(pc.red(`Failed to fetch registry data for ${file}: ${err.message}`));
    process.exit(1);
  }
}

// Detect package manager in the project
function getPackageManager(): string {
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("yarn.lock")) return "yarn";
  if (fs.existsSync("package-lock.json")) return "npm";
  return "npm";
}

// Append theme CSS variables based on selected theme
function getThemeCss(themeName: string): string {
  // We can fetch from themes or hardcode standard theme variables for simplicity
  const themes: Record<string, string> = {
    default: `
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --success: 142.1 76.2% 36.3%;
  --success-foreground: 355.6 100% 97.3%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 98%;
  --info: 214 90% 52%;
  --info-foreground: 210 40% 98%;
`,
    "angkor-gold": `
  --background: 36 30% 97%;
  --foreground: 36 40% 10%;
  --card: 36 20% 99%;
  --card-foreground: 36 40% 10%;
  --popover: 36 20% 99%;
  --popover-foreground: 36 40% 10%;
  --primary: 36 80% 40%;
  --primary-foreground: 36 30% 98%;
  --secondary: 36 20% 92%;
  --secondary-foreground: 36 40% 12%;
  --muted: 36 15% 94%;
  --muted-foreground: 36 20% 40%;
  --accent: 36 30% 92%;
  --accent-foreground: 36 80% 35%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --success: 142 70% 35%;
  --success-foreground: 144 60% 98%;
  --border: 36 20% 86%;
  --input: 36 20% 86%;
  --ring: 36 80% 40%;
  --radius: 0.5rem;
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 98%;
  --info: 214 90% 52%;
  --info-foreground: 210 40% 98%;
`,
    "bayon-stone": `
  --background: 120 4% 97%;
  --foreground: 120 10% 12%;
  --card: 120 4% 98%;
  --card-foreground: 120 10% 12%;
  --popover: 120 4% 98%;
  --popover-foreground: 120 10% 12%;
  --primary: 120 10% 35%;
  --primary-foreground: 120 4% 98%;
  --secondary: 120 6% 91%;
  --secondary-foreground: 120 10% 15%;
  --muted: 120 5% 93%;
  --muted-foreground: 120 8% 42%;
  --accent: 120 8% 90%;
  --accent-foreground: 120 12% 25%;
  --destructive: 0 80% 58%;
  --destructive-foreground: 0 0% 98%;
  --success: 142 65% 35%;
  --success-foreground: 144 60% 98%;
  --border: 120 6% 87%;
  --input: 120 6% 87%;
  --ring: 120 10% 35%;
  --radius: 0.5rem;
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 98%;
  --info: 214 90% 52%;
  --info-foreground: 210 40% 98%;
`,
    "mekong-blue": `
  --background: 210 20% 98%;
  --foreground: 210 30% 12%;
  --card: 210 20% 99%;
  --card-foreground: 210 30% 12%;
  --popover: 210 20% 99%;
  --popover-foreground: 210 30% 12%;
  --primary: 210 50% 32%;
  --primary-foreground: 210 20% 98%;
  --secondary: 210 15% 91%;
  --secondary-foreground: 210 30% 15%;
  --muted: 210 10% 93%;
  --muted-foreground: 210 15% 42%;
  --accent: 210 20% 91%;
  --accent-foreground: 210 50% 28%;
  --destructive: 0 80% 58%;
  --destructive-foreground: 0 0% 98%;
  --success: 142 65% 35%;
  --success-foreground: 144 60% 98%;
  --border: 210 15% 87%;
  --input: 210 15% 87%;
  --ring: 210 50% 32%;
  --radius: 0.5rem;
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 98%;
  --info: 214 90% 52%;
  --info-foreground: 210 40% 98%;
`,
    "royal-red": `
  --background: 350 15% 98%;
  --foreground: 350 40% 12%;
  --card: 350 15% 99%;
  --card-foreground: 350 40% 12%;
  --popover: 350 15% 99%;
  --popover-foreground: 350 40% 12%;
  --primary: 350 75% 35%;
  --primary-foreground: 350 15% 98%;
  --secondary: 350 12% 91%;
  --secondary-foreground: 350 40% 15%;
  --muted: 350 10% 93%;
  --muted-foreground: 350 15% 42%;
  --accent: 350 15% 91%;
  --accent-foreground: 350 75% 30%;
  --destructive: 0 80% 58%;
  --destructive-foreground: 0 0% 98%;
  --success: 142 65% 35%;
  --success-foreground: 144 60% 98%;
  --border: 350 12% 87%;
  --input: 350 12% 87%;
  --ring: 350 75% 35%;
  --radius: 0.5rem;
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 98%;
  --info: 214 90% 52%;
  --info-foreground: 210 40% 98%;
`
  };

  return themes[themeName] || themes.default;
}

program
  .name("angkor-ui")
  .description("Bilingual Khmer/English React component library CLI.")
  .version("1.0.0");

// Command: init
program
  .command("init")
  .description("Initialize configuration and style presets in your project.")
  .action(async () => {
    console.log(pc.yellow("Initializing Angkor UI setup..."));

    if (!fs.existsSync("package.json")) {
      console.error(pc.red("No package.json found. Please run this in the root of your project."));
      process.exit(1);
    }

    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const isTs = fs.existsSync("tsconfig.json");

    // Detect standard dirs
    const hasSrc = fs.existsSync("src");
    const defaultComponentsDir = hasSrc ? "src/components" : "components";
    const defaultUtilsDir = hasSrc ? "src/utils" : "utils";

    // Detect globals CSS file
    let defaultCssPath = "src/index.css";
    if (fs.existsSync("app/globals.css")) defaultCssPath = "app/globals.css";
    else if (fs.existsSync("src/app/globals.css")) defaultCssPath = "src/app/globals.css";
    else if (fs.existsSync("src/globals.css")) defaultCssPath = "src/globals.css";

    const responses = await prompts([
      {
        type: "text",
        name: "componentsPath",
        message: "Where should the components be installed?",
        initial: defaultComponentsDir
      },
      {
        type: "text",
        name: "utilsPath",
        message: "Where should the utilities (cn, animations) be installed?",
        initial: defaultUtilsDir
      },
      {
        type: "text",
        name: "cssPath",
        message: "Where is your global CSS file located?",
        initial: defaultCssPath
      },
      {
        type: "select",
        name: "theme",
        message: "Choose a default theme for Angkor UI:",
        choices: [
          { title: "Default (Slate/Zinc)", value: "default" },
          { title: "Angkor Gold (Charcoal & Gold)", value: "angkor-gold" },
          { title: "Bayon Stone (Stone Gray/Green)", value: "bayon-stone" },
          { title: "Mekong Blue (River Blue)", value: "mekong-blue" },
          { title: "Royal Red (Crimson & Maroon)", value: "royal-red" }
        ],
        initial: 0
      }
    ]);

    if (!responses.cssPath) {
      console.log(pc.red("Initialization cancelled."));
      process.exit(0);
    }

    const config = {
      $schema: "http://angkor-ui.com/schema.json",
      tailwind: {
        config: fs.existsSync("tailwind.config.ts") ? "tailwind.config.ts" : "tailwind.config.js",
        css: responses.cssPath
      },
      aliases: {
        components: responses.componentsPath,
        utils: responses.utilsPath
      },
      theme: responses.theme
    };

    // Save configuration file
    fs.writeFileSync("angkor-ui.json", JSON.stringify(config, null, 2), "utf8");
    console.log(pc.green("Created angkor-ui.json"));

    // Ensure folders exist
    fs.mkdirSync(responses.componentsPath, { recursive: true });
    fs.mkdirSync(responses.utilsPath, { recursive: true });

    // 1. Write cn.ts utility
    const cnContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    fs.writeFileSync(path.join(responses.utilsPath, isTs ? "cn.ts" : "cn.js"), cnContent, "utf8");
    console.log(pc.green("Created cn utility"));

    // 2. Fetch/Write animations.ts utility
    const animationsData = await getRegistryData("animations.ts.json");
    fs.writeFileSync(
      path.join(responses.utilsPath, isTs ? "animations.ts" : "animations.js"),
      animationsData.content,
      "utf8"
    );
    console.log(pc.green("Created animations presets utility"));

    // 3. Inject CSS theme variables
    let cssContent = "";
    if (fs.existsSync(responses.cssPath)) {
      cssContent = fs.readFileSync(responses.cssPath, "utf8");
    }

    const themeVars = getThemeCss(responses.theme);
    const themeBlock = `
@layer base {
  :root {${themeVars}  }
}
`;

    // Only append if it doesn't already contain base layers from us
    if (!cssContent.includes("--primary")) {
      fs.writeFileSync(responses.cssPath, cssContent + "\n" + themeBlock, "utf8");
      console.log(pc.green("Appended theme CSS variables to " + responses.cssPath));
    } else {
      console.log(pc.yellow("Theme variables already exist in CSS. Skipping append."));
    }

    // Install base dependencies
    const pm = getPackageManager();
    const dependencies = ["clsx", "tailwind-merge", "class-variance-authority", "motion", "lucide-react"];

    // Filter to only missing dependencies
    const missingDeps = dependencies.filter(
      (dep) => !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
    );

    if (missingDeps.length > 0) {
      console.log(pc.cyan(`Installing missing dependencies: ${missingDeps.join(", ")}...`));
      const installCmd = pm === "pnpm" ? `pnpm add ${missingDeps.join(" ")}` : `${pm} install ${missingDeps.join(" ")}`;
      try {
        execSync(installCmd, { stdio: "inherit" });
        console.log(pc.green("Installed packages successfully."));
      } catch (err: any) {
        console.error(pc.red(`Failed to install packages: ${err.message}`));
      }
    } else {
      console.log(pc.green("All base dependencies are already installed."));
    }

    console.log(pc.bold(pc.green("\nAngkor UI initialized successfully! 🇰🇭")));
  });

// Command: list
program
  .command("list")
  .description("List all available components in the Angkor UI registry.")
  .action(async () => {
    console.log(pc.yellow("Fetching component list from registry..."));
    const index = await getRegistryData("index.json");

    console.log(pc.bold("\nAvailable Components:\n"));
    console.log(pc.bold(pc.cyan(`${"Component".padEnd(16)} | ${"Description (English)".padEnd(50)} | Description (Khmer)`)));
    console.log(pc.gray("-".repeat(110)));

    index.forEach((item: any) => {
      console.log(
        `${pc.green(item.name.padEnd(16))} | ${item.description.en.padEnd(50)} | ${item.description.km}`
      );
    });
    console.log();
  });

// Command: add
program
  .command("add [components...]")
  .description("Add one or more components to your project.")
  .action(async (components: string[]) => {
    if (!fs.existsSync("angkor-ui.json")) {
      console.error(pc.red("Project is not initialized. Please run `npx angkor-ui init` first."));
      process.exit(1);
    }

    if (!components || components.length === 0) {
      console.error(pc.red("Please specify at least one component to add (e.g. `add button`)."));
      process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync("angkor-ui.json", "utf8"));
    const componentsPath = config.aliases.components;
    const isTs = fs.existsSync("tsconfig.json");

    // Fetch the list index to validate requested components
    const index = await getRegistryData("index.json");
    const availableComponentNames: string[] = index.map((item: any) => item.name);

    // Resolve component dependency tree
    const installQueue = new Set<string>();

    async function resolveDependencies(compName: string) {
      if (installQueue.has(compName)) return;

      if (!availableComponentNames.includes(compName)) {
        console.error(pc.red(`Component "${compName}" not found in registry.`));
        process.exit(1);
      }

      installQueue.add(compName);

      // Fetch component detail to get internal dependencies
      const compData = await getRegistryData(`${compName}.json`);
      if (compData.registryDependencies && compData.registryDependencies.length > 0) {
        for (const dep of compData.registryDependencies) {
          await resolveDependencies(dep);
        }
      }
    }

    for (const comp of components) {
      await resolveDependencies(comp);
    }

    console.log(pc.cyan(`Resolving registry components: ${Array.from(installQueue).join(", ")}`));

    // Install missing npm packages
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const allNpmDeps = new Set<string>();

    for (const compName of installQueue) {
      const compData = await getRegistryData(`${compName}.json`);
      if (compData.dependencies) {
        compData.dependencies.forEach((d: string) => allNpmDeps.add(d));
      }
    }

    // Filter to missing npm packages
    const missingNpm = Array.from(allNpmDeps).filter(
      (dep) => !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
    );

    if (missingNpm.length > 0) {
      console.log(pc.cyan(`Installing missing npm packages: ${missingNpm.join(", ")}...`));
      const pm = getPackageManager();
      const installCmd = pm === "pnpm" ? `pnpm add ${missingNpm.join(" ")}` : `${pm} install ${missingNpm.join(" ")}`;
      try {
        execSync(installCmd, { stdio: "inherit" });
        console.log(pc.green("Dependencies installed successfully."));
      } catch (err: any) {
        console.error(pc.red(`Failed to install packages: ${err.message}`));
      }
    }

    // Download and write component files
    for (const compName of installQueue) {
      const compData = await getRegistryData(`${compName}.json`);
      for (const file of compData.files) {
        const fileExtension = isTs ? ".tsx" : ".jsx";
        const baseName = file.name.replace(".tsx", fileExtension);
        const targetPath = path.join(componentsPath, baseName);

        // Check if file already exists
        if (fs.existsSync(targetPath)) {
          const overwritePrompt = await prompts({
            type: "confirm",
            name: "value",
            message: `File ${pc.bold(targetPath)} already exists. Overwrite?`,
            initial: false
          });

          if (!overwritePrompt.value) {
            console.log(pc.yellow(`Skipped writing ${targetPath}`));
            continue;
          }
        }

        // Adjust internal imports to match configured aliases in angkor-ui.json
        let fileContent = file.content;
        
        // Replace relative imports to utils/cn with project configured aliases
        const relativeUtilsPath = path.relative(componentsPath, config.aliases.utils);
        // Normalize for import statement paths
        const normalizedUtilsImport = relativeUtilsPath.startsWith(".") 
          ? relativeUtilsPath.replace(/\\/g, "/") 
          : "./" + relativeUtilsPath.replace(/\\/g, "/");

        fileContent = fileContent.replace(/\"\.\.\/utils\/cn\"/g, `"${normalizedUtilsImport}/cn"`);
        fileContent = fileContent.replace(/\"\.\.\/utils\/animations\"/g, `"${normalizedUtilsImport}/animations"`);
        fileContent = fileContent.replace(/\"\.\.\/hooks\/use-toast\"/g, `"${normalizedUtilsImport}/use-toast"`);

        // Write the file
        fs.writeFileSync(targetPath, fileContent, "utf8");
        console.log(pc.green(`Added component: ${targetPath}`));
      }
    }

    console.log(pc.bold(pc.green("\nAll components added successfully! 🇰🇭")));
  });

program.parse(process.argv);
