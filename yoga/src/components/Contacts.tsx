import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bg};
  padding: 120px 48px;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`

const LeftCol = styled.div``

const Eyebrow = styled.div`
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.04em;
  margin-bottom: 56px;
`

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`

const InfoItem = styled.div``

const InfoLabel = styled.div`
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 8px;
`

const InfoValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`

const InfoLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`

const MapWrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  aspect-ratio: 4/3;
`

const MapIllustration = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background:
    linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.bgCard} 0%,
      ${({ theme }) => theme.colors.bgSection} 100%
    );
`

const MapGrid = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.12;
`

const MapPin = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const PinIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(184, 149, 90, 0.4);

  &::after {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.bg};
    transform: rotate(45deg);
  }
`

const PinLabel = styled.div`
  background: ${({ theme }) => theme.colors.bg}EE;
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px 20px;
  font-size: 0.82rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.04em;
  white-space: nowrap;
`

const MapLabel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Contacts: React.FC = () => {
  return (
    <Section id="contacts">
      <Inner>
        <LeftCol>
          <Eyebrow>Где нас найти</Eyebrow>
          <SectionTitle>Контакты</SectionTitle>
          <InfoBlock>
            <InfoItem>
              <InfoLabel>Адрес</InfoLabel>
              <InfoValue>
                Москва<br />
                ул. Большая Никитская, 15
              </InfoValue>
            </InfoItem>
            <Divider />
            <InfoItem>
              <InfoLabel>Телефон</InfoLabel>
              <InfoLink href="tel:+74951234567">
                +7 (495) 123-45-67
              </InfoLink>
            </InfoItem>
            <Divider />
            <InfoItem>
              <InfoLabel>Время работы</InfoLabel>
              <InfoValue>
                Пн–Пт: 07:00–21:00<br />
                Сб–Вс: 09:00–15:00
              </InfoValue>
            </InfoItem>
            <Divider />
            <InfoItem>
              <InfoLabel>Ближайшее метро</InfoLabel>
              <InfoValue>Арбатская, Александровский сад</InfoValue>
            </InfoItem>
          </InfoBlock>
        </LeftCol>

        <MapWrapper>
          <MapIllustration>
            <MapGrid viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  y1={i * 34}
                  x2="400"
                  y2={i * 34}
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 32}
                  y1="0"
                  x2={i * 32}
                  y2="300"
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}
              <rect x="60" y="80" width="80" height="40" fill="white" opacity="0.08" />
              <rect x="160" y="40" width="120" height="60" fill="white" opacity="0.05" />
              <rect x="200" y="140" width="100" height="70" fill="white" opacity="0.06" />
              <rect x="60" y="160" width="60" height="80" fill="white" opacity="0.05" />
              <rect x="300" y="80" width="80" height="50" fill="white" opacity="0.07" />
            </MapGrid>
            <MapPin>
              <PinIcon />
              <PinLabel>Студия «Прана»</PinLabel>
            </MapPin>
          </MapIllustration>
          <MapLabel>ул. Большая Никитская, 15 · Москва</MapLabel>
        </MapWrapper>
      </Inner>
    </Section>
  )
}
