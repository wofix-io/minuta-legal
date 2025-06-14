"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Clock, User, MessageSquare, FileText, Menu, Home } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { DialogTitle } from "@/components/ui/dialog"

interface Message {
  id: number
  content: string
  sender: "user" | "assistant"
  timestamp: string
}

interface ChatHistory {
  id: number
  title: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

const chatHistory: ChatHistory[] = [
  {
    id: 1,
    title: "Minuta de Compra Venta",
    lastMessage: "He revisado la minuta y necesito algunos cambios...",
    timestamp: "20/03/2024",
    unread: true
  },
  {
    id: 2,
    title: "Minuta de Arriendo",
    lastMessage: "La minuta ha sido aprobada y firmada.",
    timestamp: "19/03/2024",
    unread: false
  }
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [showChats, setShowChats] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages([...messages, newMessage])
    setInput("")

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        content: "Entiendo tu solicitud. Estoy generando una minuta legal basada en tus requerimientos...",
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar de Chats - Móvil */}
      <Sheet open={showChats} onOpenChange={setShowChats}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex h-16 items-center border-b px-4">
            <h2 className="text-lg font-semibold">Chats</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="space-y-1 p-2">
              {chatHistory.map((chat) => (
                <Card
                  key={chat.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    selectedChat === chat.id ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setSelectedChat(chat.id)
                    setShowChats(false)
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{chat.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Sidebar de Chats - Desktop */}
      <div className="hidden md:block w-80 border-r bg-card">
        <div className="flex h-16 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Chats</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-1 p-2">
            {chatHistory.map((chat) => (
              <Card
                key={chat.id}
                className={`p-3 cursor-pointer transition-colors ${
                  selectedChat === chat.id ? "bg-primary/10" : "hover:bg-muted"
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{chat.title}</h3>
                      <span className="text-xs text-muted-foreground">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Avatar>
              <AvatarImage src="/avatars/abogado1.jpg" alt="Abogado" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Dr. Juan Pérez</h2>
              <p className="text-sm text-muted-foreground">Abogado</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Clock className="mr-2 h-4 w-4" />
              Historial
            </Button>
            <Sheet open={showProfile} onOpenChange={setShowProfile}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <DialogTitle className="sr-only">Perfil</DialogTitle>
                <div className="flex h-16 items-center border-b px-4">
                  <h2 className="text-lg font-semibold">Perfil</h2>
                </div>
                <ScrollArea className="h-[calc(100vh-4rem)]">
                  <div className="p-4 space-y-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/avatars/user.jpg" alt="Usuario" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <h3 className="mt-4 text-lg font-semibold">Usuario Cliente</h3>
                      <p className="text-sm text-muted-foreground">cliente@ejemplo.com</p>
                    </div>

                    <Tabs defaultValue="info">
                      <TabsList className="w-full">
                        <TabsTrigger value="info" className="flex-1">
                          <User className="mr-2 h-4 w-4" />
                          Información
                        </TabsTrigger>
                        <TabsTrigger value="chats" className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chats
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="info" className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Nombre Completo</h4>
                          <p className="text-sm text-muted-foreground">Usuario Cliente</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Correo Electrónico</h4>
                          <p className="text-sm text-muted-foreground">cliente@ejemplo.com</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Teléfono</h4>
                          <p className="text-sm text-muted-foreground">+56 9 1234 5678</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="chats" className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Chats Activos</h4>
                          <p className="text-sm text-muted-foreground">2 chats en curso</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Minutas Generadas</h4>
                          <p className="text-sm text-muted-foreground">5 minutas</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mensajes */}
        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${
                    message.sender === "user"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        message.sender === "user"
                          ? "/avatars/user.jpg"
                          : "/avatars/abogado1.jpg"
                      }
                      alt={message.sender}
                    />
                    <AvatarFallback>
                      {message.sender === "user" ? "U" : "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
