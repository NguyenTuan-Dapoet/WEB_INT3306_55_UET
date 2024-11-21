import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";

// Import định dạng ngày từ thư viện date-fns
import format from "date-fns/format";
import { addDays } from "date-fns";

// Import các file CSS cần thiết
import "react-date-range/dist/styles.css"; // CSS mặc định
import "react-date-range/dist/theme/default.css"; // CSS theme
import "./DateRangeComp.css"; // CSS tùy chỉnh

const DateRangeComp = () => {
  // State quản lý ngày bắt đầu và ngày kết thúc
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // State để kiểm soát việc mở/đóng lịch
  const [open, setOpen] = useState(false);

  // Sử dụng useRef để tham chiếu đến thành phần lịch
  const refOne = useRef(null);

  // Thêm sự kiện ẩn lịch khi nhấn ngoài vùng lịch hoặc phím ESC
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // Hàm ẩn lịch khi nhấn phím ESC
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hàm ẩn lịch khi nhấn ra ngoài
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  let startDate = format(range[0].startDate, "dd/MM/yyyy");
  let endDate = format(range[0].endDate,"dd/MM/yyyy");
  return (
    <div className="calendarWrap">
      {/* Hộp input để hiển thị khoảng ngày được chọn */}
      <input
        value={`${startDate} - ${endDate}`} // Hiển thị ngày bắt đầu và ngày kết thúc
        readOnly
        className="inputBox"
        onClick={() => setOpen(!open)}
        />

      {/* Vùng chứa lịch */}
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])} // Cập nhật state khi người dùng chọn ngày
            editableDateInputs={true} // Cho phép chỉnh sửa ngày bằng cách nhập
            moveRangeOnFirstSelection={false} // Không tự động di chuyển dải ngày khi chọn
            ranges={range} // Giá trị dải ngày
            months={1} // Hiển thị 1 tháng
            direction="horizontal" // Hiển thị lịch ngang
            className="calendarElement" // Áp dụng CSS tùy chỉnh
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;
