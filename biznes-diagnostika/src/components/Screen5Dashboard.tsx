import React, { useEffect, useRef } from 'react'
import styled, { keyframes, useTheme } from 'styled-components'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, ResponsiveContainer,
  ReferenceLine, CartesianGrid,
} from 'recharts'
import { useApp } from '../context/AppContext'
import type { EngineResult, CashGapRisk, ConfidenceLevel } from '../engine/types'

const fadeUp = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`

const Page = styled.div`
  min-height: 100vh;
  padding: 48px 24px 80px;
  max-width: 1100px;
  margin: 0 auto;
  animation: ${fadeUp} 0.5s ease;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 16px;
`

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: ${({ theme }) => theme.colors.white};
`

const MetaInfo = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`

const TopMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
`

const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
  transition: transform 0.2s;
  &:hover { transform: translateY(-2px); }
`

const MetricLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 12px;
`

const MetricValue = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  color: ${({ theme }) => theme.colors.white};
`

const MetricSub = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 6px;
`

interface RiskBadgeProps {
  risk: CashGapRisk
}

const riskColors: Record<CashGapRisk, string> = {
  'Низкий': '#10B981',
  'Средний': '#F59E0B',
  'Повышенный': '#F97316',
  'Высокий': '#EF4444',
}

const RiskBadge = styled.span<RiskBadgeProps>`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ risk }) => riskColors[risk]};
  background: ${({ risk }) => riskColors[risk]}22;
  padding: 4px 12px;
  border-radius: 100px;
  margin-top: 8px;
`

const Section = styled.section`
  margin-bottom: 40px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.white};
`

const SectionCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
`

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`

const HighlightValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`

const BufferRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`

const BufferLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  width: 120px;
  flex-shrink: 0;
`

const BarBg = styled.div`
  flex: 1;
  height: 8px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 4px;
  overflow: hidden;
`

interface BarFillProps {
  width: number
  color: string
}

const BarFill = styled.div<BarFillProps>`
  height: 100%;
  width: ${({ width }) => Math.min(width, 100)}%;
  background: ${({ color }) => color};
  border-radius: 4px;
  transition: width 1s ease;
`

const BarValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.white};
  width: 100px;
  text-align: right;
  flex-shrink: 0;
`

// Recurring expenses table
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`

const Th = styled.th`
  text-align: left;
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const Td = styled.td`
  padding: 12px 12px;
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}66;
  vertical-align: middle;
`

const ConfidenceDot = styled.span<{ level: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ level, theme }) =>
    level === 'high' ? theme.colors.green : level === 'medium' ? theme.colors.amber : theme.colors.red};
  margin-right: 6px;
`

interface ConfidenceBadgeProps {
  level: ConfidenceLevel
}

const confidenceBadgeColors: Record<ConfidenceLevel, string> = {
  'Высокая': '#10B981',
  'Средняя': '#F59E0B',
  'Ниже обычной': '#EF4444',
}

const ConfidenceBadge = styled.span<ConfidenceBadgeProps>`
  display: inline-block;
  font-weight: 700;
  color: ${({ level }) => confidenceBadgeColors[level]};
  background: ${({ level }) => confidenceBadgeColors[level]}22;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.875rem;
  margin-bottom: 16px;
`

const RecoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const RecoItem = styled.div`
  display: flex;
  gap: 14px;
  padding: 16px 20px;
  background: rgba(59,130,246,0.06);
  border: 1px solid rgba(59,130,246,0.15);
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.93rem;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.6;

  &::before {
    content: '→';
    color: ${({ theme }) => theme.colors.blue};
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
`

const TwoCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`

const PromoCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const PromoTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
`

const PromoDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
  flex: 1;
`

const PromoBtn = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.colors.blue};
  color: #fff !important;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
  transition: opacity 0.2s;
  &:hover { opacity: 0.85; }
