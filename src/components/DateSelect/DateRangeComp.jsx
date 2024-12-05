import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "./SelectDateComp.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./SelectDateComp.css";

import { useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../../Redux/tripSlice";

const DateRangeComp = () => {
  const dispatch = useDispatch();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate_state] = useState(format(range[0].startDate, "dd/MM/yyyy"));
  const [endDate, setEndDate_state] = useState(format(range[0].endDate, "dd/MM/yyyy"));
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);

    // Cleanup khi component unmount
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

  const handleDateChange = (item) => {
    const selectedRange = item.selection;
    setRange([selectedRange]);
    setStartDate(format(selectedRange.startDate, "dd/MM/yyyy"));
    setEndDate(format(selectedRange.endDate, "dd/MM/yyyy"));

    // Dispatch ngày vào Redux
    dispatch(setStartDate(format(selectedRange.startDate, "dd/MM/yyyy")));
    dispatch(setEndDate(format(selectedRange.endDate, "dd/MM/yyyy")));
  };

  // Hàm toggle (đóng/mở lịch)
  const toggleCalendar = () => {
    setOpen((prevOpen) => !prevOpen); // Đảo ngược trạng thái của 'open'
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${startDate} - ${endDate}`}
        readOnly
        className="inputBox"
        onClick={toggleCalendar} // Bấm vào ô input để đóng/mở lịch
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={handleDateChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;
