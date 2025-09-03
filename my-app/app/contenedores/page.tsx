import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContainersPage() {
  return (
    <DashboardLayout breadcrumbs={["Contenedores"]}>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Registro de Contenedores</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aquí se listarán todos los contenedores agregados al sistema.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
