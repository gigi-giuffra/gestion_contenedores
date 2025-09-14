"use client"

import { useEffect, useState } from "react"
import {
  ContainerManagement,
  ContainerFormData,
} from "@/components/container-management"

interface PageProps {
  params: { index: string }
}

export default function EditContainerPage({ params }: PageProps) {
  const [data, setData] = useState<ContainerFormData | null>(null)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("contenedores") || "[]")
      const idx = parseInt(params.index, 10)
      if (Array.isArray(stored) && stored[idx]) {
        setData(stored[idx])
      } else {
        alert("Contenedor no encontrado.")
      }
    } catch {
      alert("Error al cargar el contenedor.")
    }
  }, [params.index])

  if (!data) return null

  return <ContainerManagement initialData={data} index={parseInt(params.index, 10)} />
}

