import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';

type PricingTier = 'Базовый' | 'Стандарт' | 'Расширенный';
type FormStep = 1 | 2 | 3;
type PaymentIntent = 'ready_after_consultation' | 'want_exact_price' | 'researching';
type NeedType = 'site_docs' | 'rkn_notice' | 'full_package' | 'not_sure';
type BusinessType = 'ИП' | 'ООО' | 'Другое';
type YesNoUnsure = 'Да' | 'Нет' | 'Не уверен';
type SiteStatus = 'Да' | 'Нет' | 'В разработке';
type YesNo = 'Да' | 'Нет';
type UsageStatus = 'Да' | 'Нет' | 'Частично' | 'Не уверен';
type NoticeStatus = 'Да' | 'Нет' | 'Не знаю';

type StepOneData = {
  name: string;
  phone: string;
  email: string;
  website: string;
  inn: string;
};

type StepTwoData = {
  businessType: BusinessType;
  hasSite: SiteStatus;
  hasForms: YesNoUnsure;
  collectsClientData: YesNoUnsure;
  hasEmployees: YesNo;
  usesCookiesOrMetrics: UsageStatus;
  filedNoticeBefore: NoticeStatus;
  needType: NeedType;
  paymentIntent: PaymentIntent;
};

type FullFormData = StepOneData & StepTwoData & {
  selectedTariff: PricingTier | '';
};

type AnalyticsEventName =
  | 'view_page'
  | 'click_cta_hero'
  | 'click_pricing'
  | 'start_form'
  | 'submit_step_1'
  | 'submit_step_2'
  | 'select_tariff'
  | 'click_get_invoice'
  | 'submit_high_intent_lead';

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

const trackEvent = (event: AnalyticsEventName, payload: AnalyticsPayload = {}): void => {
  const eventPayload = { event, ...payload };
  if (typeof window !== 'undefined') {
    const currentWindow = window as DataLayerWindow;
    if (Array.isArray(currentWindow.dataLayer)) {
      currentWindow.dataLayer.push(eventPayload);
    }
  }
  // eslint-disable-next-line no-console
  console.info('[analytics]', eventPayload);
};

