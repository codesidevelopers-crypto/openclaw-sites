import React, { useState } from 'react'
import styled from 'styled-components'
import type { ScoreCategory } from '../types'

interface CategoryCardProps {
  category: ScoreCategory
}

interface BarProps {
  $percent: number
  $color: string
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderLight};
    transform: translateY(-2px);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CategoryName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

interface LabelBadgeProps {
  $color: string
}

const LabelBadge = styled.span<LabelBadgeProps>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  background: ${({ $color }) => `${$color}20`};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => `${$color}40`};
`

const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

interface ScoreValueProps {
  $color: string
}

const ScoreValue = styled.span<ScoreValueProps>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 800;
  color: ${({ $color }) => $color};
  font-family: 'Manrope', sans-serif;
`

const ScoreMax = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const BarTrack = styled.div`
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.bgInput};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const BarFill = styled.div<BarProps>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${({ $color }) => $color};
  border-radius: inherit;
  box-shadow: ${({ $color }) => `0 0 8px ${$color}60`};
  transition: width 1s ease;
`

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const ItemsTable = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.md};
`

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`

const ItemLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const ItemScore = styled.span<{ $color: string }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ $color }) => $color};
`

const getItemColor = (score: number, max: number): string => {
  const pct = (score / max) * 100
  if (pct >= 80) return '#00d9a3'
  if (pct >= 60) return '#6c63ff'
  if (pct >= 40) return '#ff9f43'
  return '#ff6584'
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [expanded, setExpanded] = useState(false)
  const percent = (category.score / category.maxScore) * 100

  return (
    <Card>
      <CardHeader>
        <CategoryName>{category.name}</CategoryName>
        <LabelBadge $color={category.color}>{category.label}</LabelBadge>
      </CardHeader>
      <ScoreRow>
        <ScoreValue $color={category.color}>{category.score}</ScoreValue>
        <ScoreMax>из {category.maxScore}</ScoreMax>
      </ScoreRow>
      <BarTrack>
        <BarFill $percent={percent} $color={category.color} />
      </BarTrack>
      <ToggleBtn
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? '▲ Скрыть детали' : '▼ Показать детали'}
      </ToggleBtn>
      {expanded && (
        <ItemsTable>
          {category.items.map((item) => (
            <ItemRow key={item.label}>
              <ItemLabel>{item.label}</ItemLabel>
              <ItemScore $color={getItemColor(item.score, item.maxScore)}>
                {item.score}/{item.maxScore}
              </ItemScore>
            </ItemRow>
          ))}
        </ItemsTable>
      )}
    </Card>
  )
}

export default CategoryCard
