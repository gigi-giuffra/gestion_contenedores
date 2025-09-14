"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Calendar, Upload, Container, FileText } from "lucide-react"

export interface ContainerFormData {
  serieLetra: string
  numeroSerie: string
  tipo: string
  estado: string
  patio: string
  proveedor: string
  numeroDeclaracion: string
  fechaDeclaracion: string
  fechaCompra: string
  notas: string
  declaracionPdf?: string
  facturaPdf?: string
}

interface ContainerManagementProps {
  initialData?: ContainerFormData
  index?: number
}

export function ContainerManagement({ initialData, index }: ContainerManagementProps) {
  const [formData, setFormData] = useState<ContainerFormData>(
    initialData || {
      serieLetra: "",
      numeroSerie: "",
      tipo: "",
      estado: "Disponible",
      patio: "",
      proveedor: "",
      numeroDeclaracion: "",
      fechaDeclaracion: "",
      fechaCompra: "",
      notas: "",
      declaracionPdf: "",
      facturaPdf: "",
    },
  )

  const [declaracionFile, setDeclaracionFile] = useState<File | null>(null)
  const [facturaFile, setFacturaFile] = useState<File | null>(null)
  const declaracionInputRef = useRef<HTMLInputElement>(null)
  const facturaInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const isEditing = typeof index === "number" && !!initialData

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEstadoChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      estado: value,
      patio: value === "Arrendado" ? "" : prev.patio,
    }))
  }

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const { estado, patio } = formData
    const requiresPatio =
      estado === "Disponible" || estado === "Mantenimiento" || estado === "Rancho"
    if (requiresPatio && !patio) {
      alert(
        "Debe seleccionar un patio cuando el contenedor está Disponible, en Mantenimiento o en Rancho",
      )
      return
    }
    if (estado === "Arrendado" && patio) {
      alert("No debe seleccionar un patio cuando el contenedor está Arrendado")
      return
    }

    const updatedData = { ...formData }
    if (declaracionFile) {
      updatedData.declaracionPdf = await readFileAsDataURL(declaracionFile)
    }
    if (facturaFile) {
      updatedData.facturaPdf = await readFileAsDataURL(facturaFile)
    }

    let stored: ContainerFormData[] = []
    try {
      const parsed = JSON.parse(localStorage.getItem("contenedores") || "[]")
      if (Array.isArray(parsed)) {
        stored = parsed
      } else {
        alert(
          "Los datos de contenedores están corruptos. Se reiniciará el registro.",
        )
        stored = []
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        alert(
          "Los datos de contenedores están corruptos. Se reiniciará el registro.",
        )
      }
      stored = []
    }

    if (isEditing && typeof index === "number") {
      stored[index] = updatedData
    } else {
      stored.push(updatedData)
    }
    localStorage.setItem("contenedores", JSON.stringify(stored))
    router.push("/contenedores")
  }

  const handleDelete = () => {
    if (!isEditing || typeof index !== "number") return
    if (confirm("¿Está seguro de eliminar este contenedor?")) {
      let stored: ContainerFormData[] = []
      try {
        const parsed = JSON.parse(localStorage.getItem("contenedores") || "[]")
        if (Array.isArray(parsed)) {
          stored = parsed
        }
      } catch {
        stored = []
      }
      stored.splice(index, 1)
      localStorage.setItem("contenedores", JSON.stringify(stored))
      router.push("/contenedores")
    }
  }

  return (
    <DashboardLayout
      breadcrumbs={["Contenedores", isEditing ? "Modificar Contenedor" : "Añadir Contenedor"]}
    >
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Container className="h-6 w-6 text-primary" />
            {isEditing ? "Modificar Contenedor" : "Añadir Contenedor"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Serie letra */}
        <div className="space-y-2">
          <Label htmlFor="serie-letra" className="text-sm font-medium">
            Serie letra
          </Label>
          <Input
            id="serie-letra"
            placeholder="Prefijo letras del contenedor (p. ej. AB)"
            value={formData.serieLetra}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase()
              handleInputChange("serieLetra", value)
            }}
            className="bg-input"
          />
        </div>

        {/* Número serie números */}
        <div className="space-y-2">
          <Label htmlFor="numero-serie" className="text-sm font-medium">
            Número serie números
          </Label>
          <Input
            id="numero-serie"
            placeholder="Parte numérica del contenedor (p. ej. 123456)"
            value={formData.numeroSerie}
            onChange={(e) => handleInputChange("numeroSerie", e.target.value)}
            className="bg-input"
          />
        </div>

        {/* Tipo */}
        <div className="space-y-2">
          <Label htmlFor="tipo" className="text-sm font-medium">
            Tipo
          </Label>
          <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
            <SelectTrigger className="bg-input w-full">
              <SelectValue placeholder="Seleccione el tipo del contenedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="banos">BAÑOS</SelectItem>
              <SelectItem value="duchas">DUCHAS</SelectItem>
              <SelectItem value="oficina">OFICINA</SelectItem>
              <SelectItem value="ofic-bano">OFIC/BAÑO</SelectItem>
              <SelectItem value="ofic-dormitorio">OFIC/DORMITORIO</SelectItem>
              <SelectItem value="ofic-separ">OFIC/SEPAR</SelectItem>
              <SelectItem value="bodega-40">BODEGA 40</SelectItem>
              <SelectItem value="bodega-50">BODEGA 50%</SelectItem>
              <SelectItem value="bod-estan">BOD/ESTAN</SelectItem>
              <SelectItem value="bod-art-pel">BOD ART PEL</SelectItem>
              <SelectItem value="sala-cambio">SALA CAMBIO</SelectItem>
              <SelectItem value="bod-estanque">BOD/ESTANQUE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <Label htmlFor="estado" className="text-sm font-medium">
            Estado
          </Label>
          <Select value={formData.estado} onValueChange={handleEstadoChange}>
            <SelectTrigger className="bg-input w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Disponible">Disponible</SelectItem>
              <SelectItem value="Arrendado">Arrendado</SelectItem>
              <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
              <SelectItem value="Rancho">Rancho</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Patio */}
        <div className="space-y-2">
          <Label htmlFor="patio" className="text-sm font-medium">
            Patio
          </Label>
          <Select
            value={formData.patio}
            onValueChange={(value) => handleInputChange("patio", value)}
            disabled={formData.estado === "Arrendado"}
          >
            <SelectTrigger className="bg-input w-full" disabled={formData.estado === "Arrendado"}>
              <SelectValue placeholder="Seleccione un patio (si aplica)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patio-1">PATIO 1</SelectItem>
              <SelectItem value="patio-2">PATIO 2</SelectItem>
              <SelectItem value="patio-3">PATIO 3</SelectItem>
              <SelectItem value="patio-4">PATIO 4</SelectItem>
              <SelectItem value="patio-5">PATIO 5</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Requerido cuando el contenedor está Disponible, en Mantenimiento o en Rancho
          </p>
        </div>

        {/* Proveedor */}
        <div className="space-y-2">
          <Label htmlFor="proveedor" className="text-sm font-medium">
            Proveedor
          </Label>
          <Input
            id="proveedor"
            placeholder="Nombre del proveedor (opcional)"
            value={formData.proveedor}
            onChange={(e) => handleInputChange("proveedor", e.target.value)}
            className="bg-input"
          />
        </div>
      </div>

      {/* Declaración de Importación Section */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Declaración de Importación
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="numero-declaracion" className="text-sm font-medium">
              Nº Declaración de Importación
            </Label>
            <Input
              id="numero-declaracion"
              placeholder="Número de la Declaración de Importación"
              value={formData.numeroDeclaracion}
              onChange={(e) => handleInputChange("numeroDeclaracion", e.target.value)}
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha-declaracion" className="text-sm font-medium">
              Fecha Declaración de Importación
            </Label>
            <div className="relative">
              <Input
                id="fecha-declaracion"
                type="date"
                value={formData.fechaDeclaracion}
                onChange={(e) => handleInputChange("fechaDeclaracion", e.target.value)}
                className="bg-input"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Declaración de Importación (PDF)</Label>
            <input
              type="file"
              accept="application/pdf"
              ref={declaracionInputRef}
              onChange={(e) => setDeclaracionFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
                onClick={() => declaracionInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                Seleccionar archivo
              </Button>
              <span className="text-sm text-muted-foreground">
                {declaracionFile
                  ? declaracionFile.name
                  : formData.declaracionPdf
                  ? "Archivo guardado"
                  : "Sin archivos seleccionados"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Subir la Declaración de Importación en PDF</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha-compra" className="text-sm font-medium">
              Fecha de compra
            </Label>
            <div className="relative">
              <Input
                id="fecha-compra"
                type="date"
                value={formData.fechaCompra}
                onChange={(e) => handleInputChange("fechaCompra", e.target.value)}
                className="bg-input"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            <p className="text-xs text-muted-foreground">Fecha en que se compró el contenedor</p>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {facturaFile
                  ? facturaFile.name
                  : formData.facturaPdf
                  ? "Archivo guardado"
                  : "Sin archivos seleccionados"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Subir factura de compra en formato PDF</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Factura PDF</Label>
              {formData.facturaPdf ? (
                <a
                  href={formData.facturaPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline"
                >
                  Ver PDF
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">---------</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Declaración PDF</Label>
              {formData.declaracionPdf ? (
                <a
                  href={formData.declaracionPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline"
                >
                  Ver PDF
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">---------</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notas */}
      <div className="space-y-2">
        <Label htmlFor="notas" className="text-sm font-medium">
          Notas
        </Label>
        <Textarea
          id="notas"
          placeholder="Notas adicionales sobre el contenedor..."
          value={formData.notas}
          onChange={(e) => handleInputChange("notas", e.target.value)}
          className="min-h-[120px] bg-input resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-6 border-t">
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Guardar
        </Button>
        {isEditing ? (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        ) : (
          <>
            <Button type="button" variant="secondary">
              Guardar y añadir otro
            </Button>
            <Button type="button" variant="outline">
              Guardar y continuar editando
            </Button>
          </>
        )}
      </div>
      </form>
    </CardContent>
  </Card>
    </DashboardLayout>
  )
}
