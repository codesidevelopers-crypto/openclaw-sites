import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';
import heroIllustration from '../images/pd152-hero-illustration.png';

type PricingTier = 'Базовый' | 'Стандарт' | 'Расширенный' | 'Не знаю';
type FormStep = 1 | 2 | 3;
type NeedType = 'site_docs' | 'rkn_notice' | 'full_package' | 'not_sure';
type PaymentIntent = 'yes' | 'need_price' | 'researching';
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
  paymentIntent: PaymentIntent;
};

type FormMeta = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  page_url: string;
};

type FullFormPayload = StepOneData & StepTwoData & FormMeta;

type AnalyticsEventName =
  | 'page_view'
  | 'hero_cta_click'
  | 'pricing_view'
  | 'tariff_click'
  | 'form_start'
  | 'form_step_1_submit'
  | 'form_step_2_submit'
  | 'form_success'
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
  page_url: typeof window !== 'undefined' ? window.location.href : '',
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
  'Оплата после согласования состава работ',
  'Документы готовят специалисты по 152-ФЗ',
  'Под ваш бизнес, а не шаблон из интернета',
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
  'Заполняете короткую анкету о бизнесе',
  'Мы определяем состав документов и согласуем стоимость',
  'Готовим комплект и инструкцию за 7–14 дней',
];

