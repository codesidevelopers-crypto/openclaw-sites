import React from 'react'
import styled, { keyframes, css } from 'styled-components'

interface ScoreGaugeProps {
  score: number
  grade: string
  gradeLabel: string
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`

const GaugeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

const SVGWrapper = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
`

interface ScoreProps {
  $score: number
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#00d9a3'
  if (score >= 60) return '#6c63ff'
  if (score >= 40) return '#ff9f43'
  if (score >= 20) return '#ff6584'
  return '#cc2a4a'
}

const ScoreNumber = styled.div<ScoreProps>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .number {
    font-family: 'Manrope', sans-serif;
    font-size: 4rem;
    font-weight: 900;
    line-height: 1;
    color: ${({ $score }) => getScoreColor($score)};
    ${({ $score }) =>
      $score >= 80 &&
      css`
        animation: ${pulse} 3s ease infinite;
      `}
  }

  .unit {
    font-size: 1.25rem;
    color: #9090b0;
    font-weight: 600;
  }
`

const GradeInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const GradeBadge = styled.div<ScoreProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $score }) => `${getScoreColor($score)}20`};
  border: 2px solid ${({ $score }) => getScoreColor($score)};
  color: ${({ $score }) => getScoreColor($score)};
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 900;
`

const GradeLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, grade, gradeLabel }) => {
  const radius = 100
  const strokeWidth = 12
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const color = getScoreColor(score)

  return (
    <GaugeContainer>
      <SVGWrapper>
        <svg width="240" height="240" viewBox="0 0 240 240">
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="#1a1a26"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference - progress}`}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
          />
        </svg>
        <ScoreNumber $score={score}>
          <span className="number">{score}</span>
          <span className="unit">/100</span>
        </ScoreNumber>
      </SVGWrapper>
      <GradeInfo>
        <GradeBadge $score={score}>{grade}</GradeBadge>
        <GradeLabel>{gradeLabel}</GradeLabel>
      </GradeInfo>
    </GaugeContainer>
  )
}

export default ScoreGauge
