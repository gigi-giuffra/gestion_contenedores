"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

interface Client {
  nombre: string
  tipo: string
  documento: string
  email: string
  telefono: string
  contacto: string
  ciudad: string
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("clientes") || "[]")
    setClients(stored)
  }, [])

  return (
    <DashboardLayout breadcrumbs={["Clientes"]}>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            Registro de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <p className="text-muted-foreground">
              No hay clientes registrados.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3 text-left">Nombre</th>
                    <th className="py-2 px-3 text-left">Tipo</th>
                    <th className="py-2 px-3 text-left">Documento</th>
                    <th className="py-2 px-3 text-left">Email</th>
                    <th className="py-2 px-3 text-left">Teléfono</th>
                    <th className="py-2 px-3 text-left">Contacto</th>
                    <th className="py-2 px-3 text-left">Ciudad</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 px-3 font-medium">{c.nombre}</td>
                      <td className="py-2 px-3 capitalize">{c.tipo}</td>
                      <td className="py-2 px-3">{c.documento || "-"}</td>
                      <td className="py-2 px-3">{c.email || "-"}</td>
                      <td className="py-2 px-3">{c.telefono || "-"}</td>
                      <td className="py-2 px-3">{c.contacto || "-"}</td>
                      <td className="py-2 px-3">{c.ciudad || "-"}</td>
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
