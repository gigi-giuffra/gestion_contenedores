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

  const trimmed = dateString.trim()
  if (!trimmed) {
    return ""
  }

  const [normalized] = trimmed.split("T")
  const cleaned = normalized.replace(/\s+/g, "")

  const isoMatch = cleaned.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/)
  if (isoMatch) {
    const [, year, month, day] = isoMatch
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`
  }

  const dayFirstMatch = cleaned.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})$/)
  if (dayFirstMatch) {
    const [, day, month, yearRaw] = dayFirstMatch
    const year = yearRaw.length === 2 ? `20${yearRaw}` : yearRaw
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year.padStart(4, "0")}`
  }

  const timestamp = Number(cleaned)
  if (!Number.isNaN(timestamp)) {
    const date = new Date(timestamp)
    if (!Number.isNaN(date.getTime())) {
      const day = `${date.getDate()}`.padStart(2, "0")
      const month = `${date.getMonth() + 1}`.padStart(2, "0")
      const year = `${date.getFullYear()}`
      return `${day}-${month}-${year}`
    }
  }

  const parsed = new Date(cleaned)
  if (!Number.isNaN(parsed.getTime())) {
    const day = `${parsed.getDate()}`.padStart(2, "0")
    const month = `${parsed.getMonth() + 1}`.padStart(2, "0")
    const year = `${parsed.getFullYear()}`
    return `${day}-${month}-${year}`
  }

  return trimmed
}
