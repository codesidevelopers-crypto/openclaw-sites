import React from 'react'
import styled from 'styled-components'

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
  text-align: center;
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
`

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
`

const MockupShell = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xxl};
  box-shadow: ${({ theme }) => theme.shadow.xl};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`

const MockupBar = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 0.85rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const MockupDots = styled.div`
  display: flex;
  gap: 0.4rem;
`

const Dot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

const MockupTitle = styled.div`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray600};
  flex: 1;
  text-align: center;
`

const MockupBody = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 480px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

const Sidebar = styled.div`
  background: ${({ theme }) => theme.colors.primaryLighter};
  border-right: 1px solid ${({ theme }) => theme.colors.primaryLight};
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  @media (max-width: 860px) {
    display: none;
  }
`

const SidebarTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.75rem;
  margin-bottom: 0.35rem;
`

const SidebarItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $active, theme }) => $active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: background 0.15s;
`

const SidebarIcon = styled.span`
  font-size: 0.9rem;
  flex-shrink: 0;
`

const SidebarLabel = styled.span<{ $active?: boolean }>`
  font-size: 0.8rem;
  font-weight: ${({ $active }) => $active ? '700' : '500'};
  color: ${({ $active, theme }) => $active ? 'white' : theme.colors.gray700};
  line-height: 1.3;
`

const SidebarBadge = styled.span`
  margin-left: auto;
  background: #EF4444;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 99px;
  padding: 0.1rem 0.45rem;
`

const MainArea = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow: hidden;
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div<{ $accent?: boolean }>`
  background: ${({ $accent, theme }) => $accent ? theme.colors.primary : theme.colors.gray50};
  border: 1px solid ${({ $accent, theme }) => $accent ? theme.colors.primary : theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.1rem 1.25rem;
`

const StatLabel = styled.div<{ $accent?: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $accent, theme }) => $accent ? 'rgba(255,255,255,0.7)' : theme.colors.gray500};
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const StatValue = styled.div<{ $accent?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 900;
  color: ${({ $accent }) => $accent ? 'white' : undefined};
  color: ${({ $accent, theme }) => $accent ? 'white' : theme.colors.gray900};
  margin-bottom: 0.25rem;
`

const StatMeta = styled.div<{ $accent?: boolean }>`
  font-size: 0.72rem;
  color: ${({ $accent, theme }) => $accent ? 'rgba(255,255,255,0.65)' : theme.colors.gray500};
  line-height: 1.45;
`

const GaugeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.35rem;
`

const GaugeTrack = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255,255,255,0.25);
  border-radius: 99px;
  overflow: hidden;
`

const GaugeFill = styled.div<{ $pct: number; $color?: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color ?? 'white'};
  border-radius: 99px;
`

const GaugePct = styled.span<{ $accent?: boolean }>`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ $accent }) => $accent ? 'white' : undefined};
  flex-shrink: 0;
`

const NotificationPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
`

const PanelHeader = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 0.75rem 1.1rem;
  font-size: 0.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PanelHeaderRight = styled.span`
  font-size: 0.72rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray400};
`

const PanelBody = styled.div`
  display: flex;
  flex-direction: column;
`

interface NotifItem {
  tone: 'red' | 'yellow' | 'green' | 'violet'
  icon: string
  text: string
  sub: string
}

const NotifRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

  &:last-child {
    border-bottom: none;
  }
`

const NotifDot = styled.div<{ $tone: NotifItem['tone'] }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
  background: ${({ $tone }) =>
    $tone === 'red' ? '#EF4444' :
    $tone === 'yellow' ? '#F59E0B' :
    $tone === 'green' ? '#10B981' : '#7C3AED'};
`

const NotifText = styled.div`
  flex: 1;
`

const NotifMain = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 0.15rem;
`

const NotifSub = styled.div`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.gray500};
  line-height: 1.45;
`

const NotifTime = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.gray400};
  flex-shrink: 0;
  margin-top: 2px;
`

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const MiniPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
`

const MiniRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 1rem;
  font-size: 0.78rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  gap: 0.5rem;

  &:last-child {
    border-bottom: none;
  }
`

