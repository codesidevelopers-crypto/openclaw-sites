import React from 'react'
import styled from 'styled-components'
import type { QuizResult } from '../types'
import ScoreRing from './ScoreRing'
import CategoryBar from './CategoryBar'
import RecommendationCard from './RecommendationCard'
import AnimatedSection from './AnimatedSection'
import { levelLabels } from '../data/quiz'
import type { Recommendation } from '../types'

interface DashboardProps {
  result: QuizResult
  recommendations: Recommendation[]
  onRestart: () => void
}

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const HeaderLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.75rem;
`

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.75rem;
`

const HeaderSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2rem;
`

const ScoreCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

const ScoreSummary = styled.div`
  text-align: center;
`

const ScoreSummaryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`

const ScoreSummaryText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`

const CategoriesCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const RestartSection = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1.5px solid ${({ theme }) => theme.colors.border};
`

const RestartText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.25rem;
`

const RestartButton = styled.button`
  padding: 0.875rem 2.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #060A12;
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }
`

const summaryTexts: Record<string, string> = {
  strong: 'Ваш бизнес в отличной форме! Продолжайте в том же духе и фокусируйтесь на масштабировании.',
  developing: 'Хорошая база. Устраните слабые места — и ваш бизнес выйдет на новый уровень.',
  weak: 'Есть серьёзные зоны роста. Сосредоточьтесь на приоритетных рекомендациях ниже.',
  critical: 'Бизнес требует немедленного внимания. Начните с критических рекомендаций.',
}

const Dashboard: React.FC<DashboardProps> = ({ result, recommendations, onRestart }) => {
  const summaryText = summaryTexts[result.level]
  const levelLabel = levelLabels[result.level]

  return (
    <Wrapper>
      <AnimatedSection>
        <Header>
          <HeaderLabel>Ваш результат готов</HeaderLabel>
          <HeaderTitle>Диагностика бизнеса</HeaderTitle>
          <HeaderSubtitle>{levelLabel} — {summaryText}</HeaderSubtitle>
        </Header>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <MainGrid>
          <ScoreCard>
            <ScoreRing result={result} />
            <ScoreSummary>
              <ScoreSummaryTitle>{levelLabel}</ScoreSummaryTitle>
              <ScoreSummaryText>
                Общий индекс здоровья бизнеса
              </ScoreSummaryText>
            </ScoreSummary>
          </ScoreCard>

          <CategoriesCard>
            <CardTitle>По категориям</CardTitle>
            {result.categories.map((cat, i) => (
              <CategoryBar key={cat.id} category={cat} delay={i * 100} />
            ))}
          </CategoriesCard>
        </MainGrid>
      </AnimatedSection>

      {recommendations.length > 0 && (
        <AnimatedSection delay={200}>
          <SectionTitle>Приоритетные рекомендации</SectionTitle>
          <RecommendationsGrid>
            {recommendations.map((rec, i) => (
              <RecommendationCard key={i} recommendation={rec} />
            ))}
          </RecommendationsGrid>
        </AnimatedSection>
      )}

      <AnimatedSection delay={300}>
        <RestartSection>
          <RestartText>Хотите пройти оценку заново?</RestartText>
          <RestartButton onClick={onRestart}>Начать сначала</RestartButton>
        </RestartSection>
      </AnimatedSection>
    </Wrapper>
  )
}

export default Dashboard
