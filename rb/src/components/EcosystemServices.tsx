import React from 'react'
import styled from 'styled-components'

interface EcosystemServicesProps {
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
  max-width: 1100px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`

const Label = styled.div`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 620px;
  margin: 0 auto;
  line-height: 1.7;
`

const NotAModuleBanner = styled.div`
  margin: 1.5rem 0 2.5rem;
  background: ${({ theme }) => theme.colors.yellowLight};
  border: 1px solid #FDE68A;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem 1.5rem;
  text-align: center;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.gray800};
  line-height: 1.6;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: white;
  border: 1.5px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 2rem;
  transition: all 0.25s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
  }
`

const CardIcon = styled.div`
  width: 52px;
  height: 52px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const CardText = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.7;
  margin-bottom: 1.25rem;
`

const BulletList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1.5rem;
`

const Bullet = styled.li`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray700};
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;

  &::before {
    content: '→';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    flex-shrink: 0;
  }
`

const CardLink = styled.a`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: gap 0.2s;

  &:hover {
    gap: 0.5rem;
  }
`

const services = [
  {
    icon: '🏢',
    title: 'Проверка компании',
    text: 'Отдельный сервис для углублённой проверки любого контрагента. Полный отчёт с реестровыми данными, связями, финансовой историей.',
    bullets: [
      'Детальный отчёт по компании или ИП',
      'Проверка связей и учредителей',
      'Финансовые показатели за несколько лет',
      'Совместим с модулем «Риски по контрагентам»',
    ],
  },
  {
    icon: '📁',
    title: 'Досье контрагента',
    text: 'Полный архив данных по конкретному контрагенту: история изменений, судебные дела, выписки, документы — в одном месте.',
    bullets: [
      'Полная история изменений компании',
      'Судебные дела в арбитраже и общей юрисдикции',
      'Выписки из ЕГРЮЛ и ЕГРИП',
      'Сохраняется и обновляется в личном кабинете',
    ],
  },
  {
    icon: '🤖',
    title: 'Комплаенс-ассистент',
    text: 'AI-помощник для ответов на вопросы по 115-ФЗ и комплаенс. Помогает разобраться в сложной ситуации, не выходя из банка.',
    bullets: [
      'Ответы на вопросы по 115-ФЗ и AML',
      'Помощь с документами и объяснениями',
      'Работает внутри интернет-банка',
      'Не заменяет юриста, но помогает разобраться',
    ],
  },
]

const EcosystemServices: React.FC<EcosystemServicesProps> = ({ onCtaClick }) => (
  <Section id="ecosystem">
    <Container>
      <Header>
        <Label>Экосистема Точки</Label>
        <Title>Смежные сервисы — не модули Рисков бизнеса</Title>
        <Subtitle>
          Эти сервисы дополняют «Риски бизнеса», но не входят в него как
          продуктовые модули. Они доступны отдельно и не включены в Конструктор.
        </Subtitle>
      </Header>
      <NotAModuleBanner>
        ⚠️ Обратите внимание: Проверка компании, Досье контрагента и Комплаенс-ассистент — это отдельные
        сервисы экосистемы Точки. Они не являются модулями «Рисков бизнеса» и не доступны через Конструктор.
      </NotAModuleBanner>
      <Grid>
        {services.map((s) => (
          <Card key={s.title}>
            <CardIcon>{s.icon}</CardIcon>
            <CardTitle>{s.title}</CardTitle>
            <CardText>{s.text}</CardText>
            <BulletList>
              {s.bullets.map((b) => (
                <Bullet key={b}>{b}</Bullet>
              ))}
            </BulletList>
            <CardLink onClick={() => onCtaClick(`Экосистема: ${s.title}`)}>
              Узнать подробнее →
            </CardLink>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default EcosystemServices
