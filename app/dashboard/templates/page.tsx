"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileText, Plus, Search, Edit2, Trash2 } from "lucide-react"

interface Template {
  id: number
  title: string
  type: string
  content: string
  lastModified: string
  variables: string[]
}

const templates: Template[] = [
  {
    id: 1,
    title: "Minuta de Compra Venta",
    type: "compra_venta",
    content: "MINUTA DE COMPRA VENTA\n\nEntre los suscritos, don/ña [NOMBRE_VENDEDOR], mayor de edad, de nacionalidad [NACIONALIDAD_VENDEDOR], domiciliado en [DIRECCION_VENDEDOR], cédula de identidad N° [RUT_VENDEDOR], en adelante el 'VENDEDOR', y don/ña [NOMBRE_COMPRADOR], mayor de edad, de nacionalidad [NACIONALIDAD_COMPRADOR], domiciliado en [DIRECCION_COMPRADOR], cédula de identidad N° [RUT_COMPRADOR], en adelante el 'COMPRADOR', se ha convenido el siguiente contrato de compra venta:",
    lastModified: "20/03/2024",
    variables: ["NOMBRE_VENDEDOR", "NACIONALIDAD_VENDEDOR", "DIRECCION_VENDEDOR", "RUT_VENDEDOR", "NOMBRE_COMPRADOR", "NACIONALIDAD_COMPRADOR", "DIRECCION_COMPRADOR", "RUT_COMPRADOR"]
  },
  {
    id: 2,
    title: "Minuta de Arriendo",
    type: "arriendo",
    content: "MINUTA DE ARRIENDO\n\nEntre los suscritos, don/ña [NOMBRE_ARRENDADOR], mayor de edad, de nacionalidad [NACIONALIDAD_ARRENDADOR], domiciliado en [DIRECCION_ARRENDADOR], cédula de identidad N° [RUT_ARRENDADOR], en adelante el 'ARRENDADOR', y don/ña [NOMBRE_ARRENDATARIO], mayor de edad, de nacionalidad [NACIONALIDAD_ARRENDATARIO], domiciliado en [DIRECCION_ARRENDATARIO], cédula de identidad N° [RUT_ARRENDATARIO], en adelante el 'ARRENDATARIO', se ha convenido el siguiente contrato de arriendo:",
    lastModified: "19/03/2024",
    variables: ["NOMBRE_ARRENDADOR", "NACIONALIDAD_ARRENDADOR", "DIRECCION_ARRENDADOR", "RUT_ARRENDADOR", "NOMBRE_ARRENDATARIO", "NACIONALIDAD_ARRENDATARIO", "DIRECCION_ARRENDATARIO", "RUT_ARRENDATARIO"]
  }
]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreateTemplate = () => {
    // Aquí iría la lógica para crear una nueva plantilla
  }

  const handleEditTemplate = () => {
    // Aquí iría la lógica para editar una plantilla
  }

  const handleDeleteTemplate = () => {
    // Aquí iría la lógica para eliminar una plantilla
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-6 md:ml-64">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Plantillas de Minutas</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Plantilla
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Plantilla</DialogTitle>
                  <DialogDescription>
                    Crea una nueva plantilla de minuta que podrá ser utilizada por la IA.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Título</label>
                    <Input
                      placeholder="Ej: Minuta de Compra Venta"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compra_venta">Compra Venta</SelectItem>
                        <SelectItem value="arriendo">Arriendo</SelectItem>
                        <SelectItem value="prestamo">Préstamo</SelectItem>
                        <SelectItem value="sociedad">Sociedad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contenido</label>
                    <Textarea
                      placeholder="Escribe el contenido de la plantilla..."
                      className="min-h-[200px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Variables</label>
                    <Input
                      placeholder="Ej: NOMBRE, RUT, DIRECCION"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separa las variables con comas. Usa [NOMBRE_VARIABLE] en el contenido.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateTemplate}>
                    Guardar Plantilla
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar plantilla..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{template.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Tipo: {template.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Última modificación: {template.lastModified}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {template.variables.map((variable) => (
                          <span
                            key={variable}
                            className="px-2 py-1 bg-muted rounded-md text-xs"
                          >
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditTemplate()}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTemplate()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 