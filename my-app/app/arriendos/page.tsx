"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Package } from "lucide-react"
import { downloadFile } from "@/lib/utils"

interface Rental {
  contenedor: string
  cliente: string
  fechaEntrega: string
  codigoGuia: string
  fechaRetiro: string
  facturaPdf?: string
}

export default function ArriendosPage() {
  const [rentals, setRentals] = useState<Rental[]>([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("arriendos") || "[]")
      if (Array.isArray(stored)) {
        setRentals(stored)
      } else {
        setRentals([])
      }
    } catch {
      setRentals([])
    }
  }, [])

  return (
    <DashboardLayout breadcrumbs={["Arriendos"]}>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            Registro de Arriendos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rentals.length === 0 ? (
            <p className="text-muted-foreground">No hay arriendos registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3 text-left">Contenedor</th>
                    <th className="py-2 px-3 text-left">Cliente</th>
                    <th className="py-2 px-3 text-left">Fecha entrega</th>
                    <th className="py-2 px-3 text-left">Fecha retiro</th>
                    <th className="py-2 px-3 text-left">Guía</th>
                    <th className="py-2 px-3 text-left">Factura</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map((r, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 px-3">{r.contenedor}</td>
                      <td className="py-2 px-3">{r.cliente}</td>
                      <td className="py-2 px-3">{r.fechaEntrega || "-"}</td>
                      <td className="py-2 px-3">{r.fechaRetiro || "-"}</td>
                      <td className="py-2 px-3">{r.codigoGuia || "-"}</td>
                      <td className="py-2 px-3">
                        {r.facturaPdf ? (
                          <button
                            type="button"
                            onClick={() => downloadFile(r.facturaPdf, `factura-${r.contenedor}.pdf`)}
                            className="text-primary hover:underline"
                          >
                            Descargar
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
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
