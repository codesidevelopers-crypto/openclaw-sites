import React from 'react'
import styled, { keyframes } from 'styled-components'
import heroImg from '../images/hero.jpg'

interface LandingPageProps {
  onStart: () => void
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
`

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(6, 12, 24, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 20px;
  }
`

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const HeaderCta = styled.button`
  background: ${({ theme }) => theme.colors.accentDim};
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  font-size: 0.875rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.bg};
  }
`

const HeroSection = styled.section<{ $bg: string }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 40px 80px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${({ $bg }) => $bg});
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    animation: ${fadeIn} 1s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,168,0.06) 0%, transparent 70%),
                linear-gradient(to bottom, rgba(6,12,24,0.3) 0%, rgba(6,12,24,0.85) 100%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 100px 20px 60px;
  }
`

const HeroGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(26,47,78,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26,47,78,0.3) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 1;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 820px;
  animation: ${fadeUp} 0.8s ease both;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.accentDim};
  border: 1px solid rgba(0,212,168,0.3);
  color: ${({ theme }) => theme.colors.accent};
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.8s 0.1s ease both;
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
  margin-bottom: 20px;
  animation: ${fadeUp} 0.8s 0.2s ease both;

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 40px;
  animation: ${fadeUp} 0.8s 0.3s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`

const CtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.accent};
  color: #030810;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.95rem;
  font-weight: 700;
  padding: 18px 40px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  letter-spacing: 0.02em;
  animation: ${fadeUp} 0.8s 0.4s ease both;
  box-shadow: 0 8px 32px rgba(0,212,168,0.25);

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,212,168,0.35);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover svg {
    transform: translateX(3px);
  }
`

const PulsingCtaButton = styled(CtaButton)`
  animation: ${pulse} 3s ease infinite;
`

const FreeBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  animation: ${fadeUp} 0.8s 0.5s ease both;

  span {
    display: flex;
    align-items: center;
    gap: 6px;

    &::before {
      content: '·';
      opacity: 0.4;
    }

    &:first-child::before {
      display: none;
    }
  }
`

const HeroStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${fadeUp} 0.8s 0.6s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 16px;
  }
`

const StatItem = styled.div`
  text-align: center;
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
`

const SectionContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 20px;
  }
`

const Section = styled.section`
  padding: 100px 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 60px 0;
  }
`

const SectionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 12px;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 560px;
  line-height: 1.7;
`

const HowItWorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 60px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const StepCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 40px 36px;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.cardHover};
  }
`

const StepNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.border};
  line-height: 1;
  margin-bottom: 24px;
`

const StepTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`

const StepText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`

const StepIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accentDim};
  border: 1px solid rgba(0,212,168,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 1.4rem;
`

const LearnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const LearnCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 32px;
  display: flex;
  gap: 20px;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.cardHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`

const LearnIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
`

const LearnContent = styled.div``

const LearnTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`

const LearnDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`

const BottomCtaSection = styled.section`
  padding: 100px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,212,168,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
`

const BottomCtaTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const BottomCtaText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 40px;
`

const Footer = styled.footer`
  padding: 32px 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 32px 20px;
  }