const pricing = [
  {
    tier: 'Базовый' as PricingTier,
    price: 'от 29 900 ₽',
    description: 'Для бизнеса с сайтом и базовыми сценариями сбора данных.',
    items: [
      'Политика обработки ПДн',
      'Согласие и формулировки для сайта',
      'Рекомендации по размещению',
      'Черновик уведомления РКН — если применимо',
    ],
  },
  {
    tier: 'Стандарт' as PricingTier,
    price: 'от 49 900 ₽',
    description: 'Для бизнеса с сайтом, CRM, клиентской базой и сотрудниками.',
    items: ['Всё из базового', 'Документы по сотрудникам', 'Расширенная проработка процессов', 'Уведомление РКН и инструкция по подаче'],
  },
  {
    tier: 'Расширенный' as PricingTier,
    price: 'от 79 900 ₽',
    description: 'Для сложных процессов: несколько сайтов, подрядчики, внешние сервисы.',
    items: ['Индивидуальная оценка процессов', 'Несколько сайтов или направлений', 'Сложные сценарии передачи данных', 'Индивидуальный расчёт'],
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
  selectedTariff: 'Не знаю',
};

const initialStepTwo: StepTwoData = {
  hasForms: 'Да',
  usesTools: 'Да',
  hasEmployees: 'Не уверен',
  filedNoticeBefore: 'Не знаю',
  needType: 'full_package',
  paymentIntent: 'need_price',
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

const resultIcons = [IconDoc, IconShield, IconCookie, IconUsers, IconDoc, IconFlow] as const;
const audienceIcons = [IconFlow, IconCookie, IconUsers, IconFlow, IconShield, IconDoc] as const;
const processIcons = [IconDoc, IconShield, IconFlow] as const;
const pricingIcons = [IconDoc, IconShield, IconFlow] as const;

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
    page_url: '',
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
      { threshold: 0.35 }
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
    trackEvent('tariff_click', { tariff: tier });

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
        payment_intent: stepTwo.paymentIntent,
      });

      await submitLead(payload);
      trackEvent('form_success', {
        selected_tariff: stepOne.selectedTariff,
        payment_intent: stepTwo.paymentIntent,
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

      <Hero>
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
                <SecondaryButton type="button" onClick={() => goToForm('hero_cta_click', 'Проверить, что нужно')}>
                  Проверить, что нужно
                </SecondaryButton>
              </HeroActions>
              <TrustStrip>
                {trustPoints.map((point) => (
                  <TrustItem key={point}>{point}</TrustItem>
                ))}
              </TrustStrip>
            </HeroMain>

            <HeroVisual>
              <VisualCard>
                <VisualImage src={heroIllustration} alt="Схематичная иллюстрация комплекта документов и формы сайта" />
              </VisualCard>
            </HeroVisual>
          </HeroGrid>
        </Container>
      </Hero>

      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle>Кому это актуально</SectionTitle>
          </SectionHeader>
          <MiniGrid>
            {audienceItems.map((item, index) => {
              const Icon = audienceIcons[index];
              return (
                <MiniCard key={item}>
                  <IconWrap>
                    <Icon />
                  </IconWrap>
                  <MiniCardText>{item}</MiniCardText>
                </MiniCard>
              );
            })}
          </MiniGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <InlineNotice>
            Если персональные данные собираются, но документы, согласия и уведомления оформлены неправильно, это
            приводит к риску претензий, спешной переделке процессов и возможным штрафам. Мы помогаем заранее
            привести это в порядок.
          </InlineNotice>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle>Что вы получите</SectionTitle>
          </SectionHeader>
          <MiniGrid>
            {results.map((item, index) => {
              const Icon = resultIcons[index];
              return (
                <MiniCard key={item}>
                  <IconWrap>
                    <Icon />
                  </IconWrap>
                  <MiniCardText>{item}</MiniCardText>
                </MiniCard>
              );
            })}
          </MiniGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle>Как это работает</SectionTitle>
          </SectionHeader>
          <ProcessGrid>
            {processSteps.map((item, index) => {
              const Icon = processIcons[index];
              return (
                <ProcessCard key={item}>
                  <ProcessTop>
                    <IconBadge>
                      <Icon />
                    </IconBadge>
                    <StepIndex>0{index + 1}</StepIndex>
                  </ProcessTop>
                  <ProcessText>{item}</ProcessText>
                </ProcessCard>
              );
            })}
          </ProcessGrid>
        </Container>
      </Section>

      <Section id="pricing">
        <Container>
          <SectionHeader>
            <SectionTitle>Тарифы</SectionTitle>
            <SectionText>
              Ниже — ориентиры для проверки спроса и готовности платить. Финальный состав документов определяется
              после анкеты.
            </SectionText>
          </SectionHeader>
          <PricingGrid>
            {pricing.map((item, index) => {
              const Icon = pricingIcons[index];
              return (
                <PricingCard key={item.tier}>
                  <PricingTop>
                    <IconBadge>
                      <Icon />
                    </IconBadge>
                    <PricingTierLabel>{item.tier}</PricingTierLabel>
                  </PricingTop>
                  <PricingPrice>{item.price}</PricingPrice>
                  <PricingDescription>{item.description}</PricingDescription>
                  <CompactList>
                    {item.items.map((priceItem) => (
                      <li key={priceItem}>{priceItem}</li>
                    ))}
                  </CompactList>
                  <PrimaryButton type="button" onClick={() => handleTariffClick(item.tier)}>
                    Выбрать тариф
                  </PrimaryButton>
                </PricingCard>
              );
            })}
          </PricingGrid>
          <MutedNote>
            Финальная стоимость зависит от состава документов и подтверждается после анкеты. Оплата — только после
            согласования работ.
          </MutedNote>
        </Container>
      </Section>

      <Section id="lead-form">
        <Container narrow>
          <FormShell>
            <SectionHeader>
              <SectionTitle>Заявка</SectionTitle>
              <SectionText>
                Оставьте контакты и ответьте на несколько вопросов. Мы определим предварительный состав комплекта и
                свяжемся для согласования стоимости.
              </SectionText>
            </SectionHeader>

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
                  <Field>
                    <label htmlFor="selectedTariff">Выбранный тариф</label>
                    <Select id="selectedTariff" value={stepOne.selectedTariff} onChange={handleStepOneChange('selectedTariff')}>
                      <option value="Не знаю">Не знаю</option>
                      <option value="Базовый">Базовый</option>
                      <option value="Стандарт">Стандарт</option>
                      <option value="Расширенный">Расширенный</option>
                    </Select>
                  </Field>
                </FormGrid>
                {error && <ErrorText>{error}</ErrorText>}
                <FormActions>
                  <PrimaryButton type="submit">Продолжить</PrimaryButton>
                </FormActions>
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
                  <Field>
                    <label htmlFor="paymentIntent">Готовность оплатить после согласования</label>
                    <Select id="paymentIntent" value={stepTwo.paymentIntent} onChange={handleStepTwoChange('paymentIntent')}>
                      <option value="yes">Да</option>
                      <option value="need_price">Хочу сначала узнать стоимость</option>
                      <option value="researching">Пока изучаю</option>
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
                <SuccessTitle>Спасибо</SuccessTitle>
                <SectionText>
                  Мы изучим ответы, определим предварительный состав документов и свяжемся с вами для согласования
                  стоимости. Оплата потребуется только после подтверждения состава работ.
                </SectionText>
              </SuccessCard>
            )}
          </FormShell>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle>FAQ</SectionTitle>
          </SectionHeader>
          <FaqGrid>
            {faqItems.map((item) => (
              <FaqItem key={item.question}>
                <details
                  onToggle={(event) => {
                    if ((event.currentTarget as HTMLDetailsElement).open) {
                      trackEvent('faq_open', { question: item.question });
                    }
                  }}
                >
                  <summary>{item.question}</summary>
                  <FaqAnswer>{item.answer}</FaqAnswer>
                </details>
              </FaqItem>
            ))}
          </FaqGrid>
        </Container>
      </Section>
    </Page>
  );
};

