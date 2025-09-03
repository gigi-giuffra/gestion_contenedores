"use client"

import Link from "next/link"
import { ReactNode, Fragment } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  ChevronRight,
  Users,
  Package,
  Container
} from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
  breadcrumbs: string[]
}

export function DashboardLayout({ children, breadcrumbs }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Container className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Gestión de Contenedores</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              Bienvenido, Rafael
            </Badge>
            <Button variant="outline" size="sm">
              Ver el sitio
            </Button>
            <Button variant="outline" size="sm">
              Cambiar contraseña
            </Button>
            <Button variant="outline" size="sm">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-sidebar min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Home className="h-4 w-4" />
              <span>Inicio</span>
              {breadcrumbs.map((bc, index) => (
                <Fragment key={bc}>
                  <ChevronRight className="h-4 w-4" />
                  <span className={index === breadcrumbs.length - 1 ? "text-foreground" : undefined}>{bc}</span>
                </Fragment>
              ))}
            </div>

            {/* Search */}
            <div className="mb-6">
              <Input placeholder="Empiece a escribir para filtrar..." className="bg-background" />
            </div>

            {/* Navigation Sections */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Autenticación y Autorización
                </h3>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-between text-left">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4" />
                      <span>Grupos</span>
                    </div>
                    <span className="text-primary text-lg">+</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-left">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4" />
                      <span>Usuarios</span>
                    </div>
                    <span className="text-primary text-lg">+</span>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Contenedores
                </h3>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-between text-left">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4" />
                      <span>Arrendamientos</span>
                    </div>
                    <span className="text-primary text-lg">+</span>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-between text-left">
                    <Link href="/clientes" className="flex w-full items-center justify-between text-left">
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4" />
                        <span>Clientes</span>
                      </div>
                      <span className="text-primary text-lg">+</span>
                    </Link>
                  </Button>
                  <div className="flex w-full items-center justify-between">
                    <Button
                      asChild
                      variant="ghost"
                      className="flex-1 justify-start text-left"
                    >
                      <Link
                        href="/contenedores"
                        className="flex items-center gap-3"
                      >
                        <Container className="h-4 w-4" />
                        <span>Contenedores</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-primary px-2">
                      <Link href="/contenedores/nuevo">
                        <span className="text-lg">+</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

