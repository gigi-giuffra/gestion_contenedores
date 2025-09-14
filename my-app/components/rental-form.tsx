"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Upload } from "lucide-react"

interface Container {
  serieLetra: string
  numeroSerie: string
  estado: string
}

export function RentalForm() {
  const [containers, setContainers] = useState<Container[]>([])
  const clients = ["Cliente A", "Cliente B"]

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("contenedores") || "[]")
      if (Array.isArray(stored)) {
        setContainers(stored)
      } else {
        alert("Los datos de contenedores están corruptos. Se mostrará una lista vacía.")
        setContainers([])
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        alert("Error al leer los contenedores almacenados.")
      }
      setContainers([])
    }
  }, [])

  const [formData, setFormData] = useState({
    contenedor: "",
    cliente: "",
    fechaEntrega: "",
    codigoGuia: "",
    fechaRetiro: "",
  })

  const [facturaFile, setFacturaFile] = useState<File | null>(null)
  const facturaInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Nuevo arriendo", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contenedor">Contenedor</Label>
          {(() => {
            const availableContainers = containers.filter(
              (c) => c.estado !== "Arrendado"
            )
            return (
              <Select
                value={formData.contenedor}
                onValueChange={(value) => handleChange("contenedor", value)}
                disabled={availableContainers.length === 0}
              >
                <SelectTrigger
                  id="contenedor"
                  className="bg-input"
                  disabled={availableContainers.length === 0}
                >
                  <SelectValue
                    placeholder={
                      availableContainers.length
                        ? "Seleccionar contenedor"
                        : "No hay contenedores registrados"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableContainers.length ? (
                    availableContainers.map((c) => {
                      const serie = `${c.serieLetra}${c.numeroSerie}`
                      return (
                        <SelectItem key={serie} value={serie}>
                          {serie}
                        </SelectItem>
                      )
                    })
                  ) : (
                    <SelectItem value="" disabled>
                      No hay contenedores registrados
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )
          })()}
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
        <input
          type="file"
          accept="application/pdf"
          ref={facturaInputRef}
          onChange={(e) => setFacturaFile(e.target.files?.[0] || null)}
          className="hidden"
        />
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => facturaInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Seleccionar archivo
          </Button>
          <span className="text-sm text-muted-foreground">
            {facturaFile ? facturaFile.name : "Sin archivos seleccionados"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Subir factura en formato PDF</p>
      </div>

      <Button type="submit" className="bg-primary hover:bg-primary/90">
        Guardar
      </Button>
    </form>
  )
}
