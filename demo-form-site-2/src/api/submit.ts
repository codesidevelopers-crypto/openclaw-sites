import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import { appendLeadRow } from "../lib/googleSheets"

interface SubmitBody {
  name: string
  phone: string
  email: string
  comment: string
}

function isValidBody(body: unknown): body is SubmitBody {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === "string" &&
    typeof b.phone === "string" &&
    typeof b.email === "string" &&
    typeof b.comment === "string"
  )
}

async function appendToSheet(data: SubmitBody): Promise<void> {
  const timestamp = new Date().toISOString()

  await appendLeadRow([
    timestamp,
    data.name,
    data.phone,
    data.email,
    data.comment,
  ])
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  if (!isValidBody(req.body)) {
    res.status(400).json({ error: "Invalid request body" })
    return
  }

  const { name, phone, email, comment } = req.body

  if (!name.trim() || !phone.trim() || !email.trim()) {
    res.status(400).json({ error: "Name, phone, and email are required" })
    return
  }

  try {
    await appendToSheet({ name, phone, email, comment })
    res.status(200).json({ success: true })
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error"
    console.error("Google Sheets error:", message)
    res.status(500).json({ error: "Failed to save submission" })
  }
}
