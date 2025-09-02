import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientForm } from "@/components/client-form"

export default function ClientesPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Añadir Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm />
        </CardContent>
      </Card>
    </div>
  )
}

