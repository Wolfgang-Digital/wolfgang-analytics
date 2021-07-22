import { useMemo } from 'react';

import { format, subMonths } from 'date-fns';

export const useMonths = (numMonths = 6) => {
  return useMemo(() => {
    const months = [];
    const today = new Date();
    months.push({ label: format(today, 'MMMM yyyy'), value: today });

    for (let i = 1; i < numMonths; i++) {
      const date = subMonths(today, i);
      months.push({ label: format(date, 'MMMM yyyy'), value: date });
    }
    return months;
  }, [numMonths]);
};

export const useNearbyMonths = (numMonths = 2) => {
  return useMemo(() => {
    const months = [];
    const today = new Date();

    for (let i = numMonths; i >= -numMonths; i--) {
      const date = subMonths(today, i);
      months.push({ label: format(date, 'MMMM yyyy'), value: date });
    }
    return months;
  }, [numMonths]);
};