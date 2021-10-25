import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerComponent {
  startDate?: Date;
  dateFormat: string;
  setStartDate: (date: Date) => void;
  isRequired?: boolean;
}
export function DatePickerComponent({
  dateFormat,
  startDate,
  setStartDate,
  isRequired = false,
}: IDatePickerComponent) {
  return (
    <DatePicker
      selected={startDate}
      onChange={setStartDate}
      dateFormat={dateFormat}
      showMonthYearPicker
      required={isRequired}
    />
  );
}
