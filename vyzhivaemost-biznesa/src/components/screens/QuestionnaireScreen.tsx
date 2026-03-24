import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useApp } from '../../context/AppContext'
import type { QuestionnaireAnswers, BusinessType, AccountsCoverage, IncomeStability, DebtLevel, Seasonality } from '../../engine/types'

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
`

const slideOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(-32px); }
`

const Page = styled.div`
  min-height: 100vh;
  padding: 80px 24px;
  max-width: 680px;
  margin: 0 auto;
`

const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
`

const ProgressBar = styled.div`
  flex: 1;
  height: 3px;
  background: ${p => p.theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${p => p.$pct}%;
  background: ${p => p.theme.colors.accent};
  transition: width 0.4s ease;
`

const ProgressText = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  white-space: nowrap;
`

const Card = styled.div<{ $animating: boolean }>`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.lg};
  padding: 48px 40px;
  margin-bottom: 32px;
  animation: ${slideIn} 0.35s ease both;

  @media (max-width: 560px) {
    padding: 32px 24px;
  }
`

const QuestionNum = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.15em;
  color: ${p => p.theme.colors.accent};
  text-transform: uppercase;
  margin-bottom: 16px;
`

const Question = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 800;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  letter-spacing: -0.01em;
  margin-bottom: 32px;
  line-height: 1.3;
`

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const RadioOption = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background: ${p => p.$selected ? p.theme.colors.accentDim : p.theme.colors.surface2};
  border: 1.5px solid ${p => p.$selected ? p.theme.colors.accent : p.theme.colors.border};
  border-radius: ${p => p.theme.radius.md};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${p => p.$selected ? p.theme.colors.accent : p.theme.colors.borderStrong};
  }

  input[type="radio"] { display: none; }
`

const RadioDot = styled.div<{ $selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${p => p.$selected ? p.theme.colors.accent : p.theme.colors.border};
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.2s;

  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: ${p => p.theme.colors.accent};
    opacity: ${p => p.$selected ? 1 : 0};
    transform: scale(${p => p.$selected ? 1 : 0});
    transition: opacity 0.2s, transform 0.2s;
  }
`

const RadioLabel = styled.span<{ $selected: boolean }>`
  font-size: 0.95rem;
  font-weight: ${p => p.$selected ? 600 : 400};
  color: ${p => p.$selected ? p.theme.colors.text : p.theme.colors.textSub};
  transition: color 0.2s;
`

const NumericInput = styled.div`
  position: relative;

  input {
    width: 100%;
    background: ${p => p.theme.colors.surface2};
    border: 1.5px solid ${p => p.theme.colors.border};
    border-radius: ${p => p.theme.radius.md};
    padding: 16px 56px 16px 20px;
    font-family: ${p => p.theme.fonts.mono};
    font-size: 1.4rem;
    font-weight: 600;
    color: ${p => p.theme.colors.text};
    outline: none;
    transition: border-color 0.2s;

    &:focus { border-color: ${p => p.theme.colors.accent}; }
    &::placeholder { color: ${p => p.theme.colors.textFaint}; font-size: 1rem; }
  }

  span {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-family: ${p => p.theme.fonts.mono};
    font-size: 1.2rem;
    color: ${p => p.theme.colors.textMuted};
    pointer-events: none;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const NavButton = styled.button<{ $primary?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: ${p => p.theme.radius.sm};
  font-family: ${p => p.theme.fonts.display};
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  transition: background 0.2s, transform 0.15s;
  border: none;
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};

  ${p => p.$primary ? css`
    background: ${p.$disabled ? p.theme.colors.surface2 : p.theme.colors.accent};
    color: ${p.$disabled ? p.theme.colors.textMuted : '#0a0a0a'};
    &:hover:not([disabled]) {
      background: ${p.theme.colors.accentHover};
      transform: translateY(-1px);
    }
  ` : css`
    background: ${p.theme.colors.surface};
    color: ${p.theme.colors.textSub};
    border: 1px solid ${p.theme.colors.border};
    &:hover { color: ${p.theme.colors.text}; border-color: ${p.theme.colors.borderStrong}; }
  `}
`

type RadioDef = { value: string; label: string }

