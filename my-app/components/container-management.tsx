"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Calendar, Upload, Container, FileText } from "lucide-react"

export function ContainerManagement() {
  const [formData, setFormData] = useState({
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
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout breadcrumbs={["Contenedores", "Añadir Contenedor"]}>
  <Card className="max-w-4xl">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold flex items-center gap-3">
        <Container className="h-6 w-6 text-primary" />
        Añadir Contenedor
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
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
            onChange={(e) => handleInputChange("serieLetra", e.target.value)}
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
            <SelectTrigger className="bg-input">
              <SelectValue placeholder="Seleccione el tipo del contenedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20ft">20 pies</SelectItem>
              <SelectItem value="40ft">40 pies</SelectItem>
              <SelectItem value="40ft-hc">40 pies HC</SelectItem>
              <SelectItem value="45ft">45 pies</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <Label htmlFor="estado" className="text-sm font-medium">
            Estado
          </Label>
          <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
            <SelectTrigger className="bg-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Disponible">Disponible</SelectItem>
              <SelectItem value="En uso">En uso</SelectItem>
              <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
              <SelectItem value="Fuera de servicio">Fuera de servicio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Patio */}
        <div className="space-y-2">
          <Label htmlFor="patio" className="text-sm font-medium">
            Patio
          </Label>
          <Select value={formData.patio} onValueChange={(value) => handleInputChange("patio", value)}>
            <SelectTrigger className="bg-input">
              <SelectValue placeholder="Seleccione el patio si el contenedor está disponible, en mantenimiento o en rancho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patio-a">Patio A</SelectItem>
              <SelectItem value="patio-b">Patio B</SelectItem>
              <SelectItem value="patio-c">Patio C</SelectItem>
            </SelectContent>
          </Select>
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Upload className="h-4 w-4" />
                Seleccionar archivo
              </Button>
              <span className="text-sm text-muted-foreground">Sin archivos seleccionados</span>
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Upload className="h-4 w-4" />
                Seleccionar archivo
              </Button>
              <span className="text-sm text-muted-foreground">Sin archivos seleccionados</span>
            </div>
            <p className="text-xs text-muted-foreground">Subir factura de compra en formato PDF</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Factura PDF</Label>
              <Select>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin archivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Declaración PDF</Label>
              <Select>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin archivo</SelectItem>
                </SelectContent>
              </Select>
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
        <Button className="bg-primary hover:bg-primary/90">Guardar</Button>
        <Button variant="secondary">Guardar y añadir otro</Button>
        <Button variant="outline">Guardar y continuar editando</Button>
      </div>
    </CardContent>
  </Card>
    </DashboardLayout>
  )
}
