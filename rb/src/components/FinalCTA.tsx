import React from 'react'
import styled from 'styled-components'

interface FinalCTAProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #6C47FF 0%, #5235CC 60%, #3A1FA0 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -200px;
    right: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 1.25rem;
`

const SubText = styled.p`
  font-size: 1.1rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.7;
  margin-bottom: 3rem;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
`

const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
`

const MainBtn = styled.button`
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  }
`

const SecondBtn = styled.button`
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.5);
  color: white;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    border-color: white;
    background: rgba(255,255,255,0.1);
  }
`

const ThirdBtn = styled.button`
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.9);
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.4);
  }
`

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
`

const Stat = styled.div`
  text-align: center;
`

const StatNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  line-height: 1;
  margin-bottom: 0.35rem;
`

const StatLabel = styled.div`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.65);
`

const FinalCTA: React.FC<FinalCTAProps> = ({ onCtaClick }) => (
  <Section id="cta">
    <Container>
      <Title>Начните управлять рисками бизнеса сейчас</Title>
      <SubText>
        Базовая версия «Рисков по операциям» уже подключена бесплатно.
        Расширьте до полной картины — за 3 000 ₽/мес или выберите нужные модули.
      </SubText>
      <BtnRow>
        <MainBtn onClick={() => onCtaClick('Финальный CTA — Подключить')}>
          Подключить сервис
        </MainBtn>
        <SecondBtn onClick={() => onCtaClick('Финальный CTA — Год')}>
          Всё включено на год
        </SecondBtn>
        <ThirdBtn onClick={() => onCtaClick('Финальный CTA — Конструктор')}>
          Собрать Конструктор
        </ThirdBtn>
      </BtnRow>
      <Stats>
        <Stat>
          <StatNum>115-ФЗ</StatNum>
          <StatLabel>Все требования закрыты</StatLabel>
        </Stat>
        <Stat>
          <StatNum>8</StatNum>
          <StatLabel>Продуктовых модулей</StatLabel>
        </Stat>
        <Stat>
          <StatNum>∞</StatNum>
          <StatLabel>Проверок контрагентов</StatLabel>
        </Stat>
        <Stat>
          <StatNum>1 окно</StatNum>
          <StatLabel>Внутри вашего банка</StatLabel>
        </Stat>
      </Stats>
    </Container>
  </Section>
)

export default FinalCTA
