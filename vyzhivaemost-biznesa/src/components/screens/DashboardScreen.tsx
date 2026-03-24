import React, { useState, useEffect, useCallback } from 'react'
import styled, { keyframes, css, useTheme } from 'styled-components'
import { useApp } from '../../context/AppContext'
import type { DiagnosticResult, RiskLevel, ConfidenceLevel, Recommendation, RecurringExpense, WeeklyPattern, MonthlyFlow, TopPayer } from '../../engine/types'

// Recharts — client only
let BarChart: React.ComponentType<Record<string, unknown>> | null = null
let Bar: React.ComponentType<Record<string, unknown>> | null = null
let PieChart: React.ComponentType<Record<string, unknown>> | null = null
let Pie: React.ComponentType<Record<string, unknown>> | null = null
let Cell: React.ComponentType<Record<string, unknown>> | null = null
let XAxis: React.ComponentType<Record<string, unknown>> | null = null
let YAxis: React.ComponentType<Record<string, unknown>> | null = null
let CartesianGrid: React.ComponentType<Record<string, unknown>> | null = null
let Tooltip: React.ComponentType<Record<string, unknown>> | null = null
let ResponsiveContainer: React.ComponentType<Record<string, unknown>> | null = null
let ReferenceLine: React.ComponentType<Record<string, unknown>> | null = null

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

const countUp = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

// ─── Layout ───────────────────────────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
  padding: 64px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeUp} 0.5s ease;
`

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`

const PageTitle = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 900;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  letter-spacing: -0.02em;
`

const PageMeta = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  margin-top: 6px;
`

const RestartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.surface};
  color: ${p => p.theme.colors.textSub};
  font-family: ${p => p.theme.fonts.body};
  font-size: 0.85rem;
  padding: 10px 18px;
  border-radius: ${p => p.theme.radius.sm};
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  white-space: nowrap;

  &:hover { border-color: ${p => p.theme.colors.borderStrong}; color: ${p => p.theme.colors.text}; }
`

// ─── Section ──────────────────────────────────────────────────────────
const Section = styled.section`
  margin-bottom: 48px;
  animation: ${fadeUp} 0.4s ease both;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
`

const SectionTitle = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.textSub};
`

const SectionHint = styled.span`
  font-size: 0.8rem;
  color: ${p => p.theme.colors.textMuted};
`

// ─── Metric Cards (top row) ────────────────────────────────────────────
const MetricRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: ${p => p.theme.colors.border};
  border: 1px solid ${p => p.theme.colors.border};
  margin-bottom: 48px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`

const MetricCard = styled.div<{ $highlight?: boolean }>`
  background: ${p => p.$highlight ? p.theme.colors.surface2 : p.theme.colors.surface};
  padding: 28px 24px;
  position: relative;
  overflow: hidden;

  ${p => p.$highlight && css`
    &::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: ${p.theme.colors.accent};
    }
  `}
`

const MetricLabel = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 12px;
`

const MetricValue = styled.div<{ $color?: string }>`
  font-family: ${p => p.theme.fonts.mono};
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  font-weight: 600;
  color: ${p => p.$color ?? p.theme.colors.text};
  line-height: 1;
  animation: ${countUp} 0.6s ease;
`

const MetricSub = styled.div`
  font-size: 0.78rem;
  color: ${p => p.theme.colors.textMuted};
  margin-top: 6px;
`

// Gauge SVG
const GaugeSvg = styled.svg`
  display: block;
  margin: 0 auto 8px;
`

// Risk badge
const RiskBadge = styled.span<{ $level: RiskLevel }>`
  display: inline-block;
  font-family: ${p => p.theme.fonts.mono};
  font-size: 0.85rem;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 2px;
  ${p => {
    switch (p.$level) {
      case 'low':      return css`background: ${p.theme.colors.tealDim}; color: ${p.theme.colors.teal};`
      case 'medium':   return css`background: ${p.theme.colors.warningDim}; color: ${p.theme.colors.warning};`
      case 'elevated': return css`background: rgba(240,100,20,0.12); color: #F06014;`
      case 'high':     return css`background: ${p.theme.colors.dangerDim}; color: ${p.theme.colors.danger};`
    }
  }}
