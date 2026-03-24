import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { levelColors } from '../data/quiz'
import type { CategoryResult } from '../types'

interface CategoryBarProps {
  category: CategoryResult
  delay?: number
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Icon = styled.span`
  font-size: 1.1rem;
`

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const Score = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Track = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`

interface FillProps {
  $width: number
  $color: string
}

const Fill = styled.div<FillProps>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  border-radius: 4px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
`

const CategoryBar: React.FC<CategoryBarProps> = ({ category, delay = 0 }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0)
  const color = levelColors[category.level]

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(category.percentage)
    }, 300 + delay)
    return () => clearTimeout(timer)
  }, [category.percentage, delay])

  return (
    <Wrapper>
      <Header>
        <CategoryInfo>
          <Icon>{category.icon}</Icon>
          <Title>{category.title}</Title>
        </CategoryInfo>
        <Score>
          {category.score}/{category.maxScore} · {category.percentage}%
        </Score>
      </Header>
      <Track>
        <Fill $width={animatedWidth} $color={color} />
      </Track>
    </Wrapper>
  )
}

export default CategoryBar
