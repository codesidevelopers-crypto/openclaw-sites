import React from 'react'
import styled from 'styled-components'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  label: string
  name: string
  value: string
  options: SelectOption[]
  onChange: (name: string, value: string) => void
  required?: boolean
}

const FieldWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`

interface OptionButtonProps {
  $selected: boolean
}

const OptionButton = styled.button<OptionButtonProps>`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 2px solid ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $selected }) =>
    $selected ? `${theme.colors.primary}20` : theme.colors.bgInput};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primaryLight : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    background: ${({ theme }) => `${theme.colors.primary}15`};
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  const handleClick = (optionValue: string): void => {
    onChange(name, optionValue)
  }

  return (
    <FieldWrapper>
      <Label>{label}</Label>
      <OptionsGrid>
        {options.map((option) => (
          <OptionButton
            key={option.value}
            type="button"
            $selected={value === option.value}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </OptionButton>
        ))}
      </OptionsGrid>
    </FieldWrapper>
  )
}

export default SelectField
