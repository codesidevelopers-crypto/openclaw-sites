import React from 'react'
import styled from 'styled-components'

interface TextFieldProps {
  label: string
  name: string
  value: string
  placeholder?: string
  type?: string
  onChange: (name: string, value: string) => void
  required?: boolean
  error?: string
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

interface InputProps {
  $hasError: boolean
}

const Input = styled.input<InputProps>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 2px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error : theme.colors.border};
  background: ${({ theme }) => theme.colors.bgInput};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}30`};
  }
`

const ErrorMsg = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
`

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  type = 'text',
  onChange,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(name, e.target.value)
  }

  return (
    <FieldWrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        $hasError={Boolean(error)}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </FieldWrapper>
  )
}

export default TextField
