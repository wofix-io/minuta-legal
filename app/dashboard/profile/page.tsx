"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

const userData = {
  nombre: "Dr. Juan Pérez",
  email: "juan.perez@minutalegal.com",
  telefono: "+56 9 1234 5678",
  direccion: "Av. Libertador Bernardo O'Higgins 1234, Santiago",
  especialidad: "Derecho Civil",
  colegio: "Colegio de Abogados de Chile",
  numeroColegio: "12345",
  biografia: "Abogado especializado en derecho civil con más de 10 años de experiencia en la redacción y revisión de minutas legales.",
  avatar: "/avatars/abogado1.jpg"
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar los cambios
    setIsEditing(false)
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-6 md:ml-64">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Perfil</h1>
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancelar" : "Editar Perfil"}
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={formData.avatar} alt={formData.nombre} />
                  <AvatarFallback>{formData.nombre.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Cambiar Foto
                  </Button>
                )}
              </div>

              <div className="flex-1 space-y-6">
                <Tabs defaultValue="personal">
                  <TabsList>
                    <TabsTrigger value="personal">Información Personal</TabsTrigger>
                    <TabsTrigger value="profesional">Información Profesional</TabsTrigger>
                    <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre Completo</Label>
                          <Input
                            id="nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo Electrónico</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            id="telefono"
                            value={formData.telefono}
                            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="direccion">Dirección</Label>
                          <Input
                            id="direccion"
                            value={formData.direccion}
                            onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      {isEditing && (
                        <Button type="submit">Guardar Cambios</Button>
                      )}
                    </form>
                  </TabsContent>

                  <TabsContent value="profesional">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="especialidad">Especialidad</Label>
                          <Input
                            id="especialidad"
                            value={formData.especialidad}
                            onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="colegio">Colegio de Abogados</Label>
                          <Input
                            id="colegio"
                            value={formData.colegio}
                            onChange={(e) => setFormData({...formData, colegio: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="numeroColegio">Número de Colegiado</Label>
                          <Input
                            id="numeroColegio"
                            value={formData.numeroColegio}
                            onChange={(e) => setFormData({...formData, numeroColegio: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="biografia">Biografía</Label>
                        <textarea
                          id="biografia"
                          className="w-full min-h-[100px] p-2 border rounded-md"
                          value={formData.biografia}
                          onChange={(e) => setFormData({...formData, biografia: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      {isEditing && (
                        <Button type="submit">Guardar Cambios</Button>
                      )}
                    </form>
                  </TabsContent>

                  <TabsContent value="seguridad">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Contraseña Actual</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva Contraseña</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          disabled={!isEditing}
                        />
                      </div>
                      {isEditing && (
                        <Button type="submit">Cambiar Contraseña</Button>
                      )}
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
} 