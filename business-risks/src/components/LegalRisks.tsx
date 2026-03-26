import React from 'react'
import styled from 'styled-components'

interface LegalRisksProps {
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

const Header = styled.div`
  margin-bottom: 3rem;
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
  margin-bottom: 0.75rem;
  max-width: 600px;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 560px;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

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
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  transition: all 0.25s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
    transform: translateY(-4px);
  }
`

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.25rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
`

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.65;
  margin-bottom: 1.25rem;
`

const CardFeatures = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const CardFeature = styled.li`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.gray700};
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;

  &::before {
    content: '→';
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
    font-weight: 700;
  }
`

const CardBtn = styled.button`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`

const cards = [
  {
    icon: '🏛️',
    title: 'Надзорные органы',
    desc: 'Узнайте о плановых проверках и профилактических визитах заранее — пока есть время подготовиться.',
    features: [
      'Раннее предупреждение о проверках',
      'Уведомления о профилактических визитах',
      'История проверочных мероприятий',
      'Рекомендации по подготовке',
    ],
  },
  {
    icon: '⚖️',
    title: 'Арбитражные дела',
    desc: 'Арбитражные суды — мониторинг по вашей компании и контрагентам в реальном времени. Новый иск — сразу уведомление.',
    features: [
      'Мгновенные уведомления о новых исках',
      'История арбитражных дел',
      'Мониторинг по ИНН контрагентов',
      'Статус рассмотрения дел',
    ],
  },
  {
    icon: '📋',
    title: 'Судебные дела',
    desc: 'Суды общей юрисдикции — отдельный мониторинг, не смешивается с арбитражем. Узнайте о деле первым.',
    features: [
      'Уведомления о новых делах в СОЮ',
      'Мониторинг по вашей компании',
      'Отдельно от арбитражных дел',
      'История судебных событий',
    ],
  },
  {
    icon: '📂',
    title: 'Исполнительные производства',
    desc: 'Не допустите неожиданного появления в базе ФССП. Мониторинг репутации и операционные риски под контролем.',
    features: [
      'Мониторинг появлений в ФССП',
      'Уведомления о новых производствах',
      'Репутационные риски',
      'История исполнительных производств',
    ],
  },
]

const LegalRisks: React.FC<LegalRisksProps> = ({ onCtaClick }) => (
  <Section>
    <Container>
      <Header>
        <SectionLabel>Юридические риски</SectionLabel>
        <Title>Знайте о правовых событиях раньше всех</Title>
        <Subtitle>
          Четыре отдельных модуля — каждый отвечает за свой тип юридических событий.
          Надзор, арбитраж, суды общей юрисдикции и ФССП: не смешивайте, контролируйте каждое направление отдельно.
        </Subtitle>
      </Header>
      <Grid>
        {cards.map(c => (
          <Card key={c.title}>
            <CardIcon>{c.icon}</CardIcon>
            <CardTitle>{c.title}</CardTitle>
            <CardDesc>{c.desc}</CardDesc>
            <CardFeatures>
              {c.features.map(f => <CardFeature key={f}>{f}</CardFeature>)}
            </CardFeatures>
            <CardBtn onClick={() => onCtaClick(c.title)}>Подключить →</CardBtn>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default LegalRisks
