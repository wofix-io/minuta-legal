"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

const eventos = [
  {
    id: 1,
    titulo: "Reunión con Cliente",
    fecha: "15 de Marzo",
    hora: "10:00 AM",
  },
  {
    id: 2,
    titulo: "Presentación de Proyecto",
    fecha: "15 de Marzo",
    hora: "2:00 PM",
  },
  {
    id: 3,
    titulo: "Llamada de Seguimiento",
    fecha: "15 de Marzo",
    hora: "4:30 PM",
  },
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-6 md:ml-64">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Calendario</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Evento
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </Card>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Eventos del Día</h2>
              {eventos.map((evento) => (
                <Card key={evento.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{evento.titulo}</h3>
                      <p className="text-sm text-muted-foreground">
                        {evento.fecha} - {evento.hora}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 