import React from 'react'
import styled from 'styled-components'

interface ProgressBarProps {
  current: number
  total: number
  labels: readonly string[]
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.bgCard};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow-x: auto;
`

interface StepDotProps {
  $active: boolean
  $done: boolean
}

const StepDot = styled.div<StepDotProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
`

const Dot = styled.div<StepDotProps>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  transition: all 0.3s ease;

  background: ${({ theme, $active, $done }) =>
    $done
      ? theme.colors.accentGreen
      : $active
      ? theme.colors.primary
      : theme.colors.bgInput};

  color: ${({ theme, $active, $done }) =>
    $done || $active ? '#fff' : theme.colors.textMuted};

  border: 2px solid ${({ theme, $active, $done }) =>
    $done
      ? theme.colors.accentGreen
      : $active
      ? theme.colors.primary
      : theme.colors.border};
`

const StepLabel = styled.span<StepDotProps>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ theme, $active, $done }) =>
    $done
      ? theme.colors.accentGreen
      : $active
      ? theme.colors.text
      : theme.colors.textMuted};
  white-space: nowrap;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const Connector = styled.div<{ $done: boolean }>`
  flex: 1;
  height: 2px;
  min-width: 12px;
  background: ${({ theme, $done }) =>
    $done ? theme.colors.accentGreen : theme.colors.border};
  transition: background 0.3s ease;
`

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, labels }) => (
  <Container>
    {labels.map((label, i) => (
      <React.Fragment key={label}>
        <StepDot $active={i === current} $done={i < current}>
          <Dot $active={i === current} $done={i < current}>
            {i < current ? '✓' : i + 1}
          </Dot>
          <StepLabel $active={i === current} $done={i < current}>
            {label}
          </StepLabel>
        </StepDot>
        {i < total - 1 && <Connector $done={i < current} />}
      </React.Fragment>
    ))}
  </Container>
)

export default ProgressBar
