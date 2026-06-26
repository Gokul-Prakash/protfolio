export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');

export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(date);
