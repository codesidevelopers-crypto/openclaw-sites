import React, { useState, useCallback } from 'react'
import styled, { css, keyframes } from 'styled-components'
import type { BookingFormData, BookingStep, ServiceCategory } from '../types'

// ─── Data ───────────────────────────────────────────────────────────────────

const SERVICE_OPTIONS: { id: ServiceCategory; label: string; icon: string }[] = [
  { id: 'diagnostics', label: 'Диагностика', icon: '🔍' },
  { id: 'maintenance', label: 'ТО', icon: '🔧' },
  { id: 'body', label: 'Кузовной ремонт', icon: '🚗' },
  { id: 'paint', label: 'Покраска', icon: '🎨' },
  { id: 'tires', label: 'Шиномонтаж', icon: '⚙️' },
  { id: 'electrical', label: 'Электрика', icon: '⚡' },
]

const CAR_BRANDS = [
  'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Hyundai', 'Kia',
  'Volkswagen', 'Lexus', 'Porsche', 'Volvo', 'Mazda', 'Subaru', 'Ford',
  'Renault', 'Skoda', 'Nissan', 'Mitsubishi', 'Peugeot', 'Другая марка',
]

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

// Simulate some occupied slots for realism
const OCCUPIED_SLOTS: Record<string, string[]> = {
  0: ['09:00', '11:00'],
  1: ['10:00', '14:00', '16:00'],
  2: ['09:00'],
  3: ['13:00', '15:00'],
  5: ['11:00', '12:00'],
}

const SERVICE_LABELS: Record<ServiceCategory, string> = {
  diagnostics: 'Диагностика',
  maintenance: 'ТО',
  body: 'Кузовной ремонт',
  paint: 'Покраска',
  tires: 'Шиномонтаж',
  electrical: 'Электрика',
}

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getNext14Days(): Date[] {
  const days: Date[] = []
  const today = new Date()
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}

function formatDateShort(date: Date): string {
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`
}

function getDayOfWeek(date: Date): string {
  const day = date.getDay()
  return DAY_NAMES[day === 0 ? 6 : day - 1] ?? 'Пн'
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  let result = ''
  if (digits.length === 0) return ''
  result = '+7'
  if (digits.length > 1) result += ' (' + digits.slice(1, 4)
  if (digits.length > 4) result += ') ' + digits.slice(4, 7)
  if (digits.length > 7) result += '-' + digits.slice(7, 9)
  if (digits.length > 9) result += '-' + digits.slice(9, 11)
  return result
}

// ─── Styled Components ───────────────────────────────────────────────────────

const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`

const slideRight = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
`

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
      ${({ theme }) => theme.colors.accent},
      transparent
    );
  }
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  span {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
  }

  &::before, &::after {
    content: '';
    display: block;
    width: 30px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
  }
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
`

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`

// Progress Bar
const ProgressBar = styled.div`
  padding: 2rem 2.5rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const ProgressSteps = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`

const ProgressStep = styled.div<{ $active: boolean; $done: boolean }>`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0.75rem;
`

const StepCircle = styled.div<{ $active: boolean; $done: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transitions.base};
  border: 2px solid ${({ $active, $done, theme }) =>
    $done || $active ? theme.colors.accent : theme.colors.border};
  background: ${({ $done, theme }) => ($done ? theme.colors.accent : 'transparent')};
  color: ${({ $active, $done, theme }) =>
    $done ? 'white' : $active ? theme.colors.accent : theme.colors.textDim};
`

const StepInfo = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 600px) {
    display: none;
  }
`

const StepLabel = styled.span<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textDim)};
  transition: color ${({ theme }) => theme.transitions.base};
`

const StepSubLabel = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textDim};
`

const StepConnector = styled.div<{ $done: boolean }>`
  flex: 1;
  height: 1px;
  background: ${({ $done, theme }) => ($done ? theme.colors.accent : theme.colors.border)};
  transition: background ${({ theme }) => theme.transitions.slow};
  min-width: 20px;

  @media (max-width: 600px) {
    min-width: 10px;
  }
