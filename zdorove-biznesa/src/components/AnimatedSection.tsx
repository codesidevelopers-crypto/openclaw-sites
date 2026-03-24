import React from 'react'
import styled, { css } from 'styled-components'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

interface WrapperProps {
  $visible: boolean
  $delay: number
  $direction: 'up' | 'left' | 'right'
}

const getTransform = (direction: 'up' | 'left' | 'right'): string => {
  if (direction === 'left') return 'translateX(-40px)'
  if (direction === 'right') return 'translateX(40px)'
  return 'translateY(40px)'
}

const Wrapper = styled.div<WrapperProps>`
  opacity: 0;
  transform: ${({ $direction }) => getTransform($direction)};
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: ${({ $delay }) => $delay}ms;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: none;
    `}
`

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <Wrapper ref={ref} $visible={isVisible} $delay={delay} $direction={direction}>
      {children}
    </Wrapper>
  )
}

export default AnimatedSection
