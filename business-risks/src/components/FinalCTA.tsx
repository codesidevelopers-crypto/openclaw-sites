import React from 'react'
import styled from 'styled-components'

interface FinalCTAProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryDark} 0%, #4C1D95 50%, #1E1B4B 100%);
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: white;
  margin-bottom: 1.25rem;
  line-height: 1.15;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255,255,255,0.75);
  margin-bottom: 2.5rem;
  line-height: 1.7;
`

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`

const PrimaryBtn = styled.button`
  background: white;
  color: ${({ theme }) => theme.colors.primaryDark};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
`

const GhostBtn = styled.button`
  background: transparent;
  color: white;
  border: 1.5px solid rgba(255,255,255,0.4);
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.8);
    background: rgba(255,255,255,0.1);
    transform: translateY(-2px);
  }
`

const Note = styled.p`
  margin-top: 1.5rem;
  font-size: 0.825rem;
  color: rgba(255,255,255,0.5);
`

const FinalCTA: React.FC<FinalCTAProps> = ({ onCtaClick }) => (
  <Section>
    <Container>
      <Title>Начни контролировать риски — прямо сейчас</Title>
      <Subtitle>
        Выберите удобный формат — отдельный сервис, конструктор или
        полный пакет «Всё включено». Подключение занимает несколько минут.
      </Subtitle>
      <Buttons>
        <PrimaryBtn onClick={() => onCtaClick('Всё включено')}>
          Всё включено
        </PrimaryBtn>
        <GhostBtn onClick={() => onCtaClick('Конструктор')}>
          Собрать конструктор
        </GhostBtn>
        <GhostBtn onClick={() => onCtaClick('Отдельный сервис')}>
          Попробовать бесплатно
        </GhostBtn>
      </Buttons>
      <Note>Все сервисы доступны прямо в интернет-банке Точки</Note>
    </Container>
  </Section>
)

export default FinalCTA
