import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Case {
  tag: string
  title: string
  problem: string
  solution: string
  result: string
  metric: string
  metricLabel: string
  industry: string
}

const CASES: Case[] = [
  {
    tag: 'Финансовые риски',
    title: 'Производственная компания: устранение кассового разрыва',
    problem: 'Завод с оборотом 85 млн руб/год находился на грани остановки — кассовый разрыв составил 12 млн руб из-за неравномерных платежей от крупных контрагентов.',
    solution: 'Провели реструктуризацию договоров с авансовыми условиями, внедрили казначейскую модель прогнозирования, открыли кредитную линию как буфер.',
    result: 'За 45 дней кассовый разрыв был закрыт. Компания создала финансовый резерв на 2 месяца работы.',
    metric: '−12 млн',
    metricLabel: 'кассовый разрыв',
    industry: 'Производство',
  },
  {
    tag: 'Юридические риски',
    title: 'Торговая сеть: защита от налоговых претензий',
    problem: 'Сеть из 8 магазинов получила уведомление о налоговой проверке. Риск доначисления составлял до 18 млн руб из-за схемы работы с поставщиками.',
    solution: 'Экстренный юридический аудит документооборота, переструктурирование контрагентской базы, подготовка защитного досье для налоговой.',
    result: 'Проверка завершена без существенных претензий. Доначисления составили менее 800 тыс. руб. вместо прогнозируемых 18 млн.',
    metric: '−96%',
    metricLabel: 'сокращение претензий',
    industry: 'Торговля',
  },
  {
    tag: 'Операционные риски',
    title: 'IT-компания: диверсификация от ключевого клиента',
    problem: 'Компания получала 68% выручки от одного клиента. Когда тот объявил о смене поставщика, бизнес оказался под угрозой закрытия.',
    solution: 'Разработали план диверсификации на 6 месяцев: новые каналы продаж, пакетизация услуг, программа retention для текущих клиентов.',
    result: 'Через 6 месяцев доля крупнейшего клиента снизилась до 31%. Общая выручка выросла на 23% за счёт новых контрактов.',
    metric: '+23%',
    metricLabel: 'рост выручки',
    industry: 'IT-услуги',
  },
]

const Section = styled.section`
  padding: 7rem 2rem;
  background: ${({ theme }) => theme.colors.bg};
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
  margin-bottom: 0.75rem;
`

const SectionDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
  max-width: 520px;
  margin: 0 auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }
`

interface CardProps {
  $visible: boolean
  $delay: number
}

const Card = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '28px')});
  transition: opacity 0.6s ease ${({ $delay }) => $delay}ms,
    transform 0.6s ease ${({ $delay }) => $delay}ms,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.card};
  }
`

const CardTop = styled.div`
  padding: 1.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Tag = styled.div`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.borderGold};
  background: ${({ theme }) => theme.colors.goldDim};
  padding: 0.2rem 0.6rem;
  margin-bottom: 0.75rem;
`

const Industry = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  float: right;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const CaseTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.4;
`

const CardBody = styled.div`
  padding: 1.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const RowLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.3rem;
`

const RowText = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.55;
`

const CardMetric = styled.div`
  padding: 1.25rem 1.75rem;
  background: ${({ theme }) => theme.colors.goldDim};
  border-top: 1px solid ${({ theme }) => theme.colors.borderGold};
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`

const MetricNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gold};
`

const MetricLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSub};
`

const Cases: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="cases">
      <Container>
        <SectionHeader>
          <SectionLabel>Результаты</SectionLabel>
          <SectionTitle>Кейсы наших клиентов</SectionTitle>
          <SectionDesc>
            Реальные истории того, как управление рисками спасло бизнес от серьёзных потерь
          </SectionDesc>
        </SectionHeader>

        <Grid ref={ref}>
          {CASES.map((c, i) => (
            <Card key={c.title} $visible={visible} $delay={i * 120}>
              <CardTop>
                <div style={{ overflow: 'hidden' }}>
                  <Industry>{c.industry}</Industry>
                  <Tag>{c.tag}</Tag>
                </div>
                <CaseTitle>{c.title}</CaseTitle>
              </CardTop>
              <CardBody>
                <div>
                  <RowLabel>Проблема</RowLabel>
                  <RowText>{c.problem}</RowText>
                </div>
                <div>
                  <RowLabel>Решение</RowLabel>
                  <RowText>{c.solution}</RowText>
                </div>
                <div>
                  <RowLabel>Результат</RowLabel>
                  <RowText>{c.result}</RowText>
                </div>
              </CardBody>
              <CardMetric>
                <MetricNum>{c.metric}</MetricNum>
                <MetricLabel>{c.metricLabel}</MetricLabel>
              </CardMetric>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default Cases
