import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`

interface Step {
  num: string
  title: string
  desc: string
  items: string[]
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Диагностика',
    desc: 'Полный аудит текущего состояния бизнеса. Выявляем уязвимости, которые вы можете не замечать изнутри.',
    items: [
      'Анализ финансовой модели и денежных потоков',
      'Аудит договорной базы и юридических рисков',
      'Оценка операционной зависимости',
      'Интервью с ключевыми сотрудниками',
    ],
  },
  {
    num: '02',
    title: 'Анализ',
    desc: 'Структурируем и приоритизируем выявленные риски по вероятности и потенциальному ущербу.',
    items: [
      'Матрица вероятности и воздействия',
      'Расчёт финансового ущерба от рисков',
      'Определение критических цепочек зависимости',
      'Сравнительный анализ с отраслевыми бенчмарками',
    ],
  },
  {
    num: '03',
    title: 'Митигация',
    desc: 'Разрабатываем и внедряем конкретный план защиты с измеримыми результатами.',
    items: [
      'Персональный план митигации на 90 дней',
      'Внедрение систем раннего предупреждения',
      'Разработка антикризисных сценариев',
      'Сопровождение и контроль исполнения',
    ],
  },
]

const Section = styled.section`
  padding: 7rem 2rem;
  background: ${({ theme }) => theme.colors.bgDeep};
  position: relative;
  overflow: hidden;

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

  &::after {
    content: '';
    position: absolute;
    bottom: -200px;
    right: -200px;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.goldDim} 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
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

const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const Connector = styled.div`
  position: absolute;
  top: 2.75rem;
  left: calc(33.33% + 0.5rem);
  right: calc(33.33% + 0.5rem);
  height: 1px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gold},
    ${({ theme }) => theme.colors.borderGold}
  );

  @media (max-width: 768px) {
    display: none;
  }
`

interface StepCardProps {
  $visible: boolean
  $delay: number
}

const StepCard = styled.div<StepCardProps>`
  padding: 0 2.5rem 0 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '28px')});
  transition: opacity 0.7s ease ${({ $delay }) => $delay}ms,
    transform 0.7s ease ${({ $delay }) => $delay}ms;

  @media (max-width: 768px) {
    padding: 0;
    border-left: 3px solid ${({ theme }) => theme.colors.borderGold};
    padding-left: 1.5rem;
  }
`

const StepNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gold};
  opacity: 0.6;
  line-height: 1;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    display: block;
    width: 48px;
    height: 48px;
    border: 2px solid ${({ theme }) => theme.colors.borderGold};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`

const StepTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.75rem;
`

const StepDesc = styled.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.65;
  margin-bottom: 1.5rem;
`

const StepItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const StepItem = styled.li`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 3px;
    background: ${({ theme }) => theme.colors.gold};
    border-radius: 50%;
    opacity: 0.6;
  }
`

const Methodology: React.FC = () => {
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
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="methodology">
      <Container ref={ref}>
        <SectionHeader>
          <SectionLabel>Наш подход</SectionLabel>
          <SectionTitle>Методология защиты бизнеса</SectionTitle>
          <SectionDesc>
            Три последовательных этапа — от выявления угроз до работающей системы защиты
          </SectionDesc>
        </SectionHeader>

        <StepsRow>
          <Connector />
          {STEPS.map((step, i) => (
            <StepCard key={step.num} $visible={visible} $delay={i * 180}>
              <StepNum>{step.num}</StepNum>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
              <StepItems>
                {step.items.map((item) => (
                  <StepItem key={item}>{item}</StepItem>
                ))}
              </StepItems>
            </StepCard>
          ))}
        </StepsRow>
      </Container>
    </Section>
  )
}

export default Methodology
