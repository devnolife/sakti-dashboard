import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AvailableLabsTab } from "@/components/laboratory/tabs/available-labs-tab"
import { MyLabsTab } from "@/components/laboratory/tabs/my-labs-tab"
import { CompletedLabsTab } from "@/components/laboratory/tabs/completed-labs-tab"
import { RegistrationHistoryTab } from "@/components/laboratory/tabs/registration-history-tab"
import { BeakerIcon, BookOpenIcon, CheckCircleIcon, ReceiptIcon } from "lucide-react"

export default function LaboratoryPage() {
  return (
    <div className="space-y-8">
      <div className="relative p-8 overflow-hidden dark:from-primary-950/40 dark:to-accent-950/40 dark:border-primary-900/50">
        <div className="absolute inset-0 bg-grid-primary/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
              Laboratorium & Praktikum
            </span>
          </h2>
          <p className="max-w-2xl mt-2 text-muted-foreground">
            Jelajahi, daftar, dan atur semua kegiatan lab kamu dalam satu tempat. Akses lab yang lagi kamu ikutin, 
            liat yang udah kelar, dan pantau riwayat pendaftaran kamu dengan gampang.
          </p>
        </div>
      </div>

      <Tabs defaultValue="available" className="space-y-8">
        <div className="sticky top-0 z-10 py-2 bg-white border-b dark:bg-gray-950 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80">
          <TabsList className="grid w-full h-auto max-w-3xl grid-cols-4 p-1 mx-auto bg-muted/50">
            <TabsTrigger
              value="available"
              className="flex items-center justify-center py-3 space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <BeakerIcon className="w-4 h-4" />
              <span>Lab Tersedia</span>
            </TabsTrigger>
            <TabsTrigger
              value="my-labs"
              className="flex items-center justify-center py-3 space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <BookOpenIcon className="w-4 h-4" />
              <span>Lab Terdaftar</span>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex items-center justify-center py-3 space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <CheckCircleIcon className="w-4 h-4" />
              <span>Udah Kelar</span>
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex items-center justify-center py-3 space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <ReceiptIcon className="w-4 h-4" />
              <span>Riwayat</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="available" className="mt-0 space-y-8 duration-300 animate-in fade-in-50">
          <AvailableLabsTab />
        </TabsContent>

        <TabsContent value="my-labs" className="mt-0 space-y-8 duration-300 animate-in fade-in-50">
          <MyLabsTab />
        </TabsContent>

        <TabsContent value="completed" className="mt-0 space-y-8 duration-300 animate-in fade-in-50">
          <CompletedLabsTab />
        </TabsContent>

        <TabsContent value="history" className="mt-0 space-y-8 duration-300 animate-in fade-in-50">
          <RegistrationHistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