const MiniName = styled.span`
  color: ${({ theme }) => theme.colors.gray700};
  flex: 1;
`

const MiniBadge = styled.span<{ $tone: 'green' | 'yellow' | 'red' | 'violet' }>`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.18rem 0.5rem;
  border-radius: 99px;
  white-space: nowrap;
  background: ${({ $tone }) =>
    $tone === 'green' ? '#DCFCE7' :
    $tone === 'yellow' ? '#FEF3C7' :
    $tone === 'red' ? '#FEE2E2' : '#EDE9FE'};
  color: ${({ $tone }) =>
    $tone === 'green' ? '#15803D' :
    $tone === 'yellow' ? '#B45309' :
    $tone === 'red' ? '#B91C1C' : '#6D28D9'};
`

const CaptioneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Caption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
`

const CaptionIcon = styled.div`
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`

const CaptionText = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.4;
`

const notifs: NotifItem[] = [
  { tone: 'yellow', icon: '⚠️', text: 'Уровень риска по операциям вырос', sub: 'Новый параметр внимания: торговля без закупки. До следующего уровня риска: 9 п.', },
  { tone: 'violet', icon: '💜', text: 'Фиолетовая задача: загрузить документы', sub: 'Загрузите документы по налогам из другого банка, чтобы сервис точнее рассчитал риск.' },
  { tone: 'red', icon: '🔴', text: 'Новый контрагент: высокий риск', sub: 'ООО «Артём и партнёры» — обнаружены признаки: массовый адрес, исполнительные производства.' },
  { tone: 'green', icon: '✅', text: 'Надзорные органы: изменений нет', sub: 'Плановых проверок не запланировано. Мониторинг продолжается.' },
]

