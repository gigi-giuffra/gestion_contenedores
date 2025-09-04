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
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3 text-left">Serie</th>
                    <th className="py-2 px-3 text-left">Tipo</th>
                    <th className="py-2 px-3 text-left">Estado</th>
                    <th className="py-2 px-3 text-left">Patio</th>
                    <th className="py-2 px-3 text-left">Proveedor</th>
                    <th className="py-2 px-3 text-left">Nº Declaración</th>
                    <th className="py-2 px-3 text-left">Fecha Declaración</th>
                    <th className="py-2 px-3 text-left">Fecha Compra</th>
                    <th className="py-2 px-3 text-left">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((c, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 px-3 font-medium">{c.serieLetra}{c.numeroSerie}</td>
                      <td className="py-2 px-3 capitalize">{c.tipo}</td>
                      <td className="py-2 px-3">{c.estado}</td>
                      <td className="py-2 px-3">{c.patio || "-"}</td>
                      <td className="py-2 px-3">{c.proveedor || "-"}</td>
                      <td className="py-2 px-3">{c.numeroDeclaracion || "-"}</td>
                      <td className="py-2 px-3">{c.fechaDeclaracion || "-"}</td>
                      <td className="py-2 px-3">{c.fechaCompra || "-"}</td>
                      <td className="py-2 px-3 max-w-[200px] truncate">{c.notas || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
