import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RentalForm } from "@/components/rental-form"
import { Package } from "lucide-react"

export default function NewRentalPage() {
  return (
    <DashboardLayout breadcrumbs={["Arriendos", "Añadir Arriendo"]}>
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            Añadir Arriendo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RentalForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
