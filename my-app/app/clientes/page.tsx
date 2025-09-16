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
    if (!stored) {
      setClientes([])
      return
    }

    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setClientes(parsed)
      } else {
        console.warn("El registro de clientes en localStorage no es un arreglo válido")
        setClientes([])
      }
    } catch (error) {
      console.error("No se pudieron cargar los clientes desde localStorage", error)
      setClientes([])
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
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Nombre</th>
                  <th className="text-left py-2">Tipo de Cliente</th>
                  <th className="text-right py-2">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c: Cliente, index) => (
                  <tr key={c.id} className="border-b last:border-b-0">
                    <td className="py-2 font-medium">{c.nombre}</td>
                    <td className="py-2">{c.tipo}</td>
                    <td className="py-2 text-right">
                      <Link href={`/clientes/${index}`}>
                        <Button variant="outline" size="sm">Modificar</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted-foreground">No hay clientes registrados.</p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