const submitLead = async (payload: FullFormData): Promise<void> => {
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

const initialStepOne: StepOneData = {
  name: '',
  phone: '',
  email: '',
  website: '',
  inn: '',
};

const initialStepTwo: StepTwoData = {
  businessType: 'ИП',
  hasSite: 'Да',
  hasForms: 'Да',
  collectsClientData: 'Да',
  hasEmployees: 'Нет',
  usesCookiesOrMetrics: 'Да',
  filedNoticeBefore: 'Не знаю',
  needType: 'full_package',
  paymentIntent: 'want_exact_price',
};

const heroBenefits = [
  'Под ваш бизнес, а не шаблон из интернета',
  'Понятный состав работ и оплата после подтверждения',
  'Обычно 7–14 дней на подготовку комплекта',
];

const problemItems = [
  'Форма заявки, обратный звонок, регистрация или онлайн-запись на сайте',
  'Cookies, Яндекс Метрика, CRM, рассылки и другие инструменты маркетинга',
  'Данные сотрудников, соискателей, клиентов и контактных лиц контрагентов',
  'Заявки из соцсетей, мессенджеров, таблиц и офлайн-анкет',
];

const riskColumns = [
  {
    title: 'Что может быть не так',
    items: [
      'На сайте есть формы, но нет политики обработки персональных данных',
      'Согласие на обработку данных оформлено некорректно или отсутствует',
      'Используются cookies и метрики, но пользователь об этом не уведомляется',
      'Неясно, нужно ли подавать уведомление в Роскомнадзор',
    ],
  },
  {
    title: 'Чем это грозит',
    items: [
      'Риск претензий к сайту и способу сбора данных',
      'Потеря времени на срочное исправление документов и формулировок',
      'Замечания по согласиям, политике и процессам обработки данных',
      'Штрафы и предписания — в зависимости от конкретной ситуации',
    ],
  },
  {
    title: 'Почему лучше разобраться заранее',
    items: [
      'Спокойно привести сайт и процессы в порядок до проверки или запроса',
      'Закрыть сразу несколько типовых задач одним комплектом документов',
      'Получить понятную инструкцию: что разместить, где собирать согласие и нужен ли РКН',
      'Снизить риск ошибок из-за шаблонов и обрывочных советов из интернета',
    ],
  },
];

const deliverables = [
  'Политика обработки персональных данных',
  'Согласия на обработку персональных данных',
  'Формулировки для форм на сайте',
  'Согласия или уведомления по cookies — если нужно',
  'Документы по данным сотрудников и соискателей — если применимо',
  'Инструкции, где и как разместить документы',
  'Инструкция, когда и как получать согласие',
  'Рекомендации по хранению и обработке данных',
  'Подготовленное уведомление в Роскомнадзор',
  'Инструкция по подаче уведомления в зависимости от вашей ситуации',
];

const steps = [
  'Оставляете заявку и указываете базовую информацию о компании',
  'Заполняете анкету о сайте, клиентах, сотрудниках, CRM, cookies и каналах сбора данных',
  'Специалист определяет, какие документы и инструкции нужны именно вам',
  'Мы готовим комплект документов и блок по уведомлению РКН, если он требуется',
  'Вы получаете пакет и понятные дальнейшие шаги по внедрению',
];

const segments = [
  'Есть сайт с формой заявки',
  'Есть интернет-магазин или онлайн-запись',
  'Запускаете рекламу и собираете лиды',
  'Используете cookies, метрики или CRM',
  'Есть сотрудники или соискатели',
  'Собираете заявки через соцсети и мессенджеры',
  'Ведёте клиентскую базу',
  'Не уверены, подавали ли уведомление в РКН',
];

const templateRisks = [
  'Ваши реальные цели обработки персональных данных',
  'Категории данных, которые вы собираете',
  'Cookies, аналитику и маркетинговые сценарии',
  'Сотрудников, соискателей и подрядчиков',
  'Передачу данных третьим лицам',
  'Необходимость уведомления РКН',
  'То, как именно устроены формы и каналы сбора данных',
];

const pricing = [
  {
    tier: 'Базовый' as PricingTier,
    price: 'от 29 900 ₽',
    description: 'Для бизнеса с сайтом, формами заявок и базовыми сценариями сбора данных.',
    items: [
      'Политика обработки ПДн',
      'Согласие на обработку ПДн',
      'Формулировки для форм сайта',
      'Рекомендации по размещению документов',
      'Подготовка черновика уведомления РКН — если применимо',
    ],
  },
  {
    tier: 'Стандарт' as PricingTier,
    price: 'от 49 900 ₽',
    description: 'Для бизнеса с сайтом, клиентской базой, сотрудниками, CRM и несколькими сценариями обработки данных.',
    items: [
      'Всё из Базового',
      'Документы по данным сотрудников и соискателей',
      'Расширенная проработка процессов',
      'Рекомендации по хранению и обработке данных',
      'Подготовка уведомления РКН и инструкция по подаче',
    ],
  },
  {
    tier: 'Расширенный' as PricingTier,
    price: 'от 79 900 ₽',
    description: 'Для сложных процессов: несколько сайтов, много форм, подрядчики, внешние сервисы и индивидуальная проработка.',
    items: [
      'Индивидуальная оценка процессов обработки данных',
      'Несколько сайтов или направлений бизнеса',
      'Сложные сценарии передачи данных подрядчикам',
      'Проработка нестандартных источников заявок и интеграций',
      'Персональный расчёт после уточнения состава работ',
    ],
  },
];

const faqItems = [
  {
    question: 'Нужно ли уведомлять РКН всем?',
    answer:
      'Не всегда. Это зависит от того, как именно вы обрабатываете персональные данные, в каких целях и какие исключения могут применяться. В анкете мы помогаем понять, нужен ли вам этот шаг.',
  },
  {
    question: 'Что будет, если на сайте есть форма заявки, но нет политики?',
    answer:
      'Это повышает риск вопросов к сайту и способу сбора данных. Если через форму собираются персональные данные, важно проверить, какие документы должны быть размещены и как оформлено согласие.',
  },
  {
    question: 'Можно ли использовать шаблон из интернета?',
    answer:
      'Шаблон может быть отправной точкой, но обычно он не учитывает ваш сайт, cookies, CRM, сотрудников, подрядчиков и необходимость уведомления РКН. Поэтому он редко закрывает задачу полностью.',
  },
  {
    question: 'Вы проверяете сайт автоматически?',
    answer:
      'Нет. Мы не делаем автоматический аудит роботом. Сначала вы заполняете анкету, а затем специалисты вручную определяют состав документов и готовят комплект.',
  },
  {
    question: 'Что входит в комплект документов?',
    answer:
      'Обычно это политика обработки персональных данных, согласия, формулировки для сайта, инструкции по размещению и рекомендации по получению согласий. При необходимости — подготовка уведомления в РКН и инструкция по его подаче.',
  },
  {
    question: 'Сколько занимает подготовка?',
    answer:
      'Обычно от 7 до 14 дней после получения всех необходимых данных. Срок зависит от сложности процессов и состава комплекта.',
  },
  {
    question: 'Как подаётся уведомление в РКН?',
    answer:
      'Способ подачи зависит от вашей ситуации. Обычно рассматриваются варианты подачи на бумаге, через УКЭП или через ЕСИА. Мы готовим текст и даём инструкцию по подходящему способу подачи.',
  },
  {
    question: 'Можно ли получить только уведомление РКН?',
    answer:
      'Иногда да. Но часто вопрос уведомления связан с тем, как оформлены сами процессы и документы. Поэтому сначала полезно понять общую картину.',
  },
  {
    question: 'Что делать, если документы уже есть?',
    answer:
      'Можно оставить заявку и указать это в анкете. Мы поможем понять, нужен ли новый комплект, доработка текущих документов или только отдельный блок.',
  },
  {
    question: 'Даёте ли вы гарантию?',
    answer:
      'Мы не обещаем “штрафов точно не будет” или “РКН точно примет без вопросов”. Наша задача — подготовить документы и инструкции с учётом ваших процессов и требований 152-ФЗ, чтобы снизить риски и помочь навести порядок.',
  },
];

const IndexPage: React.FC = () => {
  const [step, setStep] = useState<FormStep>(1);
  const [stepOne, setStepOne] = useState<StepOneData>(initialStepOne);
  const [stepTwo, setStepTwo] = useState<StepTwoData>(initialStepTwo);
  const [selectedTariff, setSelectedTariff] = useState<PricingTier | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hasStartedForm, setHasStartedForm] = useState(false);

  useEffect(() => {
    trackEvent('view_page', {
      variant_positioning: 'hybrid_b_focus',
      pricing_visible: true,
    });
  }, []);

  const fullPayload = useMemo<FullFormData>(
    () => ({
      ...stepOne,
      ...stepTwo,
      selectedTariff,
    }),
    [selectedTariff, stepOne, stepTwo]
  );

  const markFormStart = (entryPoint: string): void => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackEvent('start_form', {
        entry_point: entryPoint,
        selected_tariff: selectedTariff,
      });
    }
  };

  const handleStepOneChange = (field: keyof StepOneData) => (event: ChangeEvent<HTMLInputElement>): void => {
    if (!hasStartedForm) {
      markFormStart('form_step_1');
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

  const handleHeroCta = (ctaText: string, ctaType: 'primary' | 'secondary'): void => {
    trackEvent('click_cta_hero', {
      cta_text: ctaText,
      cta_type: ctaType,
      variant_positioning: 'hybrid_b_focus',
    });
    markFormStart('hero');
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectTariff = (tier: PricingTier): void => {
    setSelectedTariff(tier);
    trackEvent('click_pricing', {
      tariff_name: tier,
      tariff_price_anchor: pricing.find((item) => item.tier === tier)?.price,
    });
    trackEvent('select_tariff', {
      tariff_name: tier,
      tariff_price_anchor: pricing.find((item) => item.tier === tier)?.price,
      from_block: 'pricing',
    });
    trackEvent('click_get_invoice', {
      tariff_name: tier,
      payment_intent_known: step === 2 || step === 3,
    });
    markFormStart('pricing');
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateStepOne = (): boolean => {
    if (!stepOne.name || !stepOne.phone || !stepOne.email || !stepOne.website) {
      setError('Заполните имя, телефон, email и сайт компании.');
      return false;
    }
    setError('');
    return true;
  };

  const submitStepOne = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validateStepOne()) {
      return;
    }
    trackEvent('submit_step_1', {
      has_website: stepOne.website.trim() ? 'yes' : 'no',
      has_inn: stepOne.inn.trim() ? 'yes' : 'no',
      entry_point: selectedTariff ? 'pricing' : 'hero_or_page',
    });
    setStep(2);
  };

  const submitStepTwo = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      trackEvent('submit_step_2', {
        business_type: stepTwo.businessType,
        has_site: stepTwo.hasSite,
        has_forms: stepTwo.hasForms,
        collects_client_data: stepTwo.collectsClientData,
        has_employees: stepTwo.hasEmployees,
        uses_cookies_or_metrics: stepTwo.usesCookiesOrMetrics,
        rkn_notice_status: stepTwo.filedNoticeBefore,
        need_type: stepTwo.needType,
        payment_intent: stepTwo.paymentIntent,
      });

      if (selectedTariff || stepTwo.paymentIntent === 'ready_after_consultation') {
        trackEvent('submit_high_intent_lead', {
          tariff_name: selectedTariff,
          payment_intent: stepTwo.paymentIntent,
          need_type: stepTwo.needType,
          has_site: stepTwo.hasSite,
          uses_cookies_or_metrics: stepTwo.usesCookiesOrMetrics,
          has_employees: stepTwo.hasEmployees,
        });
      }

      await submitLead(fullPayload);
      setStep(3);
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : 'Не удалось отправить заявку.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <GlobalStyles />
      <HeroSection>
        <Container>
          <TopBadge>152-ФЗ · документы под ваш бизнес · без шаблонов</TopBadge>
          <HeroGrid>
            <div>
              <HeroTitle>Документы по персональным данным для бизнеса — под ваш сайт и процессы</HeroTitle>
              <HeroText>
                Подготовим комплект документов по 152-ФЗ на основе анкеты о вашем бизнесе: политику,
                согласия, формулировки для сайта, инструкции по размещению и уведомление в Роскомнадзор,
                если оно требуется.
              </HeroText>
              <HeroActions>
                <PrimaryButton type="button" onClick={() => handleHeroCta('Получить расчёт и список документов', 'primary')}>
                  Получить расчёт и список документов
                </PrimaryButton>
                <SecondaryButton type="button" onClick={() => handleHeroCta('Проверить, что нужно моему бизнесу', 'secondary')}>
                  Проверить, что нужно моему бизнесу
                </SecondaryButton>
              </HeroActions>
              <BenefitList>
                {heroBenefits.map((benefit) => (
                  <BenefitItem key={benefit}>{benefit}</BenefitItem>
                ))}
              </BenefitList>
              <HeroNote>
                Документы готовят специалисты по 152-ФЗ и юридическому сопровождению бизнеса. Оплата —
                только после подтверждения состава работ.
              </HeroNote>
            </div>
            <HighlightCard>
              <CardTitle>Что вы получаете</CardTitle>
              <CheckList>
                <li>Политику, согласия и формулировки для сайта</li>
                <li>Понятную инструкцию, что и где разместить</li>
                <li>Подготовленное уведомление РКН — если нужно</li>
                <li>Рекомендации по хранению и обработке данных</li>
              </CheckList>
              <InlineMetric>
                <strong>7–14 дней</strong>
                <span>обычно занимает подготовка после получения всех данных</span>
              </InlineMetric>
            </HighlightCard>
          </HeroGrid>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionHeader>
            <SectionEyebrow>Почему это касается почти каждого бизнеса</SectionEyebrow>
            <SectionTitle>Персональные данные у вас уже есть — даже если вы так это не называете</SectionTitle>
            <SectionText>
              Если вы собираете имя, телефон, email, данные сотрудников или используете cookies и аналитику,
              у вас уже есть процессы обработки персональных данных.
            </SectionText>
          </SectionHeader>
          <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
            {problemItems.map((item) => (
              <Card key={item}>
                <CardTitle>{item}</CardTitle>
              </Card>
            ))}
          </Grid>
        </Container>
      </ContentSection>

      <AltSection>
        <Container>
          <SectionHeader>
            <SectionEyebrow>Риски</SectionEyebrow>
            <SectionTitle>Что может быть не так — и почему лучше разобраться заранее</SectionTitle>
            <SectionText>
              Мы не строим коммуникацию на запугивании, но и не делаем вид, что вопрос можно откладывать
              бесконечно. Если данные собираются, важно понимать, какие документы, согласия и уведомления нужны
              именно вам.
            </SectionText>
          </SectionHeader>
          <Grid columns="repeat(auto-fit, minmax(260px, 1fr))">
            {riskColumns.map((column) => (
              <Card key={column.title}>
                <CardTitle>{column.title}</CardTitle>
                <CheckList>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </CheckList>
              </Card>
            ))}
          </Grid>
          <Disclaimer>
            Наличие документов не даёт абсолютной гарантии, но помогает снизить риск претензий и привести сайт
            и процессы ближе к требованиям 152-ФЗ.
          </Disclaimer>
        </Container>
      </AltSection>

      <ContentSection>
        <Container>
          <SectionHeader>
            <SectionEyebrow>Что мы делаем</SectionEyebrow>
            <SectionTitle>Готовим комплект документов по персональным данным под ваш бизнес</SectionTitle>
            <SectionText>
              Мы не выдаём один шаблон всем подряд. Сначала смотрим на ваши каналы сбора данных, процессы,
              сотрудников, подрядчиков и только после этого определяем состав комплекта.
            </SectionText>
          </SectionHeader>
          <Grid columns="repeat(auto-fit, minmax(250px, 1fr))">
            {deliverables.map((item) => (
              <Card key={item}>
                <CardTitle>{item}</CardTitle>
              </Card>
            ))}
          </Grid>
          <BodyNote>
            Состав документов зависит от того, какие данные вы собираете, через какие каналы, кому передаёте и
            как организованы процессы внутри бизнеса.
          </BodyNote>
        </Container>
      </ContentSection>

      <AltSection>
        <Container>
          <SectionHeader>
            <SectionEyebrow>Как это работает</SectionEyebrow>
            <SectionTitle>Понятный процесс без самостоятельного погружения в 152-ФЗ</SectionTitle>
          </SectionHeader>
          <StepsList>
            {steps.map((item, index) => (
              <StepCard key={item}>
                <StepNumber>0{index + 1}</StepNumber>
                <StepText>{item}</StepText>
              </StepCard>
            ))}
          </StepsList>
          <BodyNote>
            Обычно подготовка занимает <strong>7–14 дней</strong> после получения всех необходимых данных.
          </BodyNote>
        </Container>
      </AltSection>

      <ContentSection>
        <Container>
          <SectionHeader>
            <SectionEyebrow>Кому это особенно актуально</SectionEyebrow>
            <SectionTitle>Если узнали себя хотя бы в нескольких пунктах — есть смысл разобраться заранее</SectionTitle>
          </SectionHeader>
          <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
            {segments.map((item) => (
              <Card key={item}>
                <CardTitle>{item}</CardTitle>
              </Card>
            ))}
          </Grid>
        </Container>
      </ContentSection>

      <AltSection>
        <Container>
          <SectionHeader>
            <SectionEyebrow>Почему не шаблон</SectionEyebrow>
            <SectionTitle>Шаблон из интернета не учитывает, как именно ваш бизнес работает с данными</SectionTitle>
            <SectionText>
              Ценность услуги не в “бумажке”, а в комплекте под конкретный бизнес и понятной инструкции, что с
              этим делать дальше.
            </SectionText>
          </SectionHeader>
          <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
            {templateRisks.map((item) => (
              <Card key={item}>
                <CardTitle>{item}</CardTitle>
              </Card>
            ))}
          </Grid>
        </Container>
      </AltSection>

      <ContentSection id="pricing">
        <Container>
          <SectionHeader>
            <SectionEyebrow>Ориентиры по стоимости</SectionEyebrow>
            <SectionTitle>Тарифы для первичной оценки спроса и состава работ</SectionTitle>
            <SectionText>
              Финальная стоимость зависит от количества сценариев сбора данных, сотрудников, подрядчиков,
              уведомления РКН и других факторов. Поэтому на странице указаны ориентиры “от”.
            </SectionText>
          </SectionHeader>
          <Grid columns="repeat(auto-fit, minmax(280px, 1fr))">
            {pricing.map((item) => (
              <PricingCard key={item.tier}>
                <PricingTier>{item.tier}</PricingTier>
                <PricingPrice>{item.price}</PricingPrice>
                <PricingText>{item.description}</PricingText>
                <CheckList>
                  {item.items.map((priceItem) => (
                    <li key={priceItem}>{priceItem}</li>
                  ))}
                </CheckList>
                <PrimaryButton type="button" onClick={() => handleSelectTariff(item.tier)}>
                  {item.tier === 'Расширенный' ? 'Запросить индивидуальный расчёт' : 'Выбрать тариф'}
                </PrimaryButton>
              </PricingCard>
            ))}
          </Grid>
          <BodyNote>
            Оплата не списывается на сайте. Сначала мы определяем предварительный состав работ, подтверждаем,
            что входит в комплект, и только после этого обсуждаем оплату.
          </BodyNote>
        </Container>
      </ContentSection>

      <AltSection id="lead-form">
        <Container narrow>
          <SectionHeader>
            <SectionEyebrow>Заявка</SectionEyebrow>
            <SectionTitle>Узнайте, какие документы нужны именно вашему бизнесу</SectionTitle>
            <SectionText>
              Ответьте на несколько вопросов — мы определим предварительный состав комплекта и предложим
              подходящий формат работы.
            </SectionText>
          </SectionHeader>

          {step === 1 && (
            <FormCard onSubmit={submitStepOne}>
              <FormGrid>
                <InputWrap>
                  <label htmlFor="name">Имя</label>
                  <TextInput id="name" value={stepOne.name} onChange={handleStepOneChange('name')} />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="phone">Телефон</label>
                  <TextInput id="phone" value={stepOne.phone} onChange={handleStepOneChange('phone')} />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="email">Email</label>
                  <TextInput id="email" type="email" value={stepOne.email} onChange={handleStepOneChange('email')} />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="website">Сайт компании</label>
                  <TextInput id="website" value={stepOne.website} onChange={handleStepOneChange('website')} />
                </InputWrap>
                <InputWrap full>
                  <label htmlFor="inn">ИНН — если готовы указать</label>
                  <TextInput id="inn" value={stepOne.inn} onChange={handleStepOneChange('inn')} />
                </InputWrap>
              </FormGrid>
              {error && <ErrorText>{error}</ErrorText>}
              <PrimaryButton type="submit">Получить расчёт и список нужных документов</PrimaryButton>
              <SmallNote>
                Отправляя форму, вы соглашаетесь на обработку персональных данных для связи по заявке.
              </SmallNote>
            </FormCard>
          )}

          {step === 2 && (
            <FormCard onSubmit={submitStepTwo}>
              <FormGrid>
                <SelectWrap>
                  <label htmlFor="businessType">Форма бизнеса</label>
                  <SelectField id="businessType" value={stepTwo.businessType} onChange={handleStepTwoChange('businessType')}>
                    <option value="ИП">ИП</option>
                    <option value="ООО">ООО</option>
                    <option value="Другое">Другое</option>
                  </SelectField>
                </SelectWrap>
                <SelectWrap>
                  <label htmlFor="hasSite">Есть ли сайт</label>
                  <SelectField id="hasSite" value={stepTwo.hasSite} onChange={handleStepTwoChange('hasSite')}>
                    <option value="Да">Да</option>
                    <option value="Нет">Нет</option>
                    <option value="В разработке">В разработке</option>
                  </SelectField>
                </SelectWrap>
                <SelectWrap>
                  <label htmlFor="hasForms">Есть ли формы заявок</label>
                  <SelectField id="hasForms" value={stepTwo.hasForms} onChange={handleStepTwoChange('hasForms')}>
                    <option value="Да">Да</option>
                    <option value="Нет">Нет</option>
                    <option value="Не уверен">Не уверен</option>
                  </SelectField>
                </SelectWrap>
                <SelectWrap>
                  <label htmlFor="collectsClientData">Собираете ли данные клиентов</label>
                  <SelectField id="collectsClientData" value={stepTwo.collectsClientData} onChange={handleStepTwoChange('collectsClientData')}>
                    <option value="Да">Да</option>
                    <option value="Нет">Нет</option>
                    <option value="Не уверен">Не уверен</option>
                  </SelectField>
                </SelectWrap>
                <SelectWrap>
                  <label htmlFor="hasEmployees">Есть ли сотрудники</label>
                  <SelectField id="hasEmployees" value={stepTwo.hasEmployees} onChange={handleStepTwoChange('hasEmployees')}>
                    <option value="Да">Да</option>
                    <option value="Нет">Нет</option>
                  </SelectField>
                </SelectWrap>
                <SelectWrap>
                  <label htmlFor="usesCookiesOrMetrics">Используете ли cookies / метрики / CRM / рассылки</label>
                  <SelectField
                    id="usesCookiesOrMetrics"
                    value={stepTwo.usesCookiesOrMetrics}
                    onChange={handleStepTwoChange('usesCookiesOrMetrics')}
                  >
                    <option value="Да">Да</option>
                    <option value="Нет">Нет</option>
                    <option value="Частично">Частично</option>
                    <option value="Не уверен">Не уверен</option>
                  </SelectField>
                </SelectWrap>
                <SelectWrap>
                  <label htmlFor="filedNoticeBefore">Подавали ли уведомление в РКН</label>
                  <SelectField id="filedNoticeBefore" value={stepTwo.filedNoticeBefore} onChange={handleStepTwoChange('filedNoticeBefore')}>
                    <option value="Да">Да</option>
                    <option value="Нет">Нет</option>
                    <option value="Не знаю">Не знаю</option>
                  </SelectField>
                </SelectWrap>
                <SelectWrap>
                  <label htmlFor="needType">Что вам нужно</label>
                  <SelectField id="needType" value={stepTwo.needType} onChange={handleStepTwoChange('needType')}>
                    <option value="site_docs">Документы для сайта</option>
                    <option value="rkn_notice">Уведомление РКН</option>
                    <option value="full_package">Полный комплект</option>
                    <option value="not_sure">Пока не знаю</option>
                  </SelectField>
                </SelectWrap>
                <SelectWrap full>
                  <label htmlFor="paymentIntent">Готовы ли вы оплатить подготовку комплекта, если стоимость будет в подходящем диапазоне?</label>
                  <SelectField id="paymentIntent" value={stepTwo.paymentIntent} onChange={handleStepTwoChange('paymentIntent')}>
                    <option value="ready_after_consultation">Да, готов(а) оплатить после консультации</option>
                    <option value="want_exact_price">Хочу сначала узнать точную стоимость</option>
                    <option value="researching">Пока изучаю варианты</option>
                  </SelectField>
                </SelectWrap>
              </FormGrid>
              {error && <ErrorText>{error}</ErrorText>}
              <ButtonRow>
                <GhostButton type="button" onClick={() => setStep(1)}>
                  Назад
                </GhostButton>
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправляем…' : 'Получить предварительное предложение'}
                </PrimaryButton>
              </ButtonRow>
            </FormCard>
          )}

          {step === 3 && (
            <SuccessCard>
              <SuccessTitle>Спасибо, заявку получили</SuccessTitle>
              <SuccessText>
                Мы предварительно определим, какой комплект документов может понадобиться вашему бизнесу, и
                свяжемся с вами. Если решение подойдёт, специалист подтвердит состав работ, сроки и предложит
                вариант оплаты.
              </SuccessText>
              <CheckList>
                <li>Изучим вашу анкету</li>
                <li>Определим предварительный состав комплекта</li>
                <li>Подскажем, нужен ли блок по уведомлению РКН</li>
                <li>Свяжемся для подтверждения деталей</li>
              </CheckList>
              <SmallNote>Оплата обсуждается только после подтверждения состава работ. Без автоматического списания на сайте.</SmallNote>
            </SuccessCard>
          )}
        </Container>
      </AltSection>

      <ContentSection>
        <Container>
          <SectionHeader>
            <SectionEyebrow>FAQ</SectionEyebrow>
            <SectionTitle>Частые вопросы</SectionTitle>
          </SectionHeader>
          <FaqList>
            {faqItems.map((item) => (
              <FaqItem key={item.question}>
                <CardTitle>{item.question}</CardTitle>
                <SectionText>{item.answer}</SectionText>
              </FaqItem>
            ))}
          </FaqList>
        </Container>
      </ContentSection>

      <FooterSection>
        <Container>
          <FooterCard>
            <SectionEyebrow>Финальный шаг</SectionEyebrow>
            <SectionTitle>Ответьте на несколько вопросов — мы определим состав комплекта и подготовим предложение</SectionTitle>
            <SectionText>
              Без мгновенной оплаты. Сначала — состав работ, предварительная стоимость и только потом обсуждение
              оплаты со специалистом.
            </SectionText>
            <PrimaryButton type="button" onClick={() => handleHeroCta('Начать с анкеты', 'primary')}>
              Начать с анкеты
            </PrimaryButton>
            <FooterMeta>
              Документы готовят специалисты по 152-ФЗ и юридическому сопровождению бизнеса. Решение не заменяет
              комплексный аудит ИБ.
            </FooterMeta>
          </FooterCard>
        </Container>
      </FooterSection>
    </PageShell>
  );
};

