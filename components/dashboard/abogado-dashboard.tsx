"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { StatsCharts } from "@/components/dashboard/stats-charts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { MinutaViewer } from "@/components/minuta/minuta-viewer"

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

  const [open, setOpen] = useState(false)
  const [accion, setAccion] = useState<"" | "aceptar" | "rechazar">("")
  const [motivo, setMotivo] = useState("")
  const [firma, setFirma] = useState("")

  // Ejemplo de minuta generada
  const minutaEjemplo = {
    documento: `MINUTA DE COMPRA VENTA DE VEHÍCULO\n\nEn Santiago, a 20/03/2024, entre los suscritos...\n\n[Documento completo de minuta]\n\nEL VENDEDOR                                EL COMPRADOR\n_________________                         _________________\nJuan Pérez                                 Carlos Pérez`,
    version: 1,
    fechaGeneracion: new Date().toISOString(),
    firmas: { cliente: true, abogado: false }
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
                    <Button className="w-full" onClick={() => { setOpen(true); setAccion(""); setMotivo(""); setFirma(""); }}>Revisar</Button>
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

        {/* Modal de revisión de minuta */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Revisión de Minuta</DialogTitle>
            </DialogHeader>
            <div className="mb-4">
              <MinutaViewer minuta={minutaEjemplo as any} onFirmar={() => {}} esAbogado />
            </div>
            {accion === "rechazar" && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Motivo del rechazo</label>
                <textarea
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                  placeholder="Explica el motivo del rechazo..."
                />
              </div>
            )}
            {accion === "aceptar" && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Firma del abogado</label>
                <input
                  className="w-full p-2 border rounded-md"
                  value={firma}
                  onChange={e => setFirma(e.target.value)}
                  placeholder="Nombre y apellido del abogado"
                />
              </div>
            )}
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              {accion === "" && (
                <>
                  <Button variant="destructive" onClick={() => setAccion("rechazar")}>Rechazar</Button>
                  <Button onClick={() => setAccion("aceptar")}>Aceptar y Firmar</Button>
                </>
              )}
              {accion === "rechazar" && (
                <>
                  <Button variant="outline" onClick={() => setAccion("")}>Volver</Button>
                  <Button disabled={!motivo.trim()} onClick={() => { setOpen(false); /* lógica de rechazo */ }}>Enviar Rechazo</Button>
                </>
              )}
              {accion === "aceptar" && (
                <>
                  <Button variant="outline" onClick={() => setAccion("")}>Volver</Button>
                  <Button disabled={!firma.trim()} onClick={() => { setOpen(false); /* lógica de firma */ }}>Firmar y Enviar</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
} 