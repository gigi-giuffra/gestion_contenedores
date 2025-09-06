"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function ClientForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    documento: "",
    email: "",
    telefono: "",
    contacto: "",
    ciudad: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(formData)
  }

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

      <Button type="submit" className="bg-primary hover:bg-primary/90">
        Guardar
      </Button>
    </form>
  )
}

