import React from "react";
import { Button } from "react-bootstrap"; // Sử dụng Bootstrap Button
import { LikeButton } from "../../../components/ui/LikeButton"; // Sử dụng component LikeButton
import airlineLogo from '../../../assets/emirates_logo.png';

import "./FlightResultCard.css";


const substractTimeInHour = (endTime, startTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return Math.abs((end - start) / (3600 * 1000));
};

// Component hiển thị thông tin chuyến bay
export function FlightResultCard({ data }) {
    const departureDate = new Date(data.departureDateTime);
    const arrivalDate = new Date(data.destinationArrivalDateTime);

    return (
        <div className="flight-card">
            <div className="image-container">
                <img
                    src={airlineLogo} // Bạn có thể thay đổi tên logo này theo hãng hàng không
                    alt={data.stopovers[0].airlineId.name}
                    className="img-fluid rounded-start"
                    width={300}
                    height={300}
                />
            </div>
            <div className="card-content">
                <div className="header">
                    <div className="rating">
                        <Button variant="outline" size="sm">
                            {`${data.rating}`}
                        </Button>
                        <span className="fw-bold">{data.ratingScale}</span>
                        <span>{data.totalReviews} reviews</span>
                    </div>
                    <div className="price-info">
                        <p>starting from</p>
                        {/* <p className="price">${parseInt(data.price.economy.base)}</p> */}
                        <p className="price">${parseInt(data.price.economy)}</p>
                    </div>
                </div>
                <div className="details">
                    <div className="departure-arrival">
                        <div className="min-h-18px mt-1 h-18px w-18px min-w-18px rounded-sm border-2 border-secondary/25"></div>
                        <div>
                            <p className="fs-5 fw-semibold">
                                {departureDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}{" "}
                                -{" "}
                                {arrivalDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                            <p className="text-muted">
                                {data.stopovers[0].airlineId.name} ({data.stopovers[0].airlineId.iataCode})
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="non-stop">non stop</p>
                    </div>
                    <div>
                        <p> {substractTimeInHour(data.departureDateTime, data.destinationArrivalDateTime)}h</p>
                        <p className="time">
                            {data.originAirportId.code}-{data.destinationAirportId.code}
                        </p>
                    </div>
                </div>
                <hr className="my-3" />
                <div className="button-group">
                    <LikeButton
                        variant="outline-secondary"
                        className="w-100"
                        liked={data.liked}
                    />
                    <Button variant="primary" className="w-100">
                        <a
                            href={"/flights/" + data._id}
                            className="text-white text-decoration-none"
                        >
                            View Deals
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}