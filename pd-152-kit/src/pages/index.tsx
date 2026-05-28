import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';
import heroIllustration from '../images/pd152-hero-visual-polish.png';

type PricingTier = 'Базовый' | 'Стандарт' | 'Расширенный' | 'Не знаю';
type FormStep = 1 | 2 | 3;
type NeedType = 'site_docs' | 'rkn_notice' | 'full_package' | 'not_sure';
type YesNoUnsure = 'Да' | 'Нет' | 'Не уверен';
type NoticeStatus = 'Да' | 'Нет' | 'Не знаю';

type StepOneData = {
  name: string;
  phone: string;
  email: string;
  website: string;
  inn: string;
  selectedTariff: PricingTier;
};

type StepTwoData = {
  hasForms: YesNoUnsure;
  usesTools: YesNoUnsure;
  hasEmployees: YesNoUnsure;
  filedNoticeBefore: NoticeStatus;
  needType: NeedType;
};

type FormMeta = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  landing_url: string;
};

type FullFormPayload = StepOneData & StepTwoData & FormMeta;

type AnalyticsEventName =
  | 'page_view'
  | 'hero_cta_click'
  | 'pricing_view'
  | 'tariff_click'
  | 'form_start'
  | 'form_step_1_submit'
  | 'form_submit_step1'
  | 'form_step_2_submit'
  | 'form_success'
  | 'high_intent_lead'
  | 'faq_open'
  | 'final_cta_click';

type AnalyticsPayload = Record<string, string | boolean | number | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  ym?: (...args: unknown[]) => void;
};

const trackEvent = (event: AnalyticsEventName, payload: AnalyticsPayload = {}): void => {
  const data = { event, ...payload };

  if (typeof window !== 'undefined') {
    const currentWindow = window as DataLayerWindow;

    if (Array.isArray(currentWindow.dataLayer)) {
      currentWindow.dataLayer.push(data);
    }

    if (typeof currentWindow.ym === 'function' && process.env.GATSBY_YANDEX_METRIKA_ID) {
      currentWindow.ym(process.env.GATSBY_YANDEX_METRIKA_ID, 'reachGoal', event, payload);
    }
  }

  // eslint-disable-next-line no-console
  console.info('[analytics]', data);
};

const getUrlParam = (key: string): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return new URLSearchParams(window.location.search).get(key) ?? '';
};

const buildMeta = (): FormMeta => ({
  utm_source: getUrlParam('utm_source'),
  utm_medium: getUrlParam('utm_medium'),
  utm_campaign: getUrlParam('utm_campaign'),
  utm_content: getUrlParam('utm_content'),
  utm_term: getUrlParam('utm_term'),
  referrer: typeof document !== 'undefined' ? document.referrer : '',
  landing_url: typeof window !== 'undefined' ? window.location.href : '',
});

const submitLead = async (payload: FullFormPayload): Promise<void> => {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить заявку. Попробуйте ещё раз.');
  }
};

const trustPoints = [
  '7–14 дней на подготовку',
  'Оплата после согласования',
  'Специалисты по 152-ФЗ',
  'Не шаблон из интернета',
];

const audienceItems = [
  'Есть сайт с формой заявки',
  'Используете cookies, Метрику, CRM или рассылки',
  'Есть сотрудники или соискатели',
  'Собираете заявки из соцсетей или мессенджеров',
  'Передаёте данные подрядчикам',
  'Не уверены, подавали ли уведомление в РКН',
];

const results = [
  'Политика обработки ПДн',
  'Согласия и формулировки для сайта',
  'Рекомендации по cookies и метрикам',
  'Документы по сотрудникам — если применимо',
  'Подготовленное уведомление в РКН — если требуется',
  'Инструкция: что, где и когда разместить',
];

const processSteps = [
  {
    title: 'Короткая анкета о бизнесе',
    text: 'Рассказываете, как собираете данные: сайт, формы, cookies, CRM, сотрудники и подрядчики.',
  },
  {
    title: 'Состав и стоимость',
    text: 'Мы определяем, какие документы нужны именно вам, и согласуем стоимость до начала работ.',
  },
  {
    title: 'Готовый комплект за 7–14 дней',
    text: 'Подготавливаем документы и инструкцию по размещению и дальнейшим шагам.',
    note: 'Подготовка начинается после оплаты. Оплата — только после согласования состава.',
  },
] as const;

const pricing = [
  {
    tier: 'Базовый' as PricingTier,
    price: 'от 4 990 ₽',
    description: 'Для бизнеса с сайтом и базовыми сценариями сбора данных.',
    items: [
      'Политика обработки ПДн',
      'Согласие и формулировки для сайта',
      'Рекомендации по размещению',
      'Уведомление в РКН и инструкция по подаче — при необходимости',
    ],
  },
  {
    tier: 'Стандарт' as PricingTier,
    price: 'от 9 990 ₽',
    description: 'Для бизнеса с сайтом, CRM, клиентской базой и сотрудниками.',
    items: ['Всё из базового', 'Документы по сотрудникам', 'Расширенная проработка процессов', 'Уведомление РКН и инструкция по подаче'],
    featured: true,
  },
  {
    tier: 'Расширенный' as PricingTier,
    price: 'от 19 990 ₽',
    description: 'Для сложных процессов: несколько сайтов, подрядчики, внешние сервисы.',
    items: ['Индивидуальная оценка процессов', 'Несколько сайтов или направлений', 'Сложные сценарии передачи данных'],
  },
];

