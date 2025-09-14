"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Users } from "lucide-react"
import { ClientForm } from "@/components/client-form"

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

interface PageProps {
  params: { index: string }
}

export default function EditClientPage({ params }: PageProps) {
  const [data, setData] = useState<Cliente | null>(null)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("clientes") || "[]")
      const idx = parseInt(params.index, 10)
      if (Array.isArray(stored) && stored[idx]) {
        setData(stored[idx])
      } else {
        alert("Cliente no encontrado.")
      }
    } catch {
      alert("Error al cargar el cliente.")
    }
  }, [params.index])

  if (!data) return null

  return (
    <DashboardLayout breadcrumbs={["Clientes", "Modificar Cliente"]}>
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            Modificar Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm initialData={data} index={parseInt(params.index, 10)} />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

