import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadFile(url: string, filename?: string) {
  const link = document.createElement("a")
  link.href = url
  link.download = filename ?? url.split("/").pop() ?? "document.pdf"
  document.body.appendChild(link)
  link.click()
  link.remove()
}