const faqItems = [
  {
    question: 'Нужно ли уведомлять РКН всем?',
    answer: 'Не всегда. Это зависит от того, как именно вы собираете и обрабатываете данные. После анкеты поможем определить, нужен ли этот шаг.',
  },
  {
    question: 'Вы проверяете сайт автоматически?',
    answer: 'Нет. Мы не делаем автоматический аудит. Комплект готовится вручную на основе анкеты о вашем бизнесе и процессах.',
  },
  {
    question: 'Можно ли использовать шаблон из интернета?',
    answer: 'Можно как ориентир, но шаблон редко учитывает ваши реальные процессы, cookies, сотрудников, подрядчиков и уведомление РКН.',
  },
  {
    question: 'Даёте ли вы гарантию?',
    answer: 'Абсолютных гарантий не обещаем. Наша задача — подготовить документы и инструкции так, чтобы снизить риск ошибок и претензий.',
  },
];

const initialStepOne: StepOneData = {
  name: '',
  phone: '',
  email: '',
  website: '',
  inn: '',
  selectedTariff: '' as PricingTier,
};

const initialStepTwo: StepTwoData = {
  hasForms: 'Да',
  usesTools: 'Да',
  hasEmployees: 'Не уверен',
  filedNoticeBefore: 'Не знаю',
  needType: 'full_package',
};

const IconDoc = (): React.ReactElement => (
  <SvgIcon viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 3.75h7.5L19.25 8.5V20a1.25 1.25 0 0 1-1.25 1.25H7A1.25 1.25 0 0 1 5.75 20V5A1.25 1.25 0 0 1 7 3.75Z" />
    <path d="M14.5 3.75V8.5h4.75" />
    <path d="M9 12h6" />
    <path d="M9 15.5h6" />
  </SvgIcon>
);

const IconCookie = (): React.ReactElement => (
  <SvgIcon viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14.5 4.5c0 1.6 1.3 2.9 2.9 2.9.5 0 1-.1 1.4-.4A7.75 7.75 0 1 1 10 3.25c.2.5.5.9.9 1.25.9.8 2.2 1.25 3.6 0Z" />
    <circle cx="9.2" cy="9.2" r="1" />
    <circle cx="8.4" cy="14.2" r="1" />
    <circle cx="13.6" cy="13.4" r="1" />
  </SvgIcon>
);

const IconUsers = (): React.ReactElement => (
  <SvgIcon viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.5 11a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z" />
    <path d="M15.8 10.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
    <path d="M4.75 18.75c.4-2.4 2.2-4 4.7-4s4.3 1.6 4.7 4" />
    <path d="M13.6 18.2c.35-1.6 1.55-2.75 3.25-3" />
  </SvgIcon>
);

const IconShield = (): React.ReactElement => (
  <SvgIcon viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3.75 18.5 6v5.6c0 4.15-2.5 7.2-6.5 8.65C8 18.8 5.5 15.75 5.5 11.6V6L12 3.75Z" />
    <path d="m9.4 11.9 1.7 1.7 3.7-3.9" />
  </SvgIcon>
);

const IconFlow = (): React.ReactElement => (
  <SvgIcon viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 6.25h6.25V11H5z" />
    <path d="M12.75 13H19v4.75h-6.25z" />
    <path d="M8.1 11v2c0 .7.55 1.25 1.25 1.25h3.4" />
    <path d="m11.6 12.9 1.15 1.35-1.15 1.35" />
  </SvgIcon>
);

const IconCheck = (): React.ReactElement => (
  <SvgIcon viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 7 10 17l-4.5-4.5" />
  </SvgIcon>
);

const resultIcons = [IconDoc, IconShield, IconCookie, IconUsers, IconDoc, IconFlow] as const;
const audienceIcons = [IconFlow, IconCookie, IconUsers, IconFlow, IconShield, IconDoc] as const;
const processIcons = [IconDoc, IconShield, IconFlow] as const;
const pricingIcons = [IconDoc, IconShield, IconFlow] as const;
const trustIcons = [IconCheck, IconShield, IconDoc, IconFlow] as const;

