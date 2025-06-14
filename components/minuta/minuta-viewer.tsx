"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MinutaGenerada } from "@/types/minuta"

interface MinutaViewerProps {
  minuta: MinutaGenerada
  onFirmar: (tipo: "cliente" | "abogado") => void
  esAbogado?: boolean
}

export function MinutaViewer({ minuta, onFirmar, esAbogado = false }: MinutaViewerProps) {
  const [firmando, setFirmando] = useState(false)

  const handleFirmar = async (tipo: "cliente" | "abogado") => {
    setFirmando(true)
    try {
      await onFirmar(tipo)
    } finally {
      setFirmando(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans">
            {minuta.documento}
          </pre>
        </div>
      </Card>

      <div className="flex justify-end gap-4">
        {!esAbogado && !minuta.firmas.cliente && (
          <Button
            onClick={() => handleFirmar("cliente")}
            disabled={firmando}
          >
            {firmando ? "Firmando..." : "Firmar como Cliente"}
          </Button>
        )}

        {esAbogado && !minuta.firmas.abogado && (
          <Button
            onClick={() => handleFirmar("abogado")}
            disabled={firmando}
          >
            {firmando ? "Firmando..." : "Firmar como Abogado"}
          </Button>
        )}

        {minuta.firmas.cliente && minuta.firmas.abogado && (
          <Button variant="outline" onClick={() => window.print()}>
            Descargar PDF
          </Button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Versión: {minuta.version}</p>
        <p>Fecha de generación: {new Date(minuta.fechaGeneracion).toLocaleDateString()}</p>
        <p>Estado de firmas:</p>
        <ul className="list-disc list-inside">
          <li>Cliente: {minuta.firmas.cliente ? "Firmado" : "Pendiente"}</li>
          <li>Abogado: {minuta.firmas.abogado ? "Firmado" : "Pendiente"}</li>
        </ul>
      </div>
    </div>
  )
} 