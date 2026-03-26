import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
`

interface RiskModule {
  icon: string
  title: string
  subtitle: string
  items: string[]
  accentColor: string
}

const MODULES: RiskModule[] = [
  {
    icon: '🏦',
    title: 'Финансовые риски',
    subtitle: 'Угрозы денежному потоку',
    items: ['Кассовые разрывы', 'Кредитная нагрузка', 'Валютные риски', 'Налоговые претензии'],
    accentColor: '#C94C4C',
  },
  {
    icon: '⚖️',
    title: 'Юридические риски',
    subtitle: 'Регуляторное давление',
    items: ['Проверки и штрафы', 'Изменения законодательства', 'Корпоративные споры', 'Лицензионные риски'],
    accentColor: '#C98A4C',
  },
  {
    icon: '🤝',
    title: 'Партнёрские риски',
    subtitle: 'Уязвимости в цепочке',
    items: ['Недобросовестные контрагенты', 'Зависимость от поставщиков', 'Слабые договоры', 'Концентрация клиентов'],
    accentColor: '#C9A84C',
  },
  {
    icon: '👥',
    title: 'Кадровые риски',
    subtitle: 'Человеческий фактор',
    items: ['Текучесть ключевых сотрудников', 'Трудовые споры', 'Потеря компетенций', 'Зависимость от одного специалиста'],
    accentColor: '#4C8AC9',
  },
  {
    icon: '🌐',
    title: 'Цифровые и IT риски',
    subtitle: 'Технологические угрозы',
    items: ['Утечки данных', 'Кибератаки', 'IT-зависимость', 'Несоответствие 152-ФЗ'],
    accentColor: '#4CC97A',
  },
  {
    icon: '🏭',
    title: 'Операционные риски',
    subtitle: 'Сбои в процессах',
    items: ['Логистические цепочки', 'Производственные остановки', 'Форс-мажор', 'Репутационные риски'],
    accentColor: '#9A4CC9',
  },
]

const Section = styled.section`
  padding: 7rem 2rem;
  background: ${({ theme }) => theme.colors.bgDeep};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.borderGold},
      transparent
    );
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const SectionLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1rem;
`

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1rem;
`

const SectionDesc = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textSub};
  max-width: 560px;
  margin: 0 auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

interface CardProps {
  $accentColor: string
  $visible: boolean
  $delay: number
}

const Card = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ $accentColor }) => $accentColor};
  padding: 1.75rem;
  cursor: default;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '24px')});
  transition: opacity 0.6s ease ${({ $delay }) => $delay}ms,
    transform 0.6s ease ${({ $delay }) => $delay}ms,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.card};
    border-color: ${({ $accentColor }) => $accentColor};
    border-left-color: ${({ $accentColor }) => $accentColor};
    background: ${({ theme }) => theme.colors.surface2};
  }
`

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.25rem;
`

const CardSubtitle = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1.25rem;
`

const CardDivider = styled.div<{ $color: string }>`
  height: 1px;
  background: ${({ $color }) => $color};
  opacity: 0.3;
  margin-bottom: 1.25rem;
`

const ItemList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Item = styled.li<{ $color: string }>`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textSub};
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
  }
`

const RiskModules: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(MODULES.length).fill(false))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(new Array(MODULES.length).fill(true))
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Section id="risks" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionLabel>Зоны уязвимости</SectionLabel>
          <SectionTitle>Шесть модулей риска</SectionTitle>
          <SectionDesc>
            Комплексный охват всех критических областей вашего бизнеса — от финансов до операций
          </SectionDesc>
        </SectionHeader>
        <Grid>
          {MODULES.map((mod, i) => (
            <Card
              key={mod.title}
              $accentColor={mod.accentColor}
              $visible={visibleCards[i] ?? false}
              $delay={i * 80}
            >
              <CardIcon>{mod.icon}</CardIcon>
              <CardTitle>{mod.title}</CardTitle>
              <CardSubtitle>{mod.subtitle}</CardSubtitle>
              <CardDivider $color={mod.accentColor} />
              <ItemList>
                {mod.items.map((item) => (
                  <Item key={item} $color={mod.accentColor}>
                    {item}
                  </Item>
                ))}
              </ItemList>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default RiskModules
