"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MinutaService } from "@/services/minuta-service"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  onGenerarMinuta: (tipo: string, datos: Record<string, string>) => void
}

export function ChatInterface({ onGenerarMinuta }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [minutaData, setMinutaData] = useState<{
    tipo: string
    datos: Record<string, string>
    faltantes: string[]
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Agregar mensaje del usuario
    const userMessage: Message = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    // Simular respuesta de la IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }])
      setIsGenerating(false)
    }, 1000)
  }

  const generateAIResponse = (userInput: string): string => {
    // Aquí iría la lógica real de la IA
    // Por ahora, simulamos respuestas básicas
    if (userInput.toLowerCase().includes("compra venta auto")) {
      const template = MinutaService.getTemplateByTipo("compra_venta_vehiculo")
      if (template) {
        setMinutaData({
          tipo: template.tipo,
          datos: Object.fromEntries(
            template.campos.map(campo => [campo.nombre, ""])
          ),
          faltantes: template.campos.map(campo => campo.descripcion)
        })
        return "Entiendo que necesitas una minuta de compra venta de vehículo. Para generar la minuta, necesito los siguientes datos:\n\n" +
          template.campos.map((campo, index) => 
            `${index + 1}. ${campo.descripcion}`
          ).join("\n") +
          "\n\nPor favor, proporciona estos datos para generar la minuta."
      }
    }
    return "Entiendo tu solicitud. ¿Podrías proporcionarme más detalles sobre el tipo de minuta legal que necesitas?"
  }

  const handleGenerarMinuta = () => {
    if (!minutaData) return

    // Verificar que todos los campos requeridos estén completos
    const camposFaltantes = Object.entries(minutaData.datos)
      .filter(([_, value]) => !value.trim())
      .map(([key]) => key)

    if (camposFaltantes.length > 0) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Por favor, completa todos los campos requeridos antes de generar la minuta."
      }])
      return
    }

    onGenerarMinuta(minutaData.tipo, minutaData.datos)
    setMinutaData(null)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex w-full",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%] md:max-w-[70%]",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-4 bg-muted">
                <p>Generando respuesta...</p>
              </Card>
            </div>
          )}
        </div>
      </div>

      {minutaData && (
        <div className="p-4 border-t">
          <h3 className="font-semibold mb-2">Datos de la Minuta</h3>
          <div className="grid gap-4">
            {Object.entries(minutaData.datos).map(([key, value]) => (
              <div key={key} className="grid gap-2">
                <Label htmlFor={key}>{key}</Label>
                <Input
                  id={key}
                  value={value}
                  onChange={(e) => {
                    setMinutaData(prev => {
                      if (!prev) return prev
                      return {
                        ...prev,
                        datos: {
                          ...prev.datos,
                          [key]: e.target.value
                        }
                      }
                    })
                  }}
                />
              </div>
            ))}
            <Button 
              className="w-full"
              onClick={handleGenerarMinuta}
            >
              Generar Minuta
            </Button>
          </div>
        </div>
      )}

      <div className="border-t p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim()}>
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 