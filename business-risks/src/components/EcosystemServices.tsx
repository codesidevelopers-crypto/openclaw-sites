import React from 'react'
import styled from 'styled-components'

interface EcosystemServicesProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;

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
  font-size: clamp(1.5rem, 2.5vw, 2.25rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
  max-width: 560px;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 3rem;
  max-width: 540px;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1.5px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 2rem;
  transition: all 0.25s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-3px);
  }
`

const CardTag = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 1rem;
`

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.625rem;
`

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.65;
  margin-bottom: 1.25rem;
`

const CardLink = styled.button`
  font-size: 0.85rem;
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

const services = [
  {
    icon: '🔍',
    title: 'Проверка компании',
    desc: 'Быстрая проверка контрагента по ИНН: реестры, арбитраж, директора, связи. До того, как подписать договор.',
  },
  {
    icon: '📁',
    title: 'Досье контрагента',
    desc: 'Полный отчёт о компании: история, связанные лица, суды, долги, налоговая нагрузка. Всё в одном документе.',
  },
  {
    icon: '🤖',
    title: 'Комплаенс-ассистент',
    desc: 'ИИ-помощник по вопросам комплаенса. Задайте вопрос на русском — получите ответ с учётом актуальных требований.',
  },
]

const EcosystemServices: React.FC<EcosystemServicesProps> = ({ onCtaClick }) => (
  <Section>
    <Container>
      <SectionLabel>Экосистема Точки</SectionLabel>
      <Title>Соседние сервисы — они работают вместе с «Рисками бизнеса»</Title>
      <Subtitle>
        Эти сервисы — не часть «Рисков бизнеса», но они дополняют его. Используйте их
        вместе для полного контроля над партнёрами и комплаенсом.
      </Subtitle>
      <Grid>
        {services.map(s => (
          <Card key={s.title}>
            <CardTag>Сервис Точки</CardTag>
            <CardIcon>{s.icon}</CardIcon>
            <CardTitle>{s.title}</CardTitle>
            <CardDesc>{s.desc}</CardDesc>
            <CardLink onClick={() => onCtaClick(s.title)}>Узнать подробнее →</CardLink>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default EcosystemServices
