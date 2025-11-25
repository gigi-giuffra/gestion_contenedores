export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type PublicSchema = Database["public"]

export type Database = {
  public: {
    Tables: {
      contenedores: {
        Row: {
          created_at: string | null
          declaracionPdf: string | null
          digitoControl: string | null
          estado: string
          facturaPdf: string | null
          fechaCompra: string | null
          fechaDeclaracion: string | null
          id: string
          notas: string | null
          numeroDeclaracion: string | null
          numeroSerie: string
          patio: string | null
          proveedor: string | null
          serieLetra: string
          tipo: string
        }
        Insert: {
          created_at?: string | null
          declaracionPdf?: string | null
          digitoControl?: string | null
          estado: string
          facturaPdf?: string | null
          fechaCompra?: string | null
          fechaDeclaracion?: string | null
          id?: string
          notas?: string | null
          numeroDeclaracion?: string | null
          numeroSerie: string
          patio?: string | null
          proveedor?: string | null
          serieLetra: string
          tipo: string
        }
        Update: {
          created_at?: string | null
          declaracionPdf?: string | null
          digitoControl?: string | null
          estado?: string
          facturaPdf?: string | null
          fechaCompra?: string | null
          fechaDeclaracion?: string | null
          id?: string
          notas?: string | null
          numeroDeclaracion?: string | null
          numeroSerie?: string
          patio?: string | null
          proveedor?: string | null
          serieLetra?: string
          tipo?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends { Insert: infer I }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends { Update: infer U }
      ? U
      : never
    : never
