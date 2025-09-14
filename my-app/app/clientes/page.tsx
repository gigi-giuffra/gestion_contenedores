"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Cliente = {
  id: number
  nombre: string
  tipo: string
  documento: string
  email: string
  telefono: string
  contacto: string
  ciudad: string
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("clientes")
    if (stored) {
      setClientes(JSON.parse(stored))
    }
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
          {clientes.length ? (
            <ul className="space-y-2">
              {clientes.map((c: Cliente, index) => (
                <li key={c.id} className="border-b pb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{c.nombre}</span> - {c.tipo}
                    <Link href={`/clientes/${index}`}>
                      <Button variant="outline" size="sm">Modificar</Button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No hay clientes registrados.</p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
