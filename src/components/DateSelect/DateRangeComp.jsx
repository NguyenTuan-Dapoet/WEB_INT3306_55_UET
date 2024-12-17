
import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "./SelectDateComp.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../../Redux/tripSlice";

const DateRangeComp = () => {
  const dispatch = useDispatch();

  // State cho khoảng ngày
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // State để hiển thị trên input
  const [open, setOpen] = useState(false);
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

    // Cập nhật state range
    setRange([selectedRange]);

    // Dispatch vào Redux store
    dispatch(setStartDate(format(selectedRange.startDate, "dd/MM/yyyy")));
    dispatch(setEndDate(format(selectedRange.endDate, "dd/MM/yyyy")));
  };

  // Hàm toggle đóng/mở lịch
  const toggleCalendar = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(range[0].endDate, "dd/MM/yyyy")}`}
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
