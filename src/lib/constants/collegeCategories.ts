export const COLLEGE_CATEGORIES = [
  {
    id: 'management',
    label: 'Management',
    description: 'MBA, BBA, and other management programs'
  },
  {
    id: 'engineering',
    label: 'Engineering',
    description: 'B.Tech, M.Tech, and other engineering programs'
  },
  {
    id: 'medical',
    label: 'Medical',
    description: 'MBBS, BDS, and other medical programs'
  }
] as const;

export type CollegeCategory = typeof COLLEGE_CATEGORIES[number];
