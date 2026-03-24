import React from 'react'
import styled from 'styled-components'

const FooterWrap = styled.footer`
  padding: 4rem 1.5rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

const Top = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const Brand = styled.div``

const BrandName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.75rem;

  span {
    color: ${({ theme }) => theme.colors.text};
  }
`

const BrandDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  max-width: 280px;
`

const FooterCol = styled.div``

const ColTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1rem;
`

const FooterLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const FooterLink = styled.li`
  a {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textLight};
    transition: color ${({ theme }) => theme.transitions.fast};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`

const InfoItem = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.6rem;
  display: flex;
  gap: 0.5rem;
`

const Bottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Copy = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <FooterWrap>
      <Container>
        <Top>
          <Brand>
            <BrandName>Кофей<span>ня</span></BrandName>
            <BrandDesc>
              Авторский кофе, уютная атмосфера и лучшая выпечка в городе.
              Работаем каждый день с 8:00 до 22:00.
            </BrandDesc>
          </Brand>

          <FooterCol>
            <ColTitle>Навигация</ColTitle>
            <FooterLinks>
              <FooterLink><a href="#menu" onClick={scrollTo('menu')}>Меню</a></FooterLink>
              <FooterLink><a href="#about" onClick={scrollTo('about')}>О нас</a></FooterLink>
              <FooterLink><a href="#booking" onClick={scrollTo('booking')}>Бронь</a></FooterLink>
            </FooterLinks>
          </FooterCol>

          <FooterCol>
            <ColTitle>Контакты</ColTitle>
            <InfoItem><span>📍</span>ул. Арбат, 15</InfoItem>
            <InfoItem><span>📞</span>+7 (495) 123-45-67</InfoItem>
            <InfoItem><span>🕗</span>Пн–Пт: 08:00–22:00</InfoItem>
            <InfoItem><span>🕗</span>Сб–Вс: 09:00–23:00</InfoItem>
          </FooterCol>
        </Top>

        <Bottom>
          <Copy>© 2024 Кофейня. Все права защищены.</Copy>
          <Copy>Сделано с <Accent>♥</Accent> для любителей кофе</Copy>
        </Bottom>
      </Container>
    </FooterWrap>
  )
}
