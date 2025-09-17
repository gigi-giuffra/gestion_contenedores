"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CheckCircle2, Circle, Container, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ContainerFormData {
  serieLetra: string
  numeroSerie: string
  digitoControl: string
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

type ValidatedField = "serieLetra" | "numeroSerie" | "digitoControl"

const FIELD_CONFIG: Record<ValidatedField, { label: string; placeholder: string; error: string }> = {
  serieLetra: {
    label: "Serie Letra",
    placeholder: "MEDU",
    error: "Debe contener exactamente 4 letras (A-Z).",
  },
  numeroSerie: {
    label: "Serie Número",
    placeholder: "123456",
    error: "Debe contener exactamente 6 números.",
  },
  digitoControl: {
    label: "Agregar Dígito de Control",
    placeholder: "8",
    error: "Debe contener un único número.",
  },
}

const FIELD_VALIDATORS: Record<ValidatedField, (value: string) => boolean> = {
  serieLetra: (value) => /^[A-Z]{4}$/.test(value),
  numeroSerie: (value) => /^\d{6}$/.test(value),
  digitoControl: (value) => /^\d$/.test(value),
}

const FIELD_SANITIZERS: Record<ValidatedField, (value: string) => string> = {
  serieLetra: (value) => value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 4),
  numeroSerie: (value) => value.replace(/\D/g, "").slice(0, 6),
  digitoControl: (value) => value.replace(/\D/g, "").slice(0, 1),
}

const VALIDATED_FIELDS: ValidatedField[] = ["serieLetra", "numeroSerie", "digitoControl"]

const EMPTY_FORM_DATA: ContainerFormData = {
  serieLetra: "",
  numeroSerie: "",
  digitoControl: "",
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
}

interface ContainerManagementProps {
  initialData?: ContainerFormData
  index?: number
}

export function ContainerManagement({ initialData, index }: ContainerManagementProps) {
  const [formData, setFormData] = useState<ContainerFormData>({ ...EMPTY_FORM_DATA })

  const [touchedFields, setTouchedFields] = useState<Record<ValidatedField, boolean>>({
    serieLetra: false,
    numeroSerie: false,
    digitoControl: false,
  })

  const router = useRouter()
  const isEditing = typeof index === "number" && !!initialData

  useEffect(() => {
    if (initialData) {
      setFormData({ ...EMPTY_FORM_DATA, ...initialData })
      setTouchedFields({
        serieLetra: true,
        numeroSerie: true,
        digitoControl: true,
      })
    } else {
      setFormData({ ...EMPTY_FORM_DATA })
      setTouchedFields({
        serieLetra: false,
        numeroSerie: false,
        digitoControl: false,
      })
    }
  }, [initialData])

  const updateFieldValue = (field: ValidatedField, value: string) => {
    const sanitized = FIELD_SANITIZERS[field](value)
    setFormData((prev) => ({ ...prev, [field]: sanitized }))
    setTouchedFields((prev) => ({ ...prev, [field]: true }))
  }

  const isFieldValid = (field: ValidatedField) => FIELD_VALIDATORS[field](formData[field])

  const isFormValid = VALIDATED_FIELDS.every((field) => isFieldValid(field))

  const markAllTouched = () =>
    setTouchedFields({
      serieLetra: true,
      numeroSerie: true,
      digitoControl: true,
    })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!isFormValid) {
      markAllTouched()
      return
    }

    const updatedData = { ...formData }

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
            <div className="space-y-5">
              {VALIDATED_FIELDS.map((field) => {
                const config = FIELD_CONFIG[field]
                const value = formData[field]
                const isTouched = touchedFields[field]
                const isValid = isFieldValid(field)
                const showError = isTouched && !isValid
                const inputId = `container-${field}`

                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={inputId} className="text-sm font-medium">
                      {config.label}
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id={inputId}
                        name={field}
                        value={value}
                        placeholder={config.placeholder}
                        onChange={(event) => updateFieldValue(field, event.target.value)}
                        className={cn(
                          "bg-input",
                          isTouched
                            ? isValid
                              ? "border-[#22c55e] focus-visible:border-[#22c55e] focus-visible:ring-[#22c55e]/40"
                              : "border-[#ef4444] focus-visible:border-[#ef4444] focus-visible:ring-[#ef4444]/40"
                            : "border-input",
                        )}
                        aria-invalid={showError}
                        aria-describedby={showError ? `${inputId}-error` : undefined}
                        inputMode={field === "serieLetra" ? "text" : "numeric"}
                        pattern={field === "serieLetra" ? undefined : "\\d*"}
                        maxLength={field === "serieLetra" ? 4 : field === "numeroSerie" ? 6 : 1}
                        autoComplete="off"
                        autoCapitalize={field === "serieLetra" ? "characters" : "off"}
                      />
                      {!isTouched ? (
                        <Circle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      ) : isValid ? (
                        <CheckCircle2 className="h-5 w-5 text-[#22c55e]" aria-hidden="true" />
                      ) : (
                        <XCircle className="h-5 w-5 text-[#ef4444]" aria-hidden="true" />
                      )}
                    </div>
                    {showError && (
                      <p id={`${inputId}-error`} className="text-sm text-[#ef4444]">
                        {config.error}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={!isFormValid}
              >
                Guardar
              </Button>
              {isEditing && (
                <Button type="button" variant="destructive" onClick={handleDelete}>
                  Eliminar
                </Button>
              )}
            </div>
            {!isFormValid && (
              <p className="text-sm text-muted-foreground">
                Completa todos los campos con formato válido.
              </p>
            )}
          </form>
    </CardContent>
  </Card>
    </DashboardLayout>
  )
}
