const years = ['2024', '2025', '2026'] as const;

export const match = (param: string) => years.find((year) => year === param);