export default IndexPage;

const PageShell = styled.main`
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  min-height: 100vh;
`;

const Container = styled.div<{ narrow?: boolean }>`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  ${({ narrow }): string => (narrow ? 'max-width: 860px;' : '')}
`;

const HeroSection = styled.section`
  padding: 32px 0 72px;
  background:
    radial-gradient(circle at top right, rgba(70, 119, 255, 0.16), transparent 36%),
    linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
`;

const TopBadge = styled.span`
  display: inline-flex;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(70, 119, 255, 0.1);
  color: ${theme.colors.accent};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 28px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(40px, 6vw, 64px);
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin: 0 0 20px;
  max-width: 760px;
`;

const HeroText = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: ${theme.colors.muted};
  margin: 0 0 28px;
  max-width: 760px;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
`;

const baseButton = `
  border: none;
  border-radius: 16px;
  padding: 16px 22px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled.button`
  ${baseButton}
  background: ${theme.colors.accent};
  color: #ffffff;
  box-shadow: 0 16px 32px rgba(70, 119, 255, 0.24);

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const SecondaryButton = styled.button`
  ${baseButton}
  background: #ffffff;
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.border};
`;

const GhostButton = styled.button`
  ${baseButton}
  background: transparent;
  color: ${theme.colors.muted};
  border: 1px solid ${theme.colors.border};
