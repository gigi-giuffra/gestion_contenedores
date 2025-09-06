import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

const filePath = path.join(process.cwd(), "data", "clientes.json")

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8")
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error reading clients" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = await fs.readFile(filePath, "utf-8")
    const clients = JSON.parse(data)
    const newClient = { id: Date.now(), ...body }
    clients.push(newClient)
    await fs.writeFile(filePath, JSON.stringify(clients, null, 2))
    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error saving client" }, { status: 500 })
  }
}
