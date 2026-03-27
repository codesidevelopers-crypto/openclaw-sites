import React, { useState } from 'react'
import styled from 'styled-components'

interface OperationsDetailProps {
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
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
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
  font-size: clamp(1.75rem, 3.5vw, 2.6rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
`

const SubText = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.gray700};
  max-width: 680px;
  line-height: 1.7;
`

const VersionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const VersionCard = styled.div<{ $featured?: boolean }>`
  background: ${({ $featured }) => $featured ? '#6C47FF' : 'white'};
  border: 2px solid ${({ $featured }) => $featured ? '#6C47FF' : '#E2E2EE'};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.75rem;
`

const VersionLabel = styled.div<{ $featured?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.2)' : '#E2E2EE'};
  color: ${({ $featured }) => $featured ? 'white' : '#5A5A6F'};
  margin-bottom: 0.875rem;
`

const VersionTitle = styled.h3<{ $featured?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ $featured }) => $featured ? 'white' : '#111118'};
  margin-bottom: 0.4rem;
`

const VersionPrice = styled.div<{ $featured?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ $featured }) => $featured ? 'white' : '#0D9F6F'};
  margin-bottom: 1rem;
`

const FeatureList = styled.ul<{ $featured?: boolean }>`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Feature = styled.li<{ $featured?: boolean }>`
  font-size: 0.85rem;
  color: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.9)' : '#3A3A4F'};
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;

  &::before {
    content: '✓';
    color: ${({ $featured }) => $featured ? '#A5F3FC' : '#0D9F6F'};
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const DetailCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`

const DetailIcon = styled.div`
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
`

const DetailTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.4rem;
`

const DetailText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const SignalSection = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.75rem;
  margin-bottom: 1.5rem;
`

const SignalTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const SignalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SignalCard = styled.div<{ $level: 'warn' | 'danger' | 'info' }>`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $level, theme }) =>
    $level === 'warn' ? theme.colors.yellowLight :
    $level === 'danger' ? theme.colors.redLight :
    theme.colors.primaryLighter};
  border: 1px solid ${({ $level }) =>
    $level === 'warn' ? '#FDE68A' :
    $level === 'danger' ? '#FECACA' :
    '#DDD6FE'};
`

const SignalName = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.3rem;
`

const SignalDesc = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.5;
`

const IntegGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const IntegCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem;
`

const IntegTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const IntegText = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const IntegTags = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.6rem;
`

const IntegTag = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
`

const HintBlock = styled.div`
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.75rem;
  margin-bottom: 1.5rem;
`

const HintTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const HintRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const Hint = styled.div<{ $color: 'green' | 'yellow' | 'red' }>`
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $color, theme }) =>
    $color === 'green' ? theme.colors.greenLight :
    $color === 'yellow' ? theme.colors.yellowLight :
    theme.colors.redLight};
`

const HintDot = styled.div<{ $color: 'green' | 'yellow' | 'red' }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
  background: ${({ $color, theme }) =>
    $color === 'green' ? theme.colors.green :
    $color === 'yellow' ? theme.colors.yellow :
    theme.colors.red};
`

const HintText = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray800};
  line-height: 1.5;
`

const VioletBlock = styled.div`
  background: ${({ theme }) => theme.colors.violetLight};
  border: 1.5px solid #C4B5FD;
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

const VioletIcon = styled.div`
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.violet};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`

const VioletContent = styled.div``

const VioletTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.4rem;
`

const VioletText = styled.p`
  font-size: 0.87rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.6;
`

const CtaRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const PrimaryBtn = styled.button`
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

