import { ContainersClient, type ContainerRow } from "@/components/containers-client"
import { createSupabaseServerClient } from "@/lib/supabaseClient"

export default async function ContainersPage() {
  let containers: ContainerRow[] = []
  let errorMessage: string | null = null

  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from("contenedores")
      .select("*")
      .order("fechaCompra", { ascending: false })

    if (error) {
      throw error
    }

    containers = data ?? []
  } catch (error) {
    console.error("Error al cargar contenedores desde Supabase", error)
    errorMessage = "No se pudieron obtener los contenedores desde Supabase."
  }

  return <ContainersClient containers={containers} errorMessage={errorMessage} />
}
