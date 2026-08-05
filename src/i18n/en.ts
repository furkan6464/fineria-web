import type { Dictionary } from './tr';

/** English UI dictionary — polished fintech copy. */
export const en: Dictionary = {
  meta: {
    documentTitle: 'Fineria Finance — Portfolio, markets, and analysis in one place',
    description:
      'Track stocks, US Markets, and crypto in one screen. Clear data, a simple interface, mobile coming soon.',
    ogTitle: 'Fineria Finance — Portfolio & Market Platform',
    ogDescription: 'Track stocks, US Markets, and crypto in one screen.',
  },

  nav: {
    home: 'Home',
    features: 'Features',
    markets: 'Markets',
    predictions: 'Predictions',
    pricing: 'Pricing',
    about: 'About',
    login: 'Sign in',
    signup: 'Get started',
    account: 'Account',
    logout: 'Sign out',
    loggingOut: 'Signing out...',
    menu: 'Menu',
  },

  language: {
    aria: 'Language',
    tr: 'TR',
    en: 'EN',
  },

  hero: {
    brand: 'Fineria Finance',
    titleLine1: 'Run the market',
    titleLine2: 'from one screen.',
    subtitle:
      'BIST, US Markets, and crypto. A quiet interface, clear data — the insight you need, exactly when you need it.',
    ctaPrimary: 'Create free account',
    ctaSecondary: 'How it works',
    chipBist: 'BIST',
    chipUs: 'US Markets',
    chipCrypto: 'Crypto',
  },

  features: {
    badge: 'Features',
    title: 'Finance and predictions, in one place',
    subtitle:
      'Live market tracking, predictions, and risk context — tools that support your investment decisions, in Fineria Finance.',
    prev: 'Previous feature',
    next: 'Next feature',
    show: 'Show {title}',
    items: [
      {
        title: 'Smart Predictions',
        desc: 'Combine price, news, and social feed for a directional view on the symbol you choose: bullish, bearish, or sideways.',
      },
      {
        title: 'Live market panel',
        desc: 'Watch BIST, US Markets, and crypto prices on one screen. Live moves, trends, and your watchlist in the same stream.',
      },
      {
        title: 'Symbol-level analysis',
        desc: 'The Predictions engine runs on supported stocks. Pick a symbol; the model reads historical data and returns a direction-focused view.',
      },
      {
        title: 'Risk profile',
        desc: 'A short assessment of your risk tolerance. Read predictions with clearer context for your profile — this is not investment advice.',
      },
      {
        title: 'Market agenda',
        desc: 'Follow price moves with news and the daily agenda. Gather what matters to your portfolio in one place.',
      },
      {
        title: 'Three markets, one account',
        desc: 'Local equities, US Markets, and crypto. One unified finance experience in Fineria Finance instead of scattered apps.',
      },
      {
        title: 'Smart alerts',
        desc: 'Get notified about assets you follow and meaningful moves. Stop watching the market around the clock.',
      },
      {
        title: 'Secure foundation',
        desc: 'Encrypted communication, modern session protection, and Predictions access tied to your account.',
      },
    ],
  },

  platform: {
    badge: 'Platform',
    titleLine1: 'Not just watching the market —',
    titleLine2: 'built to understand it.',
    subtitle: 'Instead of dumping data on the screen, we surface views that help you decide.',
    items: [
      { title: 'One dashboard', desc: 'Market and portfolio, together.' },
      { title: 'Live tracking', desc: 'See the move without lag.' },
      { title: 'Clear analysis', desc: 'Turn complex data into readable insight.' },
      { title: 'Secure foundation', desc: 'Encrypted communication and account protection.' },
    ],
  },

  mobile: {
    badge: 'Mobile',
    title: 'In your pocket. Coming soon.',
    subtitle: 'iOS and Android apps are on the way. The same clean experience, on the App Store and Google Play.',
    soon: 'Coming soon',
    soonUpper: 'COMING SOON',
    storeNote: 'App Store and Google Play · Coming soon',
    screens: {
      home: 'Home',
      markets: 'Markets',
      predictions: 'Predictions',
      analysisDetail: 'Analysis detail',
      analysis: 'Analysis',
      agenda: 'Agenda',
      news: 'News',
    },
  },

  security: {
    badge: 'Security',
    title: 'Security designed from day one',
    subtitle: 'Modern security practices to protect your account and your data.',
    items: [
      { title: 'Encrypted communication', desc: 'Your data travels over secure channels.' },
      { title: 'Biometric auth', desc: 'Fingerprint and face recognition support (on mobile).' },
      { title: 'Two-factor sign-in', desc: 'An extra verification step on every session.' },
      { title: 'Activity monitoring', desc: 'Track account activity and stay informed instantly.' },
      { title: 'Resilient infrastructure', desc: 'Built for uninterrupted access.' },
      { title: 'Account protection', desc: 'Extra verification on suspicious sign-ins.' },
    ],
  },

  howItWorks: {
    badge: 'How it works',
    title: 'Four steps. No clutter.',
    subtitle: 'A clean path from account to first watchlist.',
    cta: 'Create free account',
    steps: [
      { title: 'Open your account', description: 'Create a free account in a few steps.', detail: 'Minutes' },
      { title: 'Set your profile', description: 'Get a risk view that fits your goals.', detail: 'Short quiz' },
      { title: 'Add your assets', description: 'Choose the symbols you want to follow.', detail: 'One screen' },
      { title: 'Follow the stream', description: 'Read market and portfolio from the same place.', detail: 'Web · mobile soon' },
    ],
  },

  cta: {
    badge: 'Ready to begin?',
    titleLine1: 'Clarify your',
    titleLine2: 'portfolio today.',
    subtitle: 'Web is live now. The mobile app arrives soon on the App Store and Google Play.',
    primary: 'Create free account',
    secondary: 'Sign in',
    imageAlt: 'An investor using the Fineria Finance app',
  },

  team: {
    badge: 'Our team',
    titleLine1: 'The people behind',
    titleLine2: 'Fineria Finance.',
    subtitle:
      'Five co-founders who bring finance, engineering, and design to the same table — strengthened by academic insight and entrepreneurial experience.',
    guidesLabel: 'Those who guide us',
    academicLabel: 'Academic advisor',
    mentorLabel: 'Mentor',
    linkedinSoon: 'LinkedIn link coming soon',
    linkedinAria: '{name} on LinkedIn',
    founders: [
      { role: 'Co-founder · CEO', focus: 'Vision & Strategy' },
      { role: 'Co-founder · CTO', focus: 'Technology & Infrastructure' },
      { role: 'Co-founder · COO', focus: 'Operations & Management' },
      { role: 'Co-founder · CFO', focus: 'Finance & Investment' },
      { role: 'Co-founder · CMO', focus: 'Marketing & Brand' },
    ],
    academic: {
      role: 'Academic advisor',
      focus: 'Academic guidance on product development.',
    },
    mentor: {
      role: 'Mentor',
      focus: 'Guidance on entrepreneurship, product strategy, and fundraising.',
    },
  },

  footer: {
    blurb:
      'Fineria Finance is a fintech venture that helps individual investors track their portfolios from a single platform.',
    product: 'Product',
    company: 'Company',
    legal: 'Legal',
    features: 'Features',
    markets: 'Markets',
    predictions: 'Predictions',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    rights: '© 2026 Fineria Finance. All rights reserved.',
    stores: 'App Store and Google Play · Coming soon',
    disclaimer:
      'Fineria Finance is not an investment-advice platform. Content on the platform is for informational purposes only; you are responsible for your own investment decisions. Past performance is not a guarantee of future results.',
  },

  ticker: {
    aria: 'Live market ticker',
  },

  marketTabs: {
    borsa: 'Equities',
    kripto: 'Crypto',
    emtia: 'Commodities',
  },

  authLoading: {
    message: 'Checking session...',
  },

  deviceShowcase: {
    badge: 'Coming soon',
    title: 'Fineria Finance on desktop and mobile',
    description: 'The web app is being prepared for launch; iOS and Android versions are coming very soon.',
    altMarkets: 'Fineria Finance markets screen',
    altPredictions: 'Fineria Finance Predictions screen',
    altDesktop: 'Fineria Finance desktop app',
  },

  predictionLib: {
    disclaimer: 'This output is not investment advice; it is a model prediction.',
  },

  authValidation: {
    handleRequired: 'Username is required.',
    handleLength: 'Username must be between 2 and 64 characters.',
    handleChars: 'Username may only contain letters, numbers, and underscores.',
    emailRequired: 'Email is required.',
    emailMax: 'Email may be at most 256 characters.',
    emailInvalid: 'Enter a valid email address.',
    passwordRequired: 'Password is required.',
    passwordLength: 'Password must be between 8 and 128 characters.',
    passwordComplexity: 'Password must include at least one uppercase letter and one number.',
    passwordMaxLogin: 'Password may be at most 128 characters.',
    confirmRequired: 'Password confirmation is required.',
    confirmMismatch: 'Passwords do not match.',
  },

  about: {
    hero: {
      badge: 'About us',
      title: 'Making financial tools accessible',
      subtitle:
        'Fineria Finance is a fintech venture that helps individual investors track their portfolios with a clear, simple experience.',
      imageAlt: 'An investor using the Fineria Finance app',
    },
    mission: {
      badge: 'Our mission',
      title: 'The real problem we solve',
      problems: [
        { title: 'Scattered tools', desc: 'Markets, news, and portfolio live in different places.' },
        { title: 'Complex interfaces', desc: 'Professional platforms shut out beginners.' },
        { title: 'Unreliable content', desc: 'Social media tips aren’t dependable.' },
        { title: 'Mobile gap', desc: 'Tracking still lives mostly on the desktop.' },
      ],
    },
    workingOn: {
      title: 'What we’re building',
      items: [
        { title: 'One dashboard', desc: 'Markets and portfolio, in the same place.' },
        { title: 'Clear analysis', desc: 'We turn complex data into understandable insights.' },
        { title: 'Mobile access', desc: 'We’re preparing App Store and Google Play releases.' },
      ],
    },
    values: {
      badge: 'Our values',
      title: 'What we believe, how we work',
      items: [
        { title: 'Transparency', desc: 'We say clearly what we promise.' },
        { title: 'Innovation', desc: 'We make modern tools approachable.' },
        { title: 'User focus', desc: 'Every feature starts from a real need.' },
        { title: 'Accessibility', desc: 'Professional tools, in a simple experience.' },
      ],
    },
    roadmap: {
      badge: 'Roadmap',
      title: 'Development timeline',
      done: 'Completed',
      phases: [
        { phase: 'Phase 1', title: 'Core platform', desc: 'Portfolio tracking and the foundational UI.' },
        { phase: 'Phase 2', title: 'Predictions', desc: 'Data-driven prediction tools.' },
        { phase: 'Phase 3', title: 'Mobile app', desc: 'App Store and Google Play releases.' },
        { phase: 'Phase 4', title: 'Regulatory approvals & launch', desc: 'Securing required approvals and going to market.' },
      ],
    },
  },

  featuresPage: {
    hero: {
      eyebrow: 'Features',
      titleLine1: 'Finance tools and',
      titleLine2: 'predictions, together.',
      subtitle:
        'Live market tracking, directional signals, risk profile, and the daily agenda — every layer that supports your investment decision, in Fineria Finance.',
    },
    pillars: [
      {
        eyebrow: '01 — Finance',
        title: 'Read the market in one dashboard',
        desc: 'Follow BIST, US Markets, and crypto prices, moves, and trends in a clean stream.',
        points: ['Live price and percent change', 'Watchlist and quick search', 'A noise-free market panel'],
        cta: 'Explore markets',
      },
      {
        eyebrow: '02 — Predictions',
        title: 'Directional view, clear signal',
        desc: 'The model reads historical data and technical indicators to produce a Buy / Sell / Hold style directional view.',
        points: ['Price, news, and social-feed inputs', 'Attention-LSTM architecture', 'Read alongside your risk profile'],
        cta: 'See Predictions',
      },
    ],
    grid: {
      eyebrow: "What's included",
      title: 'Tools that wrap your decision process',
      subtitle: 'From market data to model output, risk to alerts — end to end.',
      features: [
        { title: 'Live market data', desc: 'Watch stock and crypto moves without lag.' },
        { title: 'Directional signal', desc: 'Model output for bullish, bearish, or sideways.' },
        { title: 'Market agenda', desc: 'Follow price alongside news and developments.' },
        { title: 'Risk profile', desc: 'A short assessment of your risk tolerance.' },
        { title: 'Technical indicators', desc: 'RSI, MACD, and confidence score with the model output.' },
        { title: 'Three markets, one account', desc: 'BIST · US Markets · Crypto' },
        { title: 'Smart alerts', desc: 'Instant alerts for assets you follow.' },
        { title: 'Secure session', desc: 'Encrypted communication and account-gated Predictions access.' },
        { title: 'Web now, mobile soon', desc: 'Use it in the browser; iOS and Android are on the way.' },
        { title: 'Account-linked engine', desc: 'Live prediction output arrives through a secure session.' },
        { title: 'Portfolio-first view', desc: 'Not the whole market — what matters to you.' },
      ],
    },
    flow: {
      title: 'How it comes together',
      subtitle: 'The finance panel and Predictions engine work in the same product experience.',
      steps: [
        { title: 'Browse the market', text: 'Explore BIST, US, and crypto assets.' },
        { title: 'Pick a symbol', text: 'Predictions runs on supported symbols.' },
        { title: 'Read the direction', text: 'The model produces a Buy / Sell / Hold view.' },
        { title: 'The decision stays yours', text: 'Output is not investment advice.' },
      ],
    },
  },

  marketsPage: {
    hero: {
      eyebrow: 'Markets',
      titleLine1: 'Not just watching the market —',
      titleLine2: 'built to understand it.',
      subtitle:
        'We bring prices, trends, and the market agenda into one stream. Less noise, a clearer view.',
      ctaPrimary: 'Join early access',
      ctaSecondary: 'Explore the experience',
    },
    preview: {
      badge: 'Product preview',
      headline: 'From data to view, from view to insight.',
      altAgenda: 'Fineria Finance market agenda',
      altMarkets: 'Fineria Finance markets screen',
      altHome: 'Fineria Finance home screen',
    },
    experience: {
      title: 'Everything in its place.',
      subtitle:
        'We’re turning the market screen from a wall of data into a product that fits an investor’s daily flow.',
      capabilities: [
        {
          title: 'Find what you need instantly',
          description: 'Discover BIST, US Markets, and crypto assets with a simple search experience.',
        },
        {
          title: 'Read the move at a glance',
          description: 'See price, change, and trend without getting lost across crowded screens.',
        },
        {
          title: 'Don’t miss what matters',
          description: 'Build a personal market feed for the assets and agenda you follow.',
        },
      ],
    },
    flow: {
      eyebrow: 'Fineria Finance flow',
      titleLine1: 'Not the whole market —',
      titleLine2: 'what matters to you.',
      steps: [
        { title: 'Discover', text: 'Browse the market and featured assets.' },
        { title: 'Follow', text: 'Gather the symbols you care about in one place.' },
        { title: 'Make sense of it', text: 'Read price moves with the agenda and analysis together.' },
      ],
      mockupAlt: 'Fineria Finance personal market feed',
    },
    ctaBand: {
      eyebrow: 'Coming soon to Fineria Finance',
      title: 'Make market tracking calmer, more personal, and easier to understand.',
      cta: 'Join early access',
    },
  },

  pricing: {
    hero: {
      badge: 'Pricing',
      title: 'Flexible plans that fit your goals',
      subtitle: 'No hidden fees · Early access open · Mobile app coming soon',
    },
    popular: 'Most popular',
    free: 'Free',
    trial: 'Try free for 30 days',
    period: '/mo',
    tiers: {
      starter: {
        name: 'Starter',
        description: 'First step into financial literacy',
        cta: 'Start free',
        features: [
          'Income & expense tracking',
          'Basic portfolio management',
          'Track 10 stocks',
          'Basic social interaction',
          '24/7 notifications',
          'Mobile app access',
        ],
        excluded: ['Predictions engine', 'Behavioral risk profile', 'API access'],
      },
      pro: {
        name: 'Pro Investor',
        description: 'Full power for active investors',
        cta: 'Go Pro',
        features: [
          'Predictions engine',
          'Market sentiment analysis',
          'Unlimited portfolio tracking',
          'Recommendations tailored to risk profile',
          'Advanced technical indicators',
          'Real-time data',
          'API access',
          'Priority support',
        ],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For institutions and brokerages',
        cta: 'Request a quote',
        features: [
          'B2B API integration',
          'Custom integration support',
          'Multi-account management',
          'Enterprise reporting',
          'Service-level commitment',
          'Risk profile module',
          'Dedicated technical support',
          'Tax optimization',
        ],
      },
    },
    enterpriseBanner: {
      title: 'Enterprise API partnership',
      desc: 'Custom B2B integration solutions for banks and brokerages',
      cta: 'Get a quote',
    },
    comparison: {
      title: 'Plan comparison',
      feature: 'Feature',
      values: {
        basic: 'Basic',
        unlimited: 'Unlimited',
        full: 'Full',
        custom: 'Custom',
        email: 'Email',
        priority: 'Priority',
        dedicated: 'Dedicated',
        sla: '99.9%',
      },
      rows: [
        'Income & expense tracking',
        'Portfolio management',
        'Predictions engine',
        'Market sentiment analysis',
        'Personalized risk profile',
        'Advanced technical indicators',
        'Social network',
        'API access',
        'Enterprise reporting',
        'Service-level commitment',
        'Support',
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'How long is the free plan available?',
          a: 'Core features are free during the early-access period.',
        },
        {
          q: 'How does the Predictions engine work?',
          a: 'Price history, technical indicators, news data, and social feeds are processed together to present a view of possible price direction. This is not investment advice.',
        },
        {
          q: 'Is my data safe?',
          a: 'We use encrypted communication and account-protection measures. We continuously strengthen security practices as the product evolves.',
        },
        {
          q: 'When is the mobile app coming?',
          a: 'App Store and Google Play releases will launch soon.',
        },
        {
          q: 'Can I cancel my plan anytime?',
          a: 'Yes. You can cancel paid plans whenever you like.',
        },
      ],
    },
  },

  login: {
    title: 'Welcome',
    subtitle: 'Sign-in infrastructure is being prepared.',
    bannerTitle: 'Opening to access very soon',
    bannerBody: 'Email sign-in and account actions are currently unavailable.',
    soon: 'Coming soon',
    googleSoon: 'Google · Coming soon',
    appleSoon: 'Apple · Coming soon',
    orEmail: 'or continue with email',
    email: 'Email',
    emailPlaceholder: 'you@fineria.com',
    password: 'Password',
    forgot: 'Forgot password · Coming soon',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    submit: 'Sign in · Coming soon',
    submitting: 'Signing in...',
    noAccount: 'Don’t have an account?',
    signUp: 'Sign up →',
    registeredSuccess: 'Registration successful. You can sign in.',
    errors: {
      invalidCredentials: 'Incorrect email or password.',
      tooManyRequests: 'Too many attempts. Please try again later.',
      validation: 'The information entered is invalid.',
      generic: 'Couldn’t sign in. Please try again.',
      unexpected: 'An unexpected error occurred. Please try again.',
    },
  },

  register: {
    badge: 'Coming soon',
    title: 'Create an account',
    subtitle: 'Membership is being prepared for launch.',
    bannerTitle: 'Registration opens soon',
    bannerBody: 'This form is preview-only for now and does not accept information.',
    handle: 'Username',
    handlePlaceholder: 'username',
    email: 'Email',
    emailPlaceholder: 'you@fineria.com',
    password: 'Password',
    confirm: 'Confirm',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    termsPrefix: 'I have read and accept the ',
    termsOfUse: 'Terms of Use',
    termsMid: ' and ',
    privacy: 'Privacy Policy',
    termsSuffix: '.',
    termsRequired: 'You must accept the terms of use to continue.',
    submit: 'Sign up · Coming soon',
    submitting: 'Creating account...',
    hasAccount: 'Already have an account?',
    signIn: 'Sign in →',
    showcaseTitle: 'Everywhere, very soon',
    showcaseDescription: 'The web version is live in progress; App Store and Google Play releases are coming soon.',
    errors: {
      emailExists: 'This email is already registered.',
      handleExists: 'This username is taken.',
      tooManyRequests: 'Too many attempts. Please try again later.',
      validation: 'The information entered is invalid.',
      generic: 'Registration couldn’t be completed. Please try again.',
      unexpected: 'An unexpected error occurred. Please try again.',
    },
  },

  account: {
    badge: 'Account',
    title: 'My account',
    welcome: 'Welcome, @{handle}. Your account details are summarized below.',
    profileHeading: 'Profile details',
    handle: 'Username',
    email: 'Email',
    userId: 'User ID',
    note: 'Account, portfolio, and security features will expand soon. This page currently shows your basic profile information.',
  },

  predictions: {
    header: {
      eyebrow: 'Fineria Finance Predictions',
      title: 'Read price direction with data',
      subtitle:
        'The model reads price, technical indicators, news sentiment, and social feed together to produce a Buy, Sell, or Hold view.',
      architecture: 'Attention-LSTM architecture',
      inputs: 'News + social input',
      symbols: '{count} symbols with trained models',
    },
    how: {
      eyebrow: 'Logic',
      title: 'How Predictions works',
      intro:
        'The engine doesn’t only read price. Historical data, technical indicators, news sentiment, and social feed are processed together to produce a Buy / Sell / Hold view. The cards below are sample output language — live results run through your account.',
      signals: [
        {
          label: 'Buy',
          meaning: 'Bullish',
          desc: 'Upside probability stands out. Read it together with confidence score and indicators.',
        },
        {
          label: 'Hold',
          meaning: 'Neutral',
          desc: 'No clear direction. Waiting or keeping the position is the more balanced reading.',
        },
        {
          label: 'Sell',
          meaning: 'Bearish',
          desc: 'Downside probability stands out. Not investment advice — a data-driven view.',
        },
      ],
      inputsHeading: 'Data that feeds the model',
      inputsSub: 'Predictions combines four data layers.',
      inputs: [
        { title: 'Price & volume', text: 'Historical price series and trading volume are the model’s core inputs.' },
        { title: 'Technical indicators', text: 'RSI, MACD, and similar indicators add context.' },
        { title: 'News data', text: 'Company and market news enter the model as sentiment signals.' },
        { title: 'Social feed', text: 'Community and social discussion pulse support the directional view.' },
      ],
      pipelineHeading: 'From data to signal',
      pipeline: [
        { title: 'Multi-layer input', text: 'Price, technicals, news, and social feed come together.' },
        { title: 'Attention-LSTM', text: 'The model learns patterns over time and produces a score.' },
        { title: 'Buy · Sell · Hold', text: 'Output becomes a clear directional view.' },
      ],
      disclaimer:
        'Model output is for informational purposes only and is not investment advice. The decision is always yours.',
    },
    live: {
      title: 'Try it live',
      subtitle: 'Pick a symbol and see the model output. Activates after you sign in.',
      selectSymbol: 'Select a symbol',
    },
    risk: {
      title: 'Your risk profile',
      privacy: 'Your answers are calculated only on this screen and are never sent anywhere.',
      retry: 'Try again',
      questions: [
        {
          q: 'What is your investing experience?',
          opts: ['None', '1–3 years', '3–7 years', '7+ years'],
        },
        {
          q: 'If your portfolio lost 20% of its value, what would you do?',
          opts: ['Sell everything', 'Sell some', 'Wait', 'Buy more'],
        },
        {
          q: 'What is your investment horizon?',
          opts: ['Less than 6 months', '1–2 years', '3–5 years', '5+ years'],
        },
        {
          q: 'How would you describe your risk tolerance?',
          opts: ['Very low', 'Low', 'Moderate', 'High'],
        },
      ],
      profiles: [
        { type: 'Conservative', desc: 'You focus on lower risk and steadier returns.' },
        { type: 'Balanced', desc: 'You balance risk and return.' },
        { type: 'Growth-oriented', desc: 'You prefer higher return potential.' },
        { type: 'Aggressive', desc: 'You take higher risk for maximum return.' },
      ],
    },
    panel: {
      lockedTitle: 'Sign in for live predictions',
      lockedBody:
        'The Predictions engine runs through your account. Create a free account to see model output for supported symbols.',
      ctaRegister: 'Create free account',
      ctaLogin: 'Sign in',
      loading: '{symbol} is being analyzed...',
      errorTitle: 'Couldn’t get a prediction',
      errorBody: 'The Predictions service isn’t responding right now. Please try again shortly.',
      retry: 'Try again',
      modelMissing: 'Model not found',
      modelFallback: 'No trained model is available for {symbol}.',
      neutral: 'Neutral',
      viewWithTime: '{timeframe} view',
      defaultView: 'Price direction view',
      refresh: 'Refresh',
      probDown: 'Down',
      probUpMid: '{pct}% upside',
      probUp: 'Up',
      confidence: 'Confidence',
      price: 'Price',
      rsi: 'RSI',
      macd: 'MACD',
    },
    preview: {
      title: 'How it looks in the app',
      altPredictions: 'Predictions screen',
      altAnalysis: 'Analysis detail',
    },
  },
};
