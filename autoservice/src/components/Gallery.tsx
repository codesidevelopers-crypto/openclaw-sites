import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import type { GalleryItem } from '../types'

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Кузовной ремонт дверей',
    category: 'Кузов',
    beforeImage: '/images/gallery-before-1.jpg',
    afterImage: '/images/gallery-after-1.jpg',
  },
  {
    id: '2',
    title: 'Полная покраска',
    category: 'Покраска',
    beforeImage: '/images/gallery-before-2.jpg',
    afterImage: '/images/gallery-after-2.jpg',
  },
  {
    id: '3',
    title: 'Замена шин и дисков',
    category: 'Шиномонтаж',
    beforeImage: '/images/gallery-before-3.jpg',
    afterImage: '/images/gallery-after-3.jpg',
  },
]

const Section = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.bg};
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
      ${({ theme }) => theme.colors.border},
      transparent
    );
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: 4rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
`

const HeaderLeft = styled.div``

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
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const GalleryCard = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(40px)')};
  transition: opacity 0.6s ease, transform 0.6s ease;
`

const BeforeAfterContainer = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  cursor: col-resize;
  background: ${({ theme }) => theme.colors.bgCard};
`

const ImageLayer = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  transition: opacity 0.4s ease;
  opacity: ${({ $active }) => ($active ? 1 : 0)};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const SliderOverlay = styled.div<{ $position: number }>`
  position: absolute;
  inset: 0;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${({ $position }) => $position}%;
    width: 2px;
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    transform: translateX(-50%);
    pointer-events: none;
  }
`

const SliderHandle = styled.div<{ $position: number }>`
  position: absolute;
  top: 50%;
  left: ${({ $position }) => $position}%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px rgba(0,0,0,0.5);
  cursor: col-resize;
  z-index: 3;
  transition: transform 0.2s ease;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.bg};
  font-weight: 900;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
`

const ClipLayer = styled.div<{ $position: number }>`
  position: absolute;
  inset: 0;
  clip-path: ${({ $position }) => `inset(0 ${100 - $position}% 0 0)`};
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CardLabels = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  z-index: 4;
  pointer-events: none;
`

const CardLabel = styled.span<{ $right?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  background: ${({ $right, theme }) =>
    $right ? theme.colors.accent : 'rgba(0,0,0,0.7)'};
  color: white;
  backdrop-filter: blur(4px);
`

const CardInfo = styled.div`
  padding: 1.25rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const CardTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.95rem;
  font-weight: 600;
`

const CardCategory = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  padding: 0.2rem 0.6rem;
`

const DragHint = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  background: rgba(0,0,0,0.5);
  padding: 0.4rem 0.8rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
  pointer-events: none;
  white-space: nowrap;

  ${BeforeAfterContainer}:hover & {
    opacity: 1;
  }
`

interface GalleryCardComponentProps {
  item: GalleryItem
  visible: boolean
  delay: number
}

const GalleryCardComponent: React.FC<GalleryCardComponentProps> = ({ item, visible, delay }) => {
  const [sliderPos, setSliderPos] = useState<number>(50)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getPosition = (clientX: number): number => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    const x = clientX - rect.left
    const percent = (x / rect.width) * 100
    return Math.max(5, Math.min(95, percent))
  }

  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsDragging(true)
    setSliderPos(getPosition(e.clientX))
  }

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (!isDragging) return
    setSliderPos(getPosition(e.clientX))
  }

  const handleMouseUp = (): void => setIsDragging(false)

  const handleTouchMove = (e: React.TouchEvent): void => {
    const touch = e.touches[0]
    if (touch) setSliderPos(getPosition(touch.clientX))
  }

  return (
    <GalleryCard $visible={visible} style={{ transitionDelay: `${delay}s` }}>
      <BeforeAfterContainer
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        <ImageLayer $active={true}>
          <img src={item.beforeImage} alt={`${item.title} — до`} />
        </ImageLayer>

        <ClipLayer $position={sliderPos}>
          <img src={item.afterImage} alt={`${item.title} — после`} />
        </ClipLayer>

        <SliderOverlay $position={sliderPos} />
        <SliderHandle $position={sliderPos}>◀▶</SliderHandle>

        <CardLabels>
          <CardLabel>До</CardLabel>
          <CardLabel $right>После</CardLabel>
        </CardLabels>

        <DragHint>← Потяните →</DragHint>
      </BeforeAfterContainer>

      <CardInfo>
        <CardTitle>{item.title}</CardTitle>
        <CardCategory>{item.category}</CardCategory>
      </CardInfo>
    </GalleryCard>
  )
}

const Gallery: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((item, index) => {
      if (!item) return
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]))
            }, index * 150)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(item)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <Section id="gallery" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <HeaderLeft>
            <SectionLabel><span>Наши работы</span></SectionLabel>
            <SectionTitle>Результаты говорят сами</SectionTitle>
          </HeaderLeft>
        </SectionHeader>

        <GalleryGrid>
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[index] = el }}
            >
              <GalleryCardComponent
                item={item}
                visible={visibleItems.has(index)}
                delay={index * 0.15}
              />
            </div>
          ))}
        </GalleryGrid>
      </Container>
    </Section>
  )
}

export default Gallery
