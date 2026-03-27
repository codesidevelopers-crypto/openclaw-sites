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
  max-width: 1100px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
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
    transform: translateY(-3px);
  }
`

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`

const CardIconWrap = styled.div`
  width: 52px;
  height: 52px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`

const PriceTag = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
`

const PriceSub = styled.div`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.gray500};
  text-align: right;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const Distinction = styled.div`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.875rem;
  padding: 0.3rem 0.75rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.full};
  display: inline-block;
`

const CardText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.7;
  margin-bottom: 1.25rem;
`

const BulletList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Bullet = styled.li`
  font-size: 0.85rem;
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

const ConnectRow = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const Btn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  box-shadow: ${({ theme }) => theme.shadow.purple};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`

const OutlineBtn = styled.button`
  border: 1.5px solid ${({ theme }) => theme.colors.gray300};
  background: white;
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const legalModules = [
  {
    icon: '🏛️',
    title: 'Надзорные органы',
    distinction: 'ФНС, Роструд, Прокуратура и другие',
    price: '300',
    text: 'Отслеживает плановые и внеплановые проверки от любых надзорных органов. Вы узнаёте о запланированных визитах и проверках заблаговременно, а не в момент прихода инспектора.',
    bullets: [
      'Уведомления о плановых проверках',
      'Сигналы о внеплановых мероприятиях',
      'История проверок по вашей компании',
      'Рекомендации по подготовке',
    ],
  },
  {
    icon: '⚖️',
    title: 'Арбитражные дела',
    distinction: 'Арбитражные суды — споры юрлиц и ИП',
    price: '300',
    text: 'Мониторит дела в арбитражных судах: иски против вашей компании, обеспечительные меры, жалобы. Важно: арбитраж и суды общей юрисдикции — разные системы и разные источники.',
    bullets: [
      'Новые иски и заявления',
      'Изменение статуса существующих дел',
      'Обеспечительные меры',
      'Решения и постановления',
    ],
  },
  {
    icon: '🏢',
    title: 'Судебные дела',
    distinction: 'Суды общей юрисдикции — отдельный контур',
    price: '300',
    text: 'Суды общей юрисдикции — это не арбитраж. Здесь могут быть дела с участием физических лиц: собственников, директоров, учредителей. Отдельный модуль, отдельный источник сигналов.',
    bullets: [
      'Дела с участием физлиц, связанных с компанией',
      'Уголовные и административные дела',
      'Имущественные споры с физлицами',
      'Оперативное уведомление при открытии',
    ],
  },
  {
    icon: '🔒',
    title: 'Исполнительные производства',
    distinction: 'ФССП — задолженности и аресты',
    price: '300',
    text: 'Открытые исполнительные производства — серьёзный сигнал для вас и ваших контрагентов. Сервис мониторит базу ФССП и сообщает об открытии производств и их изменении.',
    bullets: [
      'Открытие новых производств против вас',
      'Производства по вашим контрагентам',
      'Суммы и типы взысканий',
      'История закрытых производств',
    ],
  },
]

const LegalRisks: React.FC<LegalRisksProps> = ({ onCtaClick }) => (
  <Section id="legal">
    <Container>
      <Header>
        <Label>Юридические и событийные риски</Label>
        <Title>4 отдельных модуля — не нужно объединять</Title>
        <Subtitle>
          Надзорные органы, арбитраж, суды и ФССП — разные источники сигналов с
          разной логикой. Каждый модуль подключается отдельно по 300 ₽/мес.
        </Subtitle>
      </Header>
      <Grid>
        {legalModules.map((m) => (
          <Card key={m.title}>
            <CardTop>
              <CardIconWrap>{m.icon}</CardIconWrap>
              <div style={{ textAlign: 'right' }}>
                <PriceTag>{m.price} ₽</PriceTag>
                <PriceSub>в месяц</PriceSub>
              </div>
            </CardTop>
            <CardTitle>{m.title}</CardTitle>
            <Distinction>{m.distinction}</Distinction>
            <CardText>{m.text}</CardText>
            <BulletList>
              {m.bullets.map((b) => (
                <Bullet key={b}>{b}</Bullet>
              ))}
            </BulletList>
          </Card>
        ))}
      </Grid>
      <ConnectRow>
        <Btn onClick={() => onCtaClick('Все 4 юридических модуля')}>
          Подключить все 4 модуля
        </Btn>
        <OutlineBtn onClick={() => onCtaClick('Юридические модули — Конструктор')}>
          Собрать свой набор
        </OutlineBtn>
      </ConnectRow>
    </Container>
  </Section>
)

export default LegalRisks
