import React from 'react'
import styled, { css } from 'styled-components'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
}

interface WrapperProps {
  $visible: boolean
  $delay: number
  $direction: 'up' | 'left' | 'right' | 'none'
}

const hiddenStyles: Record<string, ReturnType<typeof css>> = {
  up: css`transform: translateY(32px); opacity: 0;`,
  left: css`transform: translateX(-32px); opacity: 0;`,
  right: css`transform: translateX(32px); opacity: 0;`,
  none: css`opacity: 0;`,
}

const Wrapper = styled.div<WrapperProps>`
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  transition-delay: ${({ $delay }) => $delay}ms;

  ${({ $visible, $direction }) =>
    $visible
      ? css`opacity: 1; transform: none;`
      : hiddenStyles[$direction]}
`

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className,
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <Wrapper
      ref={ref}
      $visible={isVisible}
      $delay={delay}
      $direction={direction}
      className={className}
    >
      {children}
    </Wrapper>
  )
}

export default AnimatedSection