const IndexPage: React.FC = () => {
  const [step, setStep] = useState<FormStep>(1);
  const [stepOne, setStepOne] = useState<StepOneData>(initialStepOne);
  const [stepTwo, setStepTwo] = useState<StepTwoData>(initialStepTwo);
  const [meta, setMeta] = useState<FormMeta>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    referrer: '',
    landing_url: '',
  });
  const [startedForm, setStartedForm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingTracked, setPricingTracked] = useState(false);

  useEffect(() => {
    setMeta(buildMeta());
    trackEvent('page_view', {
      page_type: 'landing',
      has_utm: typeof window !== 'undefined' ? window.location.search.includes('utm_') : false,
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const pricingSection = document.getElementById('pricing');
    if (!pricingSection || pricingTracked) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('pricing_view', { section: 'pricing' });
            setPricingTracked(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(pricingSection);

    return () => observer.disconnect();
  }, [pricingTracked]);

  const payload = useMemo<FullFormPayload>(
    () => ({
      ...stepOne,
      ...stepTwo,
      ...meta,
    }),
    [meta, stepOne, stepTwo]
  );

  const goToForm = (eventName: 'hero_cta_click' | 'final_cta_click', label: string): void => {
    trackEvent(eventName, { cta_text: label });

    if (!startedForm) {
      setStartedForm(true);
      trackEvent('form_start', { source: label });
    }

    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTariffClick = (tier: PricingTier): void => {
    setStepOne((current) => ({ ...current, selectedTariff: tier }));
    const tariffMap: Record<'Базовый' | 'Стандарт' | 'Расширенный', 'base' | 'standard' | 'extended'> = {
      Базовый: 'base',
      Стандарт: 'standard',
      Расширенный: 'extended',
    };
    trackEvent('tariff_click', { tariff: tariffMap[tier as 'Базовый' | 'Стандарт' | 'Расширенный'] });

    if (!startedForm) {
      setStartedForm(true);
      trackEvent('form_start', { source: `pricing_${tier}` });
    }

    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStepOneChange = (field: keyof StepOneData) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (!startedForm) {
      setStartedForm(true);
      trackEvent('form_start', { source: 'field_interaction' });
    }

    setStepOne((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleStepTwoChange =
    <K extends keyof StepTwoData>(field: K) =>
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setStepTwo((current) => ({
        ...current,
        [field]: event.target.value as StepTwoData[K],
      }));
    };

  const submitStepOne = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!stepOne.name || !stepOne.phone || !stepOne.email || !stepOne.website) {
      setError('Заполните имя, телефон, email и сайт компании.');
      return;
    }

    setError('');
    trackEvent('form_step_1_submit', {
      selected_tariff: stepOne.selectedTariff,
      has_inn: Boolean(stepOne.inn),
    });
    trackEvent('form_submit_step1', {
      selected_tariff: stepOne.selectedTariff,
      has_inn: Boolean(stepOne.inn),
    });
    setStep(2);
  };

  const submitStepTwo = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      trackEvent('form_step_2_submit', {
        has_forms: stepTwo.hasForms,
        uses_tools: stepTwo.usesTools,
        has_employees: stepTwo.hasEmployees,
        need_type: stepTwo.needType,
      });

      await submitLead(payload);
      trackEvent('form_success', {
        selected_tariff: stepOne.selectedTariff,
      });
      setStep(3);
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : 'Не удалось отправить заявку.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <GlobalStyles />

      <HeroSection>
        <Container>
          <HeroGrid>
            <HeroMain>
              <Eyebrow>152-ФЗ · документы под ваш бизнес</Eyebrow>
              <HeroTitle>Документы по персональным данным под ваш бизнес</HeroTitle>
              <HeroText>
                Подготовим политику, согласия, формулировки для сайта, инструкцию по размещению и уведомление в
                РКН — на основе короткой анкеты о вашем бизнесе.
              </HeroText>
              <HeroActions>
                <PrimaryButton type="button" onClick={() => goToForm('hero_cta_click', 'Получить расчёт')}>
                  Получить расчёт
                </PrimaryButton>
                <SecondaryButton type="button" onClick={() => { trackEvent('hero_cta_click', { cta_text: 'Посмотреть, что входит ↓' }); document.getElementById('what-you-get')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                  Посмотреть, что входит ↓
                </SecondaryButton>
              </HeroActions>
              <TrustGrid>
                {trustPoints.map((point, index) => {
                  const Icon = trustIcons[index];
                  return (
                    <TrustCard key={point}>
                      <TrustIcon>
                        <Icon />
                      </TrustIcon>
                      <TrustText $strong={index === 1 || index === 2}>{point}</TrustText>
                    </TrustCard>
                  );
                })}
              </TrustGrid>
            </HeroMain>

            <HeroVisualWrap>
              <HeroMockVisual aria-hidden="true">
                <MockPanelLarge>
                  <MockWindowHeader>
                    <MockDot />
                    <MockDot />
                    <MockDot />
                  </MockWindowHeader>
                  <MockContentGrid>
                    <MockFormCard>
                      <MockTitle>Форма заявки</MockTitle>
                      <MockField />
                      <MockField />
                      <MockCheckboxRow>
                        <MockCheckbox />
                        <MockCheckboxText />
                      </MockCheckboxRow>
                    </MockFormCard>
                    <MockDocsStack>
                      <MockDocCard>
                        <MockDocTitle>Политика ПДн</MockDocTitle>
                        <MockDocLine />
                        <MockDocLine short />
                      </MockDocCard>
                      <MockDocCard>
                        <MockDocTitle>Согласие</MockDocTitle>
                        <MockDocLine />
                        <MockDocLine short />
                      </MockDocCard>
                      <MockDocCard accent>
                        <MockDocTitle>Уведомление РКН</MockDocTitle>
                        <MockDocLine />
                        <MockDocLine short />
                      </MockDocCard>
                    </MockDocsStack>
                  </MockContentGrid>
                </MockPanelLarge>
                <MockShieldBadge>
                  <ShieldCheckIcon viewBox="0 0 24 24">
                    <path d="M12 3.75 18.5 6v5.6c0 4.15-2.5 7.2-6.5 8.65C8 18.8 5.5 15.75 5.5 11.6V6L12 3.75Z" />
                    <path d="m9.4 11.9 1.7 1.7 3.7-3.9" />
                  </ShieldCheckIcon>
                </MockShieldBadge>
              </HeroMockVisual>
            </HeroVisualWrap>

          </HeroGrid>
        </Container>
      </HeroSection>

      <TintSection>
        <Container>
          <SectionHeader>
            <SectionLabel>ДЛЯ КОГО</SectionLabel>
            <SectionTitle>Кому это актуально</SectionTitle>
          </SectionHeader>
          <FeatureGrid>
            {audienceItems.map((item, index) => {
              const Icon = audienceIcons[index];
              return (
                <FeatureCard key={item}>
                  <FeatureIconChip>
                    <FeatureIcon>
                      <Icon />
                    </FeatureIcon>
                  </FeatureIconChip>
                  <FeatureText>{item}</FeatureText>
                </FeatureCard>
              );
            })}
          </FeatureGrid>
        </Container>
      </TintSection>

      <Section>
        <Container>
                  </Container>
      </Section>

      <Section id="what-you-get">
        <Container>
          <SectionHeader>
            <SectionLabel>СОСТАВ УСЛУГИ</SectionLabel>
            <SectionTitle>Что вы получите</SectionTitle>
          </SectionHeader>
          <ServiceGrid>
            {results.map((item, index) => {
              const Icon = resultIcons[index];
              return (
                <ServiceCard key={item}>
                  <FeatureIconChip>
                    <ServiceIcon>
                      <Icon />
                    </ServiceIcon>
                  </FeatureIconChip>
                  <ServiceText>{item}</ServiceText>
                </ServiceCard>
              );
            })}
          </ServiceGrid>
        </Container>
      </Section>

      <TintSection>
        <Container>
          <SectionHeader>
            <SectionLabel>КАК МЫ РАБОТАЕМ</SectionLabel>
            <SectionTitle>Как это работает</SectionTitle>
          </SectionHeader>
          <StepsGrid>
            {processSteps.map((item, index) => {
              const Icon = processIcons[index];
              return (
                <StepCard key={item.title}>
                  <StepHead>
                    <StepNumber>0{index + 1}</StepNumber>
                  </StepHead>
                  <StepTitle>{item.title}</StepTitle>
                  <StepDescription>{item.text}</StepDescription>
                  {'note' in item && item.note ? <StepNote>{item.note}</StepNote> : null}
                </StepCard>
              );
            })}
          </StepsGrid>
        </Container>
      </TintSection>

      <Section id="pricing">
        <Container>
          <SectionHeader>
            <SectionLabel>СТОИМОСТЬ</SectionLabel>
            <SectionTitle>Тарифы</SectionTitle>
            
          </SectionHeader>
          <PricingGrid>
            {pricing.map((item, index) => {
              const Icon = pricingIcons[index];
              return (
                <PricingCard key={item.tier} $featured={Boolean(item.featured)}>
                  {item.featured && <PricingBadge>Оптимальный выбор</PricingBadge>}
                  <PricingTop>
                    <PricingIcon>
                      <Icon />
                    </PricingIcon>
                    <PricingTier>{item.tier}</PricingTier>
                  </PricingTop>
                  <PricingPrice><PricingFrom>от</PricingFrom><PricingValue>{item.price.replace('от ', '')}</PricingValue></PricingPrice>
                  <PricingDescription>{item.description}</PricingDescription>
                  <PricingList>
                    {item.items.map((priceItem) => (
                      <li key={priceItem}>{priceItem}</li>
                    ))}
                  </PricingList>
                  <TariffButton type="button" onClick={() => handleTariffClick(item.tier)} $featured={Boolean(item.featured)}>
                    Выбрать тариф
                  </TariffButton>
                </PricingCard>
              );
            })}
          </PricingGrid>
          <PricingNote>
            Финальная стоимость зависит от состава документов и подтверждается после анкеты. Оплата — только после
            согласования работ.
          </PricingNote>
          <AfterPricingCta>
            <PrimaryButton type="button" onClick={() => goToForm('final_cta_click', 'Оставить заявку после тарифов')}>Оставить заявку</PrimaryButton>
            <AfterPricingText>Оплата только после согласования состава работ</AfterPricingText>
          </AfterPricingCta>
        </Container>
      </Section>

      <Section id="lead-form">
        <Container narrow>
          <FormPanel>
            <SelectedTariffNotice>{stepOne.selectedTariff ? `Вы выбрали тариф: ${stepOne.selectedTariff}${stepOne.selectedTariff === 'Базовый' ? ' — от 4 990 ₽' : stepOne.selectedTariff === 'Стандарт' ? ' — от 9 990 ₽' : stepOne.selectedTariff === 'Расширенный' ? ' — от 19 990 ₽' : ''}` : 'Тариф не выбран'}</SelectedTariffNotice>
            <FormPanelHeader>
              <SectionTitle>Заявка</SectionTitle>
              <SectionText>
                Оставьте контакты и ответьте на несколько вопросов. Мы определим предварительный состав комплекта и
                свяжемся с вами для согласования стоимости.
              </SectionText>
            </FormPanelHeader>

            {step === 1 && (
              <FormCard onSubmit={submitStepOne}>
                <FormGrid>
                  <Field>
                    <label htmlFor="name">Имя</label>
                    <Input id="name" value={stepOne.name} onChange={handleStepOneChange('name')} />
                  </Field>
                  <Field>
                    <label htmlFor="phone">Телефон</label>
                    <Input id="phone" value={stepOne.phone} onChange={handleStepOneChange('phone')} />
                  </Field>
                  <Field>
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" value={stepOne.email} onChange={handleStepOneChange('email')} />
                  </Field>
                  <Field>
                    <label htmlFor="website">Сайт компании</label>
                    <Input id="website" value={stepOne.website} onChange={handleStepOneChange('website')} />
                  </Field>
                  <Field>
                    <label htmlFor="inn">ИНН — необязательно</label>
                    <Input id="inn" value={stepOne.inn} onChange={handleStepOneChange('inn')} />
                  </Field>
                  <input type="hidden" name="selectedTariff" value={stepOne.selectedTariff} />
                </FormGrid>
                {error && <ErrorText>{error}</ErrorText>}
                <FormActions>
                  <PrimaryButton type="submit">Продолжить</PrimaryButton>
                </FormActions>
                <FormMicrotext>Специалист свяжется с вами в течение 1–2 рабочих дней и предложит состав работ с фиксированной стоимостью.</FormMicrotext>
              </FormCard>
            )}

            {step === 2 && (
              <FormCard onSubmit={submitStepTwo}>
                <FormGrid>
                  <Field>
                    <label htmlFor="hasForms">Есть ли формы на сайте</label>
                    <Select id="hasForms" value={stepTwo.hasForms} onChange={handleStepTwoChange('hasForms')}>
                      <option value="Да">Да</option>
                      <option value="Нет">Нет</option>
                      <option value="Не уверен">Не уверен</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="usesTools">Используете ли cookies / Метрику / CRM</label>
                    <Select id="usesTools" value={stepTwo.usesTools} onChange={handleStepTwoChange('usesTools')}>
                      <option value="Да">Да</option>
                      <option value="Нет">Нет</option>
                      <option value="Не уверен">Не уверен</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="hasEmployees">Есть ли сотрудники</label>
                    <Select id="hasEmployees" value={stepTwo.hasEmployees} onChange={handleStepTwoChange('hasEmployees')}>
                      <option value="Да">Да</option>
                      <option value="Нет">Нет</option>
                      <option value="Не уверен">Не уверен</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="filedNoticeBefore">Подавали ли уведомление в РКН</label>
                    <Select id="filedNoticeBefore" value={stepTwo.filedNoticeBefore} onChange={handleStepTwoChange('filedNoticeBefore')}>
                      <option value="Да">Да</option>
                      <option value="Нет">Нет</option>
                      <option value="Не знаю">Не знаю</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="needType">Что нужно</label>
                    <Select id="needType" value={stepTwo.needType} onChange={handleStepTwoChange('needType')}>
                      <option value="site_docs">Документы для сайта</option>
                      <option value="rkn_notice">Уведомление РКН</option>
                      <option value="full_package">Полный комплект</option>
                      <option value="not_sure">Не знаю</option>
                    </Select>
                  </Field>
                </FormGrid>
                {error && <ErrorText>{error}</ErrorText>}
                <FormActions>
                  <SecondaryButton type="button" onClick={() => setStep(1)}>
                    Назад
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
                  </PrimaryButton>
                </FormActions>
              </FormCard>
            )}

            {step === 3 && (
              <SuccessCard>
                <SuccessIconWrap>
                  <SuccessCheckIcon viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 7 10 17l-4.5-4.5" />
                  </SuccessCheckIcon>
                </SuccessIconWrap>
                <SuccessTitle>Заявка принята</SuccessTitle>
                <SectionText>
                  Спасибо! Мы получили заявку. Сейчас сервис работает в тестовом режиме: специалист изучит ответы, определит предварительный состав документов и свяжется с вами для согласования стоимости.
                </SectionText>
                {stepOne.selectedTariff ? <SuccessMeta>Выбранный тариф: {stepOne.selectedTariff}{stepOne.selectedTariff === 'Базовый' ? ' — от 4 990 ₽' : stepOne.selectedTariff === 'Стандарт' ? ' — от 9 990 ₽' : stepOne.selectedTariff === 'Расширенный' ? ' — от 19 990 ₽' : ''}</SuccessMeta> : null}
                <SuccessActions>
                  <SecondaryButton type="button" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Вернуться к тарифам</SecondaryButton>
                  <PrimaryButton type="button" onClick={() => { setStep(1); setStepOne(initialStepOne); setStepTwo(initialStepTwo); setError(''); }}>Отправить ещё одну заявку</PrimaryButton>
                </SuccessActions>
              </SuccessCard>
            )}
          </FormPanel>
        </Container>
      </Section>

      <TintSection>
        <Container>
          <SectionHeader>
            <SectionLabel>ЧАСТЫЕ ВОПРОСЫ</SectionLabel>
            <SectionTitle>FAQ</SectionTitle>
          </SectionHeader>
          <FaqGrid>
            {faqItems.map((item) => (
              <FaqCard key={item.question}>
                <details
                  onToggle={(event) => {
                    if ((event.currentTarget as HTMLDetailsElement).open) {
                      trackEvent('faq_open', { question: item.question });
                    }
                  }}
                >
                  <summary><span>{item.question}</span><ChevronIcon viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></ChevronIcon></summary>
                  <FaqAnswer>{item.answer}</FaqAnswer>
                </details>
              </FaqCard>
            ))}
          </FaqGrid>
        </Container>
      </TintSection>

      <Section>
        <Container>
          <FooterMini>
            <FooterMiniText>Ответьте на несколько вопросов — мы определим состав документов</FooterMiniText>
            <SectionText>Без мгновенной оплаты: сначала уточним процессы, состав работ и предварительную стоимость.</SectionText>
            <FooterMiniButton type="button" onClick={() => goToForm('final_cta_click', 'Получить расчёт внизу страницы')}>
              Оставить заявку
            </FooterMiniButton>
          </FooterMini>
        </Container>
      </Section>
    </Page>
  );
};

export default IndexPage;

const Page = styled.main`
  background: #F7F8FA;
  color: ${theme.colors.text};
`;

const Container = styled.div<{ narrow?: boolean }>`
  width: min(1140px, calc(100% - 40px));
  margin: 0 auto;
  ${({ narrow }): string => (narrow ? 'max-width: 900px;' : '')}
`;

const Section = styled.section`
  padding-top: 28px;
  padding-bottom: 28px;

  @media (max-width: 768px) {
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;

const TintSection = styled(Section)`
  background: transparent;
`;

const HeroSection = styled.section`
  min-height: auto;
  padding: 64px 0 72px;
  background-image: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,.05) 0%, transparent 100%);

  @media (max-width: 768px) {
    min-height: auto;
    padding: 48px 0 64px;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 480px);
  gap: 36px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    max-width: 760px;
    margin: 0 auto;
  }
`;

const HeroMain = styled.div`
  display: grid;
  gap: 20px;

  @media (max-width: 960px) {
    justify-items: center;
    text-align: center;
  }
`;

const Eyebrow = styled.div`
  color: ${theme.colors.accent};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
`;

const HeroTitle = styled.h1`
  margin: 0;
  max-width: 520px;
  font-size: 44px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;

  @media (max-width: 640px) {
    font-size: clamp(28px, 7vw, 44px);
  }
`;

const HeroText = styled.p`
  margin: 0;
  max-width: 680px;
  color: #94a3b8;
  font-size: 16px;
  line-height: 1.65;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 960px) {
    justify-content: center;
  }

  @media (max-width: 640px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`;

const HeroVisualWrap = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 960px) {
    margin-top: 8px;
  }
`;

const HeroMockVisual = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
`;

const MockPanelLarge = styled.div`
  border-radius: 20px;
  border: 1px solid ${theme.colors.border};
  background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,244,248,0.95) 100%);
  box-shadow: 0 12px 30px rgba(15,23,42,.08);
  padding: 18px;
