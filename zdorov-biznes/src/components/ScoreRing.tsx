import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { levelLabels, levelColors } from '../data/quiz'
import type { QuizResult } from '../types'

interface ScoreRingProps {
  result: QuizResult
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const RingContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`

const Svg = styled.svg`
  transform: rotate(-90deg);
  overflow: visible;
`

const ScoreInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const ScoreNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3.25rem;
  font-weight: 900;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ScoreMax = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
`

interface LevelBadgeProps {
  $color: string
}

const LevelBadge = styled.div<LevelBadgeProps>`
  padding: 0.5rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ $color }) => $color}22;
  border: 1.5px solid ${({ $color }) => $color}55;
  color: ${({ $color }) => $color};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  letter-spacing: 0.04em;
`

const ScoreRing: React.FC<ScoreRingProps> = ({ result }) => {
  const [animatedPct, setAnimatedPct] = useState(0)
  const color = levelColors[result.level]
  const label = levelLabels[result.level]

  const radius = 88
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedPct / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPct(result.percentage)
    }, 200)
    return () => clearTimeout(timer)
  }, [result.percentage])

  return (
    <Wrapper>
      <RingContainer>
        <Svg width="200" height="200" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#1C2B40"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </Svg>
        <ScoreInner>
          <ScoreNumber>{result.percentage}%</ScoreNumber>
          <ScoreMax>{result.totalScore} / {result.maxScore}</ScoreMax>
        </ScoreInner>
      </RingContainer>
      <LevelBadge $color={color}>{label}</LevelBadge>
    </Wrapper>
  )
}

export default ScoreRing