`

const ConfBadge = styled.span<{ $level: ConfidenceLevel }>`
  display: inline-block;
  font-family: ${p => p.theme.fonts.mono};
  font-size: 0.8rem;
  padding: 3px 12px;
  border-radius: 2px;
  ${p => {
    switch (p.$level) {
      case 'high':   return css`background: ${p.theme.colors.tealDim}; color: ${p.theme.colors.teal};`
      case 'medium': return css`background: ${p.theme.colors.warningDim}; color: ${p.theme.colors.warning};`
      case 'low':    return css`background: ${p.theme.colors.dangerDim}; color: ${p.theme.colors.danger};`
    }
  }}
`

// ─── Info cards (two-col layout) ─────────────────────────────────────
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
`

const Card = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.md};
  padding: 24px;
`

const CardTitle = styled.h3`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 16px;
`

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px 0;
  border-bottom: 1px solid ${p => p.theme.colors.border};

  &:last-child { border-bottom: none; }

  label {
    font-size: 0.85rem;
    color: ${p => p.theme.colors.textSub};
  }

  span {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 0.9rem;
    font-weight: 600;
    color: ${p => p.theme.colors.text};
  }
`

// ─── Reserve bar ──────────────────────────────────────────────────────
const ReserveBarWrap = styled.div`
  margin-top: 20px;
`

const ReserveBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span { font-size: 0.8rem; color: ${p => p.theme.colors.textMuted}; }
  strong { font-family: ${p => p.theme.fonts.mono}; font-size: 0.85rem; }
`

const ReserveBarTrack = styled.div`
  height: 8px;
  background: ${p => p.theme.colors.surface2};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`

const ReserveBarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${p => Math.min(p.$pct, 100)}%;
  background: ${p => p.$color};
  border-radius: 4px;
  transition: width 0.8s ease;
`

const TargetMark = styled.div<{ $pct: number }>`
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: ${p => Math.min(p.$pct, 100)}%;
  width: 2px;
  background: ${p => p.theme.colors.accent};
  transform: translateX(-50%);
`

// ─── Recurring table ──────────────────────────────────────────────────
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.textMuted};
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
`

const Td = styled.td`
  font-size: 0.85rem;
  padding: 10px 12px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.textSub};

  &:first-child { color: ${p => p.theme.colors.text}; max-width: 220px; }

  &:last-child {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 0.85rem;
    color: ${p => p.theme.colors.text};
    text-align: right;
  }
`

const FreqBadge = styled.span<{ $f: string }>`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
  background: ${p => p.theme.colors.surface2};
  color: ${p => p.theme.colors.textMuted};
`

// ─── Chart wrappers ───────────────────────────────────────────────────
const ChartBox = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.md};
  padding: 24px;
  height: 280px;
`

const ChartPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${p => p.theme.colors.textFaint};
  font-size: 0.85rem;
`

// ─── Month sparkline ──────────────────────────────────────────────────
const MonthRow = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 16px;
  flex-wrap: wrap;
`

const MonthChip = styled.div<{ $negative: boolean }>`
  padding: 6px 10px;
  border-radius: ${p => p.theme.radius.sm};
  background: ${p => p.$negative ? p.theme.colors.dangerDim : p.theme.colors.tealDim};
  border: 1px solid ${p => p.$negative ? p.theme.colors.danger + '30' : p.theme.colors.teal + '30'};
  font-family: ${p => p.theme.fonts.mono};
  font-size: 10px;
  color: ${p => p.$negative ? p.theme.colors.danger : p.theme.colors.teal};
`

