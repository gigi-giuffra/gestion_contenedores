import { ContainerManagement } from "@/components/container-management"
import { DashboardLayout } from "@/components/dashboard-layout"
import type { ContainerRow } from "@/components/containers-client"
import { createSupabaseServerClient } from "@/lib/supabaseClient"

interface PageProps {
  params: { id: string }
}

export default async function EditContainerPage({ params }: PageProps) {
  let data: ContainerRow | null = null
  let errorMessage: string | null = null

  try {
    const supabase = createSupabaseServerClient()
    const { data: record, error } = await supabase
      .from("contenedores")
      .select("*")
      .eq("id", params.id)
      .maybeSingle()

    if (error) {
      throw error
    }

    data = record
  } catch (error) {
    console.error("No se pudo cargar el contenedor", error)
    errorMessage = "No se pudo cargar el contenedor solicitado."
  }

  if (!data) {
    return (
      <DashboardLayout breadcrumbs={["Contenedores", "Modificar Contenedor"]}>
        <p className="text-destructive">{errorMessage ?? "Contenedor no encontrado."}</p>
      </DashboardLayout>
    )
  }

  return <ContainerManagement initialData={data} containerId={params.id} />
}
