export type User = {
  id: string
  name: string
  email: string
  password: string
  type: "abogado" | "cliente"
  license?: string
}

export const users: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@abogado.com",
    password: "123456",
    type: "abogado",
    license: "ABG-123456"
  },
  {
    id: "2",
    name: "María García",
    email: "maria@abogado.com",
    password: "123456",
    type: "abogado",
    license: "ABG-789012"
  },
  {
    id: "3",
    name: "Carlos López",
    email: "carlos@cliente.com",
    password: "123456",
    type: "cliente"
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@cliente.com",
    password: "123456",
    type: "cliente"
  }
] 