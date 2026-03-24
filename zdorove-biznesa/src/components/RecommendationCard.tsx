import React from 'react'
import styled from 'styled-components'
import type { Recommendation } from '../types'

interface RecommendationCardProps {
  rec: Recommendation
  index: number
}

interface CardProps {
  $priority: 'high' | 'medium' | 'low'
}

const priorityColor: Record<'high' | 'medium' | 'low', string> = {
  high: '#ff6584',
  medium: '#ff9f43',
  low: '#00d9a3',
}

const priorityLabel: Record<'high' | 'medium' | 'low', string> = {
  high: 'Срочно',
  medium: 'Важно',
  low: 'Рекомендуем',
}

const Card = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${({ $priority }) => priorityColor[$priority]};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const TitleGroup = styled.div`
  flex: 1;
`

const Category = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

const PriorityBadge = styled.span<CardProps>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  background: ${({ $priority }) => `${priorityColor[$priority]}20`};
  color: ${({ $priority }) => priorityColor[$priority]};
  border: 1px solid ${({ $priority }) => `${priorityColor[$priority]}40`};
  white-space: nowrap;
  flex-shrink: 0;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`

const RecommendationCard: React.FC<RecommendationCardProps> = ({ rec }) => (
  <Card $priority={rec.priority}>
    <CardTop>
      <TitleGroup>
        <Category>{rec.category}</Category>
        <Title>{rec.title}</Title>
      </TitleGroup>
      <PriorityBadge $priority={rec.priority}>{priorityLabel[rec.priority]}</PriorityBadge>
    </CardTop>
    <Description>{rec.description}</Description>
  </Card>
)

export default RecommendationCard