`

// Gauge component for resilience score
interface GaugeProps {
  score: number
}

function ResilienceGauge({ score }: GaugeProps): JSX.Element {
  const color = score < 30 ? '#EF4444' : score < 60 ? '#F59E0B' : '#10B981'
  const pct = score / 100
  const r = 44
  const circumference = 2 * Math.PI * r
  const dashOffset = circumference * (1 - pct * 0.75) // 3/4 arc

  return (
    <div style={{ position: 'relative', width: 120, height: 90 }}>
      <svg width="120" height="90" viewBox="0 0 120 90">
        {/* Background arc */}
        <circle
          cx="60" cy="70" r={r}
          fill="none"
          stroke="#1f2d45"
          strokeWidth="8"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={circumference * 0.375}
          strokeLinecap="round"
          transform="rotate(-135, 60, 70)"
        />
        {/* Value arc */}
        <circle
          cx="60" cy="70" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${circumference * 0.75 * pct} ${circumference}`}
          strokeDashoffset={circumference * 0.375}
          strokeLinecap="round"
          transform="rotate(-135, 60, 70)"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        bottom: 4,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 700,
        fontSize: '1.4rem',
        color,
      }}>
        {score}
      </div>
    </div>
  )
}

function fmtN(n: number): string {
  return n.toLocaleString('ru-RU')
}

function fmtRub(n: number): string {
  return `${fmtN(Math.round(n))} ₽`
}

function fmtMo(n: number): string {
  if (n >= 99) return '∞'
  return `${n.toFixed(1)} мес.`
}

function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`
}

const MONTH_NAMES = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']

function fmtPeriod(d: Date): string {
  return `${MONTH_NAMES[d.getMonth()].toUpperCase()} ${d.getFullYear()}`
}

function buildRecommendations(r: EngineResult, answers: { cashNow: number }): string[] {
  const recs: string[] = []

  if (r.stressSurvivalMonths < r.targetReserveMonths) {
    recs.push(
      `Увеличить денежную подушку до ${fmtRub(r.targetReserveAmount)} (${r.targetReserveMonths} мес. расходов). Используйте отдельный накопительный счёт — «Фонды».`,
    )
  }

  if (r.cashGapRisk === 'Высокий' || r.cashGapRisk === 'Повышенный') {
    recs.push(
      'Используйте Платёжный календарь для контроля кассовых разрывов и планируйте поступления минимум на 2 недели вперёд.',
    )
  }

  if (r.badMonthRate > 0.3) {
    recs.push(
      `${r.badMonthCount} из ${r.totalMonthCount} месяцев были убыточными. Ведите план-факт анализ с помощью инструмента «Бюджеты».`,
    )
  }

  if (r.top1PayerShare > 0.4) {
    recs.push(
      `Высокая зависимость от одного клиента (${fmtPct(r.top1PayerShare)}). Диверсифицируйте клиентскую базу — потеря ключевого плательщика критична для кассы.`,
    )
  }

  if (r.inflowCV > 0.6) {
    recs.push(
      'Поступления сильно волатильны. Рассмотрите переход на подписочную или абонентскую модель для части услуг.',
    )
  }

  if (recs.length === 0) {
    recs.push('Текущий уровень денежной устойчивости — хороший. Поддерживайте подушку и ведите регулярный мониторинг.')
  }

  return recs.slice(0, 5)
}

const CONFIDENCE_TEXTS: Record<ConfidenceLevel, string> = {
  'Высокая':
    'Сейчас оценка выглядит достаточно надежной для диагностики денежной устойчивости, но все равно не заменяет полноценную систему финансового учета.',
  'Средняя':
    'Сейчас это полезная ориентировочная оценка денежной устойчивости. Её достаточно, чтобы увидеть общие риски, но не для точного управленческого учёта.',
  'Ниже обычной':
    'Сейчас оценка построена по упрощённой модели и даёт скорее ориентир, чем точную финансовую картину. Это нормально для быстрой диагностики по выписке, но часть операций не удалось определить достаточно надёжно.',
}

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: ${({ theme }) => theme.colors.muted};
`

