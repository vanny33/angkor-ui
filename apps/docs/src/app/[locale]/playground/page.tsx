"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { useTranslation } from "@/components/translation-provider";
import {
  Button,
  Input,
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
  KhmerDatePicker,
  Checkbox,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  RadioGroup
} from "@angkor-ui/react";
import {
  LayoutDashboard,
  User,
  Settings,
  Bell,
  Trash,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function PlaygroundPage() {
  const { t, locale } = useTranslation();

  // Tab 1 States: Data Table, Select Filter, Khmer Date Picker
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Tab 2 States: User settings form
  const [username, setUsername] = useState("");
  const [acceptMarketing, setAcceptMarketing] = useState<boolean | "indeterminate">(false);
  const [planType, setPlanType] = useState("free");

  // Tab 3 States: Dialog and Toast buttons
  const [customToastText, setCustomToastText] = useState("");

  const bookingsData = [
    { id: "B-101", customer: "Sophal Keo", province: "ភ្នំពេញ (Phnom Penh)", date: "២០២៦-០៨-២៩" },
    { id: "B-102", customer: "Dara Oum", province: "សៀមរាប (Siem Reap)", date: "២០២៦-០៨-៣០" },
    { id: "B-103", customer: "Bory Sok", province: "បាត់ដំបង (Battambang)", date: "២០២៦-០៩-០១" },
  ];

  const columns = [
    { accessorKey: "id", header: locale === "km" ? "លេខកូដ" : "Booking ID" },
    { accessorKey: "customer", header: locale === "km" ? "អតិថិជន" : "Customer" },
    { accessorKey: "province", header: locale === "km" ? "ខេត្តក្រុង" : "Province" },
    { accessorKey: "date", header: locale === "km" ? "កាលបរិច្ឆេទ" : "Date" },
  ];

  const provinceOptions = [
    { value: "phnom-penh", label: locale === "km" ? "ភ្នំពេញ (Phnom Penh)" : "Phnom Penh" },
    { value: "siem-reap", label: locale === "km" ? "សៀមរាប (Siem Reap)" : "Siem Reap" },
    { value: "battambang", label: locale === "km" ? "បាត់ដំបង (Battambang)" : "Battambang" },
  ];

  const planOptions = [
    { value: "free", label: locale === "km" ? "ឥតគិតថ្លៃ (Free Plan)" : "Free Plan", description: locale === "km" ? "ចូលប្រើប្រាស់សមាសភាគមូលដ្ឋាន" : "Basic layout features only" },
    { value: "pro", label: locale === "km" ? "គម្រោងប្រូ (Pro Plan)" : "Pro Plan", description: locale === "km" ? "ចូលប្រើប្រាស់សមាសភាគនិងគំរូទាំងអស់" : "Get custom styling templates" },
  ];

  const triggerToastAlert = (type: "success" | "error" | "warning") => {
    const text = customToastText || (locale === "km" ? "សកម្មភាពបានជោគជ័យ!" : "Action triggered successfully!");
    if (type === "success") {
      toast.success(text);
    } else if (type === "error") {
      toast.error(text);
    } else {
      toast({
        title: locale === "km" ? "ដំណឹងព្រមាន" : "Warning Alert",
        description: text,
        variant: "warning",
      });
    }
  };

  const triggerPromiseToast = () => {
    const savePromise = new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(savePromise, {
      loading: locale === "km" ? "កំពុងរក្សាទុកការកំណត់..." : "Saving preferences...",
      success: locale === "km" ? "រក្សាទុកទទួលបានជោគជ័យ! 🇰🇭" : "Preferences saved successfully!",
      error: locale === "km" ? "រក្សាទុកបរាជ័យ" : "Failed to save configuration."
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Page title */}
        <div className="space-y-2 border-b border-border pb-4">
          <h1 className="text-3xl font-black tracking-tight select-none">
            {locale === "km" ? "កន្លែងសាកល្បង Angkor UI" : "Angkor UI Workspace Playground"}
          </h1>
          <p className="text-muted-foreground text-sm select-none">
            {locale === "km" 
              ? "សាកល្បងនិងវាយតម្លៃសមាសភាគទាំង ១០ របស់ Angkor UI រួមបញ្ចូលគ្នាក្នុងផ្ទាំងបញ្ជាដ៏ស្រស់ស្អាតតែមួយ។"
              : "Interact with all 10 Angkor UI components side-by-side in this comprehensive sandbox app."}
          </p>
        </div>

        {/* Compound Tabs Component containing Showcase Dashboard */}
        <Tabs defaultValue="overview" variant="pill" className="w-full">
          <TabsList className="bg-muted p-1 border border-border rounded-lg inline-flex w-full sm:w-auto overflow-x-auto justify-start mb-6">
            <TabsTrigger value="overview">
              <span className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                {locale === "km" ? "ផ្ទាំងសរុប (Overview)" : "Overview Dashboard"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="profile">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {locale === "km" ? "ការកំណត់គណនី" : "User Preferences"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <span className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                {locale === "km" ? "ដំណឹងនិងផ្ទាំងសារ" : "Modals & Toasts"}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW DASHBOARD */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Control Panel */}
              <div className="bg-card border border-border p-6 rounded-xl space-y-6 shadow-sm">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Settings className="h-4.5 w-4.5 text-primary" />
                  {locale === "km" ? "តម្រងស្វែងរក" : "Filter Settings"}
                </h3>
                
                {/* Select Component */}
                <Select
                  label={locale === "km" ? "ជ្រើសរើសខេត្តក្រុង" : "Filter by Province"}
                  options={provinceOptions}
                  value={selectedProvince}
                  onChange={setSelectedProvince}
                  searchable
                  clearable
                  locale={locale}
                />

                {/* Date Picker Component */}
                <KhmerDatePicker
                  label={locale === "km" ? "ជ្រើសរើសកាលបរិច្ឆេទ" : "Filter by Date"}
                  mode="single"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  locale={locale}
                  useKhmerNumerals={locale === "km"}
                />

                <div className="pt-2">
                  <Button 
                    className="w-full"
                    onClick={() => {
                      toast.success(locale === "km" ? "បានអនុវត្តតម្រងស្វែងរក" : "Filter preferences applied!");
                    }}
                  >
                    {locale === "km" ? "អនុវត្ត" : "Apply Filters"}
                  </Button>
                </div>
              </div>

              {/* Data Table Panel */}
              <div className="lg:col-span-2 bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-base font-bold">
                    {locale === "km" ? "បញ្ជីកក់កន្លែង (Active Bookings)" : "Active Bookings Table"}
                  </h3>
                  <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                    {bookingsData.length} entries
                  </span>
                </div>
                
                {/* Data Table Component */}
                <DataTable
                  columns={columns}
                  data={bookingsData}
                  locale={locale}
                />
              </div>

            </div>
          </TabsContent>

          {/* TAB 2: USER PREFERENCES */}
          <TabsContent value="profile" className="max-w-2xl mx-auto bg-card border border-border p-6 sm:p-8 rounded-xl shadow-sm space-y-6">
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-bold">
                {locale === "km" ? "គណនីនិងការជាវ" : "Account Configuration"}
              </h3>
              <p className="text-muted-foreground text-xs">
                {locale === "km" ? "បញ្ចូលព័ត៌មាននិងជ្រើសរើសប្រភេទគម្រោងជាវរបស់អ្នក។" : "Manage billing plans and details."}
              </p>
            </div>

            {/* Input Component */}
            <Input
              label={locale === "km" ? "ឈ្មោះអ្នកប្រើប្រាស់" : "Username"}
              placeholder="sophal_keo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              requiredIndicator
              maxLength={20}
              required
            />

            {/* Radio Group Component */}
            <RadioGroup
              label={locale === "km" ? "ជ្រើសរើសប្រភេទគម្រោងជាវ" : "Select Subscription Plan"}
              options={planOptions}
              value={planType}
              onValueChange={setPlanType}
              cardStyle
            />

            {/* Checkbox Component */}
            <Checkbox
              id="marketing-check"
              checked={acceptMarketing}
              onCheckedChange={setAcceptMarketing}
              label={locale === "km" ? "ខ្ញុំយល់ព្រមទទួលបានសារព័ត៌មានថ្មីៗ" : "Receive product updates & marketing newsletters"}
              description={locale === "km" ? "ទទួលបានអ៊ីមែលដំណឹងប្រូម៉ូសិនពីក្រុមការងារ" : "We will only send high-quality updates."}
            />

            <div className="pt-4 flex gap-3 justify-end border-t border-border">
              <Button variant="outline" onClick={() => {
                setUsername("");
                setAcceptMarketing(false);
                setPlanType("free");
              }}>
                {locale === "km" ? "កំណត់ឡើងវិញ" : "Reset"}
              </Button>
              <Button onClick={triggerPromiseToast}>
                {locale === "km" ? "រក្សាទុកការផ្លាស់ប្តូរ" : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* TAB 3: MODALS & TOAST ALERTS */}
          <TabsContent value="alerts" className="max-w-2xl mx-auto bg-card border border-border p-6 sm:p-8 rounded-xl shadow-sm space-y-8">
            <div className="border-b border-border pb-4 space-y-1">
              <h3 className="text-lg font-bold">
                {locale === "km" ? "សាកល្បងប្រព័ន្ធដំណឹងនិងប្រអប់សារលេចឡើង" : "Modals, Overlays, and Toast sandbox"}
              </h3>
              <p className="text-muted-foreground text-xs">
                {locale === "km" ? "ចុចប៊ូតុងខាងក្រោមដើម្បីសាកល្បងចលនា និងលក្ខណៈរបស់ Dialog និង Toast។" : "Trigger various notifications and actions overlay states."}
              </p>
            </div>

            {/* Toast Configuration */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">
                1. {locale === "km" ? "ប្រព័ន្ធកាតដំណឹង (Toast Queue)" : "Toast Notification Queue"}
              </h4>
              <Input
                placeholder={locale === "km" ? "សរសេរអត្ថបទដំណឹងនៅទីនេះ..." : "Enter custom toast alert text..."}
                value={customToastText}
                onChange={(e) => setCustomToastText(e.target.value)}
              />
              <div className="flex flex-wrap gap-2.5">
                <Button variant="success" size="sm" onClick={() => triggerToastAlert("success")}>
                  {locale === "km" ? "ដំណឹងជោគជ័យ (Success)" : "Success"}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => triggerToastAlert("error")}>
                  {locale === "km" ? "ដំណឹងកំហុស (Error)" : "Error"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => triggerToastAlert("warning")}>
                  {locale === "km" ? "ដំណឹងព្រមាន (Warning)" : "Warning"}
                </Button>
              </div>
            </div>

            {/* Dialog Component Integration */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground">
                2. {locale === "km" ? "ប្រអប់សារលេចឡើង (Dialog Overlay)" : "Dialog Modals Overlay"}
              </h4>
              <div className="flex gap-3">
                
                {/* Dialog with Confirmation action */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" leftIcon={<Trash className="h-4 w-4" />}>
                      {locale === "km" ? "លុបគណនីអ្នកប្រើប្រាស់" : "Delete User Instance"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent mobileBottomSheet size="md">
                    <DialogHeader>
                      <DialogTitle>
                        {locale === "km" ? "តើអ្នកពិតជាចង់លុបគណនីអ្នកប្រើប្រាស់នេះមែនទេ?" : "Delete User permanently?"}
                      </DialogTitle>
                      <DialogDescription>
                        {locale === "km" 
                          ? "សកម្មភាពនេះមិនអាចត្រឡប់ថយក្រោយវិញបានទេ។ គណនីនិងការកំណត់ទាំងអស់នឹងត្រូវលុបចោលពីម៉ាស៊ីនមេ។"
                          : "This action is permanent and cannot be rolled back. The database node instance will be deleted."}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">{locale === "km" ? "បោះបង់" : "Cancel"}</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive" onClick={() => toast.error(locale === "km" ? "បានលុបចោល" : "Account wiped successfully!")}>
                          {locale === "km" ? "យល់ព្រមលុប" : "Confirm Wiped"}
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Dialog with Standard Info */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" leftIcon={<HelpCircle className="h-4 w-4" />}>
                      {locale === "km" ? "ជំនួយនិងឯកសារ" : "Quick Help Reference"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent size="sm">
                    <DialogHeader>
                      <DialogTitle>Angkor UI Docs</DialogTitle>
                      <DialogDescription>
                        {locale === "km" 
                          ? "សូមមើលឯកសារណែនាំដំឡើងសមាសភាគនីមួយៗនៅលើគេហទំព័រមេរបស់យើង។"
                          : "Explore installation details for each components directly inside the guides sidebar."}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button className="w-full">{locale === "km" ? "យល់ព្រម" : "Dismiss"}</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

              </div>
            </div>

          </TabsContent>
        </Tabs>

      </main>

      <footer className="border-t border-border py-6 bg-muted/40 text-center text-xs text-muted-foreground select-none">
        Angkor UI Playground Workspace. Rendered with tailwind themes variables. Mit License.
      </footer>
    </div>
  );
}
