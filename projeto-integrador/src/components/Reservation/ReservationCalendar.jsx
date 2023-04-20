import { useState } from 'react';

import { CustomCalendar } from '../Calendar/CustomCalendar';

export function ReservationCalendar() {
  const [dateRange, setDateRange] = useState([]);
  const [isRangeSelected, setIsRangeSelected] = useState(false);

  const handleRangeSelect = (date) => {
    if (!isRangeSelected) {
      setIsRangeSelected(true);
    }
    setDateRange([...dateRange, date]);
  };

  const disableRangeSelection = ({ activeStartDate, date, view }) => {
    if (isRangeSelected && view === 'month') {
      const [startDate, endDate] = dateRange;
      if (startDate && !endDate) {
        return date <= startDate || date > new Date();
      } else if (endDate && !startDate) {
        return date >= endDate || date < activeStartDate;
      } else if (startDate && endDate) {
        return date < startDate || date > endDate;
      }
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-md shadow-md">
        <div className="flex flex-col items-center p-8 gap-6">
          <h1 className="text-2xl font-bold text-dark-purple w-full text-start">
            Selecione sua data de reserva
          </h1>
          <hr className="h-px w-full bg-slate-400 border-0 mx-4" />
          <div className="hidden  md:block">
            <CustomCalendar showDoubleView={true} />
          </div>
          <div className="block  md:hidden">
            <CustomCalendar showDoubleView={false} />
          </div>
        </div>
      </div>
    </>
  );
}