`;

const BenefitList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  padding: 0;
  margin: 0 0 24px;
  list-style: none;
`;

const BenefitItem = styled.li`
  padding: 16px 18px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  box-shadow: 0 8px 24px rgba(14, 24, 45, 0.06);
`;

const HeroNote = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: ${theme.colors.muted};
`;

const HighlightCard = styled.div`
  padding: 28px;
  border-radius: 28px;
  background: #0f1726;
  color: #ffffff;
  box-shadow: 0 30px 60px rgba(14, 24, 45, 0.2);
`;

const CardTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 22px;
  line-height: 1.3;
`;

const CheckList = styled.ul`
  padding-left: 20px;
  margin: 0;
  display: grid;
  gap: 12px;
  color: inherit;
  line-height: 1.6;
`;

const InlineMetric = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: grid;
  gap: 6px;

  strong {
    font-size: 28px;
  }

  span {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const ContentSection = styled.section`
  padding: 72px 0;
`;

const AltSection = styled.section`
  padding: 72px 0;
  background: ${theme.colors.surface};
`;

const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 32px;
`;

const SectionEyebrow = styled.div`
  color: ${theme.colors.accent};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 14px;
  font-size: clamp(30px, 4.5vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.03em;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  font-size: 18px;
  line-height: 1.7;
`;

const Grid = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${({ columns }): string => columns};
  gap: 18px;
`;

const Card = styled.div`
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 18px 44px rgba(14, 24, 45, 0.06);
`;

const Disclaimer = styled.p`
  margin: 24px 0 0;
  color: ${theme.colors.muted};
  font-size: 15px;
  line-height: 1.7;
`;

const BodyNote = styled.p`
  margin: 24px 0 0;
  color: ${theme.colors.muted};
  font-size: 17px;
  line-height: 1.7;
`;

const StepsList = styled.div`
  display: grid;
  gap: 16px;
`;

const StepCard = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 18px;
  align-items: center;
  padding: 22px 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  border-radius: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StepNumber = styled.div`
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background: rgba(70, 119, 255, 0.1);
  color: ${theme.colors.accent};
  font-size: 22px;
  font-weight: 800;
`;

const StepText = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
`;

const PricingCard = styled(Card)`
  display: grid;
  gap: 18px;
`;

const PricingTier = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.accent};
`;

const PricingPrice = styled.div`
  font-size: 42px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const PricingText = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  line-height: 1.7;
`;

const FormCard = styled.form`
  padding: 28px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  border-radius: 28px;
  box-shadow: 0 22px 48px rgba(14, 24, 45, 0.08);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const InputWrap = styled.div<{ full?: boolean }>`
  display: grid;
  gap: 8px;
  ${({ full }): string => (full ? 'grid-column: 1 / -1;' : '')}

  label {
    font-weight: 600;
  }
`;

const SelectWrap = styled(InputWrap)``;

const TextInput = styled.input`
  border: 1px solid ${theme.colors.border};
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 16px;
  min-height: 52px;
  background: ${theme.colors.surface};
`;

const SelectField = styled.select`
  border: 1px solid ${theme.colors.border};
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 16px;
  min-height: 52px;
  background: ${theme.colors.surface};
`;

const ErrorText = styled.div`
  margin: 16px 0;
  color: #b42318;
  font-weight: 600;
`;

const SmallNote = styled.p`
  margin: 14px 0 0;
  color: ${theme.colors.muted};
  font-size: 14px;
  line-height: 1.6;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const SuccessCard = styled.div`
  padding: 28px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  border-radius: 28px;
  box-shadow: 0 22px 48px rgba(14, 24, 45, 0.08);
`;

const SuccessTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 30px;
`;

const SuccessText = styled.p`
  margin: 0 0 16px;
  color: ${theme.colors.muted};
  font-size: 18px;
  line-height: 1.7;
`;

const FaqList = styled.div`
  display: grid;
  gap: 16px;
`;

const FaqItem = styled.div`
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${theme.colors.border};
  background: #ffffff;
`;

const FooterSection = styled.section`
  padding: 72px 0 88px;
`;

const FooterCard = styled.div`
  padding: 36px;
  border-radius: 32px;
  background: linear-gradient(135deg, #0f1726 0%, #1d2a44 100%);
  color: #ffffff;
  box-shadow: 0 28px 64px rgba(14, 24, 45, 0.22);

  ${SectionTitle}, ${SectionText}, ${SectionEyebrow} {
    color: #ffffff;
  }
`;

const FooterMeta = styled.p`
  margin: 20px 0 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.7;
`;
