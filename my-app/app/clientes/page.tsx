import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function ClientesPage() {
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
          <p className="text-muted-foreground">
            Aquí se listarán todos los clientes agregados al sistema.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
