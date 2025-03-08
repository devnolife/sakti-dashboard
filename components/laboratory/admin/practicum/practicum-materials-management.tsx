"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import PracticumMaterialsTable from "./practicum-materials-table"
import PracticumMaterialsStats from "./practicum-materials-stats"
import PracticumMaterialRequests from "./practicum-material-requests"
import AddMaterialDialog from "./add-material-dialog"
import { mockPracticumMaterials, mockMaterialRequests } from "./mock-practicum-materials"

export default function PracticumMaterialsManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [materials, setMaterials] = useState(mockPracticumMaterials)
  const [requests, setRequests] = useState(mockMaterialRequests)

  const handleAddMaterial = (newMaterial) => {
    setMaterials([
      ...materials,
      {
        id: `material-${materials.length + 1}`,
        ...newMaterial,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  const handleUpdateMaterial = (updatedMaterial) => {
    setMaterials(materials.map((material) => (material.id === updatedMaterial.id ? updatedMaterial : material)))
  }

  const handleDeleteMaterial = (id) => {
    setMaterials(materials.filter((material) => material.id !== id))
  }

  const handleApproveRequest = (id) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: "approved" } : request)))

    // Update material quantity
    const request = requests.find((r) => r.id === id)
    if (request) {
      setMaterials(
        materials.map((material) =>
          material.id === request.materialId
            ? { ...material, quantity: material.quantity - request.quantity }
            : material,
        ),
      )
    }
  }

  const handleRejectRequest = (id) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: "rejected" } : request)))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Practicum Materials Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Material
        </Button>
      </div>

      <PracticumMaterialsStats materials={materials} requests={requests} />

      <Tabs defaultValue="inventory">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="requests">Material Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-6">
          <PracticumMaterialsTable
            materials={materials}
            onUpdate={handleUpdateMaterial}
            onDelete={handleDeleteMaterial}
          />
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <PracticumMaterialRequests
            requests={requests}
            materials={materials}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        </TabsContent>
      </Tabs>

      <AddMaterialDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddMaterial} />
    </div>
  )
}