const WhatVisible: React.FC = () => (
  <Section id="main-screen">
    <Container>
      <Header>
        <SectionLabel>Главный экран сервиса</SectionLabel>
        <Title>Что вы видите, когда открываете «Риски бизнеса»</Title>
        <Subtitle>
          Все ключевые показатели — в одном окне интернет-банка. Общий уровень риска,
          уведомления об изменениях, сигналы по контрагентам и задачи — сразу при открытии.
        </Subtitle>
      </Header>

      <MockupShell>
        <MockupBar>
          <MockupDots>
            <Dot $color="#FF5F57" />
            <Dot $color="#FFBD2E" />
            <Dot $color="#28C840" />
          </MockupDots>
          <MockupTitle>Точка · Риски бизнеса — главный экран</MockupTitle>
        </MockupBar>
        <MockupBody>
          <Sidebar>
            <SidebarTitle>Модули</SidebarTitle>
            <SidebarItem $active>
              <SidebarIcon>📈</SidebarIcon>
              <SidebarLabel $active>Риски по операциям</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>🔎</SidebarIcon>
              <SidebarLabel>Контрагенты</SidebarLabel>
              <SidebarBadge>1</SidebarBadge>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>🏛️</SidebarIcon>
              <SidebarLabel>Надзорные органы</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>⚖️</SidebarIcon>
              <SidebarLabel>Арбитражные дела</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>📋</SidebarIcon>
              <SidebarLabel>Судебные дела</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>📂</SidebarIcon>
              <SidebarLabel>Исп. производства</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>👷</SidebarIcon>
              <SidebarLabel>Самозанятые</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>🔀</SidebarIcon>
              <SidebarLabel>Дробление бизнеса</SidebarLabel>
            </SidebarItem>
          </Sidebar>
          <MainArea>
            <TopRow>
              <StatCard $accent>
                <StatLabel $accent>Общий уровень риска</StatLabel>
                <StatValue $accent>Средний</StatValue>
                <GaugeRow>
                  <GaugeTrack>
                    <GaugeFill $pct={61} />
                  </GaugeTrack>
                  <GaugePct $accent>61%</GaugePct>
                </GaugeRow>
                <StatMeta $accent>До следующего уровня риска: 9 п.</StatMeta>
              </StatCard>
              <StatCard>
                <StatLabel>Контрагенты под наблюдением</StatLabel>
                <StatValue>48</StatValue>
                <GaugeRow>
                  <GaugeTrack>
                    <GaugeFill $pct={38} $color="#EF4444" />
                  </GaugeTrack>
                  <GaugePct>38% с изм.</GaugePct>
                </GaugeRow>
                <StatMeta>Мониторинг без ограничений</StatMeta>
              </StatCard>
              <StatCard>
                <StatLabel>Юридические события</StatLabel>
                <StatValue>0 новых</StatValue>
                <StatMeta>Арбитраж · Суды · ФССП · Надзор — всё без изменений</StatMeta>
              </StatCard>
            </TopRow>

            <NotificationPanel>
              <PanelHeader>
                Уведомления и задачи
                <PanelHeaderRight>сегодня</PanelHeaderRight>
              </PanelHeader>
              <PanelBody>
                {notifs.map((n, i) => (
                  <NotifRow key={i}>
                    <NotifDot $tone={n.tone} />
                    <NotifText>
                      <NotifMain>{n.text}</NotifMain>
                      <NotifSub>{n.sub}</NotifSub>
                    </NotifText>
                    <NotifTime>{i === 0 ? '10:42' : i === 1 ? '10:40' : i === 2 ? 'вчера' : 'вчера'}</NotifTime>
                  </NotifRow>
                ))}
              </PanelBody>
            </NotificationPanel>

            <BottomRow>
              <MiniPanel>
                <PanelHeader>
                  Риск по типам операций
                  <PanelHeaderRight>полная версия</PanelHeaderRight>
                </PanelHeader>
                <PanelBody>
                  <MiniRow>
                    <MiniName>Налоговая нагрузка</MiniName>
                    <MiniBadge $tone="yellow">Внимание</MiniBadge>
                  </MiniRow>
                  <MiniRow>
                    <MiniName>Переводы физлицам</MiniName>
                    <MiniBadge $tone="yellow">Внимание</MiniBadge>
                  </MiniRow>
                  <MiniRow>
                    <MiniName>Торговля без закупки</MiniName>
                    <MiniBadge $tone="red">Сигнал</MiniBadge>
                  </MiniRow>
                  <MiniRow>
                    <MiniName>Операции с контрагентами</MiniName>
                    <MiniBadge $tone="green">Норма</MiniBadge>
                  </MiniRow>
                </PanelBody>
              </MiniPanel>
              <MiniPanel>
                <PanelHeader>
                  Действия и документы
                  <PanelHeaderRight>требуют внимания</PanelHeaderRight>
                </PanelHeader>
                <PanelBody>
                  <MiniRow>
                    <MiniName>Загрузить документы по налогам</MiniName>
                    <MiniBadge $tone="violet">Задача</MiniBadge>
                  </MiniRow>
                  <MiniRow>
                    <MiniName>Подключить интеграцию с Альфа</MiniName>
                    <MiniBadge $tone="yellow">Рекомендация</MiniBadge>
                  </MiniRow>
                  <MiniRow>
                    <MiniName>История изменений риска</MiniName>
                    <MiniBadge $tone="green">Доступна</MiniBadge>
                  </MiniRow>
                  <MiniRow>
                    <MiniName>Рекомендации для отрасли</MiniName>
                    <MiniBadge $tone="green">Обновлено</MiniBadge>
                  </MiniRow>
                </PanelBody>
              </MiniPanel>
            </BottomRow>
          </MainArea>
        </MockupBody>
      </MockupShell>

      <CaptioneGrid>
        <Caption>
          <CaptionIcon>📊</CaptionIcon>
          <CaptionText>Общий уровень риска и счётчик до следующего</CaptionText>
        </Caption>
        <Caption>
          <CaptionIcon>🔔</CaptionIcon>
          <CaptionText>Уведомления об изменениях и задачи</CaptionText>
        </Caption>
        <Caption>
          <CaptionIcon>🔀</CaptionIcon>
          <CaptionText>Риски по типам операций и факторы</CaptionText>
        </Caption>
        <Caption>
          <CaptionIcon>📁</CaptionIcon>
          <CaptionText>Документы, интеграции и рекомендации</CaptionText>
        </Caption>
      </CaptioneGrid>
    </Container>
  </Section>
)

export default WhatVisible
