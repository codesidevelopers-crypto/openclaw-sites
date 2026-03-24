import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const Section = styled.section`
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 5rem;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3rem;
  }
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

const SectionNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.2em;
  margin-bottom: 0.25rem;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const SectionSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 320px;
  line-height: 1.7;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5px;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const ServiceCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 40%,
      rgba(7, 9, 11, 0.9) 100%
    );
    transition: opacity 0.3s ease;
  }

  &:hover .service-img {
    transform: scale(1.05);
  }

  &:hover .service-content {
    transform: translateY(-8px);
  }

  &:hover .service-arrow {
    opacity: 1;
    transform: translateX(0);
  }
`

const ServiceImgWrapper = styled.div`
  height: 240px;
  overflow: hidden;

  .service-img {
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease;
  }

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`

const ServiceContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 1.75rem;
  transition: transform 0.3s ease;
`

const ServiceIcon = styled.div`
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.goldDim};
  border: 1px solid rgba(201, 162, 39, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.colors.gold};
  font-size: 1.25rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.display};
`

const ServiceTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.75rem;
  letter-spacing: 0.02em;
`

const ServiceDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.65;
`

const ServiceArrow = styled.div`
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  z-index: 1;
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.colors.gold};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
`

interface ServiceData {
  title: string
  description: string
  icon: string
  image: React.ReactNode
}

const ServiceImage0: React.FC = () => (
  <StaticImage
    src="../images/service-diagnostics.jpg"
    alt="Компьютерная диагностика"
    className="service-img"
    layout="fullWidth"
    objectFit="cover"
    placeholder="blurred"
  />
)
const ServiceImage1: React.FC = () => (
  <StaticImage
    src="../images/service-maintenance.jpg"
    alt="Техническое обслуживание"
    className="service-img"
    layout="fullWidth"
    objectFit="cover"
    placeholder="blurred"
  />
)
const ServiceImage2: React.FC = () => (
  <StaticImage
    src="../images/service-bodywork.jpg"
    alt="Кузовной ремонт"
    className="service-img"
    layout="fullWidth"
    objectFit="cover"
    placeholder="blurred"
  />
)
const ServiceImage3: React.FC = () => (
  <StaticImage
    src="../images/service-tires.jpg"
    alt="Шиномонтаж"
    className="service-img"
    layout="fullWidth"
    objectFit="cover"
    placeholder="blurred"
  />
)
const ServiceImage4: React.FC = () => (
  <StaticImage
    src="../images/service-electrical.jpg"
    alt="Электрика"
    className="service-img"
    layout="fullWidth"
    objectFit="cover"
    placeholder="blurred"
  />
)
const ServiceImage5: React.FC = () => (
  <StaticImage
    src="../images/service-transmission.jpg"
    alt="АКПП"
    className="service-img"
    layout="fullWidth"
    objectFit="cover"
    placeholder="blurred"
  />
)

const servicesData: ServiceData[] = [
  {
    title: 'Диагностика',
    description: 'Компьютерная диагностика всех систем автомобиля. Полная проверка ошибок и состояния двигателя.',
    icon: '01',
    image: <ServiceImage0 />,
  },
  {
    title: 'Техническое обслуживание',
    description: 'Замена масла, фильтров, тормозных колодок. Плановое ТО по регламенту производителя.',
    icon: '02',
    image: <ServiceImage1 />,
  },
  {
    title: 'Кузовной ремонт',
    description: 'Рихтовка и покраска любой сложности. Профессиональное восстановление после ДТП.',
    icon: '03',
    image: <ServiceImage2 />,
  },
  {
    title: 'Шиномонтаж',
    description: 'Сезонная замена и балансировка колёс. Хранение шин в чистом отапливаемом помещении.',
    icon: '04',
    image: <ServiceImage3 />,
  },
  {
    title: 'Электрика',
    description: 'Диагностика и ремонт электрооборудования. Установка сигнализаций и мультимедиа.',
    icon: '05',
    image: <ServiceImage4 />,
  },
  {
    title: 'Автоматические коробки',
    description: 'Ремонт и обслуживание АКПП любых марок. Замена масла и диагностика трансмиссии.',
    icon: '06',
    image: <ServiceImage5 />,
  },
]

const Services: React.FC = () => {
  return (
    <section id="services">
      <Section>
        <SectionHeader className="reveal">
          <div>
            <SectionNumber>02</SectionNumber>
            <SectionLabel><span>Что мы делаем</span></SectionLabel>
            <SectionTitle>
              НАШИ
              <br />УСЛУГИ
            </SectionTitle>
          </div>
          <SectionSubtitle>
            Полный спектр работ по обслуживанию и ремонту автомобилей. Каждый мастер — специалист в своей области.
          </SectionSubtitle>
        </SectionHeader>

        <Grid>
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.title}
              className="reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <ServiceImgWrapper>
                {service.image}
              </ServiceImgWrapper>
              <ServiceContent className="service-content">
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDesc>{service.description}</ServiceDesc>
              </ServiceContent>
              <ServiceArrow className="service-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="#07090B" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </ServiceArrow>
            </ServiceCard>
          ))}
        </Grid>
      </Section>
    </section>
  )
}

export default Services
