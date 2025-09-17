"use client"

import { useEffect, useMemo, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Package } from "lucide-react"
import { downloadFile, formatDateDisplay } from "@/lib/utils"

interface Rental {
  contenedor: string
  cliente: string
  fechaEntrega: string
  codigoGuia: string
  fechaRetiro: string
  guiaPdf?: string
}

export default function ArriendosPage() {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRentals = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    if (!term) {
      return rentals
    }

    return rentals.filter(
      (rental) =>
        rental.contenedor.toLowerCase().includes(term) ||
        rental.cliente.toLowerCase().includes(term),
    )
  }, [rentals, searchTerm])

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
            <>
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por contenedor o cliente"
                className="mb-4"
              />
              {filteredRentals.length === 0 ? (
                <p className="text-muted-foreground">
                  No se encontraron arriendos para la búsqueda.
                </p>
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
                        <th className="py-2 px-3 text-left">Guía PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRentals.map((r, index) => {
                        const fechaEntrega = formatDateDisplay(r.fechaEntrega)
                        const fechaRetiro = formatDateDisplay(r.fechaRetiro)

                        return (
                          <tr key={index} className="border-b last:border-0">
                            <td className="py-2 px-3">{r.contenedor}</td>
                            <td className="py-2 px-3">{r.cliente}</td>
                            <td className="py-2 px-3 whitespace-nowrap">{fechaEntrega || "-"}</td>
                            <td className="py-2 px-3 whitespace-nowrap">{fechaRetiro || "-"}</td>
                            <td className="py-2 px-3">{r.codigoGuia || "-"}</td>
                            <td className="py-2 px-3">
                              {r.guiaPdf ? (
                                <button
                                  type="button"
                                  onClick={() => downloadFile(r.guiaPdf, `guia-${r.contenedor}.pdf`)}
                                  className="text-primary hover:underline"
                                >
                                  Descargar
                                </button>
                              ) : (
                                "-"
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
