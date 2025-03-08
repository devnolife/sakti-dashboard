import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AvailableLabsTab } from "@/components/laboratory/tabs/available-labs-tab"
import { MyLabsTab } from "@/components/laboratory/tabs/my-labs-tab"
import { CompletedLabsTab } from "@/components/laboratory/tabs/completed-labs-tab"
import { RegistrationHistoryTab } from "@/components/laboratory/tabs/registration-history-tab"
import { BeakerIcon, BookOpenIcon, CheckCircleIcon, ReceiptIcon } from "lucide-react"

export default function LaboratoryPage() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/40 dark:to-accent-950/40 p-8 border border-primary-100/50 dark:border-primary-900/50">
        <div className="absolute inset-0 bg-grid-primary/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
              Informatics Laboratory
            </span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Explore, register, and manage your laboratory activities in one place. Access your current labs, view
            completed courses, and track your registration history.
          </p>
        </div>
      </div>

      <Tabs defaultValue="available" className="space-y-8">
        <div className="bg-white dark:bg-gray-950 sticky top-0 z-10 py-2 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-b">
          <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-4 h-auto p-1 bg-muted/50">
            <TabsTrigger
              value="available"
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <BeakerIcon className="h-4 w-4 mr-2" />
              <span>Available Labs</span>
            </TabsTrigger>
            <TabsTrigger
              value="my-labs"
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <BookOpenIcon className="h-4 w-4 mr-2" />
              <span>My Labs</span>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              <span>Completed</span>
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <ReceiptIcon className="h-4 w-4 mr-2" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="available" className="space-y-8 mt-0 animate-in fade-in-50 duration-300">
          <AvailableLabsTab />
        </TabsContent>

        <TabsContent value="my-labs" className="space-y-8 mt-0 animate-in fade-in-50 duration-300">
          <MyLabsTab />
        </TabsContent>

        <TabsContent value="completed" className="space-y-8 mt-0 animate-in fade-in-50 duration-300">
          <CompletedLabsTab />
        </TabsContent>

        <TabsContent value="history" className="space-y-8 mt-0 animate-in fade-in-50 duration-300">
          <RegistrationHistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

