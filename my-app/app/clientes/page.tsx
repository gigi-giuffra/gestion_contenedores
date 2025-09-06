import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { promises as fs } from "fs"
import path from "path"

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

export const dynamic = "force-dynamic"

export default async function ClientesPage() {
  const filePath = path.join(process.cwd(), "data", "clientes.json")
  const data = await fs.readFile(filePath, "utf-8")
  const clientes: Cliente[] = JSON.parse(data)

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
              {clientes.map((c: Cliente) => (
                <li key={c.id} className="border-b pb-2">
                  <span className="font-medium">{c.nombre}</span> - {c.tipo}
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
