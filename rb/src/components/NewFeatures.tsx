import React from 'react'
import styled from 'styled-components'

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

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
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

const StandaloneGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const StandaloneCard = styled.div<{ $color: 'purple' | 'warm' }>`
  background: ${({ $color, theme }) => $color === 'purple' ? theme.colors.primaryLighter : '#FFF8F0'};
  border: 2px solid ${({ $color, theme }) => $color === 'purple' ? theme.colors.primaryLight : '#FFD9A0'};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 2rem;
`

const StandaloneTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`

const StandaloneIcon = styled.div`
  font-size: 2rem;
`

const NewBadge = styled.span<{ $color: 'purple' | 'warm' }>`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.7rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $color, theme }) => $color === 'purple' ? theme.colors.primary : '#F59E0B'};
  color: white;
`

const StandaloneTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const StandalonePrice = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
`

const StandaloneText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray700};
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
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    flex-shrink: 0;
  }
`

const WorkflowTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;
  margin-bottom: 0.75rem;
`

const WorkflowSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray600};
  text-align: center;
  max-width: 560px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
`

const WorkflowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const WorkCard = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    background: white;
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`

const WorkIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`

const WorkTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.4rem;
`

const WorkText = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const workItems = [
  {
    icon: '💳',
    title: 'Подсказки при платежах',
    text: 'Сигнал появляется в форме платежа. Проверка операции и контрагента происходит автоматически — вы видите светофор до нажатия «Отправить».',
  },
  {
    icon: '📤',
    title: 'Загрузка документов',
    text: 'Налоговые документы из другого банка и документы по конкретным операциям загружаются прямо в сервис. Это снижает уровень риска.',
  },
  {
    icon: '🏦',
    title: 'Внешние банки',
    text: 'Подключите Т-Банк, Альфа Банк или Модульбанк — и сервис будет автоматически учитывать налоговую нагрузку из всех источников.',
  },
  {
    icon: '📦',
    title: 'Интеграция с 1С',
    text: 'Через расширение для 1С уровень риска видно прямо в интерфейсе 1С:Бухгалтерия предприятия и 1С:УНФ. Без переключения окон.',
  },
  {
    icon: '📊',
    title: 'История изменений',
    text: 'Лог всех событий по уровню риска: когда вырос, почему, что было сделано. Полная картина за весь период работы.',
  },
  {
    icon: '🔔',
    title: 'Мониторинг контрагентов',
    text: 'Изменился статус контрагента — вы получаете уведомление немедленно. Мониторинг работает без ограничений по количеству контрагентов.',
  },
]

const NewFeatures: React.FC = () => (
  <Section id="new-features">
    <Container>
      <Header>
        <Label>Отдельные модули и рабочий контур</Label>
        <Title>Самозанятые и дробление бизнеса</Title>
        <Subtitle>
          Два самостоятельных модуля, которые закрывают специфические зоны риска.
          Каждый подключается отдельно или как часть «Всё включено».
        </Subtitle>
      </Header>

      <StandaloneGrid>
        <StandaloneCard $color="warm">
          <StandaloneTop>
            <StandaloneIcon>👷</StandaloneIcon>
            <NewBadge $color="warm">750 ₽/мес</NewBadge>
          </StandaloneTop>
          <StandaloneTitle>Риски по самозанятым</StandaloneTitle>
          <StandalonePrice>750 ₽ / месяц</StandalonePrice>
          <StandaloneText>
            Если вы регулярно выплачиваете вознаграждения самозанятым, этот модуль
            поможет выстроить безопасную схему работы. Он не запрещает работать с НПД —
            он помогает делать это правильно. Модуль также доступен как быстрое
            отдельное подключение.
          </StandaloneText>
          <BulletList>
            <Bullet>Анализ паттернов выплат самозанятым</Bullet>
            <Bullet>Предупреждение о чувствительных сценариях</Bullet>
            <Bullet>Сигналы о регулярности и суммах выплат</Bullet>
            <Bullet>Проверка ИНН и документов по НПД</Bullet>
            <Bullet>Рекомендации по безопасному оформлению</Bullet>
          </BulletList>
        </StandaloneCard>

        <StandaloneCard $color="purple">
          <StandaloneTop>
            <StandaloneIcon>🧩</StandaloneIcon>
            <NewBadge $color="purple">750 ₽/мес</NewBadge>
          </StandaloneTop>
          <StandaloneTitle>Признаки дробления бизнеса</StandaloneTitle>
          <StandalonePrice>750 ₽ / месяц</StandalonePrice>
          <StandaloneText>
            Структура операций и счетов может выглядеть подозрительно — даже без умысла.
            Этот модуль показывает сигналы раннего внимания со стороны банка и регуляторов.
            Не доказывает дробление, а даёт возможность разобраться заблаговременно.
          </StandaloneText>
          <BulletList>
            <Bullet>Сигналы о паттернах, характерных для дробления</Bullet>
            <Bullet>Анализ связей между счетами и контрагентами</Bullet>
            <Bullet>Раннее предупреждение до обращения банка</Bullet>
            <Bullet>Рекомендации по корректировке структуры</Bullet>
            <Bullet>Объяснение каждого конкретного сигнала</Bullet>
          </BulletList>
        </StandaloneCard>
      </StandaloneGrid>

      <WorkflowTitle>Как сервис встраивается в работу</WorkflowTitle>
      <WorkflowSubtitle>
        Сервис не требует отдельного окна или отдельного времени.
        Он работает внутри вашего интернет-банка и встроен в привычные процессы.
      </WorkflowSubtitle>

      <WorkflowGrid>
        {workItems.map((w) => (
          <WorkCard key={w.title}>
            <WorkIcon>{w.icon}</WorkIcon>
            <WorkTitle>{w.title}</WorkTitle>
            <WorkText>{w.text}</WorkText>
          </WorkCard>
        ))}
      </WorkflowGrid>
    </Container>
  </Section>
)

export default NewFeatures
