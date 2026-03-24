import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useApp } from '../context/AppContext'
import { runEngine } from '../engine'
import type { RawTransaction, QuestionnaireAnswers } from '../engine/types'

const fadeUp = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`
const spin = keyframes`to{transform:rotate(360deg)}`
const pulse = keyframes`0%,100%{opacity:1}50%{opacity:0.4}`

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  animation: ${fadeUp} 0.5s ease;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: 12px;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  margin-bottom: 48px;
  font-size: 0.95rem;
`

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 480px;
  width: 100%;
`

interface StepRowProps {
  active: boolean
  done: boolean
}

const StepRow = styled.div<StepRowProps>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}44;
  opacity: ${({ active, done }) => (active || done ? 1 : 0.4)};
  transition: opacity 0.3s;
`

const StepDot = styled.div<StepRowProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.3s;

  ${({ done, active, theme }) =>
    done
      ? `background: rgba(16,185,129,0.15); border: 1.5px solid ${theme.colors.green}; color: ${theme.colors.green};`
      : active
        ? `background: rgba(59,130,246,0.1); border: 1.5px solid ${theme.colors.blue};`
        : `background: ${theme.colors.card}; border: 1.5px solid ${theme.colors.cardBorder};`}
`

const StepSpinner = styled.div`
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(59,130,246,0.3);
  border-top-color: ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`

const StepText = styled.p<StepRowProps>`
  font-size: 0.95rem;
  color: ${({ active, done, theme }) =>
    done ? theme.colors.green : active ? theme.colors.white : theme.colors.muted};
  transition: color 0.3s;
  font-weight: ${({ active, done }) => (active || done ? '500' : '400')};
`

const STEPS = [
  'Читаем выписки',
  'Приводим операции к единому виду',
  'Ищем переводы между своими счетами',
  'Разделяем денежный поток на надежные классы',
  'Находим повторяющиеся расходы',
  'Считаем устойчивость бизнеса',
]

const STEP_DURATIONS = [400, 700, 900, 1100, 800, 1000]

export function Screen4Processing(): JSX.Element {
  const { state, setScreen, setEngineResult } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set())

  useEffect(() => {
    let cancelled = false
    let elapsed = 0

    async function run(): Promise<void> {
      // Collect all raw transactions from parsed files
      const allRaw: RawTransaction[] = state.files
        .filter((f) => f.status === 'parsed')
        .flatMap((f) => f.transactions)

      const answers = state.questionnaire as QuestionnaireAnswers

      // Step 0 — already done
      await delay(STEP_DURATIONS[0])
      if (cancelled) return
      setDoneSteps(new Set([0]))
      setCurrentStep(1)

      // Step 1-5 — actual computation happens in the background
      // but we simulate each step progressing
      let engineResult: ReturnType<typeof runEngine> | null = null

      for (let i = 1; i < STEPS.length; i++) {
        if (cancelled) return
        setCurrentStep(i)
        await delay(STEP_DURATIONS[i])
        if (cancelled) return
        setDoneSteps((prev) => new Set([...prev, i]))
      }

      // Run engine computation (all at once, after all animations)
      try {
        engineResult = runEngine(allRaw, answers)
      } catch (e) {
        console.error('Engine error:', e)
        // Create minimal fallback result
        engineResult = null
      }

      if (cancelled) return

      if (engineResult) {
        setEngineResult(engineResult)
      }

      await delay(400)
      if (!cancelled) setScreen('dashboard')
    }

    void run()
    return () => { cancelled = true }
  }, [state.files, state.questionnaire, setScreen, setEngineResult])

  return (
    <Page>
      <Title>Анализируем данные...</Title>
      <Subtitle>Это займёт несколько секунд</Subtitle>
      <StepList>
        {STEPS.map((step, i) => {
          const done = doneSteps.has(i)
          const active = currentStep === i && !done
          return (
            <StepRow key={step} active={active} done={done}>
              <StepDot active={active} done={done}>
                {done ? '✓' : active ? <StepSpinner /> : String(i + 1)}
              </StepDot>
              <StepText active={active} done={done}>{step}</StepText>
            </StepRow>
          )
        })}
      </StepList>
    </Page>
  )
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
