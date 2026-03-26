import React from 'react'
import styled, { keyframes } from 'styled-components'

interface HeroProps {
  onCtaClick: () => void
}

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 40%, #FFFFFF 100%);
  display: flex;
  align-items: center;
  padding: 7rem 2rem 4rem;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%);
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
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray900};
  line-height: 1.15;
  margin-bottom: 1.25rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 520px;
`

const Benefits = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

const BenefitIcon = styled.span`
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.greenLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.green};
  font-weight: 700;
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
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  box-shadow: ${({ theme }) => theme.shadow.purple};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(124,58,237,0.3);
  }
`

const SecondaryBtn = styled.a`
  border: 1.5px solid ${({ theme }) => theme.colors.gray300};
  background: white;
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem 2rem;
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
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow.xl};
  width: 360px;
  animation: ${float} 4s ease-in-out infinite;
`

const DashHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`

const DashTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
`

const RiskBadge = styled.span<{ $level: 'low' | 'medium' | 'high' }>`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
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

const RiskMeter = styled.div`
  margin-bottom: 1.25rem;
`

const MeterLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 0.5rem;
`

const MeterBar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.full};
  overflow: hidden;
`

const MeterFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.radius.full};
`

const DashItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const DashItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.radius.md};
`

const ItemDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

const ItemText = styled.div`
  flex: 1;
`

const ItemName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
`

const ItemDesc = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.gray500};
`

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => (
  <Section id="hero">
    <Container>
      <Left>
        <Badge>🛡️ Сервис Точка Банк</Badge>
        <Title>
          Контролируй риски бизнеса —{' '}
          <span>заранее</span>, не в последний момент
        </Title>
        <Subtitle>
          «Риски бизнеса» помогает видеть риски по 115-ФЗ, контрагентам
          и юридическим событиям до того, как они стали проблемой.
          Спокойнее работайте, уверенно принимайте решения.
        </Subtitle>
        <Benefits>
          <Benefit>
            <BenefitIcon>✓</BenefitIcon>
            Предупреждает до операции — не после блокировки
          </Benefit>
          <Benefit>
            <BenefitIcon>✓</BenefitIcon>
            Проверяет контрагентов за секунды, безлимитно
          </Benefit>
          <Benefit>
            <BenefitIcon>✓</BenefitIcon>
            Сообщает о судах, проверках и ФССП первым
          </Benefit>
        </Benefits>
        <Buttons>
          <PrimaryBtn onClick={onCtaClick}>Подключить сервис</PrimaryBtn>
          <SecondaryBtn href="#products">Узнать подробнее →</SecondaryBtn>
        </Buttons>
      </Left>
      <Right>
        <Dashboard>
          <DashHeader>
            <DashTitle>Риски бизнеса</DashTitle>
            <RiskBadge $level="low">Низкий риск</RiskBadge>
          </DashHeader>
          <RiskMeter>
            <MeterLabel>
              <span>Уровень риска по счёту</span>
              <span>23%</span>
            </MeterLabel>
            <MeterBar>
              <MeterFill $pct={23} $color="#10B981" />
            </MeterBar>
          </RiskMeter>
          <DashItems>
            <DashItem>
              <ItemDot $color="#10B981" />
              <ItemText>
                <ItemName>Операции за месяц</ItemName>
                <ItemDesc>Всё в норме · рекомендации выполнены</ItemDesc>
              </ItemText>
            </DashItem>
            <DashItem>
              <ItemDot $color="#F59E0B" />
              <ItemText>
                <ItemName>Контрагент ООО «Старт»</ItemName>
                <ItemDesc>Обнаружены признаки риска · проверить</ItemDesc>
              </ItemText>
            </DashItem>
            <DashItem>
              <ItemDot $color="#10B981" />
              <ItemText>
                <ItemName>Надзорные органы</ItemName>
                <ItemDesc>Новых проверок не запланировано</ItemDesc>
              </ItemText>
            </DashItem>
            <DashItem>
              <ItemDot $color="#10B981" />
              <ItemText>
                <ItemName>Арбитражные дела</ItemName>
                <ItemDesc>Новых исков нет</ItemDesc>
              </ItemText>
            </DashItem>
          </DashItems>
        </Dashboard>
      </Right>
    </Container>
  </Section>
)

export default Hero
