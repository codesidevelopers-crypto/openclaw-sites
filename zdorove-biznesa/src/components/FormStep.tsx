import React from 'react'
import styled from 'styled-components'

interface FormStepProps {
  title: string
  subtitle: string
  icon: string
  children: React.ReactNode
}

const StepContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
`

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`

const StepIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StepTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`

const StepSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const FormStep: React.FC<FormStepProps> = ({ title, subtitle, icon, children }) => (
  <StepContainer>
    <StepHeader>
      <StepIcon>{icon}</StepIcon>
      <StepTitle>{title}</StepTitle>
      <StepSubtitle>{subtitle}</StepSubtitle>
    </StepHeader>
    {children}
  </StepContainer>
)

export default FormStep
