"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { StatsCharts } from "@/components/dashboard/stats-charts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Ganancias Totales</CardTitle>
              <CardDescription>{formatCurrency(metrics.totalEarnings)}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Minutas Pendientes</CardTitle>
              <CardDescription>{metrics.pendingMinutes}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Minutas Completadas</CardTitle>
              <CardDescription>{metrics.completedMinutes}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Clientes Activos</CardTitle>
              <CardDescription>{metrics.activeClients}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-8">
          <StatsCharts />
        </div>

        <div className="mt-8">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="completed">Completadas</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Ejemplo de minuta pendiente */}
                <Card>
                  <CardHeader>
                    <CardTitle>Minuta de Compraventa</CardTitle>
                    <CardDescription>Cliente: Carlos Pérez</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Fecha de solicitud: 15/03/2024
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Revisar</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Aquí irían las minutas completadas */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
} 