import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerComponent {
  startDate?: Date;
  dateFormat: string;
  setStartDate: (date: Date) => void;
}
export function DatePickerComponent({
  dateFormat,
  startDate,
  setStartDate,
}: IDatePickerComponent) {
  return (
    <DatePicker
      selected={startDate}
      onChange={setStartDate}
      dateFormat={dateFormat}
      showMonthYearPicker
    />
  );
}
