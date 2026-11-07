export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Experience {
  company: string
  role: string
  period: string
  summary: string
  tags: string[]
}

export interface Project {
  name: string
  glyph: string
  tech: string
  description: string
  link: string | null
  hue: [string, string]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export const profile = {
  firstName: 'AAYANJIT',
  lastName: 'BHUYAN',
  role: 'Software Developer',
  location: 'Bengaluru, India',
  email: 'aayan.work99@gmail.com',
  phone: '+91 6000357883',
  linkedin: 'https://linkedin.com/in/aayanjil-bhuyan-b48705195',
  summary:
    'I build interfaces where design, motion and engineering meet — scalable, user-focused products that feel as good as they look.',
  about:
    'For 4+ years I have shipped high-traffic consumer products end-to-end: from pixel-perfect UI and experimentation to backend APIs and analytics. I care about the last 10% — the easing curve, the edge case, the load time — because that is where good products become great ones.',
} as const

export const stats: Stat[] = [
  { value: 4, suffix: '+', label: 'Years of experience' },
  { value: 10, suffix: '+', label: 'Products shipped' },
  { value: 4, suffix: '', label: 'Companies' },
  { value: 2, suffix: '', label: 'Languages shipped in (EN/HI)' },
]

export const experience: Experience[] = [
  {
    company: 'CureSkin',
    role: 'Software Developer',
    period: '2022 — Now',
    summary:
      'Leading the CureHealth web platform — owning customer-facing features, gamification systems, AI chatbot integrations, multilingual experiment-driven flows, and the REST APIs behind them. Regular P0/P1 firefighter across weekly release cycles.',
    tags: ['Angular', 'React', 'TypeScript', 'Node.js', 'Tailwind'],
  },
  {
    company: 'EKO Infomatics',
    role: 'React Developer',
    period: '2023 — 2024',
    summary:
      'Spearheaded e-commerce builds from small to large scale — seller dashboards for a globally recognized e-commerce company, an in-house HRMS, admin panels and a publishing platform.',
    tags: ['React', 'TypeScript', 'Redux', 'Recoil', 'MobX'],
  },
  {
    company: 'CodeGama',
    role: 'React Developer',
    period: '2022 — 2023',
    summary:
      'Led frontend development for a large-scale payment-based social media application and contributed Web3 frontend work, integrating complex state and API flows end-to-end.',
    tags: ['React', 'Redux Saga', 'TypeScript', 'Web3'],
  },
  {
    company: 'Clemenzie',
    role: 'Junior Software Developer',
    period: '2021 — 2022',
    summary:
      'First chair on a payment-based social platform — Web3 frontends, complex state management and API-driven UX flows. Where the obsession started.',
    tags: ['React', 'JavaScript', 'Web3'],
  },
]

export const projects: Project[] = [
  {
    name: 'Sakura Fresh',
    glyph: '桜',
    tech: 'React · Recoil · Tailwind',
    description: 'Beverage manufacturer, Yokohama JP',
    link: 'https://sakurafresh.com/',
    hue: ['#3a1020', '#ff5d8f'],
  },
  {
    name: 'IndoSoul',
    glyph: '✦',
    tech: 'Next.js · TypeScript · Tailwind',
    description: 'Consumer web platform',
    link: 'https://indosoul.in/',
    hue: ['#2b1a05', '#ffb33c'],
  },
  {
    name: 'eTranBiz',
    glyph: '◍',
    tech: 'React · TypeScript · Tailwind',
    description: 'Business web application',
    link: 'https://e-tran-biz-staging-ii.vercel.app/',
    hue: ['#06192e', '#4da3ff'],
  },
  {
    name: 'Tashwin Trading',
    glyph: '❋',
    tech: 'Next.js · Recoil · Tailwind',
    description: 'Organic, plant-based foods',
    link: 'https://www.tashwintradingpvt.com/',
    hue: ['#0a2414', '#4ade80'],
  },
  {
    name: 'IUWE',
    glyph: '◆',
    tech: 'React · JavaScript · Tailwind',
    description: 'Community web platform',
    link: 'https://iuwe.in/',
    hue: ['#1d1033', '#a78bfa'],
  },
  {
    name: 'Himitsu Labs',
    glyph: '秘',
    tech: 'Next.js · TypeScript · Tailwind',
    description: 'Multiple client-facing builds',
    link: null,
    hue: ['#101418', '#9aa7b5'],
  },
]

export const skills: SkillGroup[] = [
  { label: 'Languages & Frameworks', items: ['TypeScript', 'JavaScript', 'React', 'Angular', 'Next.js'] },
  { label: 'Styling & Motion', items: ['Tailwind CSS', 'GSAP', 'Material UI', 'Bootstrap'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
  { label: 'Testing', items: ['Jest', 'React Testing Library', 'Jasmine', 'Karma'] },
  { label: 'Tools & Platforms', items: ['Git', 'GitHub', 'Vercel', 'Firebase', 'Mixpanel', 'CleverTap'] },
]

export const marqueeWords: string[] = [
  'React', 'TypeScript', 'GSAP', 'Angular', 'Next.js', 'Node.js', 'Tailwind', 'UX Engineering',
]
