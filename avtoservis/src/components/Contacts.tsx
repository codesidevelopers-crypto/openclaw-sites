import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
`

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const Left = styled.div``

const SectionNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.2em;
  margin-bottom: 0.25rem;
`

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    display: block;
    width: 32px;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 3rem;
`

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  background: ${({ theme }) => theme.colors.border};
`

const ContactItem = styled.a`
  background: ${({ theme }) => theme.colors.card};
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  transition: background 0.2s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`

const ContactIcon = styled.div`
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.goldDim};
  border: 1px solid rgba(201, 162, 39, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gold};
  flex-shrink: 0;
`

const ContactInfo = styled.div``

const ContactType = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.25rem;
`

const ContactValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ContactSub = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.15rem;
`

const Right = styled.div``

const MapBlock = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  position: relative;
`

const MapPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(${({ theme }) => theme.colors.border} 1px, transparent 1px),
      linear-gradient(90deg, ${({ theme }) => theme.colors.border} 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.5;
  }
`

const MapPin = styled.div`
  position: relative;
  z-index: 1;
  width: 56px;
  height: 56px;
  background: ${({ theme }) => theme.colors.gold};
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: rotate(45deg);
    color: ${({ theme }) => theme.colors.bg};
  }
`

const MapAddress = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`

const MapAddressText = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const MapAddressSub = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0.25rem;
`

const HoursBlock = styled.div`
  padding: 1.5rem 1.75rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

const HoursItem = styled.div``

const HoursDay = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.2rem;
`

const HoursTime = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const Contacts: React.FC = () => {
  return (
    <section id="contacts">
      <Section>
        <Inner>
          <Grid>
            <Left className="reveal-left">
              <SectionNumber>07</SectionNumber>
              <SectionLabel><span>Как нас найти</span></SectionLabel>
              <Title>
                КОНТАКТЫ
              </Title>

              <ContactList>
                <ContactItem href="https://maps.google.com/?q=Автозаводская+23+Москва" target="_blank" rel="noopener noreferrer">
                  <ContactIcon>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2C7.2 2 5 4.2 5 7c0 4 5 11 5 11s5-7 5-11c0-2.8-2.2-5-5-5zm0 6.5A1.5 1.5 0 1 1 10 5a1.5 1.5 0 0 1 0 3.5z" fill="currentColor" />
                    </svg>
                  </ContactIcon>
                  <ContactInfo>
                    <ContactType>Адрес</ContactType>
                    <ContactValue>ул. Автозаводская, 23</ContactValue>
                    <ContactSub>Москва · м. Автозаводская, 5 мин пешком</ContactSub>
                  </ContactInfo>
                </ContactItem>

                <ContactItem href="tel:+74959876543">
                  <ContactIcon>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.7 13.5c-1.2 0-2.4-.2-3.5-.6a1 1 0 0 0-1 .2l-1.8 1.8a12 12 0 0 1-5.2-5.2l1.8-1.8a1 1 0 0 0 .2-1 10.5 10.5 0 0 1-.6-3.5A1 1 0 0 0 5.6 2.5H3.3A1 1 0 0 0 2.3 3.5 14.3 14.3 0 0 0 16.7 18a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-1-1z" fill="currentColor" />
                    </svg>
                  </ContactIcon>
                  <ContactInfo>
                    <ContactType>Телефон</ContactType>
                    <ContactValue>+7 (495) 987-65-43</ContactValue>
                    <ContactSub>Звонки принимаем ежедневно</ContactSub>
                  </ContactInfo>
                </ContactItem>

                <ContactItem as="div">
                  <ContactIcon>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </ContactIcon>
                  <ContactInfo>
                    <ContactType>Режим работы</ContactType>
                    <ContactValue>Пн–Сб: 8:00–20:00</ContactValue>
                    <ContactSub>Воскресенье: 9:00–18:00</ContactSub>
                  </ContactInfo>
                </ContactItem>
              </ContactList>
            </Left>

            <Right className="reveal-right">
              <MapBlock>
                <MapPlaceholder>
                  <MapPin>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2C7.2 2 5 4.2 5 7c0 4 5 11 5 11s5-7 5-11c0-2.8-2.2-5-5-5zm0 6.5A1.5 1.5 0 1 1 10 5a1.5 1.5 0 0 1 0 3.5z" fill="currentColor" />
                    </svg>
                  </MapPin>
                  <MapAddress>
                    <MapAddressText>Автозаводская, 23</MapAddressText>
                    <MapAddressSub>Москва</MapAddressSub>
                  </MapAddress>
                </MapPlaceholder>

                <HoursBlock>
                  <HoursItem>
                    <HoursDay>Пн – Сб</HoursDay>
                    <HoursTime>8:00 – 20:00</HoursTime>
                  </HoursItem>
                  <HoursItem>
                    <HoursDay>Воскресенье</HoursDay>
                    <HoursTime>9:00 – 18:00</HoursTime>
                  </HoursItem>
                </HoursBlock>
              </MapBlock>
            </Right>
          </Grid>
        </Inner>
      </Section>
    </section>
  )
}

export default Contacts