`;

const MockWindowHeader = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
`;

const MockDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #CBD5E1;
`;

const MockContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

const MockFormCard = styled.div`
  border-radius: 14px;
  background: #FFFFFF;
  border: 1px solid ${theme.colors.border};
  padding: 14px;
  display: grid;
  gap: 10px;
`;

const MockTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const MockField = styled.div`
  height: 10px;
  border-radius: 999px;
  background: #E5E7EB;
`;

const MockCheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MockCheckbox = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 1.5px solid ${theme.colors.accent};
  background: ${theme.colors.accentSoft};
`;

const MockCheckboxText = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: #D1D5DB;
`;

const MockDocsStack = styled.div`
  display: grid;
  gap: 10px;
`;

const MockDocCard = styled.div<{ accent?: boolean }>`
  border-radius: 14px;
  background: ${({ accent }): string => accent ? '#EFF6FF' : '#FFFFFF'};
  border: 1px solid ${({ accent }): string => accent ? '#BFDBFE' : theme.colors.border};
  padding: 12px;
  display: grid;
  gap: 8px;
`;

const MockDocTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const MockDocLine = styled.div<{ short?: boolean }>`
  height: 8px;
  width: ${({ short }): string => short ? '65%' : '100%'};
  border-radius: 999px;
  background: #D1D5DB;
