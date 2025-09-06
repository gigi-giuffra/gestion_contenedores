"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const [estado, setEstado] = useState("")
  const [tipo, setTipo] = useState("")
  const [patio, setPatio] = useState("")
  const [proveedor, setProveedor] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [busquedaSerie, setBusquedaSerie] = useState("")

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contenedores") || "[]")
    setContainers(stored)
  }, [])

  const filteredContainers = containers.filter((c) => {
    const matchesEstado = estado === "todos" || !estado || c.estado === estado
    const matchesTipo = tipo === "todos" || !tipo || c.tipo === tipo
    const matchesPatio = patio === "todos" || !patio || c.patio === patio
    const matchesProveedor =
      !proveedor || c.proveedor?.toLowerCase().includes(proveedor.toLowerCase())
    const serieCompleta = `${c.serieLetra}${c.numeroSerie}`.toLowerCase()
    const matchesSerie =
      !busquedaSerie || serieCompleta.includes(busquedaSerie.toLowerCase())
    const fecha = c.fechaCompra ? new Date(c.fechaCompra) : null
    const matchesFechaInicio =
      !fechaInicio || (fecha && new Date(fechaInicio) <= fecha)
    const matchesFechaFin = !fechaFin || (fecha && new Date(fechaFin) >= fecha)
    return (
      matchesEstado &&
      matchesTipo &&
      matchesPatio &&
      matchesProveedor &&
      matchesSerie &&
      matchesFechaInicio &&
      matchesFechaFin
    )
  })

  return (
    <DashboardLayout breadcrumbs={["Contenedores"]}>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Registro de Contenedores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Input
              placeholder="Buscar serie"
              value={busquedaSerie}
              onChange={(e) => setBusquedaSerie(e.target.value)}
              className="w-[150px]"
            />
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="Arrendado">Arrendado</SelectItem>
                <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="banos">BAÑOS</SelectItem>
                <SelectItem value="duchas">DUCHAS</SelectItem>
                <SelectItem value="oficina">OFICINA</SelectItem>
                <SelectItem value="ofic-bano">OFIC/BAÑO</SelectItem>
                <SelectItem value="ofic-dormitorio">OFIC/DORMITORIO</SelectItem>
                <SelectItem value="ofic-separ">OFIC/SEPAR</SelectItem>
                <SelectItem value="bodega-40">BODEGA 40</SelectItem>
                <SelectItem value="bodega-50">BODEGA 50%</SelectItem>
                <SelectItem value="bod-estan">BOD/ESTAN</SelectItem>
                <SelectItem value="bod-art-pel">BOD ART PEL</SelectItem>
                <SelectItem value="sala-cambio">SALA CAMBIO</SelectItem>
                <SelectItem value="bod-estanque">BOD/ESTANQUE</SelectItem>
              </SelectContent>
            </Select>
            <Select value={patio} onValueChange={setPatio}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Patio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="patio-1">PATIO 1</SelectItem>
                <SelectItem value="patio-2">PATIO 2</SelectItem>
                <SelectItem value="patio-3">PATIO 3</SelectItem>
                <SelectItem value="patio-4">PATIO 4</SelectItem>
                <SelectItem value="patio-5">PATIO 5</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Proveedor"
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              className="w-[150px]"
            />
            <Input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            <Input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
          {filteredContainers.length === 0 ? (
            <p className="text-muted-foreground">
              No hay contenedores registrados.
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