`

// Form Body
const FormBody = styled.div`
  padding: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1.5rem;
  }
`

const StepContent = styled.div<{ $direction: 'forward' | 'backward' }>`
  animation: ${({ $direction }) =>
    $direction === 'forward'
      ? css`${slideLeft} 0.4s ease`
      : css`${slideRight} 0.4s ease`};
`

const StepTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const StepDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2rem;
`

// Step 1: Services
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ServiceCheckbox = styled.label<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
  border: 2px solid ${({ $selected, theme }) =>
    $selected ? theme.colors.accent : theme.colors.border};
  background: ${({ $selected, theme }) =>
    $selected ? `rgba(230, 57, 70, 0.08)` : theme.colors.bgSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  text-align: center;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: rgba(230, 57, 70, 0.05);
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`

const ServiceEmoji = styled.span`
  font-size: 1.8rem;
  line-height: 1;
`

const ServiceCheckLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
`

const CheckMark = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.55rem;
  color: white;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'scale(1)' : 'scale(0)')};
  transition: all ${({ theme }) => theme.transitions.base};
`

// Step 2: Car Data
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FormLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const FormInput = styled.input<{ $error?: boolean }>`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ $error, theme }) => ($error ? theme.colors.error : theme.colors.border)};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.85rem 1rem;
  font-size: 0.9rem;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${({ $error, theme }) => ($error ? theme.colors.error : theme.colors.accent)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDim};
  }
`

const FormSelect = styled.select<{ $error?: boolean }>`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ $error, theme }) => ($error ? theme.colors.error : theme.colors.border)};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.85rem 1rem;
  font-size: 0.9rem;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  outline: none;
  width: 100%;
  appearance: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ $error, theme }) => ($error ? theme.colors.error : theme.colors.accent)};
  }

  option {
    background: ${({ theme }) => theme.colors.bgCard};
  }
`

const FormTextarea = styled.textarea`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.85rem 1rem;
  font-size: 0.9rem;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  outline: none;
  width: 100%;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDim};
  }
`

const ErrorText = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.error};
`

// Slider
const SliderGroup = styled.div`
  grid-column: span 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const SliderValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`

const YearSlider = styled.input`
  width: 100%;
  appearance: none;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  outline: none;
  cursor: pointer;
  position: relative;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    cursor: pointer;
    transition: transform ${({ theme }) => theme.transitions.fast};
    border: 2px solid ${({ theme }) => theme.colors.bg};

    &:hover {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.bg};
  }
`

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textDim};
  font-family: ${({ theme }) => theme.fonts.heading};
`

// Step 3: Calendar
const CalendarWrapper = styled.div``

const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 500px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const CalendarDay = styled.button<{ $selected: boolean; $weekend: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0.6rem 0.25rem;
  border: 1px solid ${({ $selected, theme }) =>
    $selected ? theme.colors.accent : theme.colors.border};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.accent : theme.colors.bgSecondary};
  color: ${({ $selected, $weekend, theme }) =>
    $selected ? 'white' : $weekend ? theme.colors.textMuted : theme.colors.text};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ $selected, theme }) =>
      $selected ? theme.colors.accent : 'rgba(230, 57, 70, 0.08)'};
  }
`

const DayName = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
`

const DayNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
`

const DayMonth = styled.span`
  font-size: 0.55rem;
  opacity: 0.7;
`

const TimeSlotsLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.75rem;
`

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  @media (max-width: 500px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const TimeSlot = styled.button<{
  $selected: boolean
  $occupied: boolean
}>`
  padding: 0.6rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid ${({ $selected, $occupied, theme }) =>
    $selected ? theme.colors.accent : $occupied ? theme.colors.border : theme.colors.border};
  background: ${({ $selected, $occupied, theme }) =>
    $selected
      ? theme.colors.accent
      : $occupied
      ? 'rgba(255,255,255,0.03)'
      : theme.colors.bgSecondary};
  color: ${({ $selected, $occupied, theme }) =>
    $selected ? 'white' : $occupied ? theme.colors.textDim : theme.colors.text};
  cursor: ${({ $occupied }) => ($occupied ? 'not-allowed' : 'pointer')};
  text-decoration: ${({ $occupied }) => ($occupied ? 'line-through' : 'none')};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ $occupied, theme }) =>
      $occupied ? theme.colors.border : theme.colors.accent};
    background: ${({ $occupied, $selected, theme }) =>
      $selected
        ? theme.colors.accent
        : $occupied
        ? 'rgba(255,255,255,0.03)'
        : 'rgba(230, 57, 70, 0.08)'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`

const SlotsLegend = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.heading};
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const LegendDot = styled.div<{ $type: 'available' | 'selected' | 'occupied' }>`
  width: 10px;
  height: 10px;
  border: 1px solid ${({ $type, theme }) =>
    $type === 'selected'
      ? theme.colors.accent
      : $type === 'occupied'
      ? theme.colors.border
      : theme.colors.border};
  background: ${({ $type, theme }) =>
    $type === 'selected'
      ? theme.colors.accent
      : $type === 'occupied'
      ? 'rgba(255,255,255,0.03)'
      : theme.colors.bgSecondary};
`

// Step 4: Contacts
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const FullWidth = styled.div`
  grid-column: span 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`

// Summary
const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const SummaryTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1rem;
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const SummaryItem = styled.div``

const SummaryLabel = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.15rem;
`

const SummaryValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.9rem;
  font-weight: 600;
`

// Navigation
const FormNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: 1rem;
`

const BackButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.75rem 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.text};
  }
`

const NextButton = styled.button<{ $submit?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.85rem 2.5rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  transition: all ${({ theme }) => theme.transitions.base};
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const StepCounter = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDim};
`

// Success State
const SuccessState = styled.div`
  padding: 4rem 2.5rem;
  text-align: center;
  animation: ${slideLeft} 0.5s ease;
`

const SuccessIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(230, 57, 70, 0.1);
  border: 2px solid ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
`

const SuccessTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
`

const SuccessText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  max-width: 400px;
  margin: 0 auto;
`

const ValidationError = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.error};
  padding: 0.75rem 1rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
`

// ─── Component ───────────────────────────────────────────────────────────────

const INITIAL_FORM: BookingFormData = {
  services: [],
  carBrand: '',
  carModel: '',
  carYear: 2020,
  mileage: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  email: '',
  comment: '',
}

const STEP_INFO = [
  { label: 'Услуги', sub: 'Выбор' },
  { label: 'Автомобиль', sub: 'Данные' },
  { label: 'Дата и время', sub: 'Запись' },
  { label: 'Контакты', sub: 'Данные' },
]

