import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Package } from "lucide-react"

export default function ArrendamientosPage() {
  return (
    <DashboardLayout breadcrumbs={["Arrendamientos"]}>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            Registro de Arrendamientos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aquí se listarán todos los arrendamientos agregados al sistema.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
