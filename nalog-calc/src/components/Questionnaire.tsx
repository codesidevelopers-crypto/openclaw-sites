import React, { useState, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import type { FormData } from '../types'
import { formatMoney, parseMoneyInput } from '../utils/format'
import { REGIONS } from '../utils/regions'

interface QuestionnaireProps {
  onBack: () => void
  onComplete: (data: FormData) => void
}

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(28px); }
  to { opacity: 1; transform: translateX(0); }
`

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
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

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }
`

const ProgressSection = styled.div`
  padding: 20px 40px 0;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 20px 0;
  }
`

const ProgressMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const ProgressLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: 0.05em;
`

const ProgressCount = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ProgressTrack = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.accentHover} 100%);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 120px;
`

const StepBox = styled.div`
  width: 100%;
  max-width: 720px;
  animation: ${slideIn} 0.35s ease both;
`

const QuestionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 16px;
`

const QuestionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.25;
  margin-bottom: 12px;
`

const QuestionHint = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 36px;
  max-width: 600px;
`

const OptionGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols ?? 2}, 1fr);
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const OptionCard = styled.button<{ $selected: boolean; $color?: string }>`
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 2px solid ${({ $selected, $color, theme }) =>
    $selected ? ($color ?? theme.colors.accent) : theme.colors.border};
  background: ${({ $selected, $color, theme }) =>
    $selected
      ? `${$color ?? theme.colors.accent}15`
      : theme.colors.card};
  text-align: left;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ $color, theme }) => $color ?? theme.colors.accent};
    background: ${({ $color, theme }) => `${$color ?? theme.colors.accent}10`};
    transform: translateY(-1px);
  }
`

const OptionTitle = styled.div<{ $selected: boolean; $color?: string }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ $selected, $color, theme }) =>
    $selected ? ($color ?? theme.colors.accent) : theme.colors.text};
  margin-bottom: 6px;
  transition: color ${({ theme }) => theme.transitions.fast};
`

const OptionDesc = styled.div`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`

const SliderSection = styled.div`
  margin-bottom: 8px;
`

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`

const MoneyInput = styled.input`
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 14px 16px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  text-align: right;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 400;
  }
`

const CurrencyLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
`

const PresetRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`

const PresetBtn = styled.button<{ $active: boolean }>`
  padding: 7px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.accent : theme.colors.border};
  background: ${({ $active, theme }) => $active ? theme.colors.accentDim : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.accent : theme.colors.textSecondary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`

const PercentDisplay = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const PercentValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
`

const PercentAbsolute = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

const EmployeePicker = styled.div`
  margin-bottom: 28px;
`

const CounterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
`

const CounterBtn = styled.button<{ $variant: 'minus' | 'plus' }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &:hover {
    border-color: ${({ $variant, theme }) =>
      $variant === 'plus' ? theme.colors.accent : theme.colors.red};
    color: ${({ $variant, theme }) =>
      $variant === 'plus' ? theme.colors.accent : theme.colors.red};
    background: ${({ $variant, theme }) =>
      $variant === 'plus' ? theme.colors.accentDim : theme.colors.redDim};
  }
`

const CounterValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  min-width: 60px;
  text-align: center;
`

const PayrollSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
  margin-top: 20px;
`

const PayrollLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 12px;
  line-height: 1.4;
`

const SelectWrapper = styled.div`
  position: relative;

  &::after {
    content: '▾';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textMuted};
    pointer-events: none;
    font-size: 0.9rem;
  }
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 16px 44px 16px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  appearance: none;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }

  option {
    background: ${({ theme }) => theme.colors.card};
  }
`

const RegionHint = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 10px;
  line-height: 1.5;
`

const NavRow = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 40px;
  background: rgba(6,12,24,0.95);
  backdrop-filter: blur(16px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 20px;
  }
`

const PrevBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderLight};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }
`

const NextBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accent};
  color: #030810;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 4px 20px rgba(0,212,168,0.2);

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    box-shadow: 0 6px 28px rgba(0,212,168,0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.goldDim};
  border: 1px solid rgba(255,184,48,0.25);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 14px 18px;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.gold};
  line-height: 1.5;
  margin-top: 16px;
`

const REVENUE_PRESETS: Array<{ label: string; value: number }> = [
  { label: 'Фрилансер', value: 600_000 },
  { label: 'До 1 млн', value: 1_000_000 },
  { label: '3 млн', value: 3_000_000 },
  { label: '10 млн', value: 10_000_000 },
  { label: '50 млн', value: 50_000_000 },
  { label: '200 млн', value: 200_000_000 },
]

function sliderToRevenue(val: number): number {
  if (val === 0) return 0
  const logMin = Math.log10(50_000)
  const logMax = Math.log10(300_000_000)
  const logVal = logMin + (val / 100) * (logMax - logMin)
  const raw = Math.pow(10, logVal)
  return Math.round(raw / 10_000) * 10_000
}

function revenueToSlider(rev: number): number {
  if (rev <= 0) return 0
  const logMin = Math.log10(50_000)
  const logMax = Math.log10(300_000_000)
  const logVal = Math.log10(Math.max(rev, 50_000))
  return Math.round(((logVal - logMin) / (logMax - logMin)) * 100)
}

const TOTAL_STEPS = 6

const DEFAULT_FORM: FormData = {
  businessType: 'ip',
  revenue: 3_000_000,
  expenses: 900_000,
  employees: 0,
  payroll: 0,
  vatImportant: false,
  region: 'Москва',
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(DEFAULT_FORM)

  const update = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handlePrev = (): void => {
    if (step > 1) setStep((s) => s - 1)
    else onBack()
  }

  const handleNext = (): void => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1)
    else onComplete(form)
  }

  const isLastStep = step === TOTAL_STEPS
  const progressPct = (step / TOTAL_STEPS) * 100

  const expensePct = form.revenue > 0 ? Math.round((form.expenses / form.revenue) * 100) : 0

  return (
    <Page>
      <TopBar>
        <Logo>Налог<span>Калькулятор</span></Logo>
        <BackBtn onClick={handlePrev}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Назад
        </BackBtn>
      </TopBar>

      <ProgressSection>
        <ProgressMeta>
          <ProgressLabel>Вопрос {step}</ProgressLabel>
          <ProgressCount>{step} из {TOTAL_STEPS}</ProgressCount>
        </ProgressMeta>
        <ProgressTrack>
          <ProgressFill $pct={progressPct} />
        </ProgressTrack>
      </ProgressSection>

      <Main>
        <StepBox key={step}>

          {/* === STEP 1: Business Type === */}
          {step === 1 && (
            <>
              <QuestionLabel>Вопрос 1 из 6</QuestionLabel>
              <QuestionTitle>Какая у вас форма бизнеса?</QuestionTitle>
              <QuestionHint>
                От формы зависят доступные режимы и правила расчёта взносов.
              </QuestionHint>
              <OptionGrid $cols={2}>
                <OptionCard
                  $selected={form.businessType === 'ip'}
                  onClick={() => update('businessType', 'ip')}
                >
                  <OptionTitle $selected={form.businessType === 'ip'}>🧑‍💼 ИП</OptionTitle>
                  <OptionDesc>Индивидуальный предприниматель. Доступны все режимы, включая патент.</OptionDesc>
                </OptionCard>
                <OptionCard
                  $selected={form.businessType === 'ooo'}
                  onClick={() => update('businessType', 'ooo')}
                >
                  <OptionTitle $selected={form.businessType === 'ooo'}>🏢 ООО</OptionTitle>
                  <OptionDesc>Общество с ограниченной ответственностью. Без патента, нет личных взносов.</OptionDesc>
                </OptionCard>
              </OptionGrid>
            </>
          )}

          {/* === STEP 2: Revenue === */}
          {step === 2 && (
            <>
              <QuestionLabel>Вопрос 2 из 6</QuestionLabel>
              <QuestionTitle>Примерная выручка за год?</QuestionTitle>
              <QuestionHint>
                Все поступления от продажи товаров, услуг, работ — до вычета расходов.
              </QuestionHint>
              <SliderSection>
                <SliderRow>
                  <MoneyInput
                    type="text"
                    value={formatMoney(form.revenue)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const val = parseMoneyInput(e.target.value)
                      update('revenue', Math.min(val, 300_000_000))
                    }}
                    placeholder="0"
                  />
                  <CurrencyLabel>₽</CurrencyLabel>
                </SliderRow>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={revenueToSlider(form.revenue)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    update('revenue', sliderToRevenue(parseInt(e.target.value, 10)))
                  }}
                />
                <PresetRow>
                  {REVENUE_PRESETS.map((p) => (
                    <PresetBtn
                      key={p.value}
                      $active={form.revenue === p.value}
                      onClick={() => update('revenue', p.value)}
                    >
                      {p.label}
                    </PresetBtn>
                  ))}
                </PresetRow>
              </SliderSection>
            </>
          )}

          {/* === STEP 3: Expenses === */}
          {step === 3 && (
            <>
              <QuestionLabel>Вопрос 3 из 6</QuestionLabel>
              <QuestionTitle>Примерные расходы за год?</QuestionTitle>
              <QuestionHint>
                Аренда, закупки, зарплаты, реклама — всё, что тратит ваш бизнес. Без страховых взносов ИП.
              </QuestionHint>
              <PercentDisplay>
                <span style={{ color: '#4D6480', fontSize: '0.875rem' }}>
                  {formatMoney(form.expenses)} ₽
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#4D6480' }}>от выручки:</span>
                  <PercentValue>{expensePct}%</PercentValue>
                </div>
              </PercentDisplay>
              <input
                type="range"
                min={0}
                max={100}
                value={expensePct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const pct = parseInt(e.target.value, 10)
                  update('expenses', Math.round(form.revenue * pct / 100))
                }}
              />
              <PresetRow>
                {[
                  { label: 'Почти нет (10%)', pct: 10 },
                  { label: 'Средние (40%)', pct: 40 },
                  { label: 'Большие (70%)', pct: 70 },
                ].map((p) => (
                  <PresetBtn
                    key={p.pct}
                    $active={expensePct === p.pct}
                    onClick={() => update('expenses', Math.round(form.revenue * p.pct / 100))}
                  >
                    {p.label}
                  </PresetBtn>
                ))}
              </PresetRow>
              {expensePct > 60 && (
                <InfoBox>
                  💡 При расходах более 60% от выручки УСН 15% может быть выгоднее УСН 6%.
                </InfoBox>
              )}
            </>
          )}

          {/* === STEP 4: Employees === */}
          {step === 4 && (
            <>
              <QuestionLabel>Вопрос 4 из 6</QuestionLabel>
              <QuestionTitle>Сколько у вас сотрудников?</QuestionTitle>
              <QuestionHint>
                Количество работников влияет на доступность режимов и размер страховых взносов.
              </QuestionHint>
              <EmployeePicker>
                <CounterRow>
                  <CounterBtn
                    $variant="minus"
                    onClick={() => update('employees', Math.max(0, form.employees - 1))}
                  >−</CounterBtn>
                  <CounterValue>{form.employees}</CounterValue>
                  <CounterBtn
                    $variant="plus"
                    onClick={() => update('employees', form.employees + 1)}
                  >+</CounterBtn>
                  <div style={{ fontSize: '0.875rem', color: '#8FACC8' }}>
                    {form.employees === 0 ? 'только я' : form.employees === 1 ? 'сотрудник' : form.employees < 5 ? 'сотрудника' : 'сотрудников'}
                  </div>
                </CounterRow>
                <OptionGrid $cols={3}>
                  {[
                    { label: '0 — только я', value: 0 },
                    { label: '1–5', value: 3 },
                    { label: '6–15', value: 10 },
                    { label: '16–100', value: 50 },
                    { label: '100+', value: 100 },
                  ].map((o) => (
                    <OptionCard
                      key={o.label}
                      $selected={form.employees === o.value}
                      onClick={() => {
                        update('employees', o.value)
                        if (o.value > 0 && form.payroll === 0) {
                          update('payroll', 50_000)
                        }
                      }}
                    >
                      <OptionTitle $selected={form.employees === o.value}>{o.label}</OptionTitle>
                    </OptionCard>
                  ))}
                </OptionGrid>
              </EmployeePicker>

              {form.employees > 0 && (
                <PayrollSection>
                  <PayrollLabel>
                    Зарплатный фонд в месяц (на всех сотрудников суммарно):
                  </PayrollLabel>
                  <SliderRow>
                    <MoneyInput
                      type="text"
                      value={formatMoney(form.payroll)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = parseMoneyInput(e.target.value)
                        update('payroll', Math.min(val, 100_000_000))
                      }}
                      placeholder="0"
                    />
                    <CurrencyLabel>₽/мес</CurrencyLabel>
                  </SliderRow>
                  <PresetRow>
                    {[
                      { label: '50 000', value: 50_000 },
                      { label: '150 000', value: 150_000 },
                      { label: '500 000', value: 500_000 },
                    ].map((p) => (
                      <PresetBtn
                        key={p.value}
                        $active={form.payroll === p.value}
                        onClick={() => update('payroll', p.value)}
                      >
                        {p.label} ₽
                      </PresetBtn>
                    ))}
                  </PresetRow>
                </PayrollSection>
              )}
            </>
          )}

          {/* === STEP 5: VAT === */}
          {step === 5 && (
            <>
              <QuestionLabel>Вопрос 5 из 6</QuestionLabel>
              <QuestionTitle>Контрагентам нужен НДС?</QuestionTitle>
              <QuestionHint>
                Если ваши клиенты — крупные компании на ОСНО, им может быть важно получать счета-фактуры с НДС.
                УСН и патент не предусматривают работу с НДС.
              </QuestionHint>
              <OptionGrid $cols={2}>
                <OptionCard
                  $selected={form.vatImportant}
                  $color={form.vatImportant ? '#FF6B6B' : undefined}
                  onClick={() => update('vatImportant', true)}
                >
                  <OptionTitle $selected={form.vatImportant} $color="#FF6B6B">
                    ⚠️ Да, это важно
                  </OptionTitle>
                  <OptionDesc>Мои клиенты — крупные компании, им нужны счета-фактуры с НДС.</OptionDesc>
                </OptionCard>
                <OptionCard
                  $selected={!form.vatImportant}
                  onClick={() => update('vatImportant', false)}
                >
                  <OptionTitle $selected={!form.vatImportant}>
                    ✅ Нет, не важно
                  </OptionTitle>
                  <OptionDesc>Работаю с физлицами или малым бизнесом — НДС не нужен.</OptionDesc>
                </OptionCard>
              </OptionGrid>
              {form.vatImportant && (
                <InfoBox style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)', color: '#FF6B6B' }}>
                  ⚠️ Если НДС критичен для клиентов, стоит рассмотреть ОСНО — только этот режим позволяет выставлять НДС в полноценном режиме.
                </InfoBox>
              )}
            </>
          )}

          {/* === STEP 6: Region === */}
          {step === 6 && (
            <>
              <QuestionLabel>Вопрос 6 из 6</QuestionLabel>
              <QuestionTitle>В каком регионе работаете?</QuestionTitle>
              <QuestionHint>
                Регион влияет на стоимость патента. Для расчёта патента используется потенциальный доход по региону.
              </QuestionHint>
              <SelectWrapper>
                <StyledSelect
                  value={form.region}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('region', e.target.value)}
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </StyledSelect>
              </SelectWrapper>
              <RegionHint>
                По умолчанию выбрана Москва. Если вашего региона нет в списке — выберите ближайший.
              </RegionHint>
            </>
          )}

        </StepBox>
      </Main>

      <NavRow>
        <PrevBtn onClick={handlePrev}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Назад
        </PrevBtn>
        <NextBtn onClick={handleNext}>
          {isLastStep ? 'Рассчитать' : 'Далее'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </NextBtn>
      </NavRow>
    </Page>
  )
}

export default Questionnaire
