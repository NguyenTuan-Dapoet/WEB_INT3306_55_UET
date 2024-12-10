import React, { useState } from "react";
import { FlightResultCard } from "../../../screens/FlightSearch/index.js";
import "./Cheapest.css";

export function Cheapest({ data, resultType = "result(s)" }) {
    const maxResultPerPage = 4;
    const [shownTill, setShownTill] = useState(
        data.length < maxResultPerPage ? data.length : maxResultPerPage
    );

    return (
        <div className="cheapest-container">
            <div className="cheapest-header">
                <p>
                    Showing {shownTill} of{" "}
                    <span className="highlight-text">
                        {data.length} {resultType}
                    </span>
                </p>
            </div>

            <div className="cheapest-card-grid">
                {data.slice(0, shownTill).map((item) => (
                    <FlightResultCard key={item._id} data={item} />
                ))}
            </div>

            {shownTill < data.length && (
                <button
                    className="show-more-btn"
                    onClick={() =>
                        setShownTill(Math.min(shownTill + maxResultPerPage, data.length))
                    }
                >
                    Show more results
                </button>
            )}
        </div>
    );
}
