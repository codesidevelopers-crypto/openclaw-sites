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
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
`

const MockWrap = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxxl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`

const MockHeader = styled.div`
  background: ${({ theme }) => theme.colors.gray900};
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Dot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

const MockBody = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Sidebar = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 1.5rem 1rem;
  background: ${({ theme }) => theme.colors.gray50};

  @media (max-width: 768px) {
    display: none;
  }
`

const SidebarTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray400};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
  padding: 0 0.5rem;
`

const SideItem = styled.div<{ $active?: boolean }>`
  padding: 0.6rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.82rem;
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.gray600};
  background: ${({ $active, theme }) => $active ? theme.colors.primaryLight : 'transparent'};
  margin-bottom: 0.25rem;
  cursor: pointer;
`

const Main = styled.div`
  padding: 1.5rem;
`

const MainTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StatCard = styled.div<{ $accent?: boolean }>`
  background: ${({ $accent, theme }) => $accent ? theme.colors.primaryLight : theme.colors.gray50};
  border: 1px solid ${({ $accent, theme }) => $accent ? theme.colors.primaryLight : theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.875rem;
`

const StatLabel = styled.div`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 0.3rem;
`

const StatValue = styled.div<{ $color?: string }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ $color, theme }) => $color || theme.colors.gray900};
`

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const AlertItem = styled.div<{ $type: 'ok' | 'warn' | 'info' }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $type, theme }) =>
    $type === 'ok' ? theme.colors.greenLight :
    $type === 'warn' ? theme.colors.yellowLight :
    theme.colors.primaryLighter};
  border: 1px solid ${({ $type, theme }) =>
    $type === 'ok' ? '#BBF7D0' :
    $type === 'warn' ? '#FDE68A' :
    theme.colors.primaryLight};
`

const AlertIcon = styled.div`
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 1px;
`

const AlertContent = styled.div`
  flex: 1;
`

const AlertTitle = styled.div`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 2px;
`

const AlertDesc = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.4;
`

const WhatVisible: React.FC = () => (
  <Section id="what-visible">
    <Container>
      <Header>
        <Label>Главный экран</Label>
        <Title>Что вы видите каждый день</Title>
        <Subtitle>
          Сервис встроен в ваш интернет-банк. Вы видите агрегированную картину
          рисков, уведомления и конкретные задачи — прямо в рабочем окне.
        </Subtitle>
      </Header>
      <MockWrap>
        <MockHeader>
          <Dot $color="#FF5F57" />
          <Dot $color="#FEBC2E" />
          <Dot $color="#28C840" />
        </MockHeader>
        <MockBody>
          <Sidebar>
            <SidebarTitle>Риски бизнеса</SidebarTitle>
            <SideItem $active>Главный экран</SideItem>
            <SideItem>Операции</SideItem>
            <SideItem>Контрагенты</SideItem>
            <SideItem>Надзорные органы</SideItem>
            <SideItem>Арбитраж</SideItem>
            <SideItem>Судебные дела</SideItem>
            <SideItem>ФССП</SideItem>
            <SideItem>Самозанятые</SideItem>
            <SideItem>Дробление бизнеса</SideItem>
          </Sidebar>
          <Main>
            <MainTitle>Обзор рисков · ООО «Ваша компания»</MainTitle>
            <StatRow>
              <StatCard $accent>
                <StatLabel>Общий риск</StatLabel>
                <StatValue $color="#0D9F6F">Низкий</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Уровень счёта</StatLabel>
                <StatValue>19%</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>До след. уровня</StatLabel>
                <StatValue>+18%</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Контрагентов</StatLabel>
                <StatValue>142</StatValue>
              </StatCard>
            </StatRow>
            <AlertList>
              <AlertItem $type="ok">
                <AlertIcon>✅</AlertIcon>
                <AlertContent>
                  <AlertTitle>Операции за последние 30 дней — в норме</AlertTitle>
                  <AlertDesc>Нетипичных операций не обнаружено. Налоговая нагрузка соответствует вашей отрасли.</AlertDesc>
                </AlertContent>
              </AlertItem>
              <AlertItem $type="warn">
                <AlertIcon>⚠️</AlertIcon>
                <AlertContent>
                  <AlertTitle>Контрагент ООО «Техснаб» — есть сигнал риска</AlertTitle>
                  <AlertDesc>Обнаружены признаки: задержка налоговой отчётности, долги в ФССП. Рекомендуем проверить до следующего платежа.</AlertDesc>
                </AlertContent>
              </AlertItem>
              <AlertItem $type="info">
                <AlertIcon>📋</AlertIcon>
                <AlertContent>
                  <AlertTitle>Загрузите документы по операции от 15.03</AlertTitle>
                  <AlertDesc>Операция выглядит нетипично — загрузка документов поможет снизить уровень риска по счёту.</AlertDesc>
                </AlertContent>
              </AlertItem>
              <AlertItem $type="ok">
                <AlertIcon>✅</AlertIcon>
                <AlertContent>
                  <AlertTitle>Арбитраж, суды, ФССП — без изменений</AlertTitle>
                  <AlertDesc>Новых дел и производств не зафиксировано. Последняя проверка: сегодня в 09:00.</AlertDesc>
                </AlertContent>
              </AlertItem>
            </AlertList>
          </Main>
        </MockBody>
      </MockWrap>
    </Container>
  </Section>
)

export default WhatVisible
