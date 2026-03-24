import type { Transaction, ParsedFile, QuestionnaireAnswers, DiagnosticResult } from './types'
import { detectTransfers } from './transfers'
import { classifyAll } from './classify'
import { findRecurringExpenses } from './recurring'
import { computeMetrics } from './metrics'
import { mergeFileParsedData } from './normalize'

export async function runDiagnostic(
  files: ParsedFile[],
  questionnaire: QuestionnaireAnswers,
  onStep: (step: number) => void
): Promise<DiagnosticResult> {
  const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

  // Step 1: Read statements
  onStep(1)
  await delay(300)
  let transactions: Transaction[] = mergeFileParsedData(files)

  // Step 2: Normalize
  onStep(2)
  await delay(400)
  // Already normalized during parsing

  // Step 3: Detect transfers
  onStep(3)
  await delay(500)
  transactions = detectTransfers(transactions)

  // Step 4: Classify
  onStep(4)
  await delay(500)
  transactions = classifyAll(transactions)

  // Step 5: Find recurring
  onStep(5)
  await delay(600)
  const recurringCore = findRecurringExpenses(transactions)

  // Step 6: Compute metrics
  onStep(6)
  await delay(400)
  return computeMetrics(transactions, recurringCore, questionnaire)
}

export * from './types'
export { detectColumnMapping, normalizeRows, parse1C } from './normalize'
