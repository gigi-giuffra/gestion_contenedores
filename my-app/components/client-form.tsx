"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface Cliente {
  id: number
  nombre: string
  tipo: string
  documento: string
  email: string
  telefono: string
  contacto: string
  ciudad: string
}

interface ClientFormProps {
  initialData?: Cliente
  index?: number
}

export function ClientForm({ initialData, index }: ClientFormProps) {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    tipo: initialData?.tipo || "",
    documento: initialData?.documento || "",
    email: initialData?.email || "",
    telefono: initialData?.telefono || "",
    contacto: initialData?.contacto || "",
    ciudad: initialData?.ciudad || "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const requiredFields: { key: keyof typeof formData; label: string }[] = [
      { key: "nombre", label: "Razón Social / Nombre Completo" },
      { key: "tipo", label: "Tipo de Cliente" },
      { key: "documento", label: "Documento de Identidad (RUT/RUC)" },
      { key: "email", label: "Correo Electrónico" },
      { key: "telefono", label: "Teléfono" },
      { key: "contacto", label: "Contacto" },
      { key: "ciudad", label: "Ciudad" },
    ]

    const missingFields = requiredFields
      .filter(({ key }) => formData[key].trim() === "")
      .map(({ label }) => label)

    if (missingFields.length > 0) {
      alert(`¡¡ALERTA te falta escribir : ${missingFields.join(", ")}!!`)
      return
    }

    let existing: Cliente[] = []
    try {
      const stored = localStorage.getItem("clientes")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          existing = parsed as Cliente[]
        } else {
          console.warn("El valor almacenado en 'clientes' no es un arreglo. Se reemplazará por uno vacío.")
        }
      }
    } catch (error) {
      console.warn("No se pudo leer la lista de clientes. Se reemplazará por un arreglo vacío.", error)
      existing = []
    }

    if (typeof index === "number" && initialData && index >= 0 && index < existing.length) {
      existing[index] = { id: initialData.id, ...formData }
    } else {
      const newClient = { id: Date.now(), ...formData }
      existing.push(newClient)
    }

    localStorage.setItem("clientes", JSON.stringify(existing))
    router.push("/clientes")
  }

  const handleDelete = () => {
    if (typeof index !== "number") return
    if (confirm("¿Está seguro de eliminar este cliente?")) {
      let existing: Cliente[] = []
      try {
        const stored = localStorage.getItem("clientes")
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            existing = parsed as Cliente[]
          } else {
            console.warn("El valor almacenado en 'clientes' no es un arreglo. Se reemplazará por uno vacío.")
          }
        }
      } catch (error) {
        console.warn("No se pudo leer la lista de clientes. Se reemplazará por un arreglo vacío.", error)
        existing = []
      }

      if (index >= 0 && index < existing.length) {
        existing.splice(index, 1)
      }

      localStorage.setItem("clientes", JSON.stringify(existing))
      router.push("/clientes")
    }
  }

  const isEditing = typeof index === "number" && !!initialData

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nombre">Razón Social / Nombre Completo</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            className="bg-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Cliente</Label>
          <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
            <SelectTrigger id="tipo" className="bg-input">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="empresa">Empresa</SelectItem>
              <SelectItem value="persona">Persona Natural</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="documento">Documento de Identidad (RUT/RUC)</Label>
          <Input
            id="documento"
            value={formData.documento}
            onChange={(e) => handleChange("documento", e.target.value)}
            className="bg-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={formData.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            className="bg-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contacto">Contacto</Label>
          <Input
            id="contacto"
            value={formData.contacto}
            onChange={(e) => handleChange("contacto", e.target.value)}
            className="bg-input"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            value={formData.ciudad}
            onChange={(e) => handleChange("ciudad", e.target.value)}
            className="bg-input"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Guardar
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        )}
      </div>
    </form>
  )
}

