import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import { setCheckInDate, setCheckOutDate } from "../../Redux/staySlice";
import { setStartDate, setEndDate } from "../../Redux/tripSlice";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComp = ({ type, placeholder = "Pick a date" }) => {
  const [calendar, setCalendar] = useState("");
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setCalendar(format(new Date(), "dd/MM/yyyy"));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") setOpen(false);
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    const formattedDate = format(date, "dd/MM/yyyy");
    setCalendar(formattedDate);

    // Dispatch hành động tùy thuộc vào `type`
    if (type === "stayCheckIn") {
      dispatch(setCheckInDate(formattedDate));
    } else if (type === "stayCheckOut") {
      dispatch(setCheckOutDate(formattedDate));
    } else if (type === "tripStart") {
      dispatch(setStartDate(formattedDate));
    } else if (type === "tripEnd") {
      dispatch(setEndDate(formattedDate));
    }

    setOpen(false);
  };

  return (
    <div className="calendarWrap">
      <input
        value={calendar}
        readOnly
        className="inputBox"
        placeholder={placeholder}
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
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
    </div>
  );
};

export default CalendarComp;
