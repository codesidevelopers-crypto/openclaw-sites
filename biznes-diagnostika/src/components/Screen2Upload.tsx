import React, { useState, useRef, useCallback } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useApp } from '../context/AppContext'
import { useFileParser } from '../hooks/useFileParser'
import type { FileParseResult, ColumnMapping } from '../engine/types'

const fadeUp = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`
const spin = keyframes`to{transform:rotate(360deg)}`

const Page = styled.div`
  min-height: 100vh;
  padding: 48px 24px 80px;
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeUp} 0.5s ease;
`

const Header = styled.div`
  margin-bottom: 40px;
`

const BackBtn = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  padding: 0;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.white}; }
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 8px;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`

interface DropZoneProps {
  isDragging: boolean
}

const DropZone = styled.div<DropZoneProps>`
  border: 2px dashed ${({ theme, isDragging }) => isDragging ? theme.colors.blue : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme, isDragging }) => isDragging ? 'rgba(59,130,246,0.06)' : theme.colors.card};
  padding: 56px 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 24px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue}88;
    background: rgba(59,130,246,0.04);
  }
`

const DropIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`

const DropTitle = styled.p`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 8px;
`

const DropSub = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`

const FileCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
`

const FileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(59,130,246,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const FileName = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FileMeta = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 2px;
`

interface StatusBadgeProps {
  status: string
}

const StatusBadge = styled.span<StatusBadgeProps>`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 100px;
  flex-shrink: 0;
  ${({ status, theme }) =>
    status === 'parsed'
      ? css`background: rgba(16,185,129,0.15); color: ${theme.colors.green};`
      : status === 'error'
        ? css`background: rgba(239,68,68,0.15); color: ${theme.colors.red};`
        : css`background: rgba(59,130,246,0.15); color: ${theme.colors.blue};`}
`

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(59,130,246,0.3);
  border-top-color: ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 20px 24px;
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`

const SummaryItem = styled.div``

const SummaryLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 4px;
`

const SummaryValue = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`

const CaptchaOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(11,17,32,0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const CaptchaCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 40px;
  max-width: 400px;
  width: 100%;
  margin: 24px;
`

const CaptchaTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 8px;
`

const CaptchaQuestion = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 20px;
  font-size: 0.95rem;
`

const PrimaryBtn = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.blue};
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all 0.2s;
  margin-top: 16px;
  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const NextBtn = styled(PrimaryBtn)`
  width: auto;
  padding: 16px 48px;
  font-size: 1.05rem;
`

const MONTH_NAMES = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']

