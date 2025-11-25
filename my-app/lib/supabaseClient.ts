import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import type { Database } from "./database.types"

type Client = SupabaseClient<Database>

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let browserClient: Client | null = null

const ensureUrl = () => {
  if (!supabaseUrl) {
    throw new Error("Falta la variable NEXT_PUBLIC_SUPABASE_URL en el entorno.")
  }
  return supabaseUrl
}

const ensureAnonKey = () => {
  if (!supabaseAnonKey) {
    throw new Error("Falta la variable NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno.")
  }
  return supabaseAnonKey
}

export const getSupabaseBrowserClient = (): Client => {
  if (!browserClient) {
    browserClient = createClient<Database>(ensureUrl(), ensureAnonKey())
  }
  return browserClient
}

export const createSupabaseServerClient = (): Client => {
  const url = ensureUrl()
  const serviceKey = supabaseServiceRoleKey ?? supabaseAnonKey

  if (!serviceKey) {
    throw new Error(
      "Falta SUPABASE_SERVICE_ROLE_KEY o NEXT_PUBLIC_SUPABASE_ANON_KEY para el cliente de servidor.",
    )
  }

  return createClient<Database>(url, serviceKey)
}
