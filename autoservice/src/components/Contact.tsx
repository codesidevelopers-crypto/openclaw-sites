import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import type { ContactInfo } from '../types'

const CONTACT_INFO: ContactInfo = {
  address: 'ул. Автозаводская, 15, стр. 2, Москва',
  phone: '+7 (495) 123-45-67',
  email: 'info@autopro-service.ru',
  workingHours: [
    { days: 'Пн — Пт', hours: '08:00 — 21:00' },
    { days: 'Сб', hours: '09:00 — 20:00' },
    { days: 'Вс', hours: '10:00 — 18:00' },
  ],
}

const Section = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.bgSecondary};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.accent},
      transparent
    );
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 3rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const InfoCard = styled.div<{ $visible: boolean }>`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  transition: all ${({ theme }) => theme.transitions.base};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateX(0)' : 'translateX(-30px)')};
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

const InfoIconWrap = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(230, 57, 70, 0.1);
  border: 1px solid rgba(230, 57, 70, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.2rem;
`

const InfoContent = styled.div``

const InfoLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.4rem;
`

const InfoValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`

const HoursTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const HoursRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;

  .days {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .hours {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const MapPanel = styled.div<{ $visible: boolean }>`
  position: relative;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateX(0)' : 'translateX(30px)')};
  transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
`

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(135deg,
    ${({ theme }) => theme.colors.bgCard} 0%,
    ${({ theme }) => theme.colors.bgSecondary} 100%
  );
`

const MapGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
`

const MapPin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`

const PinDot = styled.div`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 20px rgba(230, 57, 70, 0.6);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(230, 57, 70, 0.6); }
    50% { box-shadow: 0 0 40px rgba(230, 57, 70, 0.9); }
  }
`

const PinLabel = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 0.4rem 0.75rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  margin-bottom: 4px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`

const MapAddress = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  z-index: 3;
`

const MapAddressTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`

const MapAddressText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

// Footer
const FooterBar = styled.div`
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
`

const FooterLogo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const FooterCopyright = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textDim};
`

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textMuted};
    transition: color ${({ theme }) => theme.transitions.fast};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`

const Contact: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="contact" ref={sectionRef}>
      <Container>
        <SectionLabel><span>Контакты</span></SectionLabel>
        <SectionTitle>Найдите нас</SectionTitle>

        <Grid>
          <InfoPanel>
            <InfoCard $visible={visible} style={{ transitionDelay: '0s' }}>
              <InfoIconWrap>📍</InfoIconWrap>
              <InfoContent>
                <InfoLabel>Адрес</InfoLabel>
                <InfoValue>{CONTACT_INFO.address}</InfoValue>
              </InfoContent>
            </InfoCard>

            <InfoCard $visible={visible} style={{ transitionDelay: '0.1s' }}>
              <InfoIconWrap>📞</InfoIconWrap>
              <InfoContent>
                <InfoLabel>Телефон</InfoLabel>
                <InfoValue>{CONTACT_INFO.phone}</InfoValue>
              </InfoContent>
            </InfoCard>

            <InfoCard $visible={visible} style={{ transitionDelay: '0.2s' }}>
              <InfoIconWrap>✉️</InfoIconWrap>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{CONTACT_INFO.email}</InfoValue>
              </InfoContent>
            </InfoCard>

            <InfoCard $visible={visible} style={{ transitionDelay: '0.3s' }}>
              <InfoIconWrap>🕐</InfoIconWrap>
              <InfoContent>
                <InfoLabel>Часы работы</InfoLabel>
                <HoursTable>
                  {CONTACT_INFO.workingHours.map((item) => (
                    <HoursRow key={item.days}>
                      <span className="days">{item.days}</span>
                      <span className="hours">{item.hours}</span>
                    </HoursRow>
                  ))}
                </HoursTable>
              </InfoContent>
            </InfoCard>
          </InfoPanel>

          <MapPanel $visible={visible}>
            <MapWrapper>
              <MapGrid />
              <MapPin>
                <PinLabel>AutoPro</PinLabel>
                <PinDot />
              </MapPin>
              <MapAddress>
                <MapAddressTitle>AutoPro — Премиальный автосервис</MapAddressTitle>
                <MapAddressText>{CONTACT_INFO.address}</MapAddressText>
              </MapAddress>
            </MapWrapper>
          </MapPanel>
        </Grid>

        <FooterBar>
          <FooterLogo>Auto<span>Pro</span></FooterLogo>
          <FooterCopyright>© 2024 AutoPro. Все права защищены.</FooterCopyright>
          <FooterLinks>
            <a href="#services">Услуги</a>
            <a href="#booking">Запись</a>
            <a href="#contact">Контакты</a>
          </FooterLinks>
        </FooterBar>
      </Container>
    </Section>
  )
}

export default Contact
