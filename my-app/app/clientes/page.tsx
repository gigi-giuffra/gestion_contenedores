import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientForm } from "@/components/client-form"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Users } from "lucide-react"

export default function ClientesPage() {
  return (
    <DashboardLayout breadcrumbs={["Clientes", "Añadir Cliente"]}>
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            Añadir Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
