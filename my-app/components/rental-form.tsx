"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Upload } from "lucide-react"

export function RentalForm() {
  const containers = ["Contenedor A", "Contenedor B"]
  const clients = ["Cliente A", "Cliente B"]

  const [formData, setFormData] = useState({
    contenedor: "",
    cliente: "",
    fechaEntrega: "",
    codigoGuia: "",
    fechaRetiro: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Nuevo arrendamiento", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contenedor">Contenedor</Label>
          <Select value={formData.contenedor} onValueChange={(value) => handleChange("contenedor", value)}>
            <SelectTrigger id="contenedor" className="bg-input">
              <SelectValue placeholder="Seleccionar contenedor" />
            </SelectTrigger>
            <SelectContent>
              {containers.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cliente">Cliente</Label>
          <Select value={formData.cliente} onValueChange={(value) => handleChange("cliente", value)}>
            <SelectTrigger id="cliente" className="bg-input">
              <SelectValue placeholder="Seleccionar cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fecha-entrega">Fecha de entrega</Label>
          <div className="relative">
            <Input
              id="fecha-entrega"
              type="date"
              value={formData.fechaEntrega}
              onChange={(e) => handleChange("fechaEntrega", e.target.value)}
              className="bg-input"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="codigo-guia">Código guía despacho</Label>
          <Input
            id="codigo-guia"
            value={formData.codigoGuia}
            onChange={(e) => handleChange("codigoGuia", e.target.value)}
            className="bg-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fecha-retiro">Fecha de retiro</Label>
          <div className="relative">
            <Input
              id="fecha-retiro"
              type="date"
              value={formData.fechaRetiro}
              onChange={(e) => handleChange("fechaRetiro", e.target.value)}
              className="bg-input"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Ingresar factura (PDF)</Label>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Seleccionar archivo
          </Button>
          <span className="text-sm text-muted-foreground">Sin archivos seleccionados</span>
        </div>
        <p className="text-xs text-muted-foreground">Subir factura en formato PDF</p>
      </div>

      <Button type="submit" className="bg-primary hover:bg-primary/90">
        Guardar
      </Button>
    </form>
  )
}
