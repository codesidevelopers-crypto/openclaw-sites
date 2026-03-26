import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 2rem;
  background: ${({ theme }) => theme.colors.bgDeep};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent}, transparent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5rem 1.25rem;
  }
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
`

const GoldBar = styled.span`
  display: block;
  width: 40px;
  height: 2px;
  background: ${({ theme }) => theme.colors.accent};
`

const EyebrowText = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 3.5rem;
  line-height: 1.15;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    background: none;
    gap: 1.5rem;
  }
`

const LawyerCard = styled.article`
  background: ${({ theme }) => theme.colors.bgCard};
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgCardHover};

    .photo-overlay { opacity: 1; }
    .photo-inner { transform: scale(1.04); }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: 280px 1fr;
    align-items: stretch;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const PhotoWrapper = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    aspect-ratio: 3 / 4;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    aspect-ratio: 1;
  }
`

const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(7, 28, 25, 0.8) 100%);
  z-index: 1;
  opacity: 0.5;
  transition: opacity 0.4s ease;
`

const PhotoInner = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`

const CardBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LawyerName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

const LawyerRole = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

const GoldDivider = styled.div`
  width: 30px;
  height: 1px;
  background: ${({ theme }) => theme.colors.borderGold};
`

const LawyerSpec = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`

const LawyerExp = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  span {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 600;
  }
`

const Team: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const el = sectionRef.current
    if (el) {
      el.querySelectorAll('.animate-on-scroll').forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Section id="team" ref={sectionRef}>
      <Inner>
        <SectionEyebrow className="animate-on-scroll">
          <GoldBar />
          <EyebrowText>Наша команда</EyebrowText>
        </SectionEyebrow>
        <SectionTitle className="animate-on-scroll">
          Профессионалы, которым <em>доверяют</em>
        </SectionTitle>

        <Grid>
          {/* Lawyer 1 */}
          <LawyerCard className="animate-on-scroll">
            <PhotoWrapper>
              <PhotoOverlay className="photo-overlay" />
              <PhotoInner className="photo-inner">
                <StaticImage
                  src="../images/lawyer-1.jpg"
                  alt="Александр Воронов"
                  layout="fullWidth"
                  style={{ width: '100%', height: '100%' }}
                  imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
                  placeholder="blurred"
                />
              </PhotoInner>
            </PhotoWrapper>
            <CardBody>
              <LawyerRole>Старший партнёр</LawyerRole>
              <LawyerName>Александр Воронов</LawyerName>
              <GoldDivider />
              <LawyerSpec>Корпоративное право, сделки M&amp;A, защита активов, структурирование бизнеса</LawyerSpec>
              <LawyerExp>Опыт: <span>20 лет</span></LawyerExp>
            </CardBody>
          </LawyerCard>

          {/* Lawyer 2 */}
          <LawyerCard className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <PhotoWrapper>
              <PhotoOverlay className="photo-overlay" />
              <PhotoInner className="photo-inner">
                <StaticImage
                  src="../images/lawyer-2.jpg"
                  alt="Елена Смирнова"
                  layout="fullWidth"
                  style={{ width: '100%', height: '100%' }}
                  imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
                  placeholder="blurred"
                />
              </PhotoInner>
            </PhotoWrapper>
            <CardBody>
              <LawyerRole>Партнёр</LawyerRole>
              <LawyerName>Елена Смирнова</LawyerName>
              <GoldDivider />
              <LawyerSpec>Семейное и гражданское право, раздел имущества, защита прав детей</LawyerSpec>
              <LawyerExp>Опыт: <span>15 лет</span></LawyerExp>
            </CardBody>
          </LawyerCard>

          {/* Lawyer 3 */}
          <LawyerCard className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <PhotoWrapper>
              <PhotoOverlay className="photo-overlay" />
              <PhotoInner className="photo-inner">
                <StaticImage
                  src="../images/lawyer-3.jpg"
                  alt="Дмитрий Карпов"
                  layout="fullWidth"
                  style={{ width: '100%', height: '100%' }}
                  imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
                  placeholder="blurred"
                />
              </PhotoInner>
            </PhotoWrapper>
            <CardBody>
              <LawyerRole>Адвокат</LawyerRole>
              <LawyerName>Дмитрий Карпов</LawyerName>
              <GoldDivider />
              <LawyerSpec>Уголовная защита, апелляции, досудебные соглашения, дела особой сложности</LawyerSpec>
              <LawyerExp>Опыт: <span>10 лет</span></LawyerExp>
            </CardBody>
          </LawyerCard>
        </Grid>
      </Inner>
    </Section>
  )
}

export default Team