export function Screen5Dashboard(): JSX.Element {
  const { state, setScreen } = useApp()
  const r = state.engineResult
  const answers = state.questionnaire
  const theme = useTheme()
  const submittedRef = useRef(false)

  useEffect(() => {
    if (!r || submittedRef.current) return
    submittedRef.current = true

    const periodStart = fmtPeriod(r.periodStart)
    const periodEnd = fmtPeriod(r.periodEnd)

    const payload = {
      form: 'Диагностика бизнеса',
      'ID сессии': state.sessionId,
      'Дата': new Date().toLocaleDateString('ru-RU'),
      'Тип бизнеса': answers.businessType ?? '—',
      'Остаток на счетах': answers.cashNow ? fmtRub(answers.cashNow) : '—',
      'Полнота счетов': answers.coverageLevel ?? '—',
      'Волатильность': answers.volatility ?? '—',
      'Кредиты': answers.creditLoad ?? '—',
      'Сезонность': answers.seasonality ?? '—',
      'Период выписок': `${periodStart} — ${periodEnd}`,
      'Всего операций': String(r.totalCount),
      'Индекс устойчивости': `${r.cashResilienceScore} / 100`,
      'Hard Survival': fmtMo(r.hardSurvivalMonths),
      'Stress Survival': fmtMo(r.stressSurvivalMonths),
      'Риск разрывов': r.cashGapRisk,
      'Рекомендуемая подушка': `${r.targetReserveMonths} мес. / ${fmtRub(r.targetReserveAmount)}`,
      'Плохих месяцев': `${r.badMonthCount} из ${r.totalMonthCount}`,
      'Top-1 плательщик': fmtPct(r.top1PayerShare),
      'Top-3 плательщика': fmtPct(r.top3PayerShare),
      'Точность': r.confidenceLevel,
      'UTM Source': state.utmParams.utm_source,
      'UTM Medium': state.utmParams.utm_medium,
      'UTM Campaign': state.utmParams.utm_campaign,
      'Реферер': state.utmParams.referrer,
    }

    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => { /* silent fail */ })
  }, [r, state, answers])

  if (!r) {
    return (
      <EmptyState>
        <h2>Нет данных для отображения</h2>
        <button onClick={() => setScreen('landing')} style={{ marginTop: 16, color: '#3B82F6', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
          Начать заново
        </button>
      </EmptyState>
    )
  }

  const cashNow = answers.cashNow ?? 0
  const maxBarValue = Math.max(cashNow, r.targetReserveAmount, 1)
  const cashBarPct = (cashNow / maxBarValue) * 100
  const targetBarPct = (r.targetReserveAmount / maxBarValue) * 100

  const worstWeek = r.weeklyPattern.reduce((a, b) =>
    a.avgNetFlow < b.avgNetFlow ? a : b,
  )

  const monthlyData = r.monthlyStats.map((m) => ({
    label: m.label,
    value: m.netFlow,
    fill: m.isNegative ? theme.colors.red : theme.colors.green,
  }))

  const weeklyData = r.weeklyPattern.map((w) => ({
    label: w.label,
    value: w.avgNetFlow,
    fill: w.avgNetFlow < 0 ? theme.colors.red : theme.colors.blue,
  }))

  const pieData = r.topPayers.slice(0, 4).map((p, i) => ({
    name: p.counterparty.length > 20 ? p.counterparty.slice(0, 18) + '…' : p.counterparty,
    value: p.totalInflow,
  }))
  const otherShare = 1 - r.top3PayerShare
  if (otherShare > 0.01) {
    pieData.push({ name: 'Остальные', value: otherShare * 10000000 })
  }

  const PIE_COLORS = [theme.colors.blue, '#60A5FA', '#93C5FD', '#BFDBFE', theme.colors.muted]

  const recommendations = buildRecommendations(r, { cashNow })

  const nonTransfer = r.transactions.filter((tx) => !tx.isTransfer && !tx.isDuplicate)
  const unknownPct = nonTransfer.length > 0
    ? (nonTransfer.filter((tx) => tx.class === 'unknown').length / nonTransfer.length) * 100
    : 0

  return (
    <Page>
      <TopBar>
        <div>
          <PageTitle>Диагностика денежной устойчивости</PageTitle>
          <MetaInfo>
            {fmtPeriod(r.periodStart)} — {fmtPeriod(r.periodEnd)} · {r.totalCount.toLocaleString('ru-RU')} операций
            {r.duplicateCount > 0 ? ` · ${r.duplicateCount} дубликатов исключено` : ''}
          </MetaInfo>
        </div>
        <button
          onClick={() => setScreen('landing')}
          style={{ background: 'none', color: '#9CA3AF', fontSize: '0.875rem', border: '1px solid #1f2d45', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Новая диагностика
        </button>
      </TopBar>

      {/* TOP METRICS */}
      <TopMetrics>
        <MetricCard>
          <MetricLabel>Индекс устойчивости</MetricLabel>
          <ResilienceGauge score={r.cashResilienceScore} />
          <MetricSub>из 100 баллов</MetricSub>
        </MetricCard>

        <MetricCard>
          <MetricLabel>Hard Survival</MetricLabel>
          <MetricValue>{fmtMo(r.hardSurvivalMonths)}</MetricValue>
          <MetricSub>без новых поступлений</MetricSub>
        </MetricCard>

        <MetricCard style={{ border: `1px solid ${theme.colors.blue}44`, boxShadow: theme.shadow.glow }}>
          <MetricLabel>Stress Survival</MetricLabel>
          <MetricValue style={{ color: r.stressSurvivalMonths < 2 ? theme.colors.red : r.stressSurvivalMonths < 4 ? theme.colors.amber : theme.colors.green }}>
            {fmtMo(r.stressSurvivalMonths)}
          </MetricValue>
          <MetricSub>при слабых поступлениях</MetricSub>
        </MetricCard>

        <MetricCard>
          <MetricLabel>Риск кассовых разрывов</MetricLabel>
          <RiskBadge risk={r.cashGapRisk}>{r.cashGapRisk}</RiskBadge>
          <MetricSub style={{ marginTop: 8 }}>{r.cashGapRisk === 'Низкий' ? 'Всё под контролем' : r.cashGapRisk === 'Средний' ? 'Стоит следить' : 'Требует внимания'}</MetricSub>
        </MetricCard>
      </TopMetrics>

      {/* SURVIVAL */}
      <Section>
        <SectionHeader>
          <SectionTitle>На сколько хватит денег</SectionTitle>
        </SectionHeader>
        <SectionCard>
          <InfoText>
            Если новые деньги перестанут приходить, текущего остатка хватит примерно на{' '}
            <HighlightValue>{fmtMo(r.hardSurvivalMonths)}</HighlightValue>
            {r.hardSurvivalMonths >= 99 ? ' (расходы не определены)' : ''}.
          </InfoText>
          <InfoText>
            В слабом сценарии поступлений (худший квартиль) бизнес выдержит примерно{' '}
            <HighlightValue style={{ color: r.stressSurvivalMonths < 2 ? theme.colors.red : r.stressSurvivalMonths < 4 ? theme.colors.amber : theme.colors.green }}>
              {r.stressSurvivalMonths >= 99 ? 'покрывает ядро даже при слабом сценарии' : fmtMo(r.stressSurvivalMonths)}
            </HighlightValue>.
          </InfoText>
          {r.usedFallback && (
            <InfoText style={{ color: theme.colors.amber, fontSize: '0.85rem' }}>
              ⚠ Постоянные расходы определены по упрощённой модели (использован медианный расход × 0.6).
            </InfoText>
          )}
        </SectionCard>
      </Section>

      {/* BUFFER */}
      <Section>
        <SectionHeader>
          <SectionTitle>Какая нужна подушка</SectionTitle>
        </SectionHeader>
        <SectionCard>
          <InfoText>
            Рекомендуемый запас: <HighlightValue>{r.targetReserveMonths} мес.</HighlightValue> = <HighlightValue>{fmtRub(r.targetReserveAmount)}</HighlightValue>
          </InfoText>

          <div style={{ marginTop: 20 }}>
            <BufferRow>
              <BufferLabel>Сейчас на счетах</BufferLabel>
              <BarBg>
                <BarFill width={cashBarPct} color={cashNow >= r.targetReserveAmount ? theme.colors.green : theme.colors.amber} />
              </BarBg>
              <BarValue>{fmtRub(cashNow)}</BarValue>
            </BufferRow>
            <BufferRow>
              <BufferLabel>Рекомендуемая</BufferLabel>
              <BarBg>
                <BarFill width={targetBarPct} color={theme.colors.blue} />
              </BarBg>
              <BarValue>{fmtRub(r.targetReserveAmount)}</BarValue>
            </BufferRow>
          </div>
        </SectionCard>
      </Section>

      {/* RECURRING */}
      {r.recurringExpenses.length > 0 && (
        <Section>
          <SectionHeader>
            <SectionTitle>Что сильнее всего давит на деньги</SectionTitle>
          </SectionHeader>
          <SectionCard style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <thead>
                  <tr>
                    <Th>Контрагент / категория</Th>
                    <Th>Медиана</Th>
                    <Th>Интервал</Th>
                    <Th>Раз</Th>
                    <Th>Точность</Th>
                  </tr>
                </thead>
                <tbody>
                  {r.recurringExpenses.slice(0, 12).map((item) => (
                    <tr key={item.normalizedCounterparty}>
                      <Td>
                        <div style={{ fontWeight: 500 }}>{item.originalCounterparty || '—'}</div>
                        <div style={{ fontSize: '0.78rem', color: theme.colors.muted }}>{item.category}</div>
                      </Td>
                      <Td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                        {fmtRub(item.medianAmount)}
                      </Td>
                      <Td style={{ color: theme.colors.muted, fontSize: '0.85rem' }}>
                        {item.avgIntervalDays > 0 ? `~${Math.round(item.avgIntervalDays)} дн.` : '—'}
                      </Td>
                      <Td style={{ fontFamily: 'JetBrains Mono, monospace', color: theme.colors.muted }}>
                        {item.occurrences}×
                      </Td>
                      <Td>
                        <ConfidenceDot level={item.confidence} />
                        {item.confidence === 'high' ? 'Высокая' : item.confidence === 'medium' ? 'Средняя' : 'Низкая'}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div style={{ padding: '16px 24px', borderTop: `1px solid ${theme.colors.cardBorder}`, display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: theme.colors.muted }}>Итого постоянные расходы в месяц:</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: theme.colors.white }}>
                {fmtRub(r.essentialRecurringOutflow)}
              </span>
            </div>
          </SectionCard>
        </Section>
      )}

      {/* CASH GAP MAP */}
      <Section>
        <SectionHeader>
          <SectionTitle>Где кассовые ямы</SectionTitle>
        </SectionHeader>
        <SectionCard>
          <InfoText>
            Чаще всего напряжение возникает в <HighlightValue>{worstWeek.label}</HighlightValue> месяца
            (средний денежный поток: <HighlightValue style={{ color: worstWeek.avgNetFlow < 0 ? theme.colors.red : theme.colors.green }}>{fmtRub(worstWeek.avgNetFlow)}</HighlightValue>).
          </InfoText>
          <div style={{ marginTop: 20, height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.cardBorder} vertical={false} />
                <XAxis dataKey="label" tick={{ fill: theme.colors.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: theme.colors.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: 8 }}
                  labelStyle={{ color: theme.colors.white }}
                  formatter={(value: number) => [fmtRub(value), 'Ср. поток']}
                />
                <ReferenceLine y={0} stroke={theme.colors.cardBorder} />
                <Bar dataKey="value">
                  {weeklyData.map((entry, index) => (
                    <Cell key={`wk-${index}`} fill={entry.fill} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </Section>

      {/* CONCENTRATION */}
      <Section>
        <SectionHeader>
          <SectionTitle>Зависимость от крупных плательщиков</SectionTitle>
        </SectionHeader>
        <SectionCard>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <InfoText>
                Доля топ-1 плательщика: <HighlightValue style={{ color: r.top1PayerShare > 0.4 ? theme.colors.red : r.top1PayerShare > 0.25 ? theme.colors.amber : theme.colors.green }}>{fmtPct(r.top1PayerShare)}</HighlightValue>
              </InfoText>
              <InfoText>
                Доля топ-3 плательщиков: <HighlightValue>{fmtPct(r.top3PayerShare)}</HighlightValue>
              </InfoText>
            </div>
            {pieData.length > 0 && (
              <div style={{ flex: 1, minWidth: 200, height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`pie-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: 8 }}
                      formatter={(value: number, name: string) => [name, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </SectionCard>
      </Section>

      {/* BAD MONTHS */}
      <Section>
        <SectionHeader>
          <SectionTitle>Плохие месяцы</SectionTitle>
        </SectionHeader>
        <SectionCard>
          <InfoText>
            <HighlightValue style={{ color: r.badMonthRate > 0.3 ? theme.colors.red : r.badMonthRate > 0.15 ? theme.colors.amber : theme.colors.green }}>
              {r.badMonthCount} из {r.totalMonthCount}
            </HighlightValue>{' '}
            месяцев были отрицательными по денежному потоку.
          </InfoText>
          {monthlyData.length > 0 && (
            <div style={{ marginTop: 20, height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} barSize={Math.max(8, Math.min(24, 280 / monthlyData.length))}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.cardBorder} vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: theme.colors.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: 8 }}
                    labelStyle={{ color: theme.colors.white }}
                    formatter={(value: number) => [fmtRub(value), 'Чистый поток']}
                  />
                  <ReferenceLine y={0} stroke={theme.colors.cardBorder} />
                  <Bar dataKey="value">
                    {monthlyData.map((entry, index) => (
                      <Cell key={`mo-${index}`} fill={entry.fill} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </SectionCard>
      </Section>

      {/* CONFIDENCE */}
      <Section>
        <SectionHeader>
          <SectionTitle>Точность оценки</SectionTitle>
        </SectionHeader>
        <SectionCard>
          <ConfidenceBadge level={r.confidenceLevel}>{r.confidenceLevel}</ConfidenceBadge>
          <InfoText>{CONFIDENCE_TEXTS[r.confidenceLevel]}</InfoText>
          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontSize: '0.83rem', color: theme.colors.muted }}>
              Период: <span style={{ color: theme.colors.white }}>{r.periodMonths} мес.</span>
            </div>
            <div style={{ fontSize: '0.83rem', color: theme.colors.muted }}>
              Нераспознанных операций: <span style={{ color: unknownPct > 25 ? theme.colors.red : unknownPct > 10 ? theme.colors.amber : theme.colors.green }}>{unknownPct.toFixed(0)}%</span>
            </div>
            <div style={{ fontSize: '0.83rem', color: theme.colors.muted }}>
              Покрытие счетов: <span style={{ color: theme.colors.white }}>{r.confidenceFactors.coverageComplete ? 'Полное' : 'Частичное'}</span>
            </div>
          </div>
        </SectionCard>
      </Section>

      {/* RECOMMENDATIONS */}
      <Section>
        <SectionHeader>
          <SectionTitle>Что делать дальше</SectionTitle>
        </SectionHeader>
        <RecoList>
          {recommendations.map((rec, i) => (
            <RecoItem key={i}>{rec}</RecoItem>
          ))}
        </RecoList>
      </Section>

      {/* PROMO */}
      <Section>
        <SectionHeader>
          <SectionTitle>Хотите точнее?</SectionTitle>
        </SectionHeader>
        <TwoCards>
          <PromoCard>
            <PromoTitle>Без ручной разметки</PromoTitle>
            <PromoDesc>Попробуйте сервис Аналитика от Точка банка — автоматически классифицирует операции и строит финансовые отчёты.</PromoDesc>
            <PromoBtn href="#">Перейти в Аналитику</PromoBtn>
          </PromoCard>
          <PromoCard>
            <PromoTitle>Максимальная точность</PromoTitle>
            <PromoDesc>Для этого потребуется ручная разметка операций в Adesk — полноценный управленческий учёт.</PromoDesc>
            <PromoBtn href="#">Перейти в Adesk</PromoBtn>
          </PromoCard>
        </TwoCards>
      </Section>
    </Page>
  )
}
