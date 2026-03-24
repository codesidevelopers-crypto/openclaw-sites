import React from 'react'
import styled from 'styled-components'
import type { Recommendation } from '../types'
import { quizCategories } from '../data/quiz'

interface RecommendationCardProps {
  recommendation: Recommendation
}

const priorityConfig = {
  high: { label: 'Высокий приоритет', color: '#FF4D6D' },
  medium: { label: 'Средний приоритет', color: '#F9A825' },
  low: { label: 'Низкий приоритет', color: '#2EC47E' },
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
`

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CategoryIcon = styled.span`
  font-size: 1.25rem;
`

const CardTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
`

interface PriorityBadgeProps {
  $color: string
}

const PriorityBadge = styled.span<PriorityBadgeProps>`
  flex-shrink: 0;
  padding: 0.2rem 0.625rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ $color }) => $color}22;
  color: ${({ $color }) => $color};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
`

const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const cat = quizCategories.find((c) => c.id === recommendation.categoryId)
  const priority = priorityConfig[recommendation.priority]

  return (
    <Card>
      <CardHeader>
        <TitleGroup>
          {cat && <CategoryIcon>{cat.icon}</CategoryIcon>}
          <CardTitle>{recommendation.title}</CardTitle>
        </TitleGroup>
        <PriorityBadge $color={priority.color}>{priority.label}</PriorityBadge>
      </CardHeader>
      <CardText>{recommendation.text}</CardText>
    </Card>
  )
}

export default RecommendationCard
