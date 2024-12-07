import React, { useState } from 'react';
import Select from 'react-select';
import { IoMdSwap } from "react-icons/io";
import CalendarComp from '../DateSelect/CalendarComp';
import DateTimeComp from '../DateSelect/DateRangeComp';
import PassengerClassSelect from '../PassengerClassSelect/PassengerClassSelect';
import './TestComposeTrip.css';
import { location_list } from "../../assets/frontend_assets/assets"; // Import location_list

import { useSelector, useDispatch } from 'react-redux';
import { setFrom, setTo } from '../../Redux/tripSlice';

export const TestComposeTrip = ({ formType }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.trip);

  // Khai báo state để lưu giá trị của select-from và select-to
  const [fromOption, setFromState] = useState(null); // option
  const [toOption, setToState] = useState(null); // option

  // Hàm xử lý swap (đổi chỗ)
  const handleSwap = () => {
    const tempOption = fromOption; // Lưu giữ giá trị ban đầu của fromOption
    setFromState(toOption);
    setToState(tempOption);

    const formatFromLocation = location_list.find(
      location => location.code === toOption.value
    );
    dispatch(setFrom(formatFromLocation));

    const formatToLocation = location_list.find(
      location => location.code === fromOption.value
    );
    dispatch(setTo(formatToLocation));

  };

  // Chuyển đổi location_list thành định dạng phù hợp cho react-select
  const locationOptions = location_list.map((location) => ({
    value: `${location.code}`,
    label: `${location.locationName} - ${location.airportName}`,
  }));

  // Tùy chỉnh styles cho Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none', // Loại bỏ viền
      boxShadow: 'none', // Loại bỏ shadow khi focus
      borderRadius: '8px', // Tùy chỉnh border-radius nếu cần
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none', // Ẩn mũi tên dropdown nếu muốn
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none', // Ẩn đường phân cách mũi tên dropdown
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px', // Tùy chỉnh border-radius của menu dropdown
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#e0e0e0' : 'white', // Tùy chỉnh màu nền khi chọn
      color: state.isSelected ? 'black' : 'gray', // Tùy chỉnh màu chữ khi chọn
    }),
  };

  const handleFromChange = (option) => {
    setFromState(option);

    const selectedLocation = location_list.find(
      (location) => location.code === option.value
    );
    dispatch(setFrom(selectedLocation));
  };

  const handleToChange = (option) => {
    setToState(option);

    const selectedLocation = location_list.find(
      (location) => location.code === option.value
    );
    dispatch(setTo(selectedLocation));
  };

  return (
    <div className="form-trip">
      <div className="input-form">
        {/* Chọn địa điểm Khởi hành */}
        <span className="input-form-from">
          <Select
            className="select-from"
            value={fromOption}
            onChange={handleFromChange}
            options={locationOptions}
            placeholder="Khởi hành"
            styles={customStyles}
          />

          {/* Hiển thị mã code từ Redux nếu có */}
          {formData.From.code && (
            <span className="code">
              <p>{formData.From.code}</p>
            </span>
          )}
        </span>

        {/* Nút đổi chỗ (swap) */}
        <button className="button-swap" onClick={handleSwap}>
          <IoMdSwap />
        </button>

        {/* Chọn địa điểm Điểm đến */}
        <span className="input-form-to">
          <Select
            className="select-to"
            value={toOption}
            onChange={handleToChange}
            options={locationOptions}
            placeholder="Điểm đến"
            styles={customStyles}
          />

          {/* Hiển thị mã code từ Redux nếu có */}
          {formData.To.code && (
            <span className="code">
              <p>{formData.To.code}</p>
            </span>
          )}
        </span>
      </div>

      {/* Chọn ngày */}
      <div className="date-container">
        {formType === "One-way" ? (
          <CalendarComp />
        ) : (
          <DateTimeComp />
        )}
      </div>

      {/* Chọn hành khách */}
      <div className="choose-passenger">
        <PassengerClassSelect />
      </div>
    </div>
  );
};

export default TestComposeTrip;
