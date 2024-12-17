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
