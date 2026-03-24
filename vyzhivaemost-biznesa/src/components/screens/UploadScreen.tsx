import React, { useState, useCallback, useRef, useId } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useApp } from '../../context/AppContext'
import type { ParsedFile, ColumnMapping } from '../../engine/types'
import { detectColumnMapping, normalizeRows, parse1C } from '../../engine/normalize'

// Dynamic imports to avoid SSR issues
let XLSX: typeof import('xlsx') | null = null
let Papa: typeof import('papaparse') | null = null

async function ensureLibs(): Promise<void> {
  if (!XLSX) XLSX = await import('xlsx')
  if (!Papa) Papa = await import('papaparse')
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Page = styled.div`
  min-height: 100vh;
  padding: 80px 24px;
  max-width: 860px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: 48px;
`

const StepBadge = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.15em;
  color: ${p => p.theme.colors.textMuted};
  text-transform: uppercase;
  margin-bottom: 12px;
`

const Title = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 800;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  letter-spacing: -0.01em;
  margin-bottom: 12px;
`

const Hint = styled.p`
  color: ${p => p.theme.colors.textSub};
  font-size: 0.95rem;
`

const DropZone = styled.div<{ $active: boolean; $hasFiles: boolean }>`
  border: 1.5px dashed ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$active ? p.theme.colors.accentDim : p.theme.colors.surface};
  border-radius: ${p => p.theme.radius.md};
  padding: 56px 32px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  position: relative;
  margin-bottom: 32px;

  &:hover {
    border-color: ${p => p.theme.colors.accentHover};
    background: ${p => p.theme.colors.accentDim};
  }
`

const DropIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  opacity: 0.7;
`

const DropTitle = styled.p`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 8px;
`

const DropHint = styled.p`
  font-size: 0.85rem;
  color: ${p => p.theme.colors.textMuted};
`

const FileInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
`

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  animation: ${fadeIn} 0.3s ease;
`

const FileItem = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p =>
    p.$status === 'ok' ? p.theme.colors.teal + '40' :
    p.$status === 'error' ? p.theme.colors.danger + '40' :
    p.theme.colors.border
  };
  border-radius: ${p => p.theme.radius.md};
  transition: border-color 0.2s;
`

const FileIcon = styled.div`
  font-size: 1.4rem;
  flex-shrink: 0;
`

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const FileName = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 0.85rem;
  color: ${p => p.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FileMeta = styled.div`
  font-size: 0.8rem;
  color: ${p => p.theme.colors.textMuted};
  margin-top: 4px;
`

const StatusBadge = styled.span<{ $type: 'ok' | 'error' | 'parsing' | 'warn' | 'mapping_required' }>`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 2px;
  flex-shrink: 0;
  ${p => {
    switch (p.$type) {
      case 'ok': return css`background: ${p.theme.colors.tealDim}; color: ${p.theme.colors.teal};`
      case 'error': return css`background: ${p.theme.colors.dangerDim}; color: ${p.theme.colors.danger};`
      case 'warn': return css`background: ${p.theme.colors.warningDim}; color: ${p.theme.colors.warning};`
      case 'mapping_required': return css`background: ${p.theme.colors.warningDim}; color: ${p.theme.colors.warning};`
      default: return css`background: ${p.theme.colors.border}; color: ${p.theme.colors.textMuted};`
    }
  }}
`

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${p => p.theme.colors.border};
  border-top-color: ${p => p.theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  flex-shrink: 0;
`

const SummaryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: ${p => p.theme.colors.border};
  border: 1px solid ${p => p.theme.colors.border};
  margin-bottom: 32px;
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const SummaryCell = styled.div`
  background: ${p => p.theme.colors.surface};
  padding: 20px 24px;

  label {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.textMuted};
    display: block;
    margin-bottom: 6px;
  }

  span {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 1.1rem;
    font-weight: 600;
    color: ${p => p.theme.colors.text};
  }
`

const WarnList = styled.ul`
  list-style: none;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const WarnItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.85rem;
  color: ${p => p.theme.colors.warning};
  background: ${p => p.theme.colors.warningDim};
  padding: 10px 14px;
  border-radius: ${p => p.theme.radius.sm};
  border-left: 2px solid ${p => p.theme.colors.warning};
`

const MappingPanel = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.warning}60;
  border-radius: ${p => p.theme.radius.md};
  padding: 24px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.3s ease;
`

const MappingTitle = styled.h4`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 16px;
  color: ${p => p.theme.colors.warning};
`

const MappingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
`

const MappingField = styled.div`
  label {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.textMuted};
    display: block;
    margin-bottom: 6px;
  }

  select {
    width: 100%;
    background: ${p => p.theme.colors.surface2};
    border: 1px solid ${p => p.theme.colors.border};
    color: ${p => p.theme.colors.text};
    padding: 8px 12px;
    border-radius: ${p => p.theme.radius.sm};
    font-size: 0.85rem;
    cursor: pointer;
    outline: none;

    &:focus { border-color: ${p => p.theme.colors.accent}; }
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
`

const NextButton = styled.button<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${p => p.$disabled ? p.theme.colors.surface2 : p.theme.colors.accent};
  color: ${p => p.$disabled ? p.theme.colors.textMuted : '#0a0a0a'};
  font-family: ${p => p.theme.fonts.display};
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 14px 32px;
  border-radius: ${p => p.theme.radius.sm};
  border: none;
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s, transform 0.15s;

  &:hover:not(:disabled) {
    background: ${p => p.theme.colors.accentHover};
    transform: translateY(-1px);
  }
`

const BackButton = styled.button`
  font-size: 0.9rem;
  color: ${p => p.theme.colors.textSub};
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  &:hover { color: ${p => p.theme.colors.text}; }
`

function formatBytes(b: number): string {
  if (b < 1024) return `${b} Б`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} КБ`
  return `${(b / (1024 * 1024)).toFixed(1)} МБ`
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface ManualMapping {
  [fileId: string]: ColumnMapping
}

export const UploadScreen: React.FC = () => {
  const { goTo, setParsedFiles } = useApp()
  const [files, setFiles] = useState<ParsedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [manualMappings, setManualMappings] = useState<ManualMapping>({})
  const processingRef = useRef(false)

  const processFile = useCallback(async (file: File): Promise<ParsedFile> => {
    await ensureLibs()
    const id = `file_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const base: ParsedFile = {
      id,
      name: file.name,
      size: file.size,
      format: 'unknown',
      status: 'parsing',
      transactions: [],
      warnings: [],
    }

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
      const buf = await file.arrayBuffer()

      if (ext === 'xlsx' || ext === 'xls') {
        base.format = 'xlsx'
        const wb = XLSX!.read(buf, { type: 'array', cellDates: true })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const raw = XLSX!.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '', raw: false })
        if (raw.length === 0) throw new Error('Файл пуст')
        const headers = Object.keys(raw[0])
        base.rawHeaders = headers
        const mapping = detectColumnMapping(headers)
        if (mapping) {
          base.columnMapping = mapping
          base.transactions = normalizeRows(raw, mapping, file.name)
          base.status = base.transactions.length > 0 ? 'ok' : 'error'
          if (base.transactions.length === 0) base.error = 'Не удалось извлечь транзакции'
        } else {
          base.status = 'mapping_required'
          base.rawHeaders = headers
        }

      } else if (ext === 'csv') {
        base.format = 'csv'
        const text = new TextDecoder('utf-8').decode(buf)
        const result = Papa!.parse<Record<string, unknown>>(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false,
        })
        if (result.data.length === 0) throw new Error('CSV пуст')
        const headers = result.meta.fields ?? []
        base.rawHeaders = headers
        const mapping = detectColumnMapping(headers)
        if (mapping) {
          base.columnMapping = mapping
          base.transactions = normalizeRows(result.data, mapping, file.name)
          base.status = base.transactions.length > 0 ? 'ok' : 'error'
          if (base.transactions.length === 0) base.error = 'Не удалось извлечь транзакции'
        } else {
          base.status = 'mapping_required'
        }

      } else if (ext === 'txt') {
        // Decode as both UTF-8 and Windows-1251, pick the one with more Cyrillic chars
        const utf8 = new TextDecoder('utf-8').decode(buf)
        const win1251 = new TextDecoder('windows-1251').decode(buf)
        const countCyrillic = (s: string): number => (s.match(/[а-яА-ЯёЁ]/g) ?? []).length
        const content = countCyrillic(win1251) > countCyrillic(utf8) ? win1251 : utf8

        const is1C = (s: string): boolean =>
          s.includes('1CClientBankExchange') || s.includes('СекцияДокумент')

        if (is1C(utf8) || is1C(win1251)) {
          // Use whichever decoded version contains the 1C marker
          const content1C = is1C(win1251) ? win1251 : utf8
          base.format = '1c'
          const { transactions, accountNumbers } = parse1C(content1C, file.name)
          base.transactions = transactions
          if (accountNumbers.length > 0) base.detectedAccountNumber = accountNumbers[0]
          base.status = transactions.length > 0 ? 'ok' : 'error'
          if (transactions.length === 0) base.error = 'Не удалось разобрать 1C формат'
        } else {
          // Try CSV/TSV with common delimiters; test both encodings and pick the better parse
          const parseWithDelimiters = (text: string) => {
            // Try auto-detect first, then fallback to semicolon, then pipe
            for (const delimiter of [undefined, ';', '|', '\t', ',']) {
              const r = Papa!.parse<Record<string, unknown>>(text, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: false,
                ...(delimiter !== undefined ? { delimiter } : {}),
              })
              if (r.data.length > 0 && (r.meta.fields?.length ?? 0) > 1) return r
            }
            return Papa!.parse<Record<string, unknown>>(text, { header: true, skipEmptyLines: true, dynamicTyping: false })
          }

          const resultUtf8 = parseWithDelimiters(utf8)
          const resultWin = parseWithDelimiters(win1251)
          const result = resultWin.data.length > resultUtf8.data.length ? resultWin : resultUtf8

          base.format = 'csv'
          if (result.data.length > 0) {
            const headers = result.meta.fields ?? []
            base.rawHeaders = headers
            const mapping = detectColumnMapping(headers)
            if (mapping) {
              base.columnMapping = mapping
              base.transactions = normalizeRows(result.data, mapping, file.name)
              base.status = base.transactions.length > 0 ? 'ok' : 'error'
            } else {
              base.status = 'mapping_required'
            }
          } else {
            throw new Error('Формат файла не распознан. Поддерживаются: CSV, XLSX, TXT (1С формат kl_to_1c)')
          }
        }
      }

      if (base.transactions.length > 0) {
        const dates = base.transactions.map(t => t.date.getTime())
        base.periodStart = new Date(Math.min(...dates))
        base.periodEnd = new Date(Math.max(...dates))
      }

      // Check for potential duplicates within file
      const seen = new Map<string, number>()
      let dups = 0
      for (const tx of base.transactions) {
        const key = `${tx.date.toISOString().split('T')[0]}|${Math.abs(tx.amount).toFixed(2)}|${tx.counterparty.slice(0, 20)}`
        if (seen.has(key)) dups++
        seen.set(key, (seen.get(key) ?? 0) + 1)
      }
      if (dups > 0) base.warnings.push(`Найдено ${dups} возможных дублей`)

    } catch (e) {
      base.status = 'error'
      base.error = e instanceof Error ? e.message : 'Ошибка парсинга'
    }

    return base
  }, [])

  const handleFiles = useCallback(async (fileList: FileList | File[]) => {
    if (processingRef.current) return
    processingRef.current = true

    const newIds = new Set<string>()
    const pending: ParsedFile[] = []

    for (const file of Array.from(fileList)) {
      const tempFile: ParsedFile = {
        id: `temp_${Math.random()}`,
        name: file.name,
        size: file.size,
        format: 'unknown',
        status: 'parsing',
        transactions: [],
        warnings: [],
      }
      pending.push(tempFile)
      newIds.add(tempFile.id)
    }

    setFiles(prev => [...prev, ...pending])

    const results: ParsedFile[] = []
    for (let i = 0; i < Array.from(fileList).length; i++) {
      const result = await processFile(Array.from(fileList)[i])
      results.push(result)
    }

    setFiles(prev => {
      const keep = prev.filter(f => !newIds.has(f.id))
      return [...keep, ...results]
    })

    processingRef.current = false
  }, [processFile])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    void handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const applyManualMapping = useCallback((fileId: string) => {
    const mapping = manualMappings[fileId]
    if (!mapping) return
    setFiles(prev => prev.map(f => {
      if (f.id !== fileId) return f
      const txs = normalizeRows([], mapping, f.name) // will need raw data
      return { ...f, columnMapping: mapping, status: 'ok', transactions: txs }
    }))
  }, [manualMappings])

  const allParsed = files.filter(f => f.status === 'ok')
  const totalTx = allParsed.reduce((s, f) => s + f.transactions.length, 0)
  const allDates = allParsed.flatMap(f => f.transactions.map(t => t.date.getTime()))
  const periodStart = allDates.length > 0 ? new Date(Math.min(...allDates)) : null
  const periodEnd = allDates.length > 0 ? new Date(Math.max(...allDates)) : null
  const allWarnings = files.flatMap(f => f.warnings)

  const canProceed = allParsed.length > 0

  const handleNext = (): void => {
    setParsedFiles(files)
    goTo('questionnaire')
  }

  return (
    <Page>
      <Header>
        <StepBadge>Шаг 1 из 3</StepBadge>
        <Title>Загрузите банковские выписки</Title>
        <Hint>CSV, XLSX, XLS или TXT (1С). Несколько файлов — можно.</Hint>
      </Header>

      <DropZone
        $active={isDragOver}
        $hasFiles={files.length > 0}
        onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <FileInput
          type="file"
          multiple
          accept=".csv,.xlsx,.xls,.txt"
          onChange={e => e.target.files && void handleFiles(e.target.files)}
        />
        <DropIcon>📂</DropIcon>
        <DropTitle>Перетащите файлы или нажмите для выбора</DropTitle>
        <DropHint>CSV, XLSX, XLS, TXT (1С) · Windows-1251 распознаётся автоматически</DropHint>
      </DropZone>

      {files.length > 0 && (
        <FileList>
          {files.map(f => (
            <React.Fragment key={f.id}>
              <FileItem $status={f.status}>
                <FileIcon>
                  {f.format === '1c' ? '🏛' : f.format === 'xlsx' || f.format === 'xls' ? '📊' : '📄'}
                </FileIcon>
                <FileInfo>
                  <FileName>{f.name}</FileName>
                  <FileMeta>
                    {formatBytes(f.size)}
                    {f.transactions.length > 0 && ` · ${f.transactions.length} транзакций`}
                    {f.periodStart && f.periodEnd && ` · ${formatDate(f.periodStart)} — ${formatDate(f.periodEnd)}`}
                    {f.error && ` · ${f.error}`}
                  </FileMeta>
                </FileInfo>
                {f.status === 'parsing' && <Spinner />}
                {f.status === 'ok' && <StatusBadge $type="ok">OK</StatusBadge>}
                {f.status === 'error' && <StatusBadge $type="error">Ошибка</StatusBadge>}
                {f.status === 'mapping_required' && <StatusBadge $type="mapping_required">Нужна настройка</StatusBadge>}
              </FileItem>

              {f.status === 'mapping_required' && f.rawHeaders && (
                <MappingPanel>
                  <MappingTitle>Укажите столбцы для файла: {f.name}</MappingTitle>
                  <MappingGrid>
                    {(['date', 'amount', 'debit', 'credit', 'counterparty', 'description'] as const).map(field => {
                      const labels: Record<string, string> = {
                        date: 'Дата *', amount: 'Сумма', debit: 'Дебет (расход)',
                        credit: 'Кредит (приход)', counterparty: 'Контрагент', description: 'Назначение',
                      }
                      return (
                        <MappingField key={field}>
                          <label>{labels[field]}</label>
                          <select
                            value={manualMappings[f.id]?.[field] ?? ''}
                            onChange={e => setManualMappings(prev => ({
                              ...prev,
                              [f.id]: { ...prev[f.id], [field]: e.target.value },
                            }))}
                          >
                            <option value="">— не выбрано —</option>
                            {f.rawHeaders!.map(h => <option key={h} value={h}>{h}</option>)}
                          </select>
                        </MappingField>
                      )
                    })}
                  </MappingGrid>
                </MappingPanel>
              )}
            </React.Fragment>
          ))}
        </FileList>
      )}

      {allWarnings.length > 0 && (
        <WarnList>
          {allWarnings.map((w, i) => <WarnItem key={i}>⚠ {w}</WarnItem>)}
        </WarnList>
      )}

      {canProceed && (
        <SummaryBox>
          <SummaryCell>
            <label>Транзакций</label>
            <span>{totalTx.toLocaleString('ru-RU')}</span>
          </SummaryCell>
          <SummaryCell>
            <label>Начало периода</label>
            <span>{periodStart ? formatDate(periodStart) : '—'}</span>
          </SummaryCell>
          <SummaryCell>
            <label>Конец периода</label>
            <span>{periodEnd ? formatDate(periodEnd) : '—'}</span>
          </SummaryCell>
        </SummaryBox>
      )}

      <Actions>
        <BackButton onClick={() => goTo('landing')}>← Назад</BackButton>
        <NextButton $disabled={!canProceed} onClick={canProceed ? handleNext : undefined}>
          Далее
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </NextButton>
      </Actions>
    </Page>
  )
}
