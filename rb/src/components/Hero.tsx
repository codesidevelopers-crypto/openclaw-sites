import React from 'react'
import styled, { keyframes } from 'styled-components'

interface HeroProps {
  onCtaClick: () => void
}

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(150deg, #F8F6FF 0%, #EEE8FF 35%, #FAFAFA 70%, #FFFFFF 100%);
  display: flex;
  align-items: center;
  padding: 7rem 2rem 4rem;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -300px;
    right: -200px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(108,71,255,0.10) 0%, transparent 65%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -150px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(108,71,255,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
    min-height: auto;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const Left = styled.div``

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.4rem 1.1rem;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 1.75rem;
  letter-spacing: 0.01em;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.1rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  line-height: 1.12;
  margin-bottom: 1.4rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.75;
  margin-bottom: 2rem;
  max-width: 520px;
`

const Benefits = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
`

const Benefit = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 500;
`

const BenefitCheck = styled.span`
  width: 22px;
  height: 22px;
  background: ${({ theme }) => theme.colors.greenLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.green};
  font-weight: 800;
`

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const PrimaryBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.9rem 2.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  box-shadow: ${({ theme }) => theme.shadow.purple};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.purpleHover};
  }
`

const SecondaryBtn = styled.a`
  border: 1.5px solid ${({ theme }) => theme.colors.gray300};
  background: white;
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.9rem 2.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Right = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 968px) {
    display: none;
  }
`

const Dashboard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xxxl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow.xl};
  width: 360px;
  animation: ${float} 5s ease-in-out infinite;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`

const DashTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`

const DashTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
`

const LevelBadge = styled.span<{ $level: 'low' | 'medium' | 'high' }>`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $level, theme }) =>
    $level === 'low' ? theme.colors.greenLight :
    $level === 'medium' ? theme.colors.yellowLight :
    theme.colors.redLight};
  color: ${({ $level, theme }) =>
    $level === 'low' ? theme.colors.green :
    $level === 'medium' ? theme.colors.yellow :
    theme.colors.red};
`

const Gauge = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.875rem 1rem;
  margin-bottom: 1rem;
`

const GaugeLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 0.5rem;
`

const GaugeBar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.full};
  overflow: hidden;
`

const GaugeFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.radius.full};
  transition: width 1s ease;
`

const DashRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const DashRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.875rem;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLighter};
  }
`

const Dot = styled.div<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

const RowText = styled.div`
  flex: 1;
`

const RowName = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 1px;
`

const RowSub = styled.div`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.gray500};
`

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => (
  <Section id="hero">
    <Container>
      <Left>
        <Badge>Сервис Точка Банк · 115-ФЗ и не только</Badge>
        <Title>
          Держи риски бизнеса{' '}
          <span>под контролем</span> — до того, как стало поздно
        </Title>
        <Subtitle>
          «Риски бизнеса» — сервис раннего предупреждения внутри вашего
          интернет-банка. Операции, контрагенты, суды, самозанятые — одно
          окно вместо десятка инструментов.
        </Subtitle>
        <Benefits>
          <Benefit>
            <BenefitCheck>✓</BenefitCheck>
            Предупреждает о рисках до создания платежа
          </Benefit>
          <Benefit>
            <BenefitCheck>✓</BenefitCheck>
            Безлимитные проверки и мониторинг контрагентов
          </Benefit>
          <Benefit>
            <BenefitCheck>✓</BenefitCheck>
            Суды, ФССП и надзорные органы — первыми
          </Benefit>
          <Benefit>
            <BenefitCheck>✓</BenefitCheck>
            Интеграция с другими банками и 1С
          </Benefit>
        </Benefits>
        <Buttons>
          <PrimaryBtn onClick={onCtaClick}>Подключить сервис</PrimaryBtn>
          <SecondaryBtn href="#products">Смотреть модули →</SecondaryBtn>
        </Buttons>
      </Left>
      <Right>
        <Dashboard>
          <DashTop>
            <DashTitle>Риски бизнеса</DashTitle>
            <LevelBadge $level="low">Низкий</LevelBadge>
          </DashTop>
          <Gauge>
            <GaugeLabel>
              <span>Общий уровень риска по счёту</span>
              <span>19%</span>
            </GaugeLabel>
            <GaugeBar>
              <GaugeFill $pct={19} $color="#0D9F6F" />
            </GaugeBar>
          </Gauge>
          <DashRows>
            <DashRow>
              <Dot $color="#0D9F6F" />
              <RowText>
                <RowName>Операции по счёту</RowName>
                <RowSub>Всё в норме · рекомендации выполнены</RowSub>
              </RowText>
            </DashRow>
            <DashRow>
              <Dot $color="#E8951A" />
              <RowText>
                <RowName>Контрагент ООО «Техснаб»</RowName>
                <RowSub>Риск-сигнал · стоит проверить перед оплатой</RowSub>
              </RowText>
            </DashRow>
            <DashRow>
              <Dot $color="#0D9F6F" />
              <RowText>
                <RowName>Надзорные органы</RowName>
                <RowSub>Плановых проверок не запланировано</RowSub>
              </RowText>
            </DashRow>
            <DashRow>
              <Dot $color="#0D9F6F" />
              <RowText>
                <RowName>Арбитраж и суды</RowName>
                <RowSub>Новых дел нет</RowSub>
              </RowText>
            </DashRow>
            <DashRow>
              <Dot $color="#0D9F6F" />
              <RowText>
                <RowName>Исполнительные производства</RowName>
                <RowSub>Без изменений</RowSub>
              </RowText>
            </DashRow>
          </DashRows>
        </Dashboard>
      </Right>
    </Container>
  </Section>
)

export default Hero
