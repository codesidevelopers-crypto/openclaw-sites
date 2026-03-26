import React from 'react'
import styled from 'styled-components'

interface ScenariosProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.gray50};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

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
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 3rem;
  max-width: 560px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  flex-direction: column;
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-3px);
  }
`

const Situation = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.75rem;
`

const Emoji = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
`

const Desc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray800};
  line-height: 1.5;
  margin-bottom: 1rem;
  font-weight: 500;
  flex: 1;
`

const Solution = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SolutionArrow = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`

const SolutionText = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

const scenarios = [
  {
    situation: 'Если беспокоят',
    emoji: '🚦',
    desc: 'Хотите работать без блокировок и неожиданных запросов документов',
    solution: 'Риски по операциям',
  },
  {
    situation: 'Если работаете с новыми',
    emoji: '🤝',
    desc: 'Часто платите новым контрагентам и хотите убедиться, что они надёжны',
    solution: 'Риски по контрагентам',
  },
  {
    situation: 'Если важна',
    emoji: '⚖️',
    desc: 'Нужно знать о судах и проверках до того, как они пришли к вам',
    solution: 'Юридические риски',
  },
  {
    situation: 'Если работаете с',
    emoji: '👷',
    desc: 'В команде есть самозанятые и вы хотите контролировать риски',
    solution: 'Риски по самозанятым',
  },
  {
    situation: 'Если хотите',
    emoji: '🎯',
    desc: 'Видеть всю картину рисков в одном окне и ни о чём не беспокоиться',
    solution: 'Всё включено',
  },
]

const Scenarios: React.FC<ScenariosProps> = ({ onCtaClick }) => (
  <Section>
    <Container>
      <SectionLabel>Сценарии использования</SectionLabel>
      <Title>Найдите свой сценарий</Title>
      <Grid>
        {scenarios.map(s => (
          <Card key={s.solution} onClick={() => onCtaClick(s.solution)}>
            <Situation>{s.situation}</Situation>
            <Emoji>{s.emoji}</Emoji>
            <Desc>{s.desc}</Desc>
            <Solution>
              <SolutionArrow>→</SolutionArrow>
              <SolutionText>{s.solution}</SolutionText>
            </Solution>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default Scenarios
