"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

export function LandingCharts() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Impacto y Crecimiento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Gráfico de mejora de eficiencia */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Reducción de tiempo en generación de minutas</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={[
              { mes: "Ene", minutos: 60 },
              { mes: "Feb", minutos: 45 },
              { mes: "Mar", minutos: 30 },
              { mes: "Abr", minutos: 18 },
              { mes: "May", minutos: 12 },
              { mes: "Jun", minutos: 10 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="minutos" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Tiempo promedio para generar una minuta legal (en minutos).</p>
        </div>
        {/* Gráfico de crecimiento de usuarios */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Crecimiento de usuarios</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[
              { mes: "Ene", usuarios: 50 },
              { mes: "Feb", usuarios: 120 },
              { mes: "Mar", usuarios: 200 },
              { mes: "Abr", usuarios: 320 },
              { mes: "May", usuarios: 410 },
              { mes: "Jun", usuarios: 520 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usuarios" fill="#22c55e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Usuarios activos por mes.</p>
        </div>
      </div>
    </div>
  );
} 