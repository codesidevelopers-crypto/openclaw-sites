import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useApp } from '../context/AppContext'
import type { QuestionnaireAnswers } from '../engine/types'

const fadeUp = keyframes`from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}`
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`

const Page = styled.div`
  min-height: 100vh;
  padding: 48px 24px 80px;
  max-width: 700px;
  margin: 0 auto;
  animation: ${fadeIn} 0.4s ease;
`

const ProgressBar = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 100px;
  height: 4px;
  margin-bottom: 48px;
  overflow: hidden;
`

interface ProgressFillProps {
  pct: number
}
const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.blue}, ${({ theme }) => theme.colors.green});
  border-radius: 100px;
  width: ${({ pct }) => pct}%;
  transition: width 0.5s ease;
`

const StepLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 8px;
`

const QuestionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 32px;
  animation: ${fadeUp} 0.4s ease;
`

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
`

interface OptionBtnProps {
  selected: boolean
}

const OptionBtn = styled.button<OptionBtnProps>`
  width: 100%;
  text-align: left;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1.5px solid ${({ theme, selected }) => selected ? theme.colors.blue : theme.colors.cardBorder};
  background: ${({ theme, selected }) =>
    selected ? 'rgba(59,130,246,0.1)' : theme.colors.card};
  color: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.muted};
  font-size: 0.95rem;
  font-weight: ${({ selected }) => selected ? '600' : '400'};
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${fadeUp} 0.4s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue}88;
    color: ${({ theme }) => theme.colors.white};
  }

  &::before {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1.5px solid ${({ theme, selected }) => selected ? theme.colors.blue : theme.colors.cardBorder};
    background: ${({ theme, selected }) => selected ? theme.colors.blue : 'transparent'};
    background-image: ${({ selected }) =>
      selected
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M2 5l2 2 4-4' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`
        : 'none'};
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.15s;
  }
`

const NumericInput = styled.div`
  position: relative;
  margin-bottom: 40px;

  input {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 1.5rem;
    font-weight: 600;
    padding: 20px 72px 20px 20px;
    background: ${({ theme }) => theme.colors.card};
    border: 1.5px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: ${({ theme }) => theme.radius.md};
    color: ${({ theme }) => theme.colors.white};
    &:focus { border-color: ${({ theme }) => theme.colors.blue}; }
  }
`

const CurrencyLabel = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

const BackBtn = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
  padding: 14px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transition: all 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.white}; border-color: ${({ theme }) => theme.colors.muted}; }
`

interface NextBtnProps {
  disabled?: boolean
}
const NextBtn = styled.button<NextBtnProps>`
  background: ${({ theme, disabled }) => disabled ? theme.colors.cardBorder : theme.colors.blue};
  color: ${({ disabled }) => disabled ? '#6B7280' : '#fff'};
  font-size: 1rem;
  font-weight: 600;
  padding: 14px 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all 0.2s;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  &:hover:not(:disabled) { opacity: 0.9; }
`

interface Question {
  id: keyof QuestionnaireAnswers
  text: string
  type: 'numeric' | 'radio'
  options?: { value: string; label: string }[]
}

const QUESTIONS: Question[] = [
  {
    id: 'cashNow',
    text: 'Сколько денег сейчас доступно в бизнесе на всех счетах?',
    type: 'numeric',
  },
  {
    id: 'coverageLevel',
    text: 'Вы загрузили выписки по всем основным счетам бизнеса?',
    type: 'radio',
    options: [
      { value: 'all', label: 'Да, по всем' },
      { value: 'most', label: 'По большинству' },
      { value: 'partial', label: 'Только по части счетов' },
    ],
  },
  {
    id: 'businessType',
    text: 'Чем занимается бизнес?',
    type: 'radio',
    options: [
      { value: 'services', label: 'Услуги' },
      { value: 'trade', label: 'Торговля' },
      { value: 'manufacturing', label: 'Производство' },
      { value: 'construction', label: 'Стройка / проектный бизнес' },
      { value: 'it', label: 'IT / digital' },
      { value: 'transport', label: 'Грузоперевозки' },
      { value: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'volatility',
    text: 'Поступления у бизнеса скорее:',
    type: 'radio',
    options: [
      { value: 'stable', label: 'Скорее стабильные' },
      { value: 'moderate', label: 'Умеренно волатильные' },
      { value: 'high', label: 'Сильно зависят от крупных сделок / сезонности' },
    ],
  },
  {
    id: 'creditLoad',
    text: 'Есть ли кредиты / лизинг / займы?',
    type: 'radio',
    options: [
      { value: 'none', label: 'Нет' },
      { value: 'comfortable', label: 'Да, но нагрузка комфортная' },
      { value: 'pressure', label: 'Да, чувствуется давление' },
      { value: 'heavy', label: 'Да, сильно давят' },
    ],
  },
  {
    id: 'seasonality',
    text: 'Есть ли у бизнеса выраженная сезонность?',
    type: 'radio',
    options: [
      { value: 'none', label: 'Нет' },
      { value: 'moderate', label: 'Есть умеренная' },
      { value: 'strong', label: 'Есть сильная' },
    ],
  },
]

function formatNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function Screen3Questionnaire(): JSX.Element {
  const { state, setScreen, setQuestionnaire } = useApp()
  const [step, setStep] = useState(0)
  const [numericValue, setNumericValue] = useState('')

  const q = QUESTIONS[step]
  const currentAnswer = state.questionnaire[q.id]

  const canAdvance =
    q.type === 'numeric' ? numericValue.replace(/\s/g, '').length > 0 : currentAnswer !== undefined

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatNumber(e.target.value)
    setNumericValue(formatted)
    const numVal = Number(formatted.replace(/\s/g, ''))
    if (!isNaN(numVal)) {
      setQuestionnaire({ cashNow: numVal })
    }
  }

  const handleOption = (value: string): void => {
    setQuestionnaire({ [q.id]: value } as Partial<QuestionnaireAnswers>)
  }

  const handleNext = (): void => {
    if (!canAdvance) return
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
      setNumericValue('')
    } else {
      setScreen('processing')
    }
  }

  const handleBack = (): void => {
    if (step === 0) setScreen('upload')
    else setStep(step - 1)
  }

  const pct = ((step + 1) / QUESTIONS.length) * 100

  return (
    <Page>
      <ProgressBar>
        <ProgressFill pct={pct} />
      </ProgressBar>

      <StepLabel>Вопрос {step + 1} из {QUESTIONS.length}</StepLabel>
      <QuestionTitle key={step}>{q.text}</QuestionTitle>

      {q.type === 'numeric' && (
        <NumericInput>
          <input
            type="text"
            inputMode="numeric"
            value={numericValue}
            onChange={handleNumericChange}
            placeholder="1 000 000"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          />
          <CurrencyLabel>₽</CurrencyLabel>
        </NumericInput>
      )}

      {q.type === 'radio' && q.options && (
        <OptionsGrid>
          {q.options.map((opt) => (
            <OptionBtn
              key={opt.value}
              selected={currentAnswer === opt.value}
              onClick={() => handleOption(opt.value)}
            >
              {opt.label}
            </OptionBtn>
          ))}
        </OptionsGrid>
      )}

      <ButtonRow>
        <BackBtn onClick={handleBack}>← Назад</BackBtn>
        <NextBtn
          onClick={handleNext}
          disabled={!canAdvance}
        >
          {step === QUESTIONS.length - 1 ? 'Рассчитать' : 'Далее →'}
        </NextBtn>
      </ButtonRow>
    </Page>
  )
}
