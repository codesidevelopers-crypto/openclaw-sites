import { readFileSync } from "node:fs"
import { join } from "node:path"
import { google } from "googleapis"

interface OAuthTokenStore {
  refresh_token?: string
}

interface OAuthClientConfig {
  client_id: string
  client_secret: string
}

const TOKEN_PATH = "/root/.openclaw/credentials/google-sheets-oauth.json"
const CLIENT_CONFIG_PATH = "/root/.openclaw/credentials/google-oauth-pending.json"

function readJsonFile<T>(filePath: string): T {
  const raw = readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as T
}

function getSpreadsheetId(): string {
  const spreadsheetId = "19fu75SuvmoWeCYCzezhdHytPovHyggzuf--rQHaL4uo"

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SPREADSHEET_ID is not configured")
  }

  return spreadsheetId
}

function createOAuthClient(): InstanceType<typeof google.auth.OAuth2> {
  const tokenStore = readJsonFile<OAuthTokenStore>(TOKEN_PATH)
  const clientConfig = readJsonFile<OAuthClientConfig>(CLIENT_CONFIG_PATH)

  if (!tokenStore.refresh_token) {
    throw new Error(`Refresh token is missing in ${TOKEN_PATH}`)
  }

  const oauth2Client = new google.auth.OAuth2(
    clientConfig.client_id,
    clientConfig.client_secret,
    "urn:ietf:wg:oauth:2.0:oob"
  )

  oauth2Client.setCredentials({ refresh_token: tokenStore.refresh_token })

  return oauth2Client
}

export async function appendLeadRow(values: string[]): Promise<void> {
  const spreadsheetId = getSpreadsheetId()
  const auth = createOAuthClient()
  const sheets = google.sheets({ version: "v4", auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Leads!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  })
}

export function getLocalEnvExamplePath(): string {
  return join(process.cwd(), ".env.example")
}