`;

const MockShieldBadge = styled.div`
  position: absolute;
  right: -12px;
  bottom: -12px;
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%);
  box-shadow: 0 10px 24px rgba(37,99,235,.28);
`;

const ShieldCheckIcon = styled.svg`
  width: 30px;
  height: 30px;
  stroke: #fff;
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const HeroVisualCard = styled.div``;
const HeroGlow = styled.div``;
const HeroVisualImage = styled.img``;

const TrustGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 8px;
`;

const TrustCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border-right: none;
`;

const TrustIcon = styled.div`
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  color: ${theme.colors.accent};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TrustText = styled.p<{ $strong?: boolean }>`
  margin: 0;
  font-size: 13px;
  font-weight: ${({ $strong }): number => ($strong ? 700 : 600)};
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: ${theme.colors.text};
`;

const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 14px;
`;

const SectionLabel = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${theme.colors.accent};
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  font-size: 16px;
  line-height: 1.65;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 14px;
  align-items: start;
  padding: 20px;
  border-radius: 12px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  box-shadow: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;

  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadow.sm};
    background: #FCFDFF;
  }
`;

const FeatureIconChip = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 8px;
  background: ${theme.colors.accentSoft};
`;

const FeatureIcon = styled.div`
  width: 20px;
  height: 20px;
  color: ${theme.colors.accent};
`;

