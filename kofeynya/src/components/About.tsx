import React from 'react'
import styled, { css } from 'styled-components'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface AnimatedProps {
  $visible: boolean
}

const Section = styled.section`
  padding: 6rem 1.5rem;
  background: ${({ theme }) => theme.colors.bgSection};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border}, transparent);
  }
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const VisualBlock = styled.div<AnimatedProps>`
  position: relative;
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateX(0);
    `}
`

const BigNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(8rem, 18vw, 14rem);
  font-weight: 900;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.border};
  position: absolute;
  top: -2rem;
  left: -1rem;
  user-select: none;
  pointer-events: none;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
  padding-top: 6rem;
`

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.5rem;
  transition: border-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const TextBlock = styled.div<AnimatedProps>`
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateX(0);
    `}
`

const SectionTag = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1rem;
`

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
`

const SectionText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
`

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textLight};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
  }
`

export const About: React.FC = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation()
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation()

  return (
    <Section id="about">
      <Container>
        <VisualBlock
          ref={leftRef as React.RefObject<HTMLDivElement>}
          $visible={leftVisible}
        >
          <BigNumber>07</BigNumber>
          <StatsGrid>
            <StatCard>
              <StatValue>7+</StatValue>
              <StatLabel>Лет истории</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>40+</StatValue>
              <StatLabel>Сортов кофе</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>500</StatValue>
              <StatLabel>Гостей в день</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>4.9★</StatValue>
              <StatLabel>Средний рейтинг</StatLabel>
            </StatCard>
          </StatsGrid>
        </VisualBlock>

        <TextBlock
          ref={rightRef as React.RefObject<HTMLDivElement>}
          $visible={rightVisible}
        >
          <SectionTag>О нас</SectionTag>
          <SectionTitle>Мы варим кофе<br />с душой с 2017</SectionTitle>
          <SectionText>
            Наша кофейня родилась из простой идеи: каждый человек заслуживает
            по-настоящему хорошего кофе. Мы работаем напрямую с фермерами,
            отбираем зелёный зерна и обжариваем их на месте.
          </SectionText>
          <SectionText>
            Интерьер создан так, чтобы время здесь замедлялось. Приходите
            поработать, встретиться с друзьями или просто побыть в тишине
            с чашкой эспрессо.
          </SectionText>
          <FeatureList>
            <FeatureItem>Спешалти зёрна прямой поставки с ферм</FeatureItem>
            <FeatureItem>Собственная обжарка каждые 3 дня</FeatureItem>
            <FeatureItem>Авторская выпечка без консервантов</FeatureItem>
            <FeatureItem>Wi-Fi и зоны для работы</FeatureItem>
          </FeatureList>
        </TextBlock>
      </Container>
    </Section>
  )
}
