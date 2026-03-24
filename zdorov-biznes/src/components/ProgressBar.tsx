import React from 'react'
import styled from 'styled-components'
import { quizCategories } from '../data/quiz'

interface ProgressBarProps {
  currentIndex: number
  totalCategories: number
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto 2.5rem;
`

const Steps = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

interface StepDotProps {
  $active: boolean
  $done: boolean
  $color: string
}

const StepDot = styled.button<StepDotProps>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  border: none;
  cursor: default;
  background: ${({ $active, $done, $color, theme }) =>
    $done ? $color : $active ? $color : theme.colors.border};
  opacity: ${({ $active, $done }) => ($active || $done ? 1 : 0.4)};
  transition: background 0.3s ease, opacity 0.3s ease;
`

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CategoryLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const CountLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const ProgressBar: React.FC<ProgressBarProps> = ({ currentIndex, totalCategories }) => {
  const current = quizCategories[currentIndex]

  return (
    <Wrapper>
      <Steps>
        {Array.from({ length: totalCategories }).map((_, i) => {
          const cat = quizCategories[i]
          return (
            <StepDot
              key={cat.id}
              $active={i === currentIndex}
              $done={i < currentIndex}
              $color={cat.color}
            />
          )
        })}
      </Steps>
      <Meta>
        <CategoryLabel>
          <span>{current?.icon}</span>
          {current?.title}
        </CategoryLabel>
        <CountLabel>
          {currentIndex + 1} / {totalCategories}
        </CountLabel>
      </Meta>
    </Wrapper>
  )
}

export default ProgressBar