// ─── Recs ─────────────────────────────────────────────────────────────
const RecList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const RecCard = styled.div<{ $priority: Recommendation['priority'] }>`
  padding: 20px 24px;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p =>
    p.$priority === 'critical' ? p.theme.colors.danger + '40' :
    p.$priority === 'high' ? p.theme.colors.warning + '40' :
    p.theme.colors.border
  };
  border-left: 3px solid ${p =>
    p.$priority === 'critical' ? p.theme.colors.danger :
    p.$priority === 'high' ? p.theme.colors.warning :
    p.theme.colors.teal
  };
  border-radius: ${p => p.theme.radius.md};
`

const RecTitle = styled.h4`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 6px;
`

const RecBody = styled.p`
  font-size: 0.85rem;
  color: ${p => p.theme.colors.textSub};
  line-height: 1.6;
  margin-bottom: 6px;
`

const RecAction = styled.div`
  font-size: 0.8rem;
  color: ${p => p.theme.colors.accent};
  font-weight: 600;
`

// ─── CTA section ──────────────────────────────────────────────────────
const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`

const CTACard = styled.div<{ $primary?: boolean }>`
  background: ${p => p.$primary ? p.theme.colors.accentDim : p.theme.colors.surface};
  border: 1.5px solid ${p => p.$primary ? p.theme.colors.accent : p.theme.colors.border};
  border-radius: ${p => p.theme.radius.lg};
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${p => p.$primary ? p.theme.shadow.accent : p.theme.shadow.md};
  }

  h4 {
    font-family: ${p => p.theme.fonts.display};
    font-weight: 700;
    font-size: 1.05rem;
  }
  p {
    font-size: 0.85rem;
    color: ${p => p.theme.colors.textSub};
    line-height: 1.6;
    flex: 1;
  }
