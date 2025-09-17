import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadFile(url?: string, filename?: string) {
  if (!url) return

  const inferredName = url.startsWith("data:")
    ? null
    : url.split("/").pop()

  const link = document.createElement("a")
  link.href = url
  link.download = filename ?? inferredName ?? "document.pdf"
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function formatDateDisplay(dateString?: string | null) {
  if (!dateString) {
    return ""
  }

  const [normalized] = dateString.split("T")
  const parts = normalized.split("-")

  if (parts.length !== 3) {
    return dateString
  }

  const [year, month, day] = parts

  if (!year || !month || !day) {
    return dateString
  }

  const dayPadded = day.padStart(2, "0")
  const monthPadded = month.padStart(2, "0")

  return `${dayPadded}-${monthPadded}-${year}`
}