const FeatureText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
`;

const InfoStrip = styled.div``;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  display: grid;
  gap: 14px;
  padding: 20px;
  border-radius: 12px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  box-shadow: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;

  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadow.sm};
    background: #FCFDFF;
  }
`;

const ServiceIcon = styled.div`
  width: 20px;
  height: 20px;
  color: ${theme.colors.accent};
`;

const ServiceText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
`;

const StepsGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: calc(12.5% + 20px);
    right: calc(12.5% + 20px);
    height: 1px;
    background: ${theme.colors.border};
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;

    &::before {
      display: none;
    }
  }
`;

const StepCard = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 12px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  box-shadow: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;

  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadow.sm};
    background: #FCFDFF;
  }
`;

const StepHead = styled.div`
  display: block;
  margin-bottom: 16px;
`;

const StepIcon = styled.div`
  display: none;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.accent};
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
`;

const StepTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 20px;
  line-height: 1.3;
`;

const StepDescription = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  font-size: 16px;
  line-height: 1.65;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled.div<{ $featured: boolean }>`
  position: relative;
  display: grid;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: ${theme.colors.surface};
  border: ${({ $featured }): string => ($featured ? `2px solid ${theme.colors.accent}` : `1px solid ${theme.colors.border}`)};
  box-shadow: ${({ $featured }): string => ($featured ? '0 0 0 4px rgba(37,99,235,.08), 0 8px 24px rgba(15,23,42,.1)' : theme.shadow.sm)};
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadow.sm};
    background: #FCFDFF;
  }

  @media (max-width: 640px) {
    order: ${({ $featured }): number => ($featured ? -1 : 0)};
  }
`;

