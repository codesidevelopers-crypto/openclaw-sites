import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useApp } from '../../context/AppContext'
import { runDiagnostic } from '../../engine'

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`

const checkDraw = keyframes`
  from { stroke-dashoffset: 20; }
  to   { stroke-dashoffset: 0; }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`

const scanLine = keyframes`
  0%   { top: 0; }
  100% { top: 100%; }
`

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
`

const Inner = styled.div`
  width: 100%;
  max-width: 480px;
`

const TopSection = styled.div`
  text-align: center;
  margin-bottom: 56px;
`

const Logo = styled.div`
  width: 72px;
  height: 72px;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  position: relative;
  overflow: hidden;
  font-size: 2rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${p => p.theme.colors.accent}80, transparent);
    animation: ${scanLine} 2s linear infinite;
  }
`

const ProcessTitle = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 800;
  font-size: 1.6rem;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
`

const ProcessSub = styled.p`
  color: ${p => p.theme.colors.textMuted};
  font-size: 0.9rem;
`

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const StepRow = styled.div<{ $state: 'pending' | 'active' | 'done' }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border-radius: ${p => p.theme.radius.md};
  background: ${p =>
    p.$state === 'active' ? p.theme.colors.accentDim :
    p.$state === 'done' ? p.theme.colors.surface :
    'transparent'
  };
  border: 1px solid ${p =>
    p.$state === 'active' ? p.theme.colors.accent + '40' :
    p.$state === 'done' ? p.theme.colors.teal + '30' :
    'transparent'
  };
  transition: all 0.3s;
  animation: ${p => p.$state !== 'pending' ? fadeIn : 'none'} 0.3s ease;
`

const StepIcon = styled.div<{ $state: 'pending' | 'active' | 'done' }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1.5px solid ${p =>
    p.$state === 'active' ? p.theme.colors.accent :
    p.$state === 'done' ? p.theme.colors.teal :
    p.theme.colors.border
  };
  background: ${p =>
    p.$state === 'done' ? p.theme.colors.tealDim : 'transparent'
  };
  transition: all 0.3s;
  animation: ${p => p.$state === 'active' ? pulse : 'none'} 1.5s ease infinite;
`

const CheckSvg = styled.svg`
  polyline {
    stroke-dasharray: 20;
    stroke-dashoffset: 0;
    animation: ${checkDraw} 0.3s ease;
  }
`

const ActiveDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.theme.colors.accent};
  animation: ${pulse} 1s ease infinite;
`

const PendingNum = styled.span`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 11px;
  color: ${p => p.theme.colors.textFaint};
`

const StepText = styled.div<{ $state: 'pending' | 'active' | 'done' }>`
  font-size: 0.9rem;
  font-weight: ${p => p.$state === 'active' ? 600 : 400};
  color: ${p =>
    p.$state === 'active' ? p.theme.colors.text :
    p.$state === 'done' ? p.theme.colors.textSub :
    p.theme.colors.textFaint
  };
  transition: color 0.3s;
`

const StepTime = styled.div`
  margin-left: auto;
  font-family: ${p => p.theme.fonts.mono};
  font-size: 10px;
  color: ${p => p.theme.colors.teal};
`

const ErrorBox = styled.div`
  margin-top: 32px;
  padding: 20px 24px;
  background: ${p => p.theme.colors.dangerDim};
  border: 1px solid ${p => p.theme.colors.danger}40;
  border-radius: ${p => p.theme.radius.md};
  color: ${p => p.theme.colors.danger};
  font-size: 0.9rem;
  text-align: center;
`

const STEPS = [
  'Читаем выписки',
  'Приводим к единому виду',
  'Ищем переводы между счетами',
  'Разделяем денежный поток',
  'Находим повторяющиеся расходы',
  'Считаем устойчивость',
]

export const ProcessingScreen: React.FC = () => {
  const { parsedFiles, questionnaire, setResults, goTo } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const stepTimes: number[] = []

    const onStep = (step: number): void => {
      stepTimes.push(Date.now())
      setCurrentStep(step)
      if (step > 1) {
        setCompletedSteps(prev => new Set([...prev, step - 1]))
      }
    }

    runDiagnostic(parsedFiles, questionnaire, onStep)
      .then(result => {
        setCompletedSteps(new Set([1, 2, 3, 4, 5, 6]))
        setResults(result)
        setTimeout(() => goTo('dashboard'), 600)
      })
      .catch(e => {
        setError(e instanceof Error ? e.message : 'Произошла ошибка при расчёте')
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page>
      <Inner>
        <TopSection>
          <Logo>📊</Logo>
          <ProcessTitle>Анализируем данные</ProcessTitle>
          <ProcessSub>Это займёт несколько секунд</ProcessSub>
        </TopSection>

        <StepsList>
          {STEPS.map((label, idx) => {
            const stepNum = idx + 1
            const isDone = completedSteps.has(stepNum)
            const isActive = currentStep === stepNum && !isDone
            const state: 'pending' | 'active' | 'done' = isDone ? 'done' : isActive ? 'active' : 'pending'

            return (
              <StepRow key={idx} $state={state}>
                <StepIcon $state={state}>
                  {isDone && (
                    <CheckSvg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <polyline
                        points="3,8 7,12 13,5"
                        stroke="#00B4A0"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </CheckSvg>
                  )}
                  {isActive && <ActiveDot />}
                  {state === 'pending' && <PendingNum>{stepNum}</PendingNum>}
                </StepIcon>

                <StepText $state={state}>{label}</StepText>

                {isDone && <StepTime>✓</StepTime>}
              </StepRow>
            )
          })}
        </StepsList>

        {error && (
          <ErrorBox>
            <strong>Ошибка:</strong> {error}
            <br />
            <button
              onClick={() => goTo('upload')}
              style={{ marginTop: 12, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            >
              Попробовать снова
            </button>
          </ErrorBox>
        )}
      </Inner>
    </Page>
  )
}
