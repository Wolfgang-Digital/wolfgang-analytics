import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';

import { getEntries, getCurrentTab } from '../slice';
import { enquiryColumns, propsalColumns, moneyColumns } from './utils';

export const usePipelineTable = () => {
  const entries = useSelector(getEntries);
  const tab = useSelector(getCurrentTab);

  const columns: any = useMemo(() => {
    return tab === 'ENQUIRY' ? enquiryColumns : tab === 'PROPOSAL' ? propsalColumns : moneyColumns;
  }, [tab]);

  const table = useTable({ columns, data: entries }, useSortBy);
  return table;
};