const PricingBadge = styled.div`
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: ${theme.colors.accent};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 999px;
`;

const PricingTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PricingIcon = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  padding: 8px;
  background: ${theme.colors.accentSoft};
  color: ${theme.colors.accent};
`;

const PricingTier = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.accent};
`;

const PricingPrice = styled.div`
  display: grid;
  gap: 6px;
`;

const PricingFrom = styled.span`
  font-size: 13px;
  color: ${theme.colors.muted};
  line-height: 1;
`;

const PricingValue = styled.span`
  font-size: 36px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const PricingDescription = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  font-size: 16px;
  line-height: 1.65;
`;

const PricingList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
  line-height: 1.65;

  li::before {
    content: '✓';
    color: #16A34A;
    font-weight: 700;
    margin-right: 8px;
  }
`;

const PricingNote = styled.p`
  margin: 20px 0 0;
  color: ${theme.colors.muted};
  font-size: 16px;
  line-height: 1.65;
`;

const AfterPricingCta = styled.div`
  display: grid;
  justify-items: center;
  gap: 10px;
  margin-top: 24px;
`;

const AfterPricingText = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  font-size: 14px;
  line-height: 1.5;
`;

const FormPanel = styled.div`
  padding: 36px 32px;
  border-radius: 16px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 4px 24px rgba(15,23,42,.08), 0 1px 6px rgba(15,23,42,.04);

  @media (max-width: 640px) {
    padding: 24px;
  }
`;

