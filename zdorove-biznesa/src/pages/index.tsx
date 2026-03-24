import React, { useState } from 'react'
import styled from 'styled-components'
import type { HeadFC } from 'gatsby'
import type { BusinessFormData, DashboardData, FormStep } from '../types'
import ProgressBar from '../components/ProgressBar'
import FormStep from '../components/FormStep'
import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import ScoreGauge from '../components/ScoreGauge'
import CategoryCard from '../components/CategoryCard'
import RecommendationCard from '../components/RecommendationCard'
import AnimatedSection from '../components/AnimatedSection'
import { useBusinessScore } from '../hooks/useBusinessScore'

const STEP_LABELS = ['Контакты', 'Финансы', 'Операции', 'Маркетинг', 'Продукт'] as const

const STEPS: FormStep[] = ['contact', 'finance', 'operations', 'marketing', 'product']

const emptyForm: BusinessFormData = {
  name: '',
  email: '',
  businessType: '',
  monthlyRevenue: '',
  revenueGrowth: '',
  netMargin: '',
  cashFlow: '',
  teamSize: '',
  operationalEfficiency: '',
  processAutomation: '',
  customerAcquisitionCost: '',
  customerLifetimeValue: '',
  conversionRate: '',
  npsScore: '',
  churnRate: '',
  productMarketFit: '',
}

/* ──────────────── Styled Components ──────────────── */

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing['4xl']} ${theme.spacing.xl}`};
  position: relative;
  overflow: hidden;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: -30%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
`

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: ${({ theme }) => `${theme.colors.primary}20`};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}40`};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  max-width: 900px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  span.gradient {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.375rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  line-height: 1.7;
`

const HeroStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  flex-wrap: wrap;
  justify-content: center;
`

const StatItem = styled.div`
  text-align: center;

  .value {
    font-family: 'Manrope', sans-serif;
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: 900;
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
  }

  .label {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 500;
  }
`

const StartButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing['3xl']}`};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  font-family: 'Manrope', sans-serif;
  letter-spacing: -0.01em;

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 0 60px rgba(108, 99, 255, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
`

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const FormContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing.xl}`};
`

const NavButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xl}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
`

const BackBtn = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderLight};
    color: ${({ theme }) => theme.colors.text};
  }
`

const NextBtn = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['2xl']}`};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.glow};

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 40px rgba(108, 99, 255, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

/* Dashboard styles */
const DashboardWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing.xl}`};
`

const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const DashboardTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  span.gradient {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const DashboardSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const GaugeSection = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => `${theme.spacing['2xl']} 0`};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`

const RecommendationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const RestartBtn = styled.button`
  display: block;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['2xl']}`};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.error}20`};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
