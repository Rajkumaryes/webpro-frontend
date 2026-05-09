import React, { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

export default function CustomDatePicker({ value, onChange, isSubmit, days = 7 }) {
  const today = new Date();

  // Min date = dynamic days before today
  const minDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - days); // dynamic from DB
    d.setHours(0, 0, 0, 0);
    return d;
  }, [today, days]);

  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setHours(23, 59, 59, 999);
    return d;
  }, [today]);

  const filterDate = (date) => date >= minDate && date <= maxDate;

  return (
    <DatePicker
      selected={value ? new Date(value) : null}
      onChange={onChange}
      showTimeInput
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy hh:mm aa"
      minDate={minDate}
      maxDate={maxDate}
      filterDate={filterDate}
      placeholderText="mm/dd/yyyy hh:mm AM/PM"
      calendarClassName="custom-calendar"
    />
  );
}
