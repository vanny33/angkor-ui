import * as React from "react";
import {
  Button,
  Input,
  Checkbox,
  RadioGroup,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  toast,
  DataTable,
  KhmerDatePicker
} from "@angkor-ui/react";
import { Sparkles, Mail, Send, Trash, ShieldCheck } from "lucide-react";

export interface PropItem {
  name: string;
  type: string;
  default: string;
  desc: { en: string; km: string };
}

export interface ComponentData {
  name: string;
  desc: { en: string; km: string };
  installCmd: string;
  codeExample: string;
  props: PropItem[];
  customStyleCode: string;
  a11yNotes: { en: string[]; km: string[] };
  renderPreview: (locale: "en" | "km") => React.ReactNode;
  renderCustomStyle: () => React.ReactNode;
}

export const componentsData: Record<string, ComponentData> = {
  button: {
    name: "Button",
    desc: {
      en: "Interactive button with size variations, variants, loading indicators, left/right icons, and spring press animations.",
      km: "ប៊ូតុងអន្តរកម្មជាមួយទំហំផ្សេងៗ ជម្រើសរចនាប័ទ្ម ផ្ទាំងដំណើរការ រូបតំណាងសងខាង និងចលនារុញទន់ភ្លន់។"
    },
    installCmd: "npx angkor-ui@latest add button",
    codeExample: `import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Click Me</Button>
      <Button variant="success" loading>Processing</Button>
      <Button variant="outline" leftIcon={<Mail className="h-4 w-4" />}>
        Email Us
      </Button>
    </div>
  );
}`,
    props: [
      { name: "variant", type: "'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'success'", default: "'default'", desc: { en: "The styling variant of the button.", km: "រចនាប័ទ្មពណ៌របស់ប៊ូតុង។" } },
      { name: "size", type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", desc: { en: "The size height and padding scale of the button.", km: "ទំហំនិងចន្លោះរបស់ប៊ូតុង។" } },
      { name: "loading", type: "boolean", default: "false", desc: { en: "Displays a loading spinner and disables user interaction.", km: "បង្ហាញរង្វង់កំពុងដំណើរការ និងបិទការចុច។" } },
      { name: "leftIcon / rightIcon", type: "ReactNode", default: "undefined", desc: { en: "Renders an icon inside the button text.", km: "បង្ហាញរូបតំណាងខាងឆ្វេង ឬខាងស្តាំអត្ថបទ។" } },
      { name: "animated", type: "boolean", default: "true", desc: { en: "Enables spring press and hover animations.", km: "បើកដំណើរការចលនាពេល hover និងពេលចុច។" } }
    ],
    customStyleCode: `<Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full shadow-lg">
  Angkor Style
</Button>`,
    a11yNotes: {
      en: [
        "Uses native <button> tag ensuring standard keyboard tab navigation.",
        "Fully supports Space and Enter keys to activate."
      ],
      km: [
        "ប្រើប្រាស់ស្លាក <button> ដើមរបស់ HTML ធានាការរុករកដោយក្តារចុច Tab លំដាប់ស្តង់ដារ។",
        "គាំទ្រពេញលេញនូវគ្រាប់ចុច Space និង Enter ដើម្បីដំណើរការ។"
      ]
    },
    renderPreview: () => (
      <div className="flex flex-wrap gap-4 items-center justify-center p-4">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="success" leftIcon={<ShieldCheck className="h-4 w-4" />}>Success</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="default" loading>Loading</Button>
      </div>
    ),
    renderCustomStyle: () => (
      <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full shadow-lg">
        Angkor Style
      </Button>
    )
  },

  input: {
    name: "Input",
    desc: {
      en: "Accessible text input field with supporting helpers, required indicator, left/right icons, password visibility toggles, and error vibration shake animation.",
      km: "ប្រអប់បញ្ចូលអត្ថបទគាំទ្រលទ្ធភាពប្រើប្រាស់ ជាមួយស្លាកជំនួយ សញ្ញាចាំបាច់ រូបតំណាងសងខាង ប៊ូតុងបង្ហាញលេខសម្ងាត់ និងចលនាញ័រពេលកំហុស។"
    },
    installCmd: "npx angkor-ui@latest add input",
    codeExample: `import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function Demo() {
  return (
    <Input
      label="អ៊ីមែល / Email Address"
      placeholder="example@mail.com"
      leftIcon={<Mail className="h-4.5 w-4.5" />}
      helperText="We will never share your email address."
      required
    />
  );
}`,
    props: [
      { name: "label", type: "string", default: "undefined", desc: { en: "Text label rendered above the input.", km: "ស្លាកអត្ថបទបង្ហាញនៅខាងលើប្រអប់។" } },
      { name: "helperText", type: "string", default: "undefined", desc: { en: "Helper description text rendered below the input.", km: "អត្ថបទជំនួយបង្ហាញនៅខាងក្រោមប្រអប់។" } },
      { name: "error", type: "string", default: "undefined", desc: { en: "Validation error text. Triggers a shake animation and borders input red.", km: "អត្ថបទបង្ហាញកំហុស នឹងធ្វើឱ្យប្រអប់ញ័រនិងបង្ហាញគែមពណ៌ក្រហម។" } },
      { name: "showPasswordToggle", type: "boolean", default: "true", desc: { en: "Provides an eye toggle icon to show/hide values when type is 'password'.", km: "បង្ហាញរូបភ្នែកដើម្បីបើក/បិទមើលលេខសម្ងាត់សម្រាប់ប្រភេទ 'password'។" } },
      { name: "maxLength", type: "number", default: "undefined", desc: { en: "Limits characters count and displays character ratio counter.", km: "កំណត់ប្រវែងអត្ថបទអតិបរមា និងបង្ហាញកុងទ័រចំនួនតួអក្សរ។" } }
    ],
    customStyleCode: `<Input className="bg-muted border-0 focus-visible:ring-amber-500 rounded-none border-b-2 border-primary" />`,
    a11yNotes: {
      en: [
        "Automatically links label, helper text, and error messages via aria-describedby and htmlFor attributes.",
        "Sets aria-invalid to true when error prop is present."
      ],
      km: [
        "ភ្ជាប់ស្លាក អត្ថបទជំនួយ និងសារកំហុសដោយស្វ័យប្រវត្តិតាមរយៈគុណលក្ខណៈ aria-describedby និង htmlFor។",
        "កំណត់ aria-invalid ទៅជា true នៅពេលមានសារកំហុសបង្ហាញ។"
      ]
    },
    renderPreview: () => {
      const [val, setVal] = React.useState("");
      const [err, setErr] = React.useState("");

      const handleCheck = () => {
        if (!val.includes("@")) {
          setErr("អ៊ីមែលមិនត្រឹមត្រូវទេ / Invalid email format");
        } else {
          setErr("");
        }
      };

      return (
        <div className="max-w-sm w-full mx-auto space-y-4 p-4">
          <Input
            label="អ៊ីមែល / Email"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="example@domain.com"
            error={err}
            requiredIndicator
            required
            helperText="បញ្ចូលអ៊ីមែលសម្រាប់ផ្ទៀងផ្ទាត់ / Enter email for verification"
            rightIcon={
              <button onClick={handleCheck} className="text-xs text-primary font-bold hover:underline">
                Check
              </button>
            }
          />
        </div>
      );
    },
    renderCustomStyle: () => (
      <Input
        placeholder="Custom line style"
        className="bg-muted/40 border-0 focus-visible:ring-amber-500 rounded-none border-b-2 border-primary"
      />
    )
  },

  select: {
    name: "Select",
    desc: {
      en: "Accessible combobox select dropdown with optional search query filtering, clearing buttons, and active item indicators.",
      km: "ប្រអប់ជ្រើសរើសជម្រើសចុះក្រោមគាំទ្រការស្វែងរកច្រោះទិន្នន័យ ប៊ូតុងលុប និងសញ្ញាសម្គាល់ជម្រើសសកម្ម។"
    },
    installCmd: "npx angkor-ui@latest add select",
    codeExample: `<Select
  label="ខេត្តក្រុង / Province"
  options={[
    { value: "phnom-penh", label: "ភ្នំពេញ" },
    { value: "siem-reap", label: "សៀមរាប" }
  ]}
  searchable
  locale="km"
/>`,
    props: [
      { name: "options", type: "SelectOption[]", default: "[]", desc: { en: "Array of value and label options.", km: "បញ្ជីនៃជម្រើសតម្លៃនិងស្លាកឈ្មោះ។" } },
      { name: "searchable", type: "boolean", default: "false", desc: { en: "Shows a search bar inside the dropdown popover.", km: "បង្ហាញប្រអប់ស្វែងរកនៅខាងក្នុងផ្ទាំងជម្រើស។" } },
      { name: "clearable", type: "boolean", default: "false", desc: { en: "Shows a clearing button when a value is selected.", km: "បង្ហាញប៊ូតុង X ដើម្បីសម្អាតតម្លៃដែលបានជ្រើសរើសរួច។" } },
      { name: "locale", type: "'km' | 'en'", default: "'km'", desc: { en: "Language locale for search placeholders and empty messages.", km: "ភាសាសម្រាប់បង្ហាញពាក្យស្វែងរកនិងសារទំនេរ។" } }
    ],
    customStyleCode: `<Select className="border-2 border-primary rounded-xl" />`,
    a11yNotes: {
      en: [
        "Adheres to WAI-ARIA combobox accessibility roles.",
        "Keyboard support: ArrowDown/Up navigation, Enter key to select, Escape key to close."
      ],
      km: [
        "អនុលោមតាមតួនាទីលទ្ធភាពប្រើប្រាស់ WAI-ARIA combobox។",
        "គាំទ្រក្តារចុច៖ គ្រាប់ចុចព្រួញចុះ/ឡើងដើម្បីផ្លាស់ទី, គ្រាប់ចុច Enter ដើម្បីជ្រើសរើស, គ្រាប់ចុច Escape ដើម្បីបិទ។"
      ]
    },
    renderPreview: (locale) => {
      const options = [
        { value: "1", label: locale === "km" ? "ភ្នំពេញ (Phnom Penh)" : "Phnom Penh" },
        { value: "2", label: locale === "km" ? "សៀមរាប (Siem Reap)" : "Siem Reap" },
        { value: "3", label: locale === "km" ? "បាត់ដំបង (Battambang)" : "Battambang" },
        { value: "4", label: locale === "km" ? "កំពង់ចាម (Kampong Cham)" : "Kampong Cham" },
      ];

      return (
        <div className="max-w-sm w-full mx-auto p-4">
          <Select
            label={locale === "km" ? "ជ្រើសរើសខេត្តក្រុង" : "Select Province"}
            options={options}
            searchable
            clearable
            locale={locale}
          />
        </div>
      );
    },
    renderCustomStyle: () => (
      <Select
        options={[{ value: "1", label: "Angkor Style Gold" }]}
        className="border-2 border-amber-500 text-amber-600 rounded-xl focus:ring-amber-500"
      />
    )
  },

  dialog: {
    name: "Dialog",
    desc: {
      en: "Compound overlay modal dialog supporting focus trapping, escape-to-close keypresses, configurable outside-click closing, and mobile bottom sheet transitions.",
      km: "ប្រអប់សារផ្ទាំងលេចឡើងគាំទ្រការគ្រប់គ្រងការផ្ដោត បិទដោយគ្រាប់ចុច escape បិទដោយចុចខាងក្រៅ និងការបង្ហាញជារចនាប័ទ្មផ្ទាំងរុញពីក្រោមលើទូរស័ព្ទ។"
    },
    installCmd: "npx angkor-ui@latest add dialog",
    codeExample: `<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent size="md" closeOnOutsideClick={false}>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    props: [
      { name: "size", type: "'sm' | 'md' | 'lg' | 'full'", default: "'md'", desc: { en: "The maximum width scaling of the dialog content.", km: "ទំហំទទឹងអតិបរមារបស់ប្រអប់សារ។" } },
      { name: "mobileBottomSheet", type: "boolean", default: "false", desc: { en: "Converts to a bottom sheet slide animation on mobile screens.", km: "បំប្លែងទៅជាផ្ទាំងរុញឡើងពីក្រោមនៅលើអេក្រង់ទូរស័ព្ទ។" } },
      { name: "closeOnOutsideClick", type: "boolean", default: "true", desc: { en: "Allows closing the dialog by clicking the overlay backdrop.", km: "អនុញ្ញាតឱ្យបិទប្រអប់សារនៅពេលចុចលើផ្ទៃងងឹតខាងក្រៅ។" } }
    ],
    customStyleCode: `<DialogContent className="border-t-4 border-t-amber-500 rounded-2xl" />`,
    a11yNotes: {
      en: [
        "Focus traps within the dialog content on open and restores focus on close.",
        "Aria-labelledby and aria-describedby are connected automatically to DialogTitle and DialogDescription."
      ],
      km: [
        "គ្រប់គ្រងការផ្ដោត (Focus trap) នៅក្នុងប្រអប់សារនៅពេលបើក និងប្រគល់ការផ្ដោតត្រឡប់ទៅប៊ូតុងដើមវិញពេលបិទ។",
        "ភ្ជាប់ aria-labelledby និង aria-describedby ដោយស្វ័យប្រវត្តិតាមរយៈចំណងជើង និងសេចក្ដីពិពណ៌នា។"
      ]
    },
    renderPreview: (locale) => (
      <div className="flex justify-center p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>{locale === "km" ? "បើកផ្ទាំងសារលេចឡើង" : "Open Dialog"}</Button>
          </DialogTrigger>
          <DialogContent mobileBottomSheet size="md">
            <DialogHeader>
              <DialogTitle>
                {locale === "km" ? "តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?" : "Are you sure you want to delete?"}
              </DialogTitle>
              <DialogDescription>
                {locale === "km"
                  ? "សកម្មភាពនេះមិនអាចត្រឡប់ថយក្រោយវិញបានទេ។ វានឹងលុបទិន្នន័យរបស់អ្នកចេញពីប្រព័ន្ធជាអចិន្ត្រៃយ៍។"
                  : "This action cannot be undone. This will permanently delete your database records."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 gap-2">
              <DialogClose asChild>
                <Button variant="outline">{locale === "km" ? "បោះបង់" : "Cancel"}</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" leftIcon={<Trash className="h-4 w-4" />}>
                  {locale === "km" ? "លុបចោល" : "Confirm Delete"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ),
    renderCustomStyle: () => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Custom Style Dialog</Button>
        </DialogTrigger>
        <DialogContent className="border-t-4 border-t-amber-500 rounded-xl">
          <DialogHeader>
            <DialogTitle>Angkor Golden Touch</DialogTitle>
            <DialogDescription>Beautiful top border accent layout.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  },

  toast: {
    name: "Toast",
    desc: {
      en: "Queueable notifications with imperative support for successes, errors, warnings, info, and loading states, plus promise resolution binding.",
      km: "ប្រព័ន្ធដំណឹងដែលអាចតម្រៀបជួរបាន គាំទ្រការហៅប្រើប្រាស់ផ្ទាល់សម្រាប់ ជោគជ័យ កំហុស ព្រមាន ព័ត៌មាន កំពុងដំណើរការ និងការរង់ចាំសន្យា (Promise)។"
    },
    installCmd: "npx angkor-ui@latest add toast",
    codeExample: `import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function Demo() {
  const triggerPromise = () => {
    const myPromise = new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(myPromise, {
      loading: "Saving database...",
      success: "Saved successfully!",
      error: "Error saving."
    });
  };

  return (
    <Button onClick={() => toast.success("Connected successfully!")}>
      Show Toast
    </Button>
  );
}`,
    props: [
      { name: "toast(props)", type: "function", default: "undefined", desc: { en: "Imperative function to trigger a toast.", km: "អនុគមន៍ដើម្បីបង្ហាញកាតដំណឹង។" } },
      { name: "toast.success / error / warning", type: "function", default: "undefined", desc: { en: "Shortcut trigger methods.", km: "វិធីសាស្ត្រកាត់ដើម្បីបង្ហាញដំណឹងតាមប្រភេទ។" } },
      { name: "toast.promise(promise, config)", type: "function", default: "undefined", desc: { en: "Triggers a loading toast and updates variant automatically on promise resolution.", km: "បង្ហាញដំណឹងកំពុងដំណើរការ និងកែប្រែដោយស្វ័យប្រវត្តិតាមលទ្ធផលសន្យា។" } }
    ],
    customStyleCode: `// Toast renders default configurations from Toaster component.
<Toaster position="top-right" />`,
    a11yNotes: {
      en: [
        "Toasts announce content updates automatically to screen readers via aria-live status/alert regions.",
        "Includes accessible close triggers for manual dismissal."
      ],
      km: [
        "កាតដំណឹងប្រកាសព័ត៌មានដោយស្វ័យប្រវត្តិតាមរយៈតំបន់ aria-live status/alert។",
        "រួមបញ្ចូលប៊ូតុងបិទងាយស្រួលចុចសម្រាប់លុបចេញដោយដៃ។"
      ]
    },
    renderPreview: (locale) => {
      const handleSuccess = () => {
        toast.success(locale === "km" ? "រក្សាទុកដោយជោគជ័យ" : "Saved successfully");
      };

      const handlePromise = () => {
        const dummyPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.5) resolve(true);
            else reject(new Error("Timeout"));
          }, 2000);
        });

        toast.promise(dummyPromise, {
          loading: locale === "km" ? "កំពុងរក្សាទុកទិន្នន័យ..." : "Saving database record...",
          success: locale === "km" ? "រក្សាទុកជោគជ័យ! 🇰🇭" : "Record saved successfully!",
          error: locale === "km" ? "កំហុសក្នុងការរក្សាទុក" : "Failed to save database record."
        });
      };

      return (
        <div className="flex flex-wrap gap-4 justify-center p-4">
          <Button onClick={handleSuccess} variant="success">Success Toast</Button>
          <Button onClick={() => toast.error(locale === "km" ? "បរាជ័យក្នុងការតភ្ជាប់" : "Connection failed")} variant="destructive">Error Toast</Button>
          <Button onClick={handlePromise} variant="outline">Promise Toast</Button>
        </div>
      );
    },
    renderCustomStyle: () => (
      <span className="text-xs text-muted-foreground italic">
        Toast styling is managed globally via CSS variables inside the theme setup.
      </span>
    )
  },

  "data-table": {
    name: "Data Table",
    desc: {
      en: "TanStack Table configuration with column sorting, searches, toggling column visibility, row selection, responsive mobile card mode, and CSV exports.",
      km: "តារាងទិន្នន័យ TanStack Table ជាមួយការតម្រៀបជួរ ការស្វែងរក ការលាក់/បង្ហាញជួរឈរ ការជ្រើសរើសជួរដេក របៀបបង្ហាញជារាងកាតលើទូរស័ព្ទ និងការទាញយក CSV។"
    },
    installCmd: "npx angkor-ui@latest add data-table",
    codeExample: `import { DataTable } from "@/components/ui/data-table";

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" }
];

const data = [
  { name: "Sophal", role: "Developer" },
  { name: "Dara", role: "Designer" }
];

export default function Demo() {
  return <DataTable columns={columns} data={data} locale="km" />;
}`,
    props: [
      { name: "columns", type: "ColumnDef[]", default: "[]", desc: { en: "TanStack table column definitions.", km: "ការកំណត់ជួរឈររបស់តារាង TanStack។" } },
      { name: "data", type: "any[]", default: "[]", desc: { en: "Array of object data rows to render.", km: "បណ្ដុំទិន្នន័យជួរដេកសម្រាប់បង្ហាញ។" } },
      { name: "loading", type: "boolean", default: "false", desc: { en: "Enables loading indicator overlays.", km: "បង្ហាញស្ថានភាពកំពុងដំណើរការទាញទិន្នន័យ។" } },
      { name: "locale", type: "'km' | 'en'", default: "'km'", desc: { en: "Bilingual pagination controls language labels.", km: "ភាសាសម្រាប់បង្ហាញស្លាកប៊ូតុងបែងចែកទំព័រ។" } }
    ],
    customStyleCode: `<DataTable className="border-4 border-amber-600/20" />`,
    a11yNotes: {
      en: [
        "Desktop table uses standard HTML5 semantic <table> markup.",
        "Interactive buttons for page changes include screen-reader accessible helper text."
      ],
      km: [
        "តារាងលើកុំព្យូទ័រប្រើប្រាស់ស្លាក semantic HTML5 <table> ត្រឹមត្រូវ។",
        "ប៊ូតុងបញ្ជានៃការបែងចែកទំព័រមានអត្ថបទជំនួយសម្រាប់កម្មវិធីអានផ្ទាំងអេក្រង់។"
      ]
    },
    renderPreview: (locale) => {
      const columns = [
        { accessorKey: "id", header: locale === "km" ? "លេខកូដ" : "ID" },
        { accessorKey: "name", header: locale === "km" ? "ឈ្មោះ" : "Name" },
        { accessorKey: "location", header: locale === "km" ? "ទីតាំង" : "Location" }
      ];

      const data = [
        { id: "001", name: "Sophal Chan", location: "Phnom Penh" },
        { id: "002", name: "Bory Keo", location: "Siem Reap" },
        { id: "003", name: "Sokha Ouk", location: "Battambang" }
      ];

      return (
        <div className="w-full p-4 overflow-hidden">
          <DataTable columns={columns} data={data} locale={locale} />
        </div>
      );
    },
    renderCustomStyle: () => {
      const columns = [{ accessorKey: "name", header: "Custom Styled Table" }];
      const data = [{ name: "Row item 1" }, { name: "Row item 2" }];
      return (
        <div className="w-full">
          <DataTable columns={columns} data={data} className="border-2 border-dashed border-amber-500 rounded-xl p-2" />
        </div>
      );
    }
  },

  "date-picker": {
    name: "Khmer Date Picker",
    desc: {
      en: "Bilingual Khmer/English Gregorian date picker with single or range selections, optional Khmer numerals mapping, disabled date constraints, and animated popover opening.",
      km: "ប្រអប់ជ្រើសរើសកាលបរិច្ឆេទខ្មែរ/អង់គ្លេស គាំទ្រការជ្រើសរើសមួយថ្ងៃឬចន្លោះថ្ងៃ លេខខ្មែរ ថ្ងៃបិទមិនឱ្យជ្រើសរើស និងចលនាបើកផ្ទាំងទន់ភ្លន់។"
    },
    installCmd: "npx angkor-ui@latest add date-picker",
    codeExample: `import { KhmerDatePicker } from "@/components/ui/date-picker";

export default function Demo() {
  return (
    <KhmerDatePicker
      mode="single"
      useKhmerNumerals={true}
      locale="km"
      isoOutput={true}
    />
  );
}`,
    props: [
      { name: "mode", type: "'single' | 'range'", default: "'single'", desc: { en: "Selection mode. Range selection allows picking start/end dates.", km: "របៀបជ្រើសរើស ថ្ងៃតែមួយ ឬចន្លោះថ្ងៃ។" } },
      { name: "useKhmerNumerals", type: "boolean", default: "true", desc: { en: "Converts calendar year and date values to Khmer digits (e.g. ២០២៦).", km: "បំប្លែងទិន្នន័យឆ្នាំនិងថ្ងៃទៅជាលេខខ្មែរ (ឧទាហរណ៍ ២០២៦)។" } },
      { name: "isoOutput", type: "boolean", default: "false", desc: { en: "Converts selected date objects to yyyy-MM-dd strings in the onChange callback.", km: "បំប្លែងតម្លៃជ្រើសរើសទៅជាខ្សែអក្សរទម្រង់ yyyy-MM-dd ក្នុង onChange។" } },
      { name: "minDate / maxDate", type: "Date", default: "undefined", desc: { en: "Restricts selection within date boundaries.", km: "កំណត់ព្រំដែនកាលបរិច្ឆេទដែលអាចជ្រើសរើសបាន។" } }
    ],
    customStyleCode: `<KhmerDatePicker className="border-amber-500 bg-amber-500/5 text-amber-800" />`,
    a11yNotes: {
      en: [
        "Conforms to accessible grid and popover attributes.",
        "Allows direct keyboard-oriented focus and navigation within days grids."
      ],
      km: [
        "អនុលោមតាមគុណលក្ខណៈ accessible grid និង popover របស់ WAI-ARIA។",
        "អនុញ្ញាតឱ្យផ្ដោតដោយផ្ទាល់ និងរុករកដោយក្តារចុចនៅក្នុងក្រឡាថ្ងៃនីមួយៗ។"
      ]
    },
    renderPreview: (locale) => {
      const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date());
      return (
        <div className="max-w-sm w-full mx-auto p-4 space-y-4">
          <KhmerDatePicker
            label={locale === "km" ? "ថ្ងៃតែមួយ / Single Date" : "Single Date Picker"}
            mode="single"
            value={singleDate}
            onChange={setSingleDate}
            locale={locale}
            useKhmerNumerals={locale === "km"}
          />
        </div>
      );
    },
    renderCustomStyle: () => (
      <KhmerDatePicker
        placeholder="Custom outline golden picker"
        className="border-2 border-amber-500 bg-amber-500/5 text-amber-800 focus:ring-amber-500"
      />
    )
  },

  checkbox: {
    name: "Checkbox",
    desc: {
      en: "Accessible checkbox wrapper with support for checked, unchecked, and indeterminate states, labeled descriptions, and draw-in check animation.",
      km: "ប្រអប់ធីកគាំទ្រលទ្ធភាពប្រើប្រាស់ គាំទ្រស្ថានភាព បានធីក មិនទាន់ធីក និងស្ថានភាពមិនទាន់សម្រេច (Indeterminate) ជាមួយស្លាកពិពណ៌នា និងចលនាតម្រៀប។"
    },
    installCmd: "npx angkor-ui@latest add checkbox",
    codeExample: `import { Checkbox } from "@/components/ui/checkbox";

export default function Demo() {
  return (
    <Checkbox
      id="terms"
      label="ខ្ញុំយល់ព្រមតាមលក្ខខណ្ឌ"
      description="សូមអានលក្ខខណ្ឌមុនពេលបន្ត។"
      required
    />
  );
}`,
    props: [
      { name: "checked", type: "boolean | 'indeterminate'", default: "false", desc: { en: "The state of the checkbox.", km: "ស្ថានភាពរបស់ប្រអប់ធីក។" } },
      { name: "label", type: "string", default: "undefined", desc: { en: "A text label displayed on the right.", km: "ស្លាកអត្ថបទបង្ហាញនៅខាងស្តាំប្រអប់ធីក។" } },
      { name: "description", type: "string", default: "undefined", desc: { en: "Detailed context message displayed below the label.", km: "សារពិពណ៌នាលម្អិតបង្ហាញនៅក្រោមស្លាកអត្ថបទ។" } }
    ],
    customStyleCode: `<Checkbox className="h-6 w-6 rounded-full border-amber-500 data-[state=checked]:bg-amber-500" />`,
    a11yNotes: {
      en: [
        "Built on Radix Checkbox primitive ensuring keyboard focusability and checkbox accessibility roles.",
        "Labels are dynamically associated to inputs using HTML htmlFor tags."
      ],
      km: [
        "បង្កើតឡើងនៅលើ Radix Checkbox ធានាការផ្ដោតក្តារចុច និងតួនាទី checkbox accessibilities។",
        "ស្លាកអត្ថបទត្រូវបានភ្ជាប់ទៅកាន់ input ដោយស្វ័យប្រវត្តិតាមរយៈស្លាក HTML htmlFor។"
      ]
    },
    renderPreview: (locale) => {
      const [checked, setChecked] = React.useState<boolean | "indeterminate">("indeterminate");
      return (
        <div className="max-w-sm w-full mx-auto p-4 space-y-4">
          <Checkbox
            id="test-check"
            checked={checked}
            onCheckedChange={setChecked}
            label={locale === "km" ? "យល់ព្រមតាមលក្ខខណ្ឌ" : "Accept Terms and Conditions"}
            description={locale === "km" ? "សូមអានលក្ខខណ្ឌច្បាប់ដោយយកចិត្តទុកដាក់" : "Please read terms carefully."}
          />
          <Button size="sm" variant="outline" onClick={() => setChecked(checked === "indeterminate" ? true : "indeterminate")} animated={false}>
            Toggle Indeterminate
          </Button>
        </div>
      );
    },
    renderCustomStyle: () => (
      <Checkbox
        id="custom-check"
        label="Round golden custom checkbox"
        className="h-6 w-6 rounded-full border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-white"
        defaultChecked
      />
    )
  },

  tabs: {
    name: "Tabs",
    desc: {
      en: "Compound tabs selector supporting underline, pill, and outline styling presets, sliding active background indicator animations, vertical/horizontal orientations, and persistent content.",
      km: "ផ្ទាំងជ្រើសរើសមាតិកា Compound Tabs គាំទ្ររចនាប័ទ្មបន្ទាត់ខាងក្រោម គ្រាប់ថ្នាំ និងស៊ុម សញ្ញាសម្គាល់ផ្ទាំងសកម្មមានចលនា គម្លាតបញ្ឈរ/ផ្ដេក និងការរក្សាមាតិកាទុក។"
    },
    installCmd: "npx angkor-ui@latest add tabs",
    codeExample: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Demo() {
  return (
    <Tabs defaultValue="account" variant="underline">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account Details</TabsContent>
      <TabsContent value="settings">System Settings</TabsContent>
    </Tabs>
  );
}`,
    props: [
      { name: "variant", type: "'underline' | 'pill' | 'outline'", default: "'underline'", desc: { en: "Visual design variant of the tabs.", km: "រចនាប័ទ្មរាងរបស់ផ្ទាំងជ្រើសរើស។" } },
      { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: { en: "The direction alignment layout of the tabs.", km: "ទិសដៅតម្រៀបនៃផ្ទាំងជ្រើសរើស (ផ្តេក ឬ បញ្ឈរ)។" } },
      { name: "persistent", type: "boolean", default: "false", desc: { en: "Keeps unselected content in the DOM (hiding it via CSS display) instead of unmounting.", km: "រក្សាមាតិកាដែលមិនបានជ្រើសរើសទុកក្នុង DOM (លាក់តាម CSS) ជំនួសឱ្យការដកចេញ។" } }
    ],
    customStyleCode: `<TabsList className="bg-amber-100 p-2 rounded-xl">`,
    a11yNotes: {
      en: [
        "Follows WAI-ARIA Tabs guidelines.",
        "Keyboard support: arrow keys navigation between triggers, Home/End key support."
      ],
      km: [
        "អនុលោមតាមគោលការណ៍ណែនាំ WAI-ARIA Tabs។",
        "គាំទ្រក្តារចុច៖ គ្រាប់ចុចព្រួញដើម្បីផ្លាស់ទីរវាង tab triggers, គ្រាប់ចុច Home/End។"
      ]
    },
    renderPreview: (locale) => (
      <div className="w-full max-w-md mx-auto p-4">
        <Tabs defaultValue="first" variant="pill" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="first">{locale === "km" ? "គណនី / Account" : "Account"}</TabsTrigger>
            <TabsTrigger value="second" counter="3">{locale === "km" ? "សារ / Messages" : "Messages"}</TabsTrigger>
          </TabsList>
          <TabsContent value="first" className="p-4 border border-border rounded-md mt-2 text-sm bg-card">
            {locale === "km" ? "ព័ត៌មានគណនីអ្នកប្រើប្រាស់" : "User account info and profile."}
          </TabsContent>
          <TabsContent value="second" className="p-4 border border-border rounded-md mt-2 text-sm bg-card">
            {locale === "km" ? "បញ្ជីសារចុងក្រោយដែលទទួលបាន" : "List of recent message items."}
          </TabsContent>
        </Tabs>
      </div>
    ),
    renderCustomStyle: () => (
      <div className="w-full max-w-sm">
        <Tabs defaultValue="a" variant="pill">
          <TabsList className="bg-amber-100 dark:bg-amber-950/40 p-1.5 rounded-xl border border-amber-200">
            <TabsTrigger value="a" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">Style A</TabsTrigger>
            <TabsTrigger value="b" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">Style B</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    )
  },

  "radio-group": {
    name: "Radio Group",
    desc: {
      en: "Accessible radio group selector with horizontal or vertical layouts, required states, card style wrapper options, and custom selection dot animations.",
      km: "ក្រុមប៊ូតុងមូលជ្រើសរើសជម្រើសគាំទ្រតម្រៀបផ្តេកឬបញ្ឈរ ជម្រើសកាត និងចលនាចំណុចមូលកណ្ដាលរួញ/ពង្រីក។"
    },
    installCmd: "npx angkor-ui@latest add radio-group",
    codeExample: `import { RadioGroup } from "@/components/ui/radio-group";

const options = [
  { value: "km", label: "ភាសាខ្មែរ", description: "Cambodian Language" },
  { value: "en", label: "English", description: "International Language" }
];

export default function Demo() {
  return (
    <RadioGroup
      label="Language"
      options={options}
      cardStyle={true}
      defaultValue="km"
    />
  );
}`,
    props: [
      { name: "options", type: "RadioGroupOption[]", default: "[]", desc: { en: "List of radio option items.", km: "បញ្ជីជម្រើសប៊ូតុងមូលជ្រើសរើស។" } },
      { name: "orientation", type: "'horizontal' | 'vertical'", default: "'vertical'", desc: { en: "Layout alignment direction.", km: "ទិសដៅតម្រៀបប្លង់ជម្រើស (ផ្តេក ឬ បញ្ឈរ)។" } },
      { name: "cardStyle", type: "boolean", default: "false", desc: { en: "Wraps each item option inside a bordered clickable card container.", km: "រៀបចំជម្រើសនីមួយៗជាផ្ទាំងកាតមានស៊ុមងាយស្រួលចុច។" } }
    ],
    customStyleCode: `<RadioGroup cardStyle={true} className="gap-4" />`,
    a11yNotes: {
      en: [
        "Follows WAI-ARIA Radio Group specifications.",
        "Keyboard support: Use Arrow keys to navigate between options, wrapping around automatically."
      ],
      km: [
        "អនុលោមតាមលក្ខណៈពិសេស WAI-ARIA Radio Group។",
        "គាំទ្រក្តារចុច៖ ប្រើគ្រាប់ចុចព្រួញដើម្បីផ្លាស់ទីរវាងជម្រើស ដោយវិលជុំដោយស្វ័យប្រវត្តិ។"
      ]
    },
    renderPreview: (locale) => {
      const options = [
        { value: "km", label: locale === "km" ? "ភាសាខ្មែរ" : "Khmer", description: "ភាសាផ្លូវការ / Official Language" },
        { value: "en", label: locale === "km" ? "ភាសាអង់គ្លេស" : "English", description: "ភាសាអន្តរជាតិ / International Language" }
      ];

      return (
        <div className="max-w-sm w-full mx-auto p-4">
          <RadioGroup
            label={locale === "km" ? "ជ្រើសរើសភាសា" : "Select Language"}
            options={options}
            cardStyle
            defaultValue="km"
          />
        </div>
      );
    },
    renderCustomStyle: () => {
      const options = [
        { value: "a", label: "Golden Choice A" },
        { value: "b", label: "Golden Choice B" }
      ];
      return (
        <div className="max-w-sm w-full">
          <RadioGroup
            options={options}
            cardStyle
            defaultValue="a"
            className="border-2 border-amber-500 rounded-xl p-2 bg-amber-50/10"
          />
        </div>
      );
    }
  }
};