const details = [
  { icon: '📈', title: 'Общий риск-датчик', text: 'Спидометр уровня риска по счёту. Показывает % и уровень: низкий, средний, высокий, критичный.' },
  { icon: '🔔', title: 'Уведомления об изменениях', text: 'Пуш-уведомления при росте риска, новых сигналах или изменении уровня по счёту.' },
  { icon: '📋', title: 'Риски по типам операций', text: 'Сервис разбивает операции по категориям и показывает уровень риска по каждой.' },
  { icon: '📏', title: 'До следующего уровня', text: 'Показывает, сколько процентов осталось до следующего уровня риска — и что для этого нужно.' },
  { icon: '💡', title: 'Рекомендации и задачи', text: 'Конкретные действия: что загрузить, что объяснить, что изменить — с приоритетом.' },
  { icon: '📂', title: 'История изменений', text: 'Лог всех событий: когда вырос риск, что было причиной, какие документы загружены.' },
  { icon: '🔬', title: 'Нетипичные операции', text: 'Автоматически выделяет операции, которые выглядят нестандартно для вашей отрасли.' },
  { icon: '📜', title: 'Правила и рекомендации по отрасли', text: 'Сервис знает вашу сферу и показывает отраслевые нормы — торговля, услуги, производство.' },
  { icon: '📤', title: 'Загрузка документов', text: 'Документы по налогам из другого банка и по другим операциям — загружайте прямо в сервис.' },
]

