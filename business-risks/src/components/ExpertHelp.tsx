import React from 'react'
import styled from 'styled-components'

interface ExpertHelpProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.primaryLighter};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const Left = styled.div``

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 2.5vw, 2.25rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.7;
  margin-bottom: 2rem;
`

const Btn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FeatureCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1.25rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

const FeatureIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`

const FeatureContent = styled.div``

const FeatureTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.25rem;
`

const FeatureDesc = styled.div`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.5;
`

const ExpertHelp: React.FC<ExpertHelpProps> = ({ onCtaClick }) => (
  <Section>
    <Container>
      <Left>
        <SectionLabel>Помощь эксперта</SectionLabel>
        <Title>Нужна помощь с комплаенсом?</Title>
        <Description>
          Когда автоматический анализ недостаточен — к вашим услугам живой
          Комплаенс-эксперт. Ответит на вопросы о 115-ФЗ, поможет разобраться
          с запросами банка и выработать правильную стратегию.
        </Description>
        <Btn onClick={() => onCtaClick('Комплаенс-эксперт')}>
          Связаться с экспертом
        </Btn>
      </Left>
      <Right>
        <FeatureCard>
          <FeatureIcon>👤</FeatureIcon>
          <FeatureContent>
            <FeatureTitle>Персональная консультация</FeatureTitle>
            <FeatureDesc>Эксперт по 115-ФЗ разберёт вашу ситуацию и даст конкретные рекомендации</FeatureDesc>
          </FeatureContent>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>📝</FeatureIcon>
          <FeatureContent>
            <FeatureTitle>Помощь с запросами банка</FeatureTitle>
            <FeatureDesc>Получили запрос документов от банка? Эксперт поможет подготовить правильный ответ</FeatureDesc>
          </FeatureContent>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🛡️</FeatureIcon>
          <FeatureContent>
            <FeatureTitle>Превентивный аудит</FeatureTitle>
            <FeatureDesc>Проверьте операции заранее — до того, как ими заинтересуется банк или ФНС</FeatureDesc>
          </FeatureContent>
        </FeatureCard>
      </Right>
    </Container>
  </Section>
)

export default ExpertHelp