const BookingForm: React.FC = () => {
  const [step, setStep] = useState<BookingStep>(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData | 'general', string>>>({})
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null)

  const days = getNext14Days()

  const toggleService = useCallback((cat: ServiceCategory): void => {
    setFormData((prev) => {
      const existing = prev.services
      const updated = existing.includes(cat)
        ? existing.filter((s) => s !== cat)
        : [...existing, cat]
      return { ...prev, services: updated }
    })
    setErrors((prev) => ({ ...prev, services: undefined }))
  }, [])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatPhone(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
    setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  const handleDaySelect = (index: number): void => {
    const day = days[index]
    if (!day) return
    setSelectedDayIndex(index)
    setFormData((prev) => ({ ...prev, date: formatDate(day), time: '' }))
    setErrors((prev) => ({ ...prev, date: undefined }))
  }

  const handleTimeSelect = (slot: string): void => {
    if (selectedDayIndex === null) return
    const occupied = OCCUPIED_SLOTS[selectedDayIndex] ?? []
    if (occupied.includes(slot)) return
    setFormData((prev) => ({ ...prev, time: slot }))
    setErrors((prev) => ({ ...prev, time: undefined }))
  }

  const validateStep = (): boolean => {
    const newErrors: typeof errors = {}

    if (step === 1) {
      if (formData.services.length === 0) {
        newErrors.services = 'Выберите хотя бы одну услугу'
      }
    }

    if (step === 2) {
      if (!formData.carBrand) newErrors.carBrand = 'Выберите марку'
      if (!formData.carModel.trim()) newErrors.carModel = 'Введите модель'
      if (!formData.mileage.trim()) newErrors.mileage = 'Введите пробег'
    }

    if (step === 3) {
      if (!formData.date) newErrors.date = 'Выберите дату'
      if (!formData.time) newErrors.time = 'Выберите время'
    }

    if (step === 4) {
      if (!formData.name.trim()) newErrors.name = 'Введите имя'
      if (!formData.phone || formData.phone.length < 17) newErrors.phone = 'Введите корректный телефон'
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Введите корректный email'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goNext = (): void => {
    if (!validateStep()) return
    if (step < 4) {
      setDirection('forward')
      setStep((prev) => (prev + 1) as BookingStep)
    }
  }

  const goBack = (): void => {
    if (step > 1) {
      setDirection('backward')
      setStep((prev) => (prev - 1) as BookingStep)
    }
  }

  const handleSubmit = async (): Promise<void> => {
    if (!validateStep()) return
    setSubmitting(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: 'booking', ...formData }),
      })
    } catch (_e) {
      // graceful degradation – show success regardless
    }
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Section id="booking">
        <Container>
          <FormCard>
            <SuccessState>
              <SuccessIcon>✓</SuccessIcon>
              <SuccessTitle>Запись подтверждена!</SuccessTitle>
              <SuccessText>
                Мы получили вашу заявку. Наш менеджер свяжется с вами по телефону{' '}
                <strong>{formData.phone}</strong> в течение 30 минут для подтверждения.
                <br /><br />
                <strong>{formData.date}</strong> в <strong>{formData.time}</strong>
              </SuccessText>
            </SuccessState>
          </FormCard>
        </Container>
      </Section>
    )
  }

  const occupiedForDay = selectedDayIndex !== null ? (OCCUPIED_SLOTS[selectedDayIndex] ?? []) : []

  return (
    <Section id="booking">
      <Container>
        <SectionHeader>
          <SectionLabel><span>Онлайн запись</span></SectionLabel>
          <SectionTitle>Запишитесь за 2 минуты</SectionTitle>
        </SectionHeader>

        <FormCard>
          {/* Progress Bar */}
          <ProgressBar>
            <ProgressSteps>
              {STEP_INFO.map((info, index) => {
                const stepNum = (index + 1) as BookingStep
                const isActive = step === stepNum
                const isDone = step > stepNum
                return (
                  <React.Fragment key={stepNum}>
                    <ProgressStep $active={isActive} $done={isDone}>
                      <StepCircle $active={isActive} $done={isDone}>
                        {isDone ? '✓' : stepNum}
                      </StepCircle>
                      <StepInfo $active={isActive}>
                        <StepLabel $active={isActive}>{info.label}</StepLabel>
                        <StepSubLabel>{info.sub}</StepSubLabel>
                      </StepInfo>
                    </ProgressStep>
                    {index < STEP_INFO.length - 1 && (
                      <StepConnector $done={step > stepNum} />
                    )}
                  </React.Fragment>
                )
              })}
            </ProgressSteps>
          </ProgressBar>

          <FormBody>
            <StepContent $direction={direction} key={step}>

              {/* ── Step 1: Services ── */}
              {step === 1 && (
                <>
                  <StepTitle>Выберите услуги</StepTitle>
                  <StepDescription>Можно выбрать несколько услуг одновременно</StepDescription>
                  {errors.services && <ValidationError>{errors.services}</ValidationError>}
                  <ServicesGrid>
                    {SERVICE_OPTIONS.map((svc) => (
                      <ServiceCheckbox
                        key={svc.id}
                        $selected={formData.services.includes(svc.id)}
                        onClick={() => toggleService(svc.id)}
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(svc.id)}
                          onChange={() => toggleService(svc.id)}
                        />
                        <ServiceEmoji>{svc.icon}</ServiceEmoji>
                        <ServiceCheckLabel>{svc.label}</ServiceCheckLabel>
                        <CheckMark $visible={formData.services.includes(svc.id)}>✓</CheckMark>
                      </ServiceCheckbox>
                    ))}
                  </ServicesGrid>
                </>
              )}

              {/* ── Step 2: Car Data ── */}
              {step === 2 && (
                <>
                  <StepTitle>Данные автомобиля</StepTitle>
                  <StepDescription>Укажите информацию о вашем автомобиле</StepDescription>
                  <FormGrid>
                    <FormGroup>
                      <FormLabel htmlFor="carBrand">Марка *</FormLabel>
                      <FormSelect
                        id="carBrand"
                        value={formData.carBrand}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, carBrand: e.target.value }))
                          setErrors((prev) => ({ ...prev, carBrand: undefined }))
                        }}
                        $error={!!errors.carBrand}
                      >
                        <option value="">Выберите марку...</option>
                        {CAR_BRANDS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </FormSelect>
                      {errors.carBrand && <ErrorText>{errors.carBrand}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="carModel">Модель *</FormLabel>
                      <FormInput
                        id="carModel"
                        type="text"
                        placeholder="Например: X5, Camry..."
                        value={formData.carModel}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, carModel: e.target.value }))
                          setErrors((prev) => ({ ...prev, carModel: undefined }))
                        }}
                        $error={!!errors.carModel}
                      />
                      {errors.carModel && <ErrorText>{errors.carModel}</ErrorText>}
                    </FormGroup>

                    <SliderGroup>
                      <FormLabel>Год выпуска</FormLabel>
                      <SliderHeader>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>2000 — 2025</span>
                        <SliderValue>{formData.carYear}</SliderValue>
                      </SliderHeader>
                      <YearSlider
                        type="range"
                        min={2000}
                        max={2025}
                        value={formData.carYear}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, carYear: Number(e.target.value) }))
                        }
                      />
                      <SliderLabels>
                        <span>2000</span>
                        <span>2025</span>
                      </SliderLabels>
                    </SliderGroup>

                    <FormGroup>
                      <FormLabel htmlFor="mileage">Пробег (км) *</FormLabel>
                      <FormInput
                        id="mileage"
                        type="number"
                        placeholder="Например: 85000"
                        value={formData.mileage}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, mileage: e.target.value }))
                          setErrors((prev) => ({ ...prev, mileage: undefined }))
                        }}
                        $error={!!errors.mileage}
                      />
                      {errors.mileage && <ErrorText>{errors.mileage}</ErrorText>}
                    </FormGroup>
                  </FormGrid>
                </>
              )}

              {/* ── Step 3: Date & Time ── */}
              {step === 3 && (
                <>
                  <StepTitle>Выберите дату и время</StepTitle>
                  <StepDescription>Доступные записи на ближайшие 14 дней</StepDescription>

                  {errors.date && <ValidationError>{errors.date}</ValidationError>}
                  {errors.time && !errors.date && <ValidationError>{errors.time}</ValidationError>}

                  <CalendarWrapper>
                    <TimeSlotsLabel>Выберите дату</TimeSlotsLabel>
                    <CalendarDays>
                      {days.map((day, index) => {
                        const dayOfWeek = day.getDay()
                        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
                        return (
                          <CalendarDay
                            key={index}
                            $selected={selectedDayIndex === index}
                            $weekend={isWeekend}
                            onClick={() => handleDaySelect(index)}
                            type="button"
                          >
                            <DayName>{getDayOfWeek(day)}</DayName>
                            <DayNumber>{day.getDate()}</DayNumber>
                            <DayMonth>{formatDateShort(day).slice(3)}</DayMonth>
                          </CalendarDay>
                        )
                      })}
                    </CalendarDays>

                    {selectedDayIndex !== null && (
                      <>
                        <TimeSlotsLabel>
                          Выберите время — {formData.date}
                        </TimeSlotsLabel>
                        <TimeGrid>
                          {TIME_SLOTS.map((slot) => {
                            const isOccupied = occupiedForDay.includes(slot)
                            return (
                              <TimeSlot
                                key={slot}
                                $selected={formData.time === slot}
                                $occupied={isOccupied}
                                onClick={() => handleTimeSelect(slot)}
                                disabled={isOccupied}
                                type="button"
                              >
                                {slot}
                              </TimeSlot>
                            )
                          })}
                        </TimeGrid>
                        <SlotsLegend>
                          <LegendItem>
                            <LegendDot $type="available" />
                            <span>Свободно</span>
                          </LegendItem>
                          <LegendItem>
                            <LegendDot $type="selected" />
                            <span>Выбрано</span>
                          </LegendItem>
                          <LegendItem>
                            <LegendDot $type="occupied" />
                            <span>Занято</span>
                          </LegendItem>
                        </SlotsLegend>
                      </>
                    )}
                  </CalendarWrapper>
                </>
              )}

              {/* ── Step 4: Contacts + Summary ── */}
              {step === 4 && (
                <>
                  <StepTitle>Контактные данные</StepTitle>
                  <StepDescription>Введите ваши данные для подтверждения записи</StepDescription>

                  {/* Summary */}
                  <SummaryCard>
                    <SummaryTitle>Сводка записи</SummaryTitle>
                    <SummaryGrid>
                      <SummaryItem>
                        <SummaryLabel>Услуги</SummaryLabel>
                        <SummaryValue>
                          {formData.services.map((s) => SERVICE_LABELS[s]).join(', ')}
                        </SummaryValue>
                      </SummaryItem>
                      <SummaryItem>
                        <SummaryLabel>Автомобиль</SummaryLabel>
                        <SummaryValue>
                          {formData.carBrand} {formData.carModel} ({formData.carYear})
                        </SummaryValue>
                      </SummaryItem>
                      <SummaryItem>
                        <SummaryLabel>Пробег</SummaryLabel>
                        <SummaryValue>{formData.mileage} км</SummaryValue>
                      </SummaryItem>
                      <SummaryItem>
                        <SummaryLabel>Дата и время</SummaryLabel>
                        <SummaryValue>{formData.date} в {formData.time}</SummaryValue>
                      </SummaryItem>
                    </SummaryGrid>
                  </SummaryCard>

                  <ContactGrid>
                    <FormGroup>
                      <FormLabel htmlFor="name">Ваше имя *</FormLabel>
                      <FormInput
                        id="name"
                        type="text"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                          setErrors((prev) => ({ ...prev, name: undefined }))
                        }}
                        $error={!!errors.name}
                      />
                      {errors.name && <ErrorText>{errors.name}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="phone">Телефон *</FormLabel>
                      <FormInput
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        $error={!!errors.phone}
                      />
                      {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                    </FormGroup>

                    <FullWidth>
                      <FormGroup>
                        <FormLabel htmlFor="email">Email *</FormLabel>
                        <FormInput
                          id="email"
                          type="email"
                          placeholder="example@mail.ru"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                            setErrors((prev) => ({ ...prev, email: undefined }))
                          }}
                          $error={!!errors.email}
                        />
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}
                      </FormGroup>
                    </FullWidth>

                    <FullWidth>
                      <FormGroup>
                        <FormLabel htmlFor="comment">Комментарий</FormLabel>
                        <FormTextarea
                          id="comment"
                          placeholder="Опишите проблему подробнее или укажите пожелания..."
                          value={formData.comment}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, comment: e.target.value }))
                          }
                        />
                      </FormGroup>
                    </FullWidth>
                  </ContactGrid>
                </>
              )}
            </StepContent>

            {/* Navigation */}
            <FormNav>
              <div>
                {step > 1 && (
                  <BackButton onClick={goBack} type="button">
                    ← Назад
                  </BackButton>
                )}
              </div>
              <StepCounter>{step} из 4</StepCounter>
              {step < 4 ? (
                <NextButton onClick={goNext} type="button">
                  Далее →
                </NextButton>
              ) : (
                <NextButton
                  onClick={handleSubmit}
                  type="button"
                  disabled={submitting}
                  $submit
                >
                  {submitting ? 'Отправка...' : 'Записаться ✓'}
                </NextButton>
              )}
            </FormNav>
          </FormBody>
        </FormCard>
      </Container>
    </Section>
  )
}

export default BookingForm
