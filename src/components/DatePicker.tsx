import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

interface Props {
  startDate?: Date
  endDate?: Date
  handleChange: (val: any) => void
}

const DatePicker: React.FC<Props> = ({
  startDate = new Date(),
  endDate = new Date(),
  handleChange
}) => {
  return (
    <DateRangePicker
      ranges={[{
        startDate,
        endDate
      }]}
      onChange={handleChange}
    />
  );
};

export default DatePicker;