`

const CTATag = styled.span`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.accent};
`

// ─── Helpers ──────────────────────────────────────────────────────────
function fmt(n: number): string {
  return Math.round(n).toLocaleString('ru-RU')
}

function fmtRub(n: number): string {
  return `${fmt(n)} ₽`
}

function fmtMos(n: number): string {
  if (n >= 59) return '∞'
  return `${n.toFixed(1)} мес.`
}

function scoreColor(score: number, theme: ReturnType<typeof useTheme>): string {
  if (score < 30) return theme.colors.danger
  if (score < 60) return theme.colors.warning
  return theme.colors.teal
}

function riskLabel(r: RiskLevel): string {
  const labels: Record<RiskLevel, string> = { low: 'Низкий', medium: 'Средний', elevated: 'Повышенный', high: 'Высокий' }
  return labels[r]
}

function confLabel(c: ConfidenceLevel): string {
  const labels: Record<ConfidenceLevel, string> = { low: 'Низкая', medium: 'Средняя', high: 'Высокая' }
  return labels[c]
}

function freqLabel(f: RecurringExpense['frequency']): string {
  const labels: Record<RecurringExpense['frequency'], string> = {
    weekly: 'еженед.', monthly: 'ежемес.', quarterly: 'ежеквар.', irregular: 'нерегул.',
  }
  return labels[f]
}

// Gauge SVG path builder
function buildArcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const rad = (deg: number): number => (deg * Math.PI) / 180
  const x1 = cx + r * Math.cos(rad(startAngle))
  const y1 = cy + r * Math.sin(rad(startAngle))
  const x2 = cx + r * Math.cos(rad(endAngle))
  const y2 = cy + r * Math.sin(rad(endAngle))
  const large = endAngle - startAngle > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}

interface GaugeProps {
  score: number
}

const Gauge: React.FC<GaugeProps> = ({ score }) => {
  const theme = useTheme()
  const clr = scoreColor(score, theme)
  const start = 180
  const end = 180 + (score / 100) * 180

  return (
    <GaugeSvg width="120" height="70" viewBox="0 0 120 70">
      {/* Background arc */}
      <path
        d={buildArcPath(60, 65, 50, 180, 360)}
        fill="none"
        stroke={theme.colors.border}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Fill arc */}
      {score > 0 && (
        <path
          d={buildArcPath(60, 65, 50, start, Math.min(end, 359.9))}
          fill="none"
          stroke={clr}
          strokeWidth="8"
          strokeLinecap="round"
        />
      )}
    </GaugeSvg>
  )
}

// ─── Main Component ────────────────────────────────────────────────────
export const DashboardScreen: React.FC = () => {
  const { results, sessionId, questionnaire, goTo } = useApp()
  const theme = useTheme()
  const [chartsLoaded, setChartsLoaded] = useState(false)
  const submitted = React.useRef(false)

  useEffect(() => {
    let cancelled = false
    import('recharts').then(mod => {
      if (cancelled) return
      BarChart = mod.BarChart as unknown as React.ComponentType<Record<string, unknown>>
      Bar = mod.Bar as unknown as React.ComponentType<Record<string, unknown>>
      PieChart = mod.PieChart as unknown as React.ComponentType<Record<string, unknown>>
      Pie = mod.Pie as unknown as React.ComponentType<Record<string, unknown>>
      Cell = mod.Cell as unknown as React.ComponentType<Record<string, unknown>>
      XAxis = mod.XAxis as unknown as React.ComponentType<Record<string, unknown>>
      YAxis = mod.YAxis as unknown as React.ComponentType<Record<string, unknown>>
      CartesianGrid = mod.CartesianGrid as unknown as React.ComponentType<Record<string, unknown>>
      Tooltip = mod.Tooltip as unknown as React.ComponentType<Record<string, unknown>>
      ResponsiveContainer = mod.ResponsiveContainer as unknown as React.ComponentType<Record<string, unknown>>
      ReferenceLine = mod.ReferenceLine as unknown as React.ComponentType<Record<string, unknown>>
      setChartsLoaded(true)
    }).catch(() => { /* charts optional */ })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!results || submitted.current) return
    submitted.current = true

    const payload = {
      form: 'Диагностика бизнеса',
      'ID сессии': sessionId,
      'Тип бизнеса': questionnaire.businessType,
      'Остаток на счетах': fmtRub(results.cashNow),
      'Индекс устойчивости': `${results.cashResilienceScore} / 100`,
      'Hard Survival': fmtMos(results.hardSurvival),
      'Stress Survival': fmtMos(results.stressSurvival),
      'Риск разрывов': riskLabel(results.cashGapRisk),
      'Рекомендуемая подушка': `${results.targetReserveMonths.toFixed(1)} мес. / ${fmtRub(results.targetReserveAmount)}`,
      'Плохих месяцев': `${results.badMonths} из ${results.totalMonths}`,
      'Top-1 плательщик': `${(results.top1Share * 100).toFixed(0)}%`,
      'Точность': confLabel(results.confidence.level),
    }

    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => { /* ignore */ })
  }, [results]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!results) {
    return (
      <Page>
        <p style={{ color: 'var(--text-muted)' }}>Нет данных. <button onClick={() => goTo('landing')} style={{ color: 'inherit', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Начать заново</button></p>
      </Page>
    )
  }

  const r = results
  const scoreClr = scoreColor(r.cashResilienceScore, theme)
  const reservePct = r.targetReserveMonths > 0 ? (r.stressSurvival / r.targetReserveMonths) * 100 : 0
  const reserveColor = reservePct >= 100 ? theme.colors.teal : reservePct >= 60 ? theme.colors.warning : theme.colors.danger

  const periodStr = `${r.periodStart.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' })} — ${r.periodEnd.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' })}`

  return (
    <Page>
      <PageHeader>
        <div>
          <PageTitle>Диагностика денежной устойчивости</PageTitle>
          <PageMeta>Период: {periodStr} · {r.totalTransactions.toLocaleString('ru-RU')} транзакций</PageMeta>
        </div>
        <RestartButton onClick={() => goTo('landing')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7a5 5 0 1 1 1.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 10V7h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Новая диагностика
        </RestartButton>
      </PageHeader>

      {/* ── Top 4 metrics ── */}
      <MetricRow>
        <MetricCard>
          <MetricLabel>Индекс устойчивости</MetricLabel>
          <Gauge score={r.cashResilienceScore} />
          <MetricValue $color={scoreClr}>{r.cashResilienceScore}</MetricValue>
          <MetricSub>из 100 баллов</MetricSub>
        </MetricCard>

        <MetricCard>
          <MetricLabel>Hard Survival</MetricLabel>
          <MetricValue>{fmtMos(r.hardSurvival)}</MetricValue>
          <MetricSub>обычный сценарий</MetricSub>
        </MetricCard>

        <MetricCard $highlight>
          <MetricLabel>Stress Survival</MetricLabel>
          <MetricValue $color={r.stressSurvival < r.targetReserveMonths ? theme.colors.danger : theme.colors.teal}>
            {fmtMos(r.stressSurvival)}
          </MetricValue>
          <MetricSub>стрессовый сценарий</MetricSub>
        </MetricCard>

        <MetricCard>
          <MetricLabel>Риск разрывов</MetricLabel>
          <div style={{ paddingTop: 12, paddingBottom: 8 }}>
            <RiskBadge $level={r.cashGapRisk}>{riskLabel(r.cashGapRisk)}</RiskBadge>
          </div>
          <MetricSub>по неделям месяца</MetricSub>
        </MetricCard>
      </MetricRow>

      {/* ── На сколько хватит денег ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>На сколько хватит денег</SectionTitle>
        </SectionHeader>
        <TwoCol>
          <Card>
            <CardTitle>Обычный сценарий (Hard)</CardTitle>
            <StatRow>
              <label>Остаток на счетах</label>
              <span>{fmtRub(r.cashNow)}</span>
            </StatRow>
            <StatRow>
              <label>Существенные расходы/мес.</label>
              <span>{fmtRub(r.essentialMonthlyOutflow)}</span>
            </StatRow>
            <StatRow>
              <label>Запас</label>
              <span style={{ color: r.hardSurvival < 2 ? theme.colors.danger : theme.colors.teal }}>
                {fmtMos(r.hardSurvival)}
              </span>
            </StatRow>
          </Card>
          <Card>
            <CardTitle>Стрессовый сценарий</CardTitle>
            <StatRow>
              <label>Слабые поступления (P25)</label>
              <span>{fmtRub(r.weakInflow)}</span>
            </StatRow>
            <StatRow>
              <label>Стресс-дефицит/мес.</label>
              <span>{fmtRub(r.stressNetBurn)}</span>
            </StatRow>
            <StatRow>
              <label>Запас при стрессе</label>
              <span style={{ color: r.stressSurvival < r.targetReserveMonths ? theme.colors.danger : theme.colors.teal }}>
                {fmtMos(r.stressSurvival)}
              </span>
            </StatRow>
          </Card>
        </TwoCol>
      </Section>

      {/* ── Подушка ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>Какая нужна подушка</SectionTitle>
          <SectionHint>рекомендуемый резерв для вашего типа бизнеса</SectionHint>
        </SectionHeader>
        <Card>
          <StatRow>
            <label>Рекомендуется</label>
            <span>{r.targetReserveMonths.toFixed(1)} мес. / {fmtRub(r.targetReserveAmount)}</span>
          </StatRow>
          <StatRow>
            <label>Сейчас (стрессовый запас)</label>
            <span>{fmtMos(r.stressSurvival)}</span>
          </StatRow>
          <ReserveBarWrap>
            <ReserveBarLabel>
              <span>0 мес.</span>
              <strong>{r.targetReserveMonths.toFixed(1)} мес. цель</strong>
            </ReserveBarLabel>
            <ReserveBarTrack>
              <ReserveBarFill $pct={reservePct} $color={reserveColor} />
              <TargetMark $pct={100} />
            </ReserveBarTrack>
          </ReserveBarWrap>
        </Card>
      </Section>

      {/* ── Что давит на деньги ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>Что давит на деньги</SectionTitle>
          <SectionHint>повторяющиеся расходы</SectionHint>
        </SectionHeader>
        {r.recurringCore.length > 0 ? (
          <Card style={{ padding: 0 }}>
            <Table>
              <thead>
                <tr>
                  <Th>Контрагент</Th>
                  <Th>Частота</Th>
                  <Th>Медиана</Th>
                  <Th>В месяц</Th>
                </tr>
              </thead>
              <tbody>
                {r.recurringCore.slice(0, 10).map((rec, i) => (
                  <tr key={i}>
                    <Td title={rec.counterparty}>
                      {rec.counterparty.slice(0, 35)}{rec.counterparty.length > 35 ? '…' : ''}
                    </Td>
                    <Td><FreqBadge $f={rec.frequency}>{freqLabel(rec.frequency)}</FreqBadge></Td>
                    <Td>{fmtRub(rec.medianAmount)}</Td>
                    <Td>{fmtRub(rec.monthlyAmount)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        ) : (
          <Card>
            <p style={{ color: theme.colors.textMuted, fontSize: '0.9rem' }}>
              Регулярные расходы не определены — возможно, недостаточно данных (нужно минимум 3 месяца).
            </p>
          </Card>
        )}
      </Section>

      {/* ── Кассовые ямы ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>Где кассовые ямы</SectionTitle>
          <SectionHint>средний чистый поток по неделям месяца</SectionHint>
        </SectionHeader>
        <ChartBox>
          {chartsLoaded && BarChart && ResponsiveContainer && Bar && XAxis && YAxis && Tooltip && ReferenceLine ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={r.weeklyPatterns} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: theme.colors.textMuted, fontFamily: theme.fonts.mono }} />
                <YAxis tick={{ fontSize: 11, fill: theme.colors.textMuted, fontFamily: theme.fonts.mono }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ background: theme.colors.surface2, border: `1px solid ${theme.colors.border}`, borderRadius: 4, fontFamily: theme.fonts.mono, fontSize: 11 }}
                  formatter={(value: number) => [fmtRub(value), '']}
                />
                <ReferenceLine y={0} stroke={theme.colors.borderStrong} />
                <Bar dataKey="avgNet" radius={[2, 2, 0, 0]}>
                  {r.weeklyPatterns.map((entry, index) => (
                    <Cell key={index} fill={entry.avgNet >= 0 ? theme.colors.teal : theme.colors.danger} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ChartPlaceholder>Загрузка графика…</ChartPlaceholder>
          )}
        </ChartBox>
      </Section>

      {/* ── Концентрация + месяцы ── */}
      <TwoCol style={{ marginBottom: 48 }}>
        {/* Крупные плательщики */}
        <Section style={{ marginBottom: 0 }}>
          <SectionHeader>
            <SectionTitle>Крупные плательщики</SectionTitle>
          </SectionHeader>
          <Card style={{ height: 280 }}>
            {r.topPayers.length > 0 ? (
              <>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', height: '100%' }}>
                  {chartsLoaded && PieChart && Pie && Cell && ResponsiveContainer ? (
                    <div style={{ width: 140, flexShrink: 0, height: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Top-1', value: r.top1Share * 100 },
                              { name: 'Top 2-3', value: Math.max(0, r.top3Share - r.top1Share) * 100 },
                              { name: 'Остальные', value: Math.max(0, 1 - r.top3Share) * 100 },
                            ]}
                            cx="50%" cy="50%" innerRadius="55%" outerRadius="85%"
                            dataKey="value" strokeWidth={0}
                          >
                            <Cell fill={theme.colors.accent} />
                            <Cell fill={theme.colors.warning} />
                            <Cell fill={theme.colors.border} />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : null}
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Top-1</div>
                      <div style={{ fontFamily: theme.fonts.mono, fontSize: '1.2rem', fontWeight: 600, color: theme.colors.accent }}>{(r.top1Share * 100).toFixed(0)}%</div>
                      <div style={{ fontSize: '0.8rem', color: theme.colors.textMuted, marginTop: 2 }}>{r.topPayers[0]?.counterparty.slice(0, 30) ?? '—'}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Top-3</div>
                      <div style={{ fontFamily: theme.fonts.mono, fontSize: '1rem', fontWeight: 600 }}>{(r.top3Share * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <ChartPlaceholder>Нет данных о поступлениях</ChartPlaceholder>
            )}
          </Card>
        </Section>

        {/* Плохие месяцы */}
        <Section style={{ marginBottom: 0 }}>
          <SectionHeader>
            <SectionTitle>Плохие месяцы</SectionTitle>
            <SectionHint>месяцы с минусовым балансом</SectionHint>
          </SectionHeader>
          <Card>
            <StatRow>
              <label>Убыточных месяцев</label>
              <span style={{ color: r.badMonths > r.totalMonths / 3 ? theme.colors.danger : theme.colors.text }}>
                {r.badMonths} из {r.totalMonths}
              </span>
            </StatRow>
            <StatRow>
              <label>Доля</label>
              <span>{r.totalMonths > 0 ? ((r.badMonths / r.totalMonths) * 100).toFixed(0) : 0}%</span>
            </StatRow>
            <MonthRow>
              {r.monthlyFlows.map((m, i) => (
                <MonthChip key={i} $negative={m.net < 0} title={`${m.label}: ${fmtRub(m.net)}`}>
                  {m.label.slice(0, 3)}
                </MonthChip>
              ))}
            </MonthRow>
          </Card>
        </Section>
      </TwoCol>

      {/* ── Точность оценки ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>Точность оценки</SectionTitle>
        </SectionHeader>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <ConfBadge $level={r.confidence.level}>{confLabel(r.confidence.level)}</ConfBadge>
            <span style={{ fontFamily: theme.fonts.mono, fontSize: '0.85rem', color: theme.colors.textMuted }}>
              {(r.confidence.score * 100).toFixed(0)} / 100
            </span>
          </div>
          <StatRow>
            <label>Период анализа</label>
            <span>{r.confidence.periodMonths} мес.</span>
          </StatRow>
          <StatRow>
            <label>Нераспознанные транзакции</label>
            <span>{(r.confidence.unknownRatio * 100).toFixed(0)}%</span>
          </StatRow>
          <StatRow>
            <label>Охват счетов</label>
            <span>
              {r.confidence.accountsCoverage === 'all' ? 'Все счета' :
               r.confidence.accountsCoverage === 'most' ? 'Большинство' : 'Часть счетов'}
            </span>
          </StatRow>
          {r.confidence.reasons.length > 0 && (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {r.confidence.reasons.map((reason, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: theme.colors.warning, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span>⚠</span><span>{reason}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </Section>

      {/* ── Рекомендации ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>Что делать дальше</SectionTitle>
          <SectionHint>{r.recommendations.length} рекомендации</SectionHint>
        </SectionHeader>
        {r.recommendations.length > 0 ? (
          <RecList>
            {r.recommendations.map(rec => (
              <RecCard key={rec.id} $priority={rec.priority}>
                <RecTitle>{rec.title}</RecTitle>
                <RecBody>{rec.body}</RecBody>
                {rec.action && <RecAction>→ {rec.action}</RecAction>}
              </RecCard>
            ))}
          </RecList>
        ) : (
          <Card>
            <p style={{ color: theme.colors.textMuted, fontSize: '0.9rem' }}>
              Показатели в норме — продолжайте следить за резервом и концентрацией.
            </p>
          </Card>
        )}
      </Section>

      {/* ── CTA ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>Хотите точнее?</SectionTitle>
        </SectionHeader>
        <CTAGrid>
          <CTACard $primary>
            <CTATag>Автоматически</CTATag>
            <h4>Аналитика через интеграцию</h4>
            <p>Подключите банк напрямую — данные будут обновляться автоматически, расчёты станут точнее.</p>
          </CTACard>
          <CTACard>
            <CTATag>Вручную</CTATag>
            <h4>Adesk — управленческий учёт</h4>
            <p>Инструмент для ведения ДДС, PnL и баланса вручную. Полная картина бизнеса в одном месте.</p>
          </CTACard>
        </CTAGrid>
      </Section>
    </Page>
  )
}
