import React from 'react'
import styled from 'styled-components'

interface ProductsProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.white};

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
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div<{ $accent?: boolean }>`
  background: ${({ $accent, theme }) => $accent ? theme.colors.primaryLighter : theme.colors.gray50};
  border: 1.5px solid ${({ $accent, theme }) => $accent ? theme.colors.primaryLight : theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    background: ${({ theme }) => theme.colors.white};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.875rem;
`

const CardIcon = styled.div`
  font-size: 1.5rem;
`

const PricePill = styled.span<{ $free?: boolean }>`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $free, theme }) => $free ? theme.colors.greenLight : theme.colors.primaryLight};
  color: ${({ $free, theme }) => $free ? theme.colors.green : theme.colors.primaryDark};
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.98rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`

const CardText = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const FreeBanner = styled.div`
  background: ${({ theme }) => theme.colors.greenLight};
  border: 1px solid #BBF7D0;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`

const FreeBannerText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.green};
  }
`

interface Product {
  icon: string
  title: string
  text: string
  price: string
  free?: boolean
  accent?: boolean
}

const products: Product[] = [
  {
    icon: '📊',
    title: 'Риски по операциям',
    text: 'Общий уровень риска счёта, аналитика по операциям, рекомендации и интеграции.',
    price: '1 900 ₽/мес',
    accent: true,
  },
  {
    icon: '🔍',
    title: 'Риски по контрагентам',
    text: 'Проверка компаний и ИП, мониторинг изменений, сигналы до отправки платежа.',
    price: '1 200 ₽/мес',
  },
  {
    icon: '🏛️',
    title: 'Надзорные органы',
    text: 'Уведомления о плановых и внеплановых проверках от ФНС, Роструда, Прокуратуры и других.',
    price: '300 ₽/мес',
  },
  {
    icon: '⚖️',
    title: 'Арбитражные дела',
    text: 'Мониторинг дел в арбитражных судах. Иски, жалобы и производства по вашей компании.',
    price: '300 ₽/мес',
  },
  {
    icon: '🏢',
    title: 'Судебные дела',
    text: 'Суды общей юрисдикции — отдельный контур. Дела с участием физлиц, собственников, директоров.',
    price: '300 ₽/мес',
  },
  {
    icon: '🔒',
    title: 'Исполнительные производства',
    text: 'Мониторинг ФССП. Узнайте об открытых производствах против вас и ваших контрагентов.',
    price: '300 ₽/мес',
  },
  {
    icon: '👷',
    title: 'Риски по самозанятым',
    text: 'Анализ выплат самозанятым, предупреждение о сигналах налоговой. Безопасная работа с НПД.',
    price: '750 ₽/мес',
  },
  {
    icon: '🧩',
    title: 'Признаки дробления бизнеса',
    text: 'Сигналы, которые могут привлечь внимание банка и регуляторов. Раннее предупреждение.',
    price: '750 ₽/мес',
  },
]

const Products: React.FC<ProductsProps> = ({ onCtaClick }) => (
  <Section id="products">
    <Container>
      <Header>
        <Label>Продуктовые модули</Label>
        <Title>8 модулей — всё в одном сервисе</Title>
        <Subtitle>
          Каждый модуль решает конкретную задачу. Подключайте все сразу в формате
          «Всё включено» или собирайте нужный набор через Конструктор.
        </Subtitle>
      </Header>
      <Grid>
        {products.map((p) => (
          <Card
            key={p.title}
            $accent={p.accent}
            onClick={() => onCtaClick(`Модуль: ${p.title}`)}
          >
            <CardHeader>
              <CardIcon>{p.icon}</CardIcon>
              <PricePill>{p.price}</PricePill>
            </CardHeader>
            <CardTitle>{p.title}</CardTitle>
            <CardText>{p.text}</CardText>
          </Card>
        ))}
      </Grid>
      <FreeBanner>
        <span style={{ fontSize: '1.5rem' }}>🎁</span>
        <FreeBannerText>
          <strong>Базовая версия «Рисков по операциям» — бесплатно</strong>{' '}
          и подключена автоматически всем клиентам Точки. Полная версия с расширенной аналитикой,
          интеграциями и 1С — платная (1 900 ₽/мес).
        </FreeBannerText>
      </FreeBanner>
    </Container>
  </Section>
)

export default Products
