import React, { useState } from "react";
import { Cheapest } from "../../../components/section/flightResult/Cheapest";
import { Best } from "../../../components/section/flightResult/Best";
import { Quickest } from "../../../components/section/flightResult/Quickest";

import "./FlightResult.css";

// dùng để chuyển đổi thời gian từ phút sang định dạng giờ phút
const minutesToHMFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
};

// dùng để trừ thời gian bắt đầu từ thời gian kết thúc
const substractTimeInMins = (endTime, startTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return Math.abs((end - start) / 60000);
};

// Component hiển thị kết quả tìm kiếm chuyến bay theo từng tab (Cheapest, Best, Quickest)
export function FlightResult({ flightResults }) {
    const [activeTab, setActiveTab] = useState("cheapest");

    const sortByCheapest = flightResults.slice(0).sort((a, b) => {
        return +a.price - +b.price;
    });

    const sortByBest = flightResults.slice(0).sort((a, b) => {
        const aMinutes = substractTimeInMins(
            a.destinationArrivalDateTime,
            a.departureDateTime
        );
        const bMinutes = substractTimeInMins(
            b.destinationArrivalDateTime,
            b.departureDateTime
        );
        return (
            parseFloat(a.price) + aMinutes - (parseFloat(b.price) + bMinutes)
        );
    });

    const sortByQuickest = [...flightResults].sort((a, b) => {
        const aMinutes = substractTimeInMins(
            a.destinationArrivalDateTime,
            a.departureDateTime
        );
        const bMinutes = substractTimeInMins(
            b.destinationArrivalDateTime,
            b.departureDateTime
        );
        return aMinutes - bMinutes;
    });

    return (
        <div className="flight-result-container">
            <div className="tabs">
                <button
                    className={`tab-item ${activeTab === "cheapest" ? "active" : ""}`}
                    onClick={() => setActiveTab("cheapest")}
                >
                    <p className="tab-title">Cheapest</p>
                    <p className="tab-subtitle">${sortByCheapest[0]?.price}</p>
                </button>
                <button
                    className={`tab-item ${activeTab === "recommended" ? "active" : ""}`}
                    onClick={() => setActiveTab("recommended")}
                >
                    <p className="tab-title">Recommended</p>
                    <p className="tab-subtitle">
                        ${sortByBest[0]?.price} •{" "}
                        {minutesToHMFormat(
                            substractTimeInMins(
                                sortByBest[0]?.destinationArrivalDateTime,
                                sortByBest[0]?.departureDateTime
                            )
                        )}
                    </p>
                </button>
                <button
                    className={`tab-item ${activeTab === "quickest" ? "active" : ""}`}
                    onClick={() => setActiveTab("quickest")}
                >
                    <p className="tab-title">Quickest</p>
                    <p className="tab-subtitle">
                        {minutesToHMFormat(
                            substractTimeInMins(
                                sortByQuickest[0]?.destinationArrivalDateTime,
                                sortByQuickest[0]?.departureDateTime
                            )
                        )}
                    </p>
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === "cheapest" && <Cheapest data={sortByCheapest} />}
                {activeTab === "recommended" && <Best data={sortByBest} />}
                {activeTab === "quickest" && <Quickest data={sortByQuickest} />}
            </div>
        </div>
    );
}