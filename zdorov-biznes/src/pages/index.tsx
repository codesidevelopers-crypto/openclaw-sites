import React from 'react'
import styled, { keyframes } from 'styled-components'
import type { HeadFC } from 'gatsby'
import { useQuiz } from '../hooks/useQuiz'
import { quizCategories } from '../data/quiz'
import ProgressBar from '../components/ProgressBar'
import QuizStep from '../components/QuizStep'
import Dashboard from '../components/Dashboard'
import AnimatedSection from '../components/AnimatedSection'

// ---------- Animations ----------

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ---------- Hero ----------

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 5rem 1.5rem 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: 30%;
    transform: translateX(-50%);
    width: 900px;
    height: 600px;
    background: radial-gradient(
      ellipse at center,
      ${({ theme }) => theme.colors.primaryGlow} 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }
`

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: center;
    text-align: center;
  }
`

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1.5px solid ${({ theme }) => theme.colors.primary}55;
  background: ${({ theme }) => theme.colors.primaryGlow};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.6s ease both;
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.25rem, 5vw, 4rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.1;
  margin-bottom: 1.25rem;
  animation: ${fadeIn} 0.6s ease 0.1s both;

  span {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.accent}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const HeroSubtitle = styled.p`
  font-size: clamp(0.95rem, 2vw, 1.125rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.6s ease 0.2s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 560px;
  }
`

const StatsRow = styled.div`
  display: flex;
  gap: 2.5rem;
  animation: ${fadeIn} 0.6s ease 0.3s both;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`

const StatItem = styled.div`
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: center;
  }
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 900;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
`

// ---------- Hero Quiz Card ----------

const HeroQuizCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: 2.5rem;
  animation: ${fadeIn} 0.6s ease 0.2s both;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1.5rem;
  }
`

const HeroQuizLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
`

const HeroQuizDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: inline-block;
  animation: pulse 2s ease infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`

// ---------- Features ----------

const FeaturesSection = styled.section`
  padding: 6rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
`

const SectionLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  margin-bottom: 0.75rem;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  margin-bottom: 3.5rem;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

interface FeatureCardProps {
  $color: string
}

const FeatureCard = styled.div<FeatureCardProps>`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2rem;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ $color }) => $color}55;
    box-shadow: 0 8px 32px ${({ $color }) => $color}18;
    transform: translateY(-4px);
  }
`

const FeatureIcon = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $color }) => $color}22;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`

const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`

const FeatureText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`

// ---------- Categories preview ----------

const CategoriesSection = styled.section`
  padding: 4rem 1.5rem 6rem;
  max-width: 1100px;
  margin: 0 auto;
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

interface CategoryPillProps {
  $color: string
}

const CategoryPill = styled.div<CategoryPillProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  padding: 1.5rem 1rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1.5px solid ${({ $color }) => $color}33;
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    background: ${({ $color }) => $color}11;
    border-color: ${({ $color }) => $color}66;
  }
`

const CategoryPillIcon = styled.span`
  font-size: 1.75rem;
`

const CategoryPillTitle = styled.span<{ $color: string }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ $color }) => $color};
`

const CategoryPillCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

// ---------- Quiz section ----------

const QuizSection = styled.section`
  min-height: 100vh;
  padding: 4rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

const QuizTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`

const QuizSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`

// ---------- Results section ----------

const ResultsSection = styled.section`
  min-height: 100vh;
`

// ---------- Page Component ----------

const features = [
  {
    icon: '⚡',
    color: '#FFC93C',
    title: '5 минут',
    text: 'Быстрая диагностика — 15 вопросов по ключевым направлениям вашего бизнеса.',
  },
  {
    icon: '📊',
    color: '#FF4D6D',
    title: 'Детальный отчёт',
    text: 'Визуальный дашборд с оценкой каждой категории и общим индексом здоровья.',
  },
  {
    icon: '🎯',
    color: '#00D2C1',
    title: 'Рекомендации',
    text: 'Конкретные шаги для улучшения слабых мест, расставленные по приоритетам.',
  },
  {
    icon: '🔒',
    color: '#A78BFA',
    title: 'Конфиденциально',
    text: 'Ваши ответы защищены. Никакого спама и передачи данных третьим лицам.',
  },
  {
    icon: '🆓',
    color: '#2EC47E',
    title: 'Бесплатно',
    text: 'Полная оценка бизнеса без регистрации и каких-либо платежей.',
  },
  {
    icon: '🔄',
    color: '#F9A825',
    title: 'Повторяйте',
    text: 'Проходите оценку регулярно, чтобы отслеживать прогресс развития бизнеса.',
  },
]

const IndexPage: React.FC = () => {
  const {
    view,
    currentCategoryIndex,
    answers,
    result,
    totalCategories,
    setAnswer,
    nextCategory,
    prevCategory,
    restartQuiz,
    isCategoryComplete,
    getRecommendations,
  } = useQuiz()

  // Show full-screen quiz when on categories 2–5
  if (view === 'quiz' || (view === 'hero' && currentCategoryIndex > 0)) {
    const category = quizCategories[currentCategoryIndex]
    return (
      <QuizSection>
        <QuizHeader>
          <QuizTitle>Оценка бизнеса</QuizTitle>
          <QuizSubtitle>Отвечайте честно — это только в ваших интересах</QuizSubtitle>
        </QuizHeader>
        <ProgressBar
          currentIndex={currentCategoryIndex}
          totalCategories={totalCategories}
        />
        {category && (
          <QuizStep
            category={category}
            answers={answers}
            onAnswer={setAnswer}
            onNext={nextCategory}
            onPrev={prevCategory}
            isFirst={currentCategoryIndex === 0}
            isLast={currentCategoryIndex === totalCategories - 1}
            isComplete={isCategoryComplete(currentCategoryIndex)}
          />
        )}
      </QuizSection>
    )
  }

  if (view === 'results' && result) {
    return (
      <ResultsSection>
        <Dashboard
          result={result}
          recommendations={getRecommendations()}
          onRestart={restartQuiz}
        />
      </ResultsSection>
    )
  }

  // Hero view: quiz for category 0 is embedded on the right
  const firstCategory = quizCategories[0]

  return (
    <>
      <HeroSection>
        <HeroInner>
          <HeroLeft>
            <HeroBadge>
              <span>🩺</span>
              Бесплатная диагностика
            </HeroBadge>
            <HeroTitle>
              Узнайте, насколько <span>здоров</span> ваш бизнес
            </HeroTitle>
            <HeroSubtitle>
              15 вопросов, 5 минут — и вы получите детальный отчёт о состоянии бизнеса
              с конкретными рекомендациями по развитию.
            </HeroSubtitle>
            <StatsRow>
              <StatItem>
                <StatNumber>5</StatNumber>
                <StatLabel>Направлений</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>15</StatNumber>
                <StatLabel>Вопросов</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>6+</StatNumber>
                <StatLabel>Рекомендаций</StatLabel>
              </StatItem>
            </StatsRow>
          </HeroLeft>

          <div>
            <HeroQuizCard>
              <HeroQuizLabel>
                <HeroQuizDot />
                Шаг 1 из {totalCategories} — начните прямо сейчас
              </HeroQuizLabel>
              {firstCategory && (
                <QuizStep
                  category={firstCategory}
                  answers={answers}
                  onAnswer={setAnswer}
                  onNext={nextCategory}
                  onPrev={prevCategory}
                  isFirst={true}
                  isLast={false}
                  isComplete={isCategoryComplete(0)}
                />
              )}
            </HeroQuizCard>
          </div>
        </HeroInner>
      </HeroSection>

      <FeaturesSection>
        <AnimatedSection>
          <SectionLabel>Почему это работает</SectionLabel>
          <SectionTitle>Всё что нужно для<br />роста вашего бизнеса</SectionTitle>
        </AnimatedSection>
        <FeaturesGrid>
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={i * 80} direction="up">
              <FeatureCard $color={f.color}>
                <FeatureIcon $color={f.color}>{f.icon}</FeatureIcon>
                <FeatureTitle>{f.title}</FeatureTitle>
                <FeatureText>{f.text}</FeatureText>
              </FeatureCard>
            </AnimatedSection>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <CategoriesSection>
        <AnimatedSection>
          <SectionLabel>Что мы оцениваем</SectionLabel>
          <SectionTitle>5 ключевых направлений</SectionTitle>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <CategoriesGrid>
            {quizCategories.map((cat) => (
              <CategoryPill key={cat.id} $color={cat.color}>
                <CategoryPillIcon>{cat.icon}</CategoryPillIcon>
                <CategoryPillTitle $color={cat.color}>{cat.title}</CategoryPillTitle>
                <CategoryPillCount>{cat.questions.length} вопроса</CategoryPillCount>
              </CategoryPill>
            ))}
          </CategoriesGrid>
        </AnimatedSection>
      </CategoriesSection>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Здоров Бизнес — Бесплатная оценка бизнеса</title>
    <meta
      name="description"
      content="Бесплатная диагностика бизнеса за 5 минут. 15 вопросов, персональный отчёт и конкретные рекомендации по развитию."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </>
)