`

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <Wrapper>
      <Header>
        <Logo>Налог<span>Калькулятор</span></Logo>
        <HeaderCta onClick={onStart}>Начать расчёт</HeaderCta>
      </Header>

      <HeroSection $bg={heroImg as string}>
        <HeroGrid />
        <HeroContent>
          <Badge>
            <span>2025</span>
            Актуальные ставки и лимиты
          </Badge>
          <HeroTitle>
            Какая система налогов<br />
            <em>вам подходит?</em>
          </HeroTitle>
          <HeroSubtitle>
            Ответьте на 6 вопросов — узнайте оптимальный режим и сколько будете платить. Подходит для ИП и ООО.
          </HeroSubtitle>
          <CtaButton onClick={onStart}>
            Начать расчёт
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </CtaButton>
          <FreeBadge>
            <span>Бесплатно</span>
            <span>Без регистрации</span>
            <span>2 минуты</span>
          </FreeBadge>

          <HeroStats>
            <StatItem>
              <StatNumber>4</StatNumber>
              <StatLabel>режима налогообложения</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>2025</StatNumber>
              <StatLabel>актуальные данные</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>6</StatNumber>
              <StatLabel>вопросов в анкете</StatLabel>
            </StatItem>
          </HeroStats>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionContainer>
          <SectionLabel>Как это работает</SectionLabel>
          <SectionTitle>Три простых шага</SectionTitle>
          <SectionSubtitle>
            Никакой регистрации и личных данных. Просто ответьте на вопросы и получите готовое сравнение.
          </SectionSubtitle>
          <HowItWorksGrid>
            <StepCard>
              <StepNumber>01</StepNumber>
              <StepIcon>📋</StepIcon>
              <StepTitle>Отвечаете на вопросы</StepTitle>
              <StepText>
                Форма бизнеса, выручка, расходы, сотрудники — 6 вопросов о вашем бизнесе. Занимает 2 минуты.
              </StepText>
            </StepCard>
            <StepCard>
              <StepNumber>02</StepNumber>
              <StepIcon>⚡</StepIcon>
              <StepTitle>Мы считаем налоги</StepTitle>
              <StepText>
                Калькулятор применяет актуальные ставки 2025 года для УСН, ОСНО, патента с учётом ваших данных.
              </StepText>
            </StepCard>
            <StepCard>
              <StepNumber>03</StepNumber>
              <StepIcon>🏆</StepIcon>
              <StepTitle>Получаете сравнение</StepTitle>
              <StepText>
                Видите все доступные режимы, налоговую нагрузку по каждому и размер экономии при лучшем выборе.
              </StepText>
            </StepCard>
          </HowItWorksGrid>
        </SectionContainer>
      </Section>

      <Section style={{ background: `linear-gradient(to bottom, transparent, rgba(11,21,45,0.5), transparent)` }}>
        <SectionContainer>
          <SectionLabel>Что вы узнаете</SectionLabel>
          <SectionTitle>Полная картина налогов</SectionTitle>
          <SectionSubtitle>
            Не просто ставки — реальные суммы с учётом страховых взносов, сотрудников и ограничений.
          </SectionSubtitle>
          <LearnGrid>
            <LearnCard>
              <LearnIcon>🎯</LearnIcon>
              <LearnContent>
                <LearnTitle>Самый выгодный режим</LearnTitle>
                <LearnDesc>
                  Конкретная рекомендация: УСН 6%, УСН 15%, Патент или ОСНО — что подходит именно вам.
                </LearnDesc>
              </LearnContent>
            </LearnCard>
            <LearnCard>
              <LearnIcon>💰</LearnIcon>
              <LearnContent>
                <LearnTitle>Сколько платить в год</LearnTitle>
                <LearnDesc>
                  Итоговая сумма налогов и взносов по каждому режиму с разбивкой по статьям.
                </LearnDesc>
              </LearnContent>
            </LearnCard>
            <LearnCard>
              <LearnIcon>🛡</LearnIcon>
              <LearnContent>
                <LearnTitle>Страховые взносы</LearnTitle>
                <LearnDesc>
                  Фиксированные взносы ИП, 1% с превышения и взносы за сотрудников — всё посчитано.
                </LearnDesc>
              </LearnContent>
            </LearnCard>
            <LearnCard>
              <LearnIcon>⚠️</LearnIcon>
              <LearnContent>
                <LearnTitle>Ограничения режимов</LearnTitle>
                <LearnDesc>
                  Недоступные для вас режимы сразу выделены с объяснением причины — никаких сюрпризов.
                </LearnDesc>
              </LearnContent>
            </LearnCard>
          </LearnGrid>
        </SectionContainer>
      </Section>

      <BottomCtaSection>
        <SectionContainer>
          <BottomCtaTitle>
            Готовы узнать свой оптимальный режим?
          </BottomCtaTitle>
          <BottomCtaText>
            Бесплатно, без регистрации — результат через 2 минуты
          </BottomCtaText>
          <PulsingCtaButton onClick={onStart}>
            Начать расчёт
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </PulsingCtaButton>
        </SectionContainer>
      </BottomCtaSection>

      <Footer>
        <p>НалогКалькулятор — бесплатный инструмент для ориентировочного расчёта. Данные актуальны на 2025 год.</p>
        <p style={{ marginTop: '8px', opacity: 0.6 }}>
          Результаты носят информационный характер. Для точного расчёта обратитесь к налоговому консультанту.
        </p>
      </Footer>
    </Wrapper>
  )
}

export default LandingPage