function formatPeriod(start: Date | undefined, end: Date | undefined): string {
  if (!start || !end) return '—'
  const fmt = (d: Date) => `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
  return `${fmt(start)} — ${fmt(end)}`
}

interface CaptchaState {
  visible: boolean
  token: string
  question: string
  answer: string
  pendingFileName: string
  resolve: ((answer: string) => void) | null
}

export function Screen2Upload(): JSX.Element {
  const { state, setScreen, addFile, updateFile, setCaptchaToken } = useApp()
  const { parseFile, buildTransactionsFromMapping } = useFileParser()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [captcha, setCaptcha] = useState<CaptchaState>({
    visible: false,
    token: '',
    question: '',
    answer: '',
    pendingFileName: '',
    resolve: null,
  })

  const requestCaptchaAndMap = useCallback(
    (headers: string[], sampleRows: Record<string, string>[]): Promise<ColumnMapping | null> => {
      // If we already solved captcha this session, call map directly without captcha
      if (state.captchaToken) {
        return fetch('/api/map-columns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ headers, sampleRows, captchaToken: state.captchaToken, captchaAnswer: '0' }),
        })
          .then((r) => r.ok ? r.json() as Promise<{ mapping: ColumnMapping }> : null)
          .then((d) => d?.mapping ?? null)
          .catch(() => null)
      }

      // First time: get captcha, show modal, wait for answer, then map
      return new Promise((resolve) => {
        fetch('/api/captcha', { method: 'POST' })
          .then((r) => r.json())
          .then((data: { token: string; question: string }) => {
            setCaptcha({
              visible: true,
              token: data.token,
              question: data.question,
              answer: '',
              pendingFileName: '',
              resolve: (captchaAnswer: string) => {
                fetch('/api/map-columns', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ headers, sampleRows, captchaToken: data.token, captchaAnswer }),
                })
                  .then((r) => {
                    if (r.ok) {
                      setCaptchaToken(data.token)
                      return r.json() as Promise<{ mapping: ColumnMapping }>
                    }
                    return null
                  })
                  .then((d) => resolve(d?.mapping ?? null))
                  .catch(() => resolve(null))
              },
            })
          })
          .catch(() => resolve(null))
      })
    },
    [state.captchaToken, setCaptchaToken],
  )

  const submitCaptcha = useCallback(() => {
    if (!captcha.resolve) return
    const answer = captcha.answer.trim()
    captcha.resolve(answer)
    setCaptcha((c) => ({ ...c, visible: false, resolve: null }))
  }, [captcha])

  const processFile = useCallback(
    async (file: File) => {
      const initial: FileParseResult = {
        fileName: file.name,
        rawRows: [],
        headers: [],
        mapping: null,
        transactions: [],
        rowCount: 0,
        status: 'pending',
      }
      addFile(initial)

      try {
        // Parse file
        updateFile(file.name, { status: 'mapping' })
        const { headers, rows } = await parseFile(file)

        // Get column mapping: try LLM first, fallback to auto-detect
        const sampleRows = rows.slice(0, 5)
        let mapping: ColumnMapping | null = await requestCaptchaAndMap(headers, sampleRows)

        // Auto-detect fallback if API failed
        if (!mapping) {
          mapping = autoDetectMapping(headers, rows.slice(0, 3))
        }

        if (!mapping) {
          updateFile(file.name, { status: 'error', error: 'Не удалось определить колонки. Проверьте формат файла.' })
          return
        }

        const transactions = buildTransactionsFromMapping(rows, mapping, file.name)
        const txDates = transactions.map((tx) => tx.date)
        const periodStart = txDates.length > 0 ? new Date(Math.min(...txDates.map((d) => d.getTime()))) : undefined
        const periodEnd = txDates.length > 0 ? new Date(Math.max(...txDates.map((d) => d.getTime()))) : undefined

        updateFile(file.name, {
          rawRows: rows,
          headers,
          mapping,
          transactions,
          rowCount: rows.length,
          status: 'parsed',
          periodStart,
          periodEnd,
        })
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Ошибка при обработке файла'
        updateFile(file.name, { status: 'error', error: msg })
      }
    },
    [addFile, updateFile, parseFile, requestCaptchaAndMap, buildTransactionsFromMapping],
  )

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files)
      const valid = arr.filter((f) => {
        const n = f.name.toLowerCase()
        return n.endsWith('.csv') || n.endsWith('.xlsx') || n.endsWith('.xls') || n.endsWith('.txt')
      })
      valid.forEach((f) => processFile(f))
    },
    [processFile],
  )

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const parsedFiles = state.files.filter((f) => f.status === 'parsed')
  const allTxs = parsedFiles.flatMap((f) => f.transactions)
  const dupCount = allTxs.filter((tx) => tx.isDuplicate).length
  const allDates = allTxs.map((tx) => tx.date.getTime())
  const overallStart = allDates.length > 0 ? new Date(Math.min(...allDates)) : undefined
  const overallEnd = allDates.length > 0 ? new Date(Math.max(...allDates)) : undefined
  const canProceed = parsedFiles.length > 0

  return (
    <Page>
      <Header>
        <BackBtn onClick={() => setScreen('landing')}>← Назад</BackBtn>
        <Title>Загрузите выписки</Title>
        <Subtitle>Поддерживаются CSV, XLSX и TXT. PDF не поддерживается в текущей версии.</Subtitle>
      </Header>

      <DropZone
        isDragging={isDragging}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <DropIcon>📂</DropIcon>
        <DropTitle>Перетащите файлы сюда</DropTitle>
        <DropSub>или нажмите для выбора · CSV, XLSX, XLS, TXT</DropSub>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".csv,.xlsx,.xls,.txt"
          style={{ display: 'none' }}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </DropZone>

      {state.files.length > 0 && (
        <FileList>
          {state.files.map((f) => (
            <FileCard key={f.fileName}>
              <FileIcon>
                {f.fileName.endsWith('.xlsx') || f.fileName.endsWith('.xls') ? '📊' : '📄'}
              </FileIcon>
              <FileInfo>
                <FileName>{f.fileName}</FileName>
                <FileMeta>
                  {f.rowCount > 0 ? `${f.rowCount} строк` : ''}
                  {f.periodStart && f.periodEnd
                    ? ` · ${formatPeriod(f.periodStart, f.periodEnd)}`
                    : ''}
                  {f.error ? ` · ${f.error}` : ''}
                </FileMeta>
              </FileInfo>
              {f.status === 'mapping' ? (
                <Spinner />
              ) : (
                <StatusBadge status={f.status}>
                  {f.status === 'parsed' ? 'Готово' : f.status === 'error' ? 'Ошибка' : 'Обработка...'}
                </StatusBadge>
              )}
            </FileCard>
          ))}
        </FileList>
      )}

      {parsedFiles.length > 0 && (
        <SummaryCard>
          <SummaryItem>
            <SummaryLabel>Транзакций</SummaryLabel>
            <SummaryValue>{allTxs.length.toLocaleString('ru-RU')}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Период</SummaryLabel>
            <SummaryValue style={{ fontSize: '0.9rem' }}>{formatPeriod(overallStart, overallEnd)}</SummaryValue>
          </SummaryItem>
          {dupCount > 0 && (
            <SummaryItem>
              <SummaryLabel>Дубликатов</SummaryLabel>
              <SummaryValue style={{ color: '#F59E0B' }}>{dupCount}</SummaryValue>
            </SummaryItem>
          )}
        </SummaryCard>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <NextBtn onClick={() => setScreen('questionnaire')} disabled={!canProceed}>
          Далее →
        </NextBtn>
      </div>

      {captcha.visible && (
        <CaptchaOverlay>
          <CaptchaCard>
            <CaptchaTitle>Подтвердите, что вы не робот</CaptchaTitle>
            <CaptchaQuestion>{captcha.question}</CaptchaQuestion>
            <input
              type="text"
              placeholder="Ваш ответ"
              value={captcha.answer}
              onChange={(e) => setCaptcha((c) => ({ ...c, answer: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && submitCaptcha()}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#0B1120',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#F9FAFB',
                fontSize: '1.1rem',
                fontFamily: 'monospace',
                outline: 'none',
              }}
              autoFocus
            />
            <PrimaryBtn onClick={submitCaptcha} disabled={!captcha.answer.trim()}>
              Подтвердить
            </PrimaryBtn>
          </CaptchaCard>
        </CaptchaOverlay>
      )}
    </Page>
  )
}

// Auto-detect column mapping from headers
function autoDetectMapping(
  headers: string[],
  _sampleRows: Record<string, string>[],
): ColumnMapping | null {
  const lower = headers.map((h) => h.toLowerCase())

  const dateCol = headers.find((_, i) =>
    /дата|date|период|time/i.test(lower[i]),
  ) ?? headers[0]

  const creditCol = headers.find((_, i) =>
    /кредит|приход|поступ|credit|inflow/i.test(lower[i]),
  )
  const debitCol = headers.find((_, i) =>
    /дебет|расход|списан|debit|outflow/i.test(lower[i]),
  )
  const amountCol = headers.find((_, i) =>
    /сумм|amount|итог/i.test(lower[i]),
  )

  const counterpartyCol = headers.find((_, i) =>
    /контраген|получател|плател|partner|counterpart|наименован/i.test(lower[i]),
  )
  const innCol = headers.find((_, i) => /инн|inn/i.test(lower[i]))
  const descCol = headers.find((_, i) =>
    /назначени|описан|коммент|purpose|note|detail/i.test(lower[i]),
  )

  if (!dateCol) return null

  if (creditCol && debitCol) {
    return {
      date: dateCol,
      date_format: 'DD.MM.YYYY',
      amount: debitCol,
      amount_sign: 'separate_columns',
      amount_debit: debitCol,
      amount_credit: creditCol,
      counterparty: counterpartyCol,
      inn: innCol,
      description: descCol,
    }
  }

  if (amountCol) {
    return {
      date: dateCol,
      date_format: 'DD.MM.YYYY',
      amount: amountCol,
      amount_sign: 'signed',
      counterparty: counterpartyCol,
      inn: innCol,
      description: descCol,
    }
  }

  // Last resort: second column as amount
  const secondCol = headers[1]
  if (secondCol) {
    return {
      date: dateCol,
      date_format: 'DD.MM.YYYY',
      amount: secondCol,
      amount_sign: 'signed',
      counterparty: counterpartyCol,
      inn: innCol,
      description: descCol,
    }
  }

  return null
}
