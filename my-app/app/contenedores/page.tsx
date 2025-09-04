"use client"

import { useEffect, useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Container {
  serieLetra: string
  numeroSerie: string
  tipo: string
  estado: string
  patio: string
  proveedor: string
  numeroDeclaracion: string
  fechaDeclaracion: string
  fechaCompra: string
  notas: string
}

export default function ContainersPage() {
  const [containers, setContainers] = useState<Container[]>([])
  const [filters, setFilters] = useState({
    tipo: "",
    patio: "",
    serie: "",
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contenedores") || "[]")
    setContainers(stored)
  }, [])

  const tipos = useMemo(
    () => Array.from(new Set(containers.map((c) => c.tipo).filter(Boolean))),
    [containers]
  )

  const patios = useMemo(
    () => Array.from(new Set(containers.map((c) => c.patio).filter(Boolean))),
    [containers]
  )

  const filteredContainers = useMemo(() => {
    return containers.filter((c) => {
      const serieCompleta = `${c.serieLetra}${c.numeroSerie}`.toLowerCase()
      return (
        (!filters.tipo || c.tipo === filters.tipo) &&
        (!filters.patio || c.patio === filters.patio) &&
        (!filters.serie || serieCompleta.includes(filters.serie.toLowerCase()))
      )
    })
  }, [containers, filters])

  return (
    <DashboardLayout breadcrumbs={["Contenedores"]}>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Registro de Contenedores</CardTitle>
        </CardHeader>
        <CardContent>
          {containers.length > 0 && (
            <div className="mb-4 grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="filter-tipo" className="text-sm font-medium">
                  Tipo
                </Label>
                <Select
                  value={filters.tipo}
                  onValueChange={(value) => setFilters({ ...filters, tipo: value })}
                >
                  <SelectTrigger id="filter-tipo" className="bg-input">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    {tipos.map((t) => (
                      <SelectItem key={t} value={t} className="capitalize">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="filter-patio" className="text-sm font-medium">
                  Patio
                </Label>
                <Select
                  value={filters.patio}
                  onValueChange={(value) => setFilters({ ...filters, patio: value })}
                >
                  <SelectTrigger id="filter-patio" className="bg-input">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    {patios.map((p) => (
                      <SelectItem key={p} value={p} className="capitalize">
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="filter-serie" className="text-sm font-medium">
                  Serie
                </Label>
                <Input
                  id="filter-serie"
                  placeholder="Buscar serie"
                  value={filters.serie}
                  onChange={(e) => setFilters({ ...filters, serie: e.target.value })}
                  className="bg-input"
                />
              </div>
            </div>
          )}

          {containers.length === 0 ? (
            <p className="text-muted-foreground">
              No hay contenedores registrados.
            </p>
          ) : filteredContainers.length === 0 ? (
            <p className="text-muted-foreground">
              No se encontraron contenedores con esos filtros.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3 text-left">Serie</th>
                    <th className="py-2 px-3 text-left">Tipo</th>
                    <th className="py-2 px-3 text-left">Estado</th>
                    <th className="py-2 px-3 text-left">Patio</th>
                    <th className="py-2 px-3 text-left">Proveedor</th>
                    <th className="py-2 px-3 text-left">Nº Declaración</th>
                    <th className="py-2 px-3 text-left">Fecha Declaración</th>
                    <th className="py-2 px-3 text-left">Fecha Compra</th>
                    <th className="py-2 px-3 text-left">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContainers.map((c, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 px-3 font-medium">{c.serieLetra}{c.numeroSerie}</td>
                      <td className="py-2 px-3 capitalize">{c.tipo}</td>
                      <td className="py-2 px-3">{c.estado}</td>
                      <td className="py-2 px-3">{c.patio || "-"}</td>
                      <td className="py-2 px-3">{c.proveedor || "-"}</td>
                      <td className="py-2 px-3">{c.numeroDeclaracion || "-"}</td>
                      <td className="py-2 px-3">{c.fechaDeclaracion || "-"}</td>
                      <td className="py-2 px-3">{c.fechaCompra || "-"}</td>
                      <td className="py-2 px-3 max-w-[200px] truncate">{c.notas || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
