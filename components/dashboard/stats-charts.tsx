"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

const data = [
  { mes: "Ene", minutas: 4, ganancias: 400000 },
  { mes: "Feb", minutas: 3, ganancias: 300000 },
  { mes: "Mar", minutas: 5, ganancias: 500000 },
  { mes: "Abr", minutas: 6, ganancias: 600000 },
  { mes: "May", minutas: 4, ganancias: 400000 },
  { mes: "Jun", minutas: 7, ganancias: 700000 }
]

const tipoMinutas = [
  { tipo: "Compra Venta", cantidad: 12 },
  { tipo: "Arriendo", cantidad: 8 },
  { tipo: "Préstamo", cantidad: 5 },
  { tipo: "Otros", cantidad: 3 }
]

export function StatsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Ganancias Mensuales</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `$${value.toLocaleString()}`,
                  "Ganancias"
                ]}
              />
              <Line
                type="monotone"
                dataKey="ganancias"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Minutas por Tipo</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tipoMinutas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Minutas Mensuales</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="minutas"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Resumen</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Minutas</span>
            <span className="font-semibold">28</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Ganancias Totales</span>
            <span className="font-semibold">$2,900,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Promedio Mensual</span>
            <span className="font-semibold">$483,333</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Clientes Activos</span>
            <span className="font-semibold">12</span>
          </div>
        </div>
      </Card>
    </div>
  )
} 