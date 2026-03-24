import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import type { CalculationResult, RegimeResult, TaxBreakdown } from '../types'
import { formatMoney, formatMoneyShort } from '../utils/format'

interface ResultsProps {
  result: CalculationResult
  onRecalc: () => void
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`

const Header = styled.div`
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(6,12,24,0.9);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 20px;
  }
`

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  span { color: ${({ theme }) => theme.colors.accent}; }
`

const RecalcBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.accentDim};
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid rgba(0,212,168,0.3);
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: #030810;
  }
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 40px 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 20px 60px;
  }
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`

/* === Winner Card === */
const WinnerCard = styled.div`
  background: linear-gradient(135deg, #0A2A1E 0%, #0D1F35 60%, #0A1525 100%);
  border: 1px solid rgba(0,212,168,0.3);
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 40px 48px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
  animation: ${fadeUp} 0.6s ease both;
  box-shadow: 0 8px 48px rgba(0,212,168,0.1);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0,212,168,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 28px 24px;
  }
`

const WinnerBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,184,48,0.15);
  border: 1px solid rgba(255,184,48,0.3);
  color: ${({ theme }) => theme.colors.gold};
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;
`

const WinnerLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const WinnerLeft = styled.div``

const WinnerRegime = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
  margin-bottom: 12px;
`

const WinnerDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 480px;
  line-height: 1.5;
`

const WinnerRight = styled.div`
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
  }
`

const WinnerTaxLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 8px;
`

const WinnerTaxAmount = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  margin-bottom: 6px;
`

const WinnerTaxSuffix = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const WinnerMonthly = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

/* === Savings Block === */
const SavingsBlock = styled.div`
  background: ${({ theme }) => theme.colors.goldDim};
  border: 1px solid rgba(255,184,48,0.2);
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 28px 36px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  animation: ${fadeUp} 0.6s 0.1s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
  }
`

const SavingsIcon = styled.div`
  font-size: 2.5rem;
  flex-shrink: 0;
`

const SavingsText = styled.div``

const SavingsAmount = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gold};
  line-height: 1;
  margin-bottom: 6px;
`

const SavingsDesc = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`

/* === Comparison Grid === */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 40px;
  animation: ${fadeUp} 0.6s 0.15s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const RegimeCard = styled.div<{ $color: string; $available: boolean; $best: boolean }>`
  background: ${({ theme }) => theme.colors.card};
  border: 2px solid ${({ $best, $color, $available, theme }) =>
    $best ? $color : $available ? theme.colors.border : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 28px;
  position: relative;
  opacity: ${({ $available }) => $available ? 1 : 0.55};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};

  ${({ $available }) => $available && `
    &:hover {
      transform: translateY(-2px);
    }
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $color, $available }) => $available ? $color : '#333'};
    opacity: ${({ $available }) => $available ? 1 : 0.4};
  }
`

const RegimeHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 12px;
`

const RegimeName = styled.div<{ $color: string; $available: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ $color, $available, theme }) => $available ? $color : theme.colors.textMuted};
`

const RegimeSubname = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 3px;
`

const StatusBadge = styled.div<{ $available: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  background: ${({ $available, theme }) =>
    $available ? theme.colors.accentDim : theme.colors.redDim};
  color: ${({ $available, theme }) =>
    $available ? theme.colors.accent : theme.colors.red};
  border: 1px solid ${({ $available, theme }) =>
    $available ? 'rgba(0,212,168,0.3)' : 'rgba(255,107,107,0.3)'};
`

const BestBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.goldDim};
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid rgba(255,184,48,0.3);
`

const TotalAmount = styled.div`
  margin-bottom: 20px;
`

const TotalLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 6px;
`

const TotalValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
`

const MonthlyVal = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
`

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 16px 0;
`

const BreakdownTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.825rem;
`

const BreakdownLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`

const BreakdownValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

const ProsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`

const ProsItem = styled.div`
  display: flex;
  gap: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 700;
    flex-shrink: 0;
    width: 14px;
  }
`

const ConsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const ConsItem = styled.div`
  display: flex;
  gap: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;

  &::before {
    content: '✕';
    color: ${({ theme }) => theme.colors.red};
    font-size: 0.7rem;
    flex-shrink: 0;
    width: 14px;
  }
`

const UnavailableOverlay = styled.div`
  background: ${({ theme }) => theme.colors.redDim};
  border: 1px solid rgba(255,107,107,0.2);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px;
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.red};
  line-height: 1.5;
`

/* === Info Section === */
const InfoSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 32px;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`

const InfoTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`

const InfoText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 12px;

  &:last-child { margin-bottom: 0; }
`

const InfoList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`

const InfoListItem = styled.li`
  display: flex;
  gap: 10px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;

  &::before {
    content: '—';
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
  }
`

/* === Actions === */
const ActionsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.6s 0.25s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const ActionBtn = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $primary, theme }) =>
    $primary
      ? `
    background: ${theme.colors.accent};
    color: #030810;
    border: none;
    box-shadow: 0 4px 20px rgba(0,212,168,0.2);
    &:hover {
      background: ${theme.colors.accentHover};
      box-shadow: 0 6px 28px rgba(0,212,168,0.3);
      transform: translateY(-1px);
    }
  `
      : `
    background: transparent;
    color: ${theme.colors.textSecondary};
    border: 2px solid ${theme.colors.border};
    &:hover {
      border-color: ${theme.colors.borderLight};
      color: ${theme.colors.text};
      background: ${theme.colors.surface};
    }
  `}
`

/* === Input Summary === */
const InputSummary = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 20px 24px;
  margin-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  animation: ${fadeUp} 0.6s 0.05s ease both;
`

const InputTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.825rem;
`

const InputTagLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`

const InputTagValue = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

function buildBreakdownRows(bd: TaxBreakdown, hasVat: boolean): Array<{ label: string; value: number }> {
  const rows: Array<{ label: string; value: number }> = []
  if (bd.tax > 0) rows.push({ label: 'Налог', value: bd.tax })
  if (bd.fixedContributions > 0) rows.push({ label: 'Взносы ИП (фикс.)', value: bd.fixedContributions })
  if (bd.variableContributions > 0) rows.push({ label: 'Взносы ИП (1% с превыш.)', value: bd.variableContributions })
  if (bd.employeeContributions > 0) rows.push({ label: 'Взносы за сотрудников', value: bd.employeeContributions })
  if (hasVat && bd.vat > 0) rows.push({ label: 'НДС (оценочно)', value: bd.vat })
  return rows
}

function generateDownloadText(result: CalculationResult): string {
  const { formData: fd, results, bestRegime, savings } = result
  const best = results.find((r) => r.regime === bestRegime)
  const lines: string[] = [
    '=== РАСЧЁТ НАЛОГОВОГО РЕЖИМА (2025) ===',
    '',
    'ПАРАМЕТРЫ БИЗНЕСА:',
    `  Форма: ${fd.businessType === 'ip' ? 'ИП' : 'ООО'}`,
    `  Выручка: ${formatMoney(fd.revenue)} ₽/год`,
    `  Расходы: ${formatMoney(fd.expenses)} ₽/год`,
    `  Сотрудники: ${fd.employees} чел.`,
    ...(fd.employees > 0 ? [`  Зарплатный фонд: ${formatMoney(fd.payroll)} ₽/мес`] : []),
    `  НДС важен: ${fd.vatImportant ? 'Да' : 'Нет'}`,
    `  Регион: ${fd.region}`,
    '',
    `ЛУЧШИЙ РЕЖИМ: ${best?.shortName ?? '—'}`,
    `Налоговая нагрузка: ${best ? formatMoney(best.breakdown.total) : '—'} ₽/год`,
    `Экономия vs худшего: ${formatMoney(savings)} ₽/год`,
    '',
    'СРАВНЕНИЕ РЕЖИМОВ:',
    ...results.map((r) =>
      r.available
        ? `  ${r.shortName}: ${formatMoney(r.breakdown.total)} ₽/год (${formatMoney(r.monthlyEquivalent)} ₽/мес)`
        : `  ${r.shortName}: НЕДОСТУПНО — ${r.unavailableReason ?? ''}`,
    ),
    '',
    'Расчёт носит ориентировочный характер. За точными данными обратитесь к бухгалтеру.',
  ]
  return lines.join('\n')
}

function handleDownload(result: CalculationResult): void {
  const text = generateDownloadText(result)
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'nalog-raschet.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function RegimeCardView({ r, isBest }: { r: RegimeResult; isBest: boolean }): JSX.Element {
  const bdRows = buildBreakdownRows(r.breakdown, r.regime === 'osno')

  return (
    <RegimeCard $color={r.color} $available={r.available} $best={isBest}>
      <RegimeHeader>
        <div>
          <RegimeName $color={r.color} $available={r.available}>{r.shortName}</RegimeName>
          <RegimeSubname>{r.name !== r.shortName ? r.name : ''}</RegimeSubname>
        </div>
        {isBest && r.available ? (
          <BestBadge>🏆 Лучший</BestBadge>
        ) : (
          <StatusBadge $available={r.available}>
            {r.available ? '✓ Доступно' : '✕ Недоступно'}
          </StatusBadge>
        )}
      </RegimeHeader>

      {r.available ? (
        <>
          <TotalAmount>
            <TotalLabel>Налоговая нагрузка в год</TotalLabel>
            <TotalValue>{formatMoney(r.breakdown.total)} ₽</TotalValue>
            <MonthlyVal>{formatMoney(r.monthlyEquivalent)} ₽/мес</MonthlyVal>
          </TotalAmount>

          {bdRows.length > 0 && (
            <>
              <Divider />
              <BreakdownTable>
                {bdRows.map((row) => (
                  <BreakdownRow key={row.label}>
                    <BreakdownLabel>{row.label}</BreakdownLabel>
                    <BreakdownValue>{formatMoney(row.value)} ₽</BreakdownValue>
                  </BreakdownRow>
                ))}
              </BreakdownTable>
            </>
          )}

          <Divider />
          {r.pros.length > 0 && (
            <ProsList>
              {r.pros.slice(0, 3).map((p) => (
                <ProsItem key={p}>{p}</ProsItem>
              ))}
            </ProsList>
          )}
          {r.cons.length > 0 && (
            <ConsList>
              {r.cons.slice(0, 3).map((c) => (
                <ConsItem key={c}>{c}</ConsItem>
              ))}
            </ConsList>
          )}
        </>
      ) : (
        <>
          <UnavailableOverlay>
            <div style={{ marginBottom: '8px', fontSize: '1.5rem' }}>🔒</div>
            <strong>Режим недоступен</strong>
            <div style={{ marginTop: '8px', opacity: 0.85 }}>{r.unavailableReason}</div>
          </UnavailableOverlay>
        </>
      )}
    </RegimeCard>
  )
}

const Results: React.FC<ResultsProps> = ({ result, onRecalc }) => {
  const { results, bestRegime, worstAvailableRegime, savings, formData: fd } = result
  const submitted = useRef(false)

  const bestResult = results.find((r) => r.regime === bestRegime)
  const worstResult = results.find((r) => r.regime === worstAvailableRegime)

  useEffect(() => {
    if (submitted.current) return
    submitted.current = true

    const usn6 = results.find((r) => r.regime === 'usn6')
    const usn15 = results.find((r) => r.regime === 'usn15')
    const osno = results.find((r) => r.regime === 'osno')

    const payload: Record<string, string> = {
      form: 'Расчёт налогов',
      'Форма бизнеса': fd.businessType === 'ip' ? 'ИП' : 'ООО',
      'Выручка': `${formatMoney(fd.revenue)} ₽/год`,
      'Расходы': `${formatMoney(fd.expenses)} ₽/год`,
      'Сотрудники': String(fd.employees),
      ...(fd.employees > 0 ? { 'Зарплатный фонд': `${formatMoney(fd.payroll)} ₽/мес` } : {}),
      'НДС-контрагенты': fd.vatImportant ? 'Да' : 'Нет',
      'Регион': fd.region,
      'Лучший режим': bestResult?.shortName ?? '—',
      ...(usn6?.available ? { 'Налог УСН 6%': `${formatMoney(usn6.breakdown.total)} ₽/год` } : {}),
      ...(usn15?.available ? { 'Налог УСН 15%': `${formatMoney(usn15.breakdown.total)} ₽/год` } : {}),
      ...(osno?.available ? { 'Налог ОСНО': `${formatMoney(osno.breakdown.total)} ₽/год` } : {}),
      'Экономия': `${formatMoney(savings)} ₽/год`,
    }

    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => undefined)
  }, [])

  const worstName = worstResult?.shortName ?? 'ОСНО'

  return (
    <Page>
      <Header>
        <Logo>Налог<span>Калькулятор</span></Logo>
        <RecalcBtn onClick={onRecalc}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          Пересчитать
        </RecalcBtn>
      </Header>

      <Container>
        {/* Input Summary */}
        <InputSummary>
          <InputTag>
            <InputTagLabel>Форма:</InputTagLabel>
            <InputTagValue>{fd.businessType === 'ip' ? 'ИП' : 'ООО'}</InputTagValue>
          </InputTag>
          <InputTag>
            <InputTagLabel>Выручка:</InputTagLabel>
            <InputTagValue>{formatMoneyShort(fd.revenue)} ₽/год</InputTagValue>
          </InputTag>
          <InputTag>
            <InputTagLabel>Расходы:</InputTagLabel>
            <InputTagValue>{formatMoneyShort(fd.expenses)} ₽/год</InputTagValue>
          </InputTag>
          <InputTag>
            <InputTagLabel>Сотрудники:</InputTagLabel>
            <InputTagValue>{fd.employees} чел.</InputTagValue>
          </InputTag>
          <InputTag>
            <InputTagLabel>Регион:</InputTagLabel>
            <InputTagValue>{fd.region}</InputTagValue>
          </InputTag>
        </InputSummary>

        {/* Winner Card */}
        {bestResult?.available && (
          <WinnerCard>
            <WinnerBadge>🏆 Оптимальный выбор</WinnerBadge>
            <WinnerLayout>
              <WinnerLeft>
                <WinnerRegime>{bestResult.shortName}</WinnerRegime>
                <WinnerDesc>
                  {bestResult.pros[0] ?? 'Наилучший вариант для вашего бизнеса по соотношению нагрузки и простоты.'}
                </WinnerDesc>
              </WinnerLeft>
              <WinnerRight>
                <WinnerTaxLabel>Нагрузка в год</WinnerTaxLabel>
                <WinnerTaxAmount>
                  {formatMoney(bestResult.breakdown.total)}&nbsp;<WinnerTaxSuffix>₽</WinnerTaxSuffix>
                </WinnerTaxAmount>
                <WinnerMonthly>≈ {formatMoney(bestResult.monthlyEquivalent)} ₽/мес</WinnerMonthly>
              </WinnerRight>
            </WinnerLayout>
          </WinnerCard>
        )}

        {/* Savings Block */}
        {savings > 0 && (
          <SavingsBlock>
            <SavingsIcon>💸</SavingsIcon>
            <SavingsText>
              <SavingsAmount>{formatMoney(savings)} ₽/год</SavingsAmount>
              <SavingsDesc>
                экономия при выборе {bestResult?.shortName} вместо {worstName}.
                За 5 лет — {formatMoney(savings * 5)} ₽.
              </SavingsDesc>
            </SavingsText>
          </SavingsBlock>
        )}

        {/* Regime Comparison */}
        <SectionTitle>
          <span>📊</span> Сравнение режимов
        </SectionTitle>
        <Grid>
          {results.map((r) => (
            <RegimeCardView
              key={r.regime}
              r={r}
              isBest={r.regime === bestRegime}
            />
          ))}
        </Grid>

        {/* Important Notes */}
        <InfoSection>
          <InfoTitle>⚠️ Важно знать</InfoTitle>
          <InfoText>
            Это упрощённый расчёт для ориентира. Реальные суммы могут отличаться в зависимости от специфики бизнеса, региональных льгот и применяемых вычетов.
          </InfoText>
          <InfoList>
            <InfoListItem>
              Взносы ИП: фиксированные {formatMoney(53_658)} ₽ + 1% с дохода свыше 300 000 ₽ (лимит {formatMoney(300_888)} ₽)
            </InfoListItem>
            <InfoListItem>
              УСН: лимит выручки 265,8 млн ₽, при выручке 199,35–265,8 млн ставка повышается до 8% / 20%
            </InfoListItem>
            <InfoListItem>
              Патент: потенциальный доход для {fd.region} — от 660 000 до 1 200 000 ₽ в зависимости от вида деятельности
            </InfoListItem>
            <InfoListItem>
              ОСНО: НДС рассчитан упрощённо как 20% от добавленной стоимости. Фактический НДС зависит от входящих счетов-фактур.
            </InfoListItem>
          </InfoList>
        </InfoSection>

        {/* Actions */}
        <SectionTitle>Что дальше</SectionTitle>
        <ActionsRow>
          <ActionBtn $primary onClick={onRecalc}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Пересчитать с другими параметрами
          </ActionBtn>
          <ActionBtn onClick={() => handleDownload(result)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Скачать результат
          </ActionBtn>
        </ActionsRow>
      </Container>
    </Page>
  )
}

export default Results
