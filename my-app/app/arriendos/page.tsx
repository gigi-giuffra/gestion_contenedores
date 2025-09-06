"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Package } from "lucide-react"

interface Rental {
  contenedor: string
  cliente: string
  fechaEntrega: string
  codigoGuia: string
  fechaRetiro: string
  facturaNombre: string
  facturaArchivo: string
}

export default function ArriendosPage() {
  const [rentals, setRentals] = useState<Rental[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("arriendos") || "[]")
    setRentals(stored)
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
          {rentals.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-2">Contenedor</th>
                    <th className="p-2">Cliente</th>
                    <th className="p-2">Fecha entrega</th>
                    <th className="p-2">Código guía</th>
                    <th className="p-2">Fecha retiro</th>
                    <th className="p-2">Factura</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map((r, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="p-2">{r.contenedor}</td>
                      <td className="p-2">{r.cliente}</td>
                      <td className="p-2">{r.fechaEntrega}</td>
                      <td className="p-2">{r.codigoGuia}</td>
                      <td className="p-2">{r.fechaRetiro}</td>
                      <td className="p-2">
                        {r.facturaArchivo ? (
                          <a
                            href={r.facturaArchivo}
                            download={r.facturaNombre}
                            className="text-primary underline"
                          >
                            Descargar
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Aquí se listarán todos los arriendos agregados al sistema.
            </p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