export default IndexPage;

const Page = styled.main`
  background:
    radial-gradient(circle at top right, rgba(70, 119, 255, 0.08), transparent 26%),
    ${theme.colors.background};
  color: ${theme.colors.text};
`;

const Container = styled.div<{ narrow?: boolean }>`
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  ${({ narrow }): string => (narrow ? 'max-width: 860px;' : '')}
`;

const Hero = styled.section`
  padding: 34px 0 26px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: 24px;
  align-items: center;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroMain = styled.div`
  display: grid;
  gap: 16px;
`;

const HeroVisual = styled.div`
  display: flex;
  justify-content: center;
`;

const VisualCard = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 18px;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(245, 248, 252, 0.98) 100%);
  border: 1px solid rgba(217, 226, 240, 0.9);
  box-shadow: 0 24px 60px rgba(15, 23, 38, 0.08);
`;

const VisualImage = styled.img`
  width: 100%;
  border-radius: 18px;
`;

const Eyebrow = styled.div`
  color: ${theme.colors.accent};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const HeroTitle = styled.h1`
  margin: 0;
  max-width: 680px;
  font-size: clamp(34px, 5vw, 50px);
  line-height: 1.02;
  letter-spacing: -0.045em;
`;

const HeroText = styled.p`
  margin: 0;
  max-width: 670px;
  color: ${theme.colors.muted};
  font-size: 18px;
  line-height: 1.62;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const TrustStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 4px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TrustItem = styled.div`
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
  font-size: 14px;
  line-height: 1.5;
`;

const Section = styled.section`
  padding: 14px 0 18px;
`;

const SectionHeader = styled.div`
  margin-bottom: 16px;
  max-width: 720px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.14;
  letter-spacing: -0.035em;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  font-size: 16px;
  line-height: 1.68;
`;

const MiniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const MiniCard = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 12px;
  align-items: start;
  padding: 18px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
`;

const MiniCardText = styled.p`
  margin: 0;
  line-height: 1.55;
`;

const InlineNotice = styled.div`
  padding: 18px 20px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(70, 119, 255, 0.08) 0%, rgba(70, 119, 255, 0.03) 100%);
  border: 1px solid rgba(70, 119, 255, 0.16);
  color: ${theme.colors.text};
  line-height: 1.65;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessCard = styled.div`
  padding: 18px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
`;

const ProcessTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

const StepIndex = styled.div`
  color: ${theme.colors.accent};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const ProcessText = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled.div`
  padding: 20px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
  display: grid;
  gap: 14px;
`;

const PricingTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PricingTierLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.accent};
`;

const PricingPrice = styled.div`
  font-size: 34px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const PricingDescription = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  line-height: 1.65;
`;

const CompactList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  line-height: 1.55;
`;

const MutedNote = styled.p`
  margin: 14px 0 0;
  color: ${theme.colors.muted};
  font-size: 15px;
  line-height: 1.65;
`;

const FormShell = styled.div`
  padding: 22px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.md};
`;

const FormCard = styled.form``;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;
  }
`;

const Input = styled.input`
  min-height: 50px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  padding: 0 14px;
`;

const Select = styled.select`
  min-height: 50px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  padding: 0 14px;
`;

const ErrorText = styled.div`
  margin: 14px 0 0;
  color: ${theme.colors.danger};
  font-weight: 600;
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const SuccessCard = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: ${theme.colors.surface};
`;

const SuccessTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 22px;
`;

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const FaqItem = styled.div`
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};

  details {
    padding: 16px 18px;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }
`;

const FaqAnswer = styled.p`
  margin: 10px 0 0;
  color: ${theme.colors.muted};
  line-height: 1.6;
`;

const IconWrap = styled.div`
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(70, 119, 255, 0.1);
  color: ${theme.colors.accent};
`;

const IconBadge = styled(IconWrap)`
  width: 44px;
  height: 44px;
`;

const SvgIcon = styled.svg`
  width: 22px;
  height: 22px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const buttonBase = `
  min-height: 52px;
  padding: 0 18px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled.button`
  ${buttonBase}
  border: none;
  background: ${theme.colors.accent};
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(70, 119, 255, 0.18);

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const SecondaryButton = styled.button`
  ${buttonBase}
  border: 1px solid ${theme.colors.border};
  background: #ffffff;
  color: ${theme.colors.text};
`;