const QUESTIONS: Array<{
  id: keyof QuestionnaireAnswers
  num: number
  question: string
  type: 'number' | 'radio'
  options?: RadioDef[]
}> = [
  {
    id: 'cashBalance',
    num: 1,
    question: 'Сколько денег сейчас на всех счетах бизнеса?',
    type: 'number',
  },
  {
    id: 'accountsCoverage',
    num: 2,
    question: 'Вы загрузили выписки по всем основным счетам?',
    type: 'radio',
    options: [
      { value: 'all', label: 'Да, по всем' },
      { value: 'most', label: 'По большинству' },
      { value: 'partial', label: 'Только по части' },
    ],
  },
  {
    id: 'businessType',
    num: 3,
    question: 'Чем занимается бизнес?',
    type: 'radio',
    options: [
      { value: 'services', label: 'Услуги' },
      { value: 'trade', label: 'Торговля' },
      { value: 'manufacturing', label: 'Производство' },
      { value: 'construction', label: 'Стройка' },
      { value: 'it', label: 'IT' },
      { value: 'transport', label: 'Грузоперевозки' },
      { value: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'incomeStability',
    num: 4,
    question: 'Поступления скорее:',
    type: 'radio',
    options: [
      { value: 'stable', label: 'Стабильные' },
      { value: 'moderate', label: 'Умеренно волатильные' },
      { value: 'volatile', label: 'Сильно зависят от сделок / сезонности' },
    ],
  },
  {
    id: 'debtLevel',
    num: 5,
    question: 'Есть ли кредиты / лизинг / займы?',
    type: 'radio',
    options: [
      { value: 'none', label: 'Нет' },
      { value: 'comfortable', label: 'Да, комфортно' },
      { value: 'pressure', label: 'Да, давление' },
      { value: 'heavy', label: 'Да, сильно давят' },
    ],
  },
  {
    id: 'seasonality',
    num: 6,
    question: 'Есть ли сезонность?',
    type: 'radio',
    options: [
      { value: 'none', label: 'Нет' },
      { value: 'moderate', label: 'Умеренная' },
      { value: 'strong', label: 'Сильная' },
    ],
  },
]

export const QuestionnaireScreen: React.FC = () => {
  const { goTo, setQuestionnaire, questionnaire } = useApp()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(questionnaire)

  const q = QUESTIONS[currentQ]
  const isLast = currentQ === QUESTIONS.length - 1

  const canNext = (): boolean => {
    const val = answers[q.id]
    if (q.type === 'number') return typeof val === 'number' && !isNaN(val) && val >= 0
    return Boolean(val)
  }

  const handleNext = (): void => {
    if (!canNext()) return
    if (isLast) {
      setQuestionnaire(answers)
      goTo('processing')
    } else {
      setCurrentQ(c => c + 1)
    }
  }

  const handleBack = (): void => {
    if (currentQ === 0) goTo('upload')
    else setCurrentQ(c => c - 1)
  }

  return (
    <Page>
      <ProgressWrap>
        <ProgressBar>
          <ProgressFill $pct={((currentQ + 1) / QUESTIONS.length) * 100} />
        </ProgressBar>
        <ProgressText>{currentQ + 1} / {QUESTIONS.length}</ProgressText>
      </ProgressWrap>

      <Card $animating={false} key={currentQ}>
        <QuestionNum>Вопрос {q.num}</QuestionNum>
        <Question>{q.question}</Question>

        {q.type === 'number' && (
          <NumericInput>
            <input
              type="number"
              min="0"
              step="10000"
              placeholder="0"
              value={answers.cashBalance === 0 ? '' : answers.cashBalance}
              onChange={e => setAnswers(a => ({ ...a, cashBalance: parseFloat(e.target.value) || 0 }))}
              onKeyDown={e => e.key === 'Enter' && handleNext()}
              autoFocus
            />
            <span>₽</span>
          </NumericInput>
        )}

        {q.type === 'radio' && q.options && (
          <RadioGroup>
            {q.options.map(opt => {
              const selected = answers[q.id] === opt.value
              return (
                <RadioOption key={opt.value} $selected={selected}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.value}
                    checked={selected}
                    onChange={() => setAnswers(a => ({ ...a, [q.id]: opt.value as never }))}
                  />
                  <RadioDot $selected={selected} />
                  <RadioLabel $selected={selected}>{opt.label}</RadioLabel>
                </RadioOption>
              )
            })}
          </RadioGroup>
        )}
      </Card>

      <Actions>
        <NavButton onClick={handleBack}>← Назад</NavButton>
        <NavButton $primary $disabled={!canNext()} onClick={handleNext}>
          {isLast ? 'Рассчитать' : 'Далее'}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </NavButton>
      </Actions>
    </Page>
  )
}
