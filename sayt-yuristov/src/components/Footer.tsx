import React from 'react'
import styled from 'styled-components'

const FooterEl = styled.footer`
  background: ${({ theme }) => theme.colors.bgDeep};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3rem 2rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem 1.25rem 1.5rem;
  }
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 3rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const BrandCol = styled.div``

const BrandName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.25rem;
`

const BrandTagline = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: 1rem;
`

const BrandDesc = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  max-width: 280px;
`

const Column = styled.div``

const ColTitle = styled.h4`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: 1.25rem;
`

const ColLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const ColLink = styled.a`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Copyright = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textDim};
`

const GoldAccent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`

const Disclaimer = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 400px;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`

const Footer: React.FC = () => {
  return (
    <FooterEl>
      <Inner>
        <TopRow>
          <BrandCol>
            <BrandName>Воронов и партнёры</BrandName>
            <BrandTagline>Юридическая фирма · с 2009</BrandTagline>
            <BrandDesc>
              Профессиональная юридическая защита физических лиц и бизнеса.
              15 лет опыта, более 1200 успешно завершённых дел.
            </BrandDesc>
          </BrandCol>

          <Column>
            <ColTitle>Услуги</ColTitle>
            <ColLinks>
              <li><ColLink href="#services">Гражданские споры</ColLink></li>
              <li><ColLink href="#services">Корпоративное право</ColLink></li>
              <li><ColLink href="#services">Семейное право</ColLink></li>
              <li><ColLink href="#services">Недвижимость</ColLink></li>
              <li><ColLink href="#services">Уголовная защита</ColLink></li>
              <li><ColLink href="#services">Трудовые споры</ColLink></li>
            </ColLinks>
          </Column>

          <Column>
            <ColTitle>О фирме</ColTitle>
            <ColLinks>
              <li><ColLink href="#why-us">Наши преимущества</ColLink></li>
              <li><ColLink href="#team">Команда</ColLink></li>
              <li><ColLink href="#process">Как мы работаем</ColLink></li>
              <li><ColLink href="#contact">Контакты</ColLink></li>
            </ColLinks>
          </Column>

          <Column>
            <ColTitle>Контакты</ColTitle>
            <ColLinks>
              <li><ColLink href="tel:+74951234567">+7 (495) 123-45-67</ColLink></li>
              <li><ColLink href="mailto:info@voronov-law.ru">info@voronov-law.ru</ColLink></li>
              <li><ColLink href="#">Пречистенка, 10, оф. 301</ColLink></li>
              <li><ColLink href="#">Пн–Пт: 9:00–20:00</ColLink></li>
            </ColLinks>
          </Column>
        </TopRow>

        <BottomRow>
          <Copyright>
            © 2009–2026 <GoldAccent>Воронов и партнёры</GoldAccent>. Все права защищены.
          </Copyright>
          <Disclaimer>
            Информация на сайте носит ознакомительный характер и не является юридической консультацией.
          </Disclaimer>
        </BottomRow>
      </Inner>
    </FooterEl>
  )
}

export default Footer