const OperationsDetail: React.FC<OperationsDetailProps> = ({ onCtaClick }) => {
  const [activeTab, setActiveTab] = useState<'base' | 'full'>('full')

  return (
    <Section id="operations">
      <Container>
        <Header>
          <Label>Риски по операциям</Label>
          <Title>Главный модуль — полная картина по счёту</Title>
          <SubText>
            Самый сложный и информативный модуль сервиса. Показывает общий уровень
            риска, нетипичные операции, налоговую нагрузку и многое другое. Базовая
            версия бесплатна, полная — открывает все возможности.
          </SubText>
        </Header>

        <VersionGrid>
          <VersionCard>
            <VersionLabel>Бесплатно</VersionLabel>
            <VersionTitle>Базовая версия</VersionTitle>
            <VersionPrice $color="#0D9F6F">Бесплатно · авто</VersionPrice>
            <FeatureList>
              <Feature>Общий индикатор риска по счёту</Feature>
              <Feature>Базовые уведомления об изменениях</Feature>
              <Feature>Краткие рекомендации по снижению риска</Feature>
              <Feature>Подключена автоматически всем клиентам Точки</Feature>
            </FeatureList>
          </VersionCard>
          <VersionCard $featured>
            <VersionLabel $featured>Полная версия</VersionLabel>
            <VersionTitle $featured>Расширенная аналитика</VersionTitle>
            <VersionPrice $featured>1 900 ₽ / месяц</VersionPrice>
            <FeatureList>
              <Feature $featured>Детальный риск-датчик с уровнями и процентами</Feature>
              <Feature $featured>Риски по типам операций с расшифровкой</Feature>
              <Feature $featured>«До следующего уровня» с объяснением</Feature>
              <Feature $featured>Подсказки при создании платежа (в реальном времени)</Feature>
              <Feature $featured>Нетипичные операции: торговля без закупки, разрыв НДС, оптимизация налогов</Feature>
              <Feature $featured>Детальные рекомендации и фиолетовая задача при высоком риске</Feature>
              <Feature $featured>Загрузка документов по налогам из другого банка</Feature>
              <Feature $featured>Загрузка документов по другим операциям</Feature>
              <Feature $featured>История изменений уровня риска</Feature>
              <Feature $featured>Интеграция с Т-Банком, Альфа Банком, Модульбанком</Feature>
              <Feature $featured>Интеграция в 1С:Бухгалтерия предприятия и 1С:УНФ</Feature>
              <Feature $featured>Правила безопасной работы по отрасли</Feature>
            </FeatureList>
          </VersionCard>
        </VersionGrid>

        <HintBlock>
          <HintTitle>Подсказки в платежах — работают в реальном времени</HintTitle>
          <HintRow>
            <Hint $color="green">
              <HintDot $color="green" />
              <HintText>
                <strong>Зелёный сигнал</strong> — операция выглядит стандартно для вашего профиля. Всё в норме.
              </HintText>
            </Hint>
            <Hint $color="yellow">
              <HintDot $color="yellow" />
              <HintText>
                <strong>Жёлтый сигнал</strong> — стоит обратить внимание. Операция выглядит нетипично или контрагент вызывает вопросы. Сервис подскажет, что сделать: загрузить документы, уточнить назначение платежа.
              </HintText>
            </Hint>
            <Hint $color="red">
              <HintDot $color="red" />
              <HintText>
                <strong>Красный сигнал</strong> — высокий риск операции. Рекомендуем не торопиться, изучить детали и при необходимости получить консультацию комплаенс-эксперта.
              </HintText>
            </Hint>
          </HintRow>
        </HintBlock>

        <VioletBlock>
          <VioletIcon>🟣</VioletIcon>
          <VioletContent>
            <VioletTitle>Фиолетовая задача при высоком и критичном риске</VioletTitle>
            <VioletText>
              Когда уровень риска достигает высокого или критичного значения, сервис создаёт фиолетовую задачу —
              особый приоритетный сигнал в интерфейсе банка. Это не просто уведомление: задача включает конкретные
              шаги, документы и пояснения. Пропустить её невозможно.
            </VioletText>
          </VioletContent>
        </VioletBlock>

        <SignalSection>
          <SignalTitle>Примеры сигналов нетипичных операций</SignalTitle>
          <SignalGrid>
            <SignalCard $level="warn">
              <SignalName>Торговля без закупки</SignalName>
              <SignalDesc>Компания продаёт товары, но входящих операций на закупку нет или они аномально малы.</SignalDesc>
            </SignalCard>
            <SignalCard $level="danger">
              <SignalName>Разрыв НДС</SignalName>
              <SignalDesc>Операции указывают на возможный разрыв НДС в цепочке. Сигнал требует внимания до следующей отчётной кампании.</SignalDesc>
            </SignalCard>
            <SignalCard $level="info">
              <SignalName>Оптимизация налогов</SignalName>
              <SignalDesc>Паттерн операций может восприниматься как агрессивная налоговая оптимизация. Сервис покажет конкретные сигналы.</SignalDesc>
            </SignalCard>
          </SignalGrid>
        </SignalSection>

        <DetailGrid>
          {details.map((d) => (
            <DetailCard key={d.title}>
              <DetailIcon>{d.icon}</DetailIcon>
              <DetailTitle>{d.title}</DetailTitle>
              <DetailText>{d.text}</DetailText>
            </DetailCard>
          ))}
        </DetailGrid>

        <IntegGrid>
          <IntegCard>
            <IntegTitle>
              🏦 Интеграции с другими банками
            </IntegTitle>
            <IntegText>
              Часть операций проходит вне Точки? Подключите интеграцию — и сервис будет учитывать
              налоговую нагрузку полностью, без ручной загрузки документов каждый раз.
            </IntegText>
            <IntegTags>
              <IntegTag>Т-Банк</IntegTag>
              <IntegTag>Альфа Банк</IntegTag>
              <IntegTag>Модульбанк</IntegTag>
            </IntegTags>
          </IntegCard>
          <IntegCard>
            <IntegTitle>
              📦 Интеграция в 1С
            </IntegTitle>
            <IntegText>
              Подключается через расширение. После установки уровень риска и задачи видны
              прямо в 1С — не нужно переключаться между системами.
            </IntegText>
            <IntegTags>
              <IntegTag>1С:Бухгалтерия предприятия</IntegTag>
              <IntegTag>1С:УНФ</IntegTag>
            </IntegTags>
          </IntegCard>
        </IntegGrid>

        <CtaRow>
          <PrimaryBtn onClick={() => onCtaClick('Риски по операциям — подключить полную версию')}>
            Подключить полную версию — 1 900 ₽/мес
          </PrimaryBtn>
        </CtaRow>
      </Container>
    </Section>
  )
}

export default OperationsDetail
