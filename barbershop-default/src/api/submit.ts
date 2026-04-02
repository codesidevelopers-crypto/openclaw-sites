import fs from "node:fs/promises";
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { google } from "googleapis";

interface SubmitBody {
  name: string;
  phone: string;
  service: string;
  comment: string;
}

interface PendingOAuthConfig {
  client_id: string;
  client_secret: string;
}

interface StoredOAuthToken {
  refresh_token: string;
}

function isValidBody(body: unknown): body is SubmitBody {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const payload = body as Record<string, unknown>;
  return (
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    typeof payload.phone === "string" &&
    payload.phone.trim().length > 0 &&
    typeof payload.service === "string" &&
    payload.service.trim().length > 0 &&
    (typeof payload.comment === "string" || typeof payload.comment === "undefined")
  );
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

async function appendToGoogleSheet(data: SubmitBody): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SPREADSHEET_ID is not configured.");
  }

  const pendingConfig = await readJsonFile<PendingOAuthConfig>(
    "/root/.openclaw/credentials/google-oauth-pending.json"
  );
  const storedToken = await readJsonFile<StoredOAuthToken>(
    "/root/.openclaw/credentials/google-sheets-oauth.json"
  );

  const auth = new google.auth.OAuth2(
    pendingConfig.client_id,
    pendingConfig.client_secret,
    "urn:ietf:wg:oauth:2.0:oob"
  );

  auth.setCredentials({
    refresh_token: storedToken.refresh_token,
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Заявки!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          data.name,
          `'${data.phone}`,
          data.service,
          data.comment || "",
        ],
      ],
    },
  });
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const requestBody = req.body;
  const body =
    typeof requestBody === "object" && requestBody !== null
      ? (requestBody as Record<string, unknown>)
      : null;

  if (!body || !isValidBody(body)) {
    res.status(400).json({ error: "Missing required fields: name, phone, service" });
    return;
  }

  try {
    await appendToGoogleSheet(body);
    res.status(200).json({ success: true });
  } catch (error: unknown) {
    console.error("Google Sheets append error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
