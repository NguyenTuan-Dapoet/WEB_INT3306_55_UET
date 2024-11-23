import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../../Redux/tripSlice"; // Import action
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DateRangeComp.css";

const DateRangeComp = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
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

  const handleDateChange = (item) => {
    const selectedRange = item.selection;
    setRange([selectedRange]);
    dispatch(setStartDate(format(selectedRange.startDate, "dd/MM/yyyy"))); // Lưu ngày bắt đầu
    dispatch(setEndDate(format(selectedRange.endDate, "dd/MM/yyyy"))); // Lưu ngày kết thúc
  };

  let startDate = format(range[0].startDate, "dd/MM/yyyy");
  let endDate = format(range[0].endDate, "dd/MM/yyyy");

  return (
    <div className="calendarWrap">
      <input
        value={`${startDate} - ${endDate}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen(!open)}
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={handleDateChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;