const FormPanelHeader = styled.div`
  margin-bottom: 24px;
`;

const SelectedTariffNotice = styled.div`
  margin-bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${theme.colors.accentSoft};
  color: ${theme.colors.accentStrong};
  font-size: 13px;
  font-weight: 700;
`;

const FormCard = styled.form``;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 9px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.text};
  }
`;

const Input = styled.input`
  min-height: 54px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  padding: 0 16px;
  color: ${theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37,99,235,.1);
  }
`;

const Select = styled.select`
  min-height: 54px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  padding: 0 16px;
  color: ${theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37,99,235,.1);
  }
`;

const ErrorText = styled.div`
  margin: 16px 0 0;
  color: ${theme.colors.danger};
  font-weight: 600;
`;

const FormActions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 24px;
`;

const FormMicrotext = styled.p`
  margin: 14px 0 0;
  color: ${theme.colors.muted};
  font-size: 14px;
  line-height: 1.55;
`;

const FieldFull = styled.div`
  grid-column: 1 / -1;
  display: grid;
  gap: 12px;
  margin-top: 8px;
`;

const SuccessCard = styled.div`
  padding: 28px;
  border-radius: 16px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%);
  border: 1px solid #DCEAFE;
  box-shadow: 0 8px 24px rgba(15,23,42,.06);
  display: grid;
  gap: 14px;
`;

const SuccessTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  line-height: 1.25;
`;

const SuccessIconWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #DCFCE7;
`;

const SuccessCheckIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #16A34A;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const SuccessMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #EFF6FF;
  border: 1px solid #DBEAFE;
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 600;
`;

const SuccessActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const FaqGrid = styled.div`
  max-width: 680px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const FaqCard = styled.div`
  border-radius: 12px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;

  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadow.sm};
    background: #FCFDFF;
  }

  overflow: hidden;

  details {
    padding: 20px;
    border-radius: 12px;
  }

  details:not([open]):hover {
    background: #F7F8FA;
  }

  details:focus-within {
    outline: none;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    line-height: 1.5;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  details[open] svg {
    transform: rotate(180deg);
  }
`;

const ChevronIcon = styled.svg`
  width: 16px;
  height: 16px;
  color: ${theme.colors.accent};
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.25s;
  flex: 0 0 auto;
`;

const FaqAnswer = styled.p`
  margin: 12px 0 0;
  color: ${theme.colors.muted};
  line-height: 1.65;
`;

const FooterMini = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  padding: 28px 24px;
  background: linear-gradient(180deg, rgba(239,246,255,1) 0%, rgba(255,255,255,1) 100%);
  border: 1px solid ${theme.colors.border};
  border-radius: 16px;
`;

const FooterMiniText = styled.p`
  margin: 0;
  color: ${theme.colors.text};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  max-width: 760px;
`;

const FooterMiniButton = styled.button`
  min-height: 50px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  background: ${theme.colors.accent};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(37,99,235,.18);
`;

const SvgIcon = styled.svg`
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const StepNote = styled.p`
  margin: 12px 0 0;
  color: ${theme.colors.muted};
  font-size: 14px;
  line-height: 1.6;
`;

const buttonBase = `
  min-height: 54px;
  padding: 0 22px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background .15s, box-shadow .15s, border-color .15s, color .15s;
`;

const PrimaryButton = styled.button`
  ${buttonBase}
  border: none;
  background: ${theme.colors.accent};
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(37,99,235,.18);

  &:hover {
    background: ${theme.colors.accentStrong};
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const SecondaryButton = styled.button`
  ${buttonBase}
  border: 1px solid ${theme.colors.border};
  background: rgba(255, 255, 255, 0.92);
  color: ${theme.colors.text};

  &:hover {
    border-color: ${theme.colors.accent};
  }
`;

const TariffButton = styled.button<{ $featured: boolean }>`
  ${buttonBase}
  border: ${({ $featured }): string => ($featured ? 'none' : `1px solid ${theme.colors.border}`)};
  background: ${({ $featured }): string => ($featured ? theme.colors.accent : 'rgba(255,255,255,0.96)')};
  color: ${({ $featured }): string => ($featured ? '#ffffff' : theme.colors.text)};
  box-shadow: ${({ $featured }): string => ($featured ? '0 4px 16px rgba(37,99,235,.18)' : 'none')};

  &:hover {
    background: ${({ $featured }): string => ($featured ? theme.colors.accentStrong : 'rgba(255,255,255,0.96)')};
    border-color: ${theme.colors.accent};
  }
`;
