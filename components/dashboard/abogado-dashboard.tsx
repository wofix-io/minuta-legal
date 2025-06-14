"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { StatsCharts } from "@/components/dashboard/stats-charts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, CheckCircle, Users } from "lucide-react"
import { MinutaRequest } from "@/types/minuta"

// Función para formatear números en formato chileno
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function AbogadoDashboard() {
  // Datos de ejemplo
  const metrics = {
    totalEarnings: 1500000,
    pendingMinutes: 3,
    completedMinutes: 12,
    activeClients: 5
  }

  const solicitudesPendientes: MinutaRequest[] = [
    {
      id: "1",
      tipo: "Compra Venta de Vehículo",
      cliente: "Juan Pérez",
      fecha: "2024-03-20",
      estado: "pendiente",
      datos: {
        vendedor: "María González",
        comprador: "Juan Pérez",
        marca: "Toyota",
        modelo: "Corolla",
        año: "2020",
        precio: "15000000"
      }
    }
  ]

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-6 md:ml-64">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Ganancias Totales
                  </h3>
                  <p className="text-2xl font-bold">
                    {formatCurrency(metrics.totalEarnings)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Minutas Pendientes
                  </h3>
                  <p className="text-2xl font-bold">{metrics.pendingMinutes}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Minutas Completadas
                  </h3>
                  <p className="text-2xl font-bold">{metrics.completedMinutes}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Clientes Activos
                  </h3>
                  <p className="text-2xl font-bold">{metrics.activeClients}</p>
                </div>
              </div>
            </Card>
          </div>

          <StatsCharts />

          <Card className="p-4">
            <Tabs defaultValue="pendientes">
              <TabsList>
                <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
                <TabsTrigger value="completadas">Completadas</TabsTrigger>
              </TabsList>

              <TabsContent value="pendientes">
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Minuta de Compra Venta</h3>
                        <p className="text-sm text-muted-foreground">
                          Cliente: Juan Pérez
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Fecha: 20/03/2024
                        </p>
                      </div>
                      <Button>Revisar</Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="completadas">
                <p>No hay minutas completadas</p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  )
} 