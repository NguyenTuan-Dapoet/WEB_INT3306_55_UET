import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./SelectDateComp.css";
import { useDispatch } from "react-redux";
import { setStartDate } from "../../Redux/tripSlice"; 

const CalendarComp = ({}) => {

  const dispatch = useDispatch();

  const [calendar, setCalendar] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate_state] = useState(null);
  const refOne = useRef(null);

  useEffect(() => {
    setCalendar(format(new Date(), "dd/MM/yyyy"));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);

    // Xóa bỏ event listener khi component không còn cần thiết
    return () => {
      document.removeEventListener("keydown", hideOnEscape, true);
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") setOpen(false);
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (selectedDate) => {
    const formattedDate = format(selectedDate, "dd/MM/yyyy");
    setCalendar(formattedDate);
    setSelectedDate_state(formattedDate); // Lưu ngày đã chọn

    dispatch(setStartDate(formattedDate));
    setOpen(false);  // Đóng calendar sau khi chọn ngày
  };

  const toggleCalendar = () => {
    setOpen((prevState) => !prevState);  // Toggle trạng thái của calendar
  };

  return (
    <div className="calendarWrap" ref={refOne}>
      <input
        value={calendar}
        readOnly
        className="inputBox"
        onClick={toggleCalendar}  // Toggle trạng thái khi bấm vào input
      />
      {open && (
        <Calendar
          editableDateInputs={true}
          months={1}
          onChange={handleSelect}
          direction="horizontal"
          className="calendarElement"
        />
      )}
    </div>
  );
};

export default CalendarComp;
