"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Incluye id y timestamp en el tipo Message
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Esta es una versión demo. En la versión completa, podrás generar minutas legales personalizadas y recibir asistencia legal especializada.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const handleGenerarMinuta = () => {
    if (!minutaData) return

    // Verificar que todos los campos requeridos estén completos
    const camposFaltantes = Object.entries(minutaData.datos)
      .filter(([, value]) => !value.trim())
      .map(([key]) => key)

    if (camposFaltantes.length > 0) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Por favor, completa todos los campos requeridos antes de generar la minuta.",
        timestamp: new Date(),
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
          {messages.map((message) => (
            <div
              key={message.id}
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
                <span className="block text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
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