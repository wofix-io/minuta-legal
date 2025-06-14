"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Search, Send, Trash2 } from "lucide-react"

const correos = [
  {
    id: 1,
    remitente: "Juan Pérez",
    asunto: "Solicitud de Minuta de Compra Venta",
    fecha: "2024-03-20",
    leido: false,
    contenido: "Buenos días, necesito generar una minuta de compra venta de vehículo..."
  },
  {
    id: 2,
    remitente: "María González",
    asunto: "Revisión de Minuta",
    fecha: "2024-03-19",
    leido: true,
    contenido: "Hola, he revisado la minuta y necesito algunos cambios..."
  }
]

export default function MailPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMail, setSelectedMail] = useState<typeof correos[0] | null>(null)

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-6 md:ml-64">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Correos</h1>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Nuevo Correo
            </Button>
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar correo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-4">
              <Tabs defaultValue="entrada">
                <TabsList className="mb-4">
                  <TabsTrigger value="entrada">Entrada</TabsTrigger>
                  <TabsTrigger value="enviados">Enviados</TabsTrigger>
                  <TabsTrigger value="papelera">Papelera</TabsTrigger>
                </TabsList>

                <TabsContent value="entrada">
                  <div className="space-y-2">
                    {correos.map((correo) => (
                      <Card
                        key={correo.id}
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedMail?.id === correo.id
                            ? "bg-primary/10"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedMail(correo)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium truncate">
                                {correo.remitente}
                              </h3>
                              <span className="text-sm text-muted-foreground">
                                {correo.fecha}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {correo.asunto}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="enviados">
                  <p>No hay correos enviados</p>
                </TabsContent>

                <TabsContent value="papelera">
                  <p>No hay correos en la papelera</p>
                </TabsContent>
              </Tabs>
            </Card>

            {selectedMail && (
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">{selectedMail.asunto}</h2>
                      <p className="text-sm text-muted-foreground">
                        De: {selectedMail.remitente}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Fecha: {selectedMail.fecha}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="prose max-w-none">
                    <p>{selectedMail.contenido}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Responder</Button>
                    <Button>Reenviar</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 