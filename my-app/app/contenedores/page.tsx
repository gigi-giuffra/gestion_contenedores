"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Container {
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
}

export default function ContainersPage() {
  const [containers, setContainers] = useState<Container[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contenedores") || "[]")
    setContainers(stored)
  }, [])

  return (
    <DashboardLayout breadcrumbs={["Contenedores"]}>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Registro de Contenedores</CardTitle>
        </CardHeader>
        <CardContent>
          {containers.length === 0 ? (
            <p className="text-muted-foreground">
              No hay contenedores registrados.
            </p>
          ) : (
            <ul className="divide-y">
              {containers.map((c, index) => (
                <li key={index} className="py-2">
                  <div className="font-medium">
                    {c.serieLetra}
                    {c.numeroSerie} - {c.tipo}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estado: {c.estado}
                    {c.patio ? ` | Patio: ${c.patio}` : ""}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