`

/* ──────────────── Validation ──────────────── */

interface ValidationErrors {
  name?: string
  email?: string
}

const validateContact = (data: BusinessFormData): ValidationErrors => {
  const errors: ValidationErrors = {}
  if (!data.name.trim()) errors.name = 'Введите ваше имя'
  if (!data.email.trim()) {
    errors.email = 'Введите email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Введите корректный email'
  }
  return errors
}

const isStepComplete = (step: FormStep, data: BusinessFormData): boolean => {
  switch (step) {
    case 'contact':
      return Boolean(data.name && data.email && data.businessType)
    case 'finance':
      return Boolean(data.monthlyRevenue && data.revenueGrowth && data.netMargin && data.cashFlow)
    case 'operations':
      return Boolean(data.teamSize && data.operationalEfficiency && data.processAutomation)
    case 'marketing':
      return Boolean(data.customerAcquisitionCost && data.customerLifetimeValue && data.conversionRate)
    case 'product':
      return Boolean(data.npsScore && data.churnRate && data.productMarketFit)
    default:
      return true
  }
}

/* ──────────────── Main Component ──────────────── */

const IndexPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<FormStep>('intro')
  const [formData, setFormData] = useState<BusinessFormData>(emptyForm)
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { calculateScore } = useBusinessScore()

  const stepIndex = STEPS.indexOf(currentView as typeof STEPS[number])

  const handleFieldChange = (name: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleStart = (): void => {
    setCurrentView('contact')
  }

  const handleNext = async (): Promise<void> => {
    if (currentView === 'contact') {
      const contactErrors = validateContact(formData)
      if (Object.keys(contactErrors).length > 0) {
        setErrors(contactErrors)
        return
      }
    }

    const currentStepIdx = STEPS.indexOf(currentView as typeof STEPS[number])

    if (currentView === 'product') {
      // Final step — submit and compute dashboard
      setIsSubmitting(true)
      setSubmitError('')
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ form: 'zdorove-biznesa', ...formData }),
        })
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`)
        }
      } catch (_err) {
        // Non-blocking — still show dashboard even if API fails
        setSubmitError('Не удалось сохранить данные, но результаты готовы.')
      } finally {
        setIsSubmitting(false)
      }
      const result = calculateScore(formData)
      setDashboard(result)
      setCurrentView('dashboard')
    } else {
      setCurrentView(STEPS[currentStepIdx + 1])
    }
  }

  const handleBack = (): void => {
    const currentStepIdx = STEPS.indexOf(currentView as typeof STEPS[number])
    if (currentStepIdx === 0) {
      setCurrentView('intro')
    } else {
      setCurrentView(STEPS[currentStepIdx - 1])
    }
  }

  const handleRestart = (): void => {
    setFormData(emptyForm)
    setDashboard(null)
    setErrors({})
    setSubmitError('')
    setCurrentView('intro')
  }

  /* ── Render ── */

  if (currentView === 'intro') {
    return (
      <PageWrapper>
        <HeroSection>
          <AnimatedSection>
            <HeroBadge>
              <span>🩺</span>
              Диагностика бизнеса
            </HeroBadge>
            <HeroTitle>
              Как здоров <br />
              <span className="gradient">ваш бизнес?</span>
            </HeroTitle>
            <HeroSubtitle>
              Пройдите экспресс-диагностику за 5 минут и получите персонализированный
              дашборд с оценкой по 4 ключевым направлениям и конкретными рекомендациями.
            </HeroSubtitle>
            <HeroStats>
              <StatItem>
                <span className="value">16</span>
                <span className="label">показателей</span>
              </StatItem>
              <StatItem>
                <span className="value">4</span>
                <span className="label">направления</span>
              </StatItem>
              <StatItem>
                <span className="value">5 мин</span>
                <span className="label">времени</span>
              </StatItem>
            </HeroStats>
            <StartButton type="button" onClick={handleStart}>
              Начать диагностику →
            </StartButton>
          </AnimatedSection>
        </HeroSection>
      </PageWrapper>
    )
  }

  if (currentView === 'dashboard' && dashboard) {
    return (
      <PageWrapper>
        <DashboardWrapper>
          <AnimatedSection>
            <DashboardHeader>
              <DashboardTitle>
                Дашборд&nbsp;
                <span className="gradient">{dashboard.formData.name}</span>
              </DashboardTitle>
              <DashboardSubtitle>
                {dashboard.formData.businessType} · Диагностика бизнеса
              </DashboardSubtitle>
            </DashboardHeader>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <GaugeSection>
              <ScoreGauge
                score={dashboard.overallScore}
                grade={dashboard.grade}
                gradeLabel={dashboard.gradeLabel}
              />
            </GaugeSection>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <SectionTitle>Оценка по направлениям</SectionTitle>
            <CategoriesGrid>
              {dashboard.categories.map((cat) => (
                <CategoryCard key={cat.name} category={cat} />
              ))}
            </CategoriesGrid>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <SectionTitle>Рекомендации</SectionTitle>
            <RecommendationsList>
              {dashboard.recommendations.map((rec, i) => (
                <RecommendationCard key={i} rec={rec} index={i} />
              ))}
            </RecommendationsList>
          </AnimatedSection>

          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

          <AnimatedSection delay={400}>
            <RestartBtn type="button" onClick={handleRestart}>
              ↺ Пройти заново
            </RestartBtn>
          </AnimatedSection>
        </DashboardWrapper>
      </PageWrapper>
    )
  }

  const canProceed = isStepComplete(currentView, formData)

  return (
    <PageWrapper>
      <FormSection>
        <ProgressBar current={stepIndex} total={STEPS.length} labels={STEP_LABELS} />
        <FormContent>
          {currentView === 'contact' && (
            <FormStep
              title="Расскажите о себе"
              subtitle="Персонализируем ваш отчёт"
              icon="👤"
            >
              <TextField
                label="Ваше имя"
                name="name"
                value={formData.name}
                placeholder="Иван Иванов"
                onChange={handleFieldChange}
                required
                error={errors.name}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                placeholder="ivan@company.ru"
                onChange={handleFieldChange}
                required
                error={errors.email}
              />
              <SelectField
                label="Тип бизнеса"
                name="businessType"
                value={formData.businessType}
                onChange={handleFieldChange}
                options={[
                  { value: 'SaaS', label: 'SaaS / Подписка' },
                  { value: 'E-commerce', label: 'E-commerce' },
                  { value: 'Услуги', label: 'Услуги / Консалтинг' },
                  { value: 'Производство', label: 'Производство' },
                  { value: 'Ритейл', label: 'Ритейл' },
                  { value: 'Другое', label: 'Другое' },
                ]}
              />
            </FormStep>
          )}

          {currentView === 'finance' && (
            <FormStep
              title="Финансы"
              subtitle="Оцените текущее финансовое состояние"
              icon="💰"
            >
              <SelectField
                label="Ежемесячная выручка"
                name="monthlyRevenue"
                value={formData.monthlyRevenue}
                onChange={handleFieldChange}
                options={[
                  { value: 'lt100k', label: 'До 100 тыс. ₽' },
                  { value: '100k-500k', label: '100 – 500 тыс. ₽' },
                  { value: '500k-2m', label: '500 тыс. – 2 млн ₽' },
                  { value: '2m-10m', label: '2 – 10 млн ₽' },
                  { value: 'gt10m', label: 'Более 10 млн ₽' },
                ]}
              />
              <SelectField
                label="Рост выручки (год к году)"
                name="revenueGrowth"
                value={formData.revenueGrowth}
                onChange={handleFieldChange}
                options={[
                  { value: 'negative', label: 'Падение' },
                  { value: '0-10', label: '0 – 10%' },
                  { value: '10-30', label: '10 – 30%' },
                  { value: '30-50', label: '30 – 50%' },
                  { value: 'gt50', label: 'Более 50%' },
                ]}
              />
              <SelectField
                label="Чистая маржа"
                name="netMargin"
                value={formData.netMargin}
                onChange={handleFieldChange}
                options={[
                  { value: 'negative', label: 'Убыток' },
                  { value: '0-5', label: '0 – 5%' },
                  { value: '5-15', label: '5 – 15%' },
                  { value: '15-25', label: '15 – 25%' },
                  { value: 'gt25', label: 'Более 25%' },
                ]}
              />
              <SelectField
                label="Денежный поток"
                name="cashFlow"
                value={formData.cashFlow}
                onChange={handleFieldChange}
                options={[
                  { value: 'critical', label: 'Критический — риск кассового разрыва' },
                  { value: 'tight', label: 'Напряжённый — мало резервов' },
                  { value: 'stable', label: 'Стабильный — 1–3 мес. запас' },
                  { value: 'strong', label: 'Сильный — 3+ мес. запас' },
                ]}
              />
            </FormStep>
          )}

          {currentView === 'operations' && (
            <FormStep
              title="Операции и команда"
              subtitle="Как организованы внутренние процессы?"
              icon="⚙️"
            >
              <SelectField
                label="Размер команды"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleFieldChange}
                options={[
                  { value: 'solo', label: 'Только я' },
                  { value: '2-5', label: '2 – 5 человек' },
                  { value: '6-20', label: '6 – 20 человек' },
                  { value: '21-100', label: '21 – 100 человек' },
                  { value: 'gt100', label: 'Более 100' },
                ]}
              />
              <SelectField
                label="Операционная эффективность"
                name="operationalEfficiency"
                value={formData.operationalEfficiency}
                onChange={handleFieldChange}
                options={[
                  { value: 'low', label: 'Низкая — много хаоса и потерь' },
                  { value: 'medium', label: 'Средняя — есть проблемы' },
                  { value: 'high', label: 'Высокая — процессы работают' },
                  { value: 'excellent', label: 'Отличная — оптимизировано' },
                ]}
              />
              <SelectField
                label="Автоматизация процессов"
                name="processAutomation"
                value={formData.processAutomation}
                onChange={handleFieldChange}
                options={[
                  { value: 'none', label: 'Нет — всё вручную' },
                  { value: 'partial', label: 'Частичная — базовые инструменты' },
                  { value: 'mostly', label: 'В основном — большинство задач' },
                  { value: 'full', label: 'Полная — максимальная автоматизация' },
                ]}
              />
            </FormStep>
          )}

          {currentView === 'marketing' && (
            <FormStep
              title="Маркетинг и продажи"
              subtitle="Оцените эффективность привлечения клиентов"
              icon="📈"
            >
              <SelectField
                label="Стоимость привлечения клиента (CAC)"
                name="customerAcquisitionCost"
                value={formData.customerAcquisitionCost}
                onChange={handleFieldChange}
                options={[
                  { value: 'unknown', label: 'Не считаем' },
                  { value: 'high', label: 'Высокая — слишком дорого' },
                  { value: 'medium', label: 'Средняя — можно улучшить' },
                  { value: 'low', label: 'Низкая — хорошо' },
                  { value: 'optimized', label: 'Оптимизирована — отлично' },
                ]}
              />
              <SelectField
                label="LTV / CAC (пожизненная ценность к стоимости привлечения)"
                name="customerLifetimeValue"
                value={formData.customerLifetimeValue}
                onChange={handleFieldChange}
                options={[
                  { value: 'lt3x', label: 'Менее 3x' },
                  { value: '3x-5x', label: '3x – 5x' },
                  { value: '5x-10x', label: '5x – 10x' },
                  { value: 'gt10x', label: 'Более 10x' },
                ]}
              />
              <SelectField
                label="Конверсия лидов в клиентов"
                name="conversionRate"
                value={formData.conversionRate}
                onChange={handleFieldChange}
                options={[
                  { value: 'lt1', label: 'Менее 1%' },
                  { value: '1-3', label: '1 – 3%' },
                  { value: '3-7', label: '3 – 7%' },
                  { value: 'gt7', label: 'Более 7%' },
                ]}
              />
            </FormStep>
          )}

          {currentView === 'product' && (
            <FormStep
              title="Продукт и клиенты"
              subtitle="Насколько клиенты довольны и лояльны?"
              icon="💎"
            >
              <SelectField
                label="NPS (индекс лояльности клиентов)"
                name="npsScore"
                value={formData.npsScore}
                onChange={handleFieldChange}
                options={[
                  { value: 'negative', label: 'Отрицательный (ниже 0)' },
                  { value: '0-20', label: '0 – 20 (нейтральный)' },
                  { value: '20-50', label: '20 – 50 (хороший)' },
                  { value: '50-70', label: '50 – 70 (отличный)' },
                  { value: 'gt70', label: 'Выше 70 (выдающийся)' },
                ]}
              />
              <SelectField
                label="Ежемесячный отток клиентов (Churn)"
                name="churnRate"
                value={formData.churnRate}
                onChange={handleFieldChange}
                options={[
                  { value: 'gt10', label: 'Более 10% — критично' },
                  { value: '5-10', label: '5 – 10% — плохо' },
                  { value: '2-5', label: '2 – 5% — допустимо' },
                  { value: 'lt2', label: 'Менее 2% — отлично' },
                ]}
              />
              <SelectField
                label="Product-Market Fit"
                name="productMarketFit"
                value={formData.productMarketFit}
                onChange={handleFieldChange}
                options={[
                  { value: 'searching', label: 'Ещё ищем — непонятно' },
                  { value: 'early', label: 'Ранние признаки — обнадёживает' },
                  { value: 'found', label: 'Нашли — клиенты возвращаются' },
                  { value: 'strong', label: 'Сильный — явный спрос' },
                ]}
              />
            </FormStep>
          )}
        </FormContent>

        <NavButtons>
          <BackBtn type="button" onClick={handleBack}>
            ← Назад
          </BackBtn>
          <NextBtn
            type="button"
            onClick={handleNext}
            disabled={!canProceed || isSubmitting}
          >
            {isSubmitting
              ? 'Анализируем...'
              : currentView === 'product'
              ? '🔬 Показать результаты'
              : 'Далее →'}
          </NextBtn>
        </NavButtons>
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      </FormSection>
    </PageWrapper>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Здоровье Бизнеса — Диагностика за 5 минут</title>
    <meta
      name="description"
      content="Оцените здоровье вашего бизнеса по 16 показателям за 5 минут. Получите персонализированный дашборд с оценкой и рекомендациями."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
)
