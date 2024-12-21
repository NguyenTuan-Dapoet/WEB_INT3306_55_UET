import React from "react";

export const formatDateTime = (departureTime) => {
    const dateObject = new Date(departureTime);

    // Định dạng ngày (e.g., "Dec 01, 2024")
    const optionsDate = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = dateObject.toLocaleDateString("en-US", optionsDate);

    // Định dạng giờ (e.g., "6:00 AM")
    const optionsTime = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedTime = dateObject.toLocaleTimeString("en-US", optionsTime);

    return { formattedDate, formattedTime };
};

export const DateTimeComponent = ({ departureTime }) => {
    const { formattedDate, formattedTime } = formatDateTime(departureTime);

    return (
        <div className="date-time">
            <p>{formattedDate}</p> {/* Hiển thị ngày */}
            <span>{formattedTime}</span> {/* Hiển thị giờ */}
        </div>
    );
};

export const convertToDateInputFormat = (date) => {
    if (!date || typeof date !== 'string') {
        console.error("Invalid date input:", date);
        return "";
    }

    const [day, month, year] = date.split('/');

    if (!day || !month || !year) {
        console.error("Incomplete date format:", date);
        return "";
    }

    // Trả về chuỗi theo định dạng yyyy-MM-dd
    return `${year}-${month}-${day}`;
};

export const covertDateTimeFromDB = (string) => {
    const departureTime = string;
    const [datePart, timePart] = departureTime.split("T");

    // Xử lý Date
    const [year, month, day] = datePart.split("-");
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;

    // Xử lý Time
    const time = timePart.substring(0, 5); // Chỉ lấy giờ và phút
    console.log(date, time);
    return { date, time }
}