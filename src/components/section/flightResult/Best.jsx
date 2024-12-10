import React, { useState } from "react";
import { FlightResultCard } from "../../../screens/FlightSearch/index";
import "./Best.css";

export function Best({ data, resultType = "result(s)" }) {
    const maxResultPerPage = 4;
    const [shownTill, setShownTill] = useState(
        data.length < maxResultPerPage ? data.length : maxResultPerPage
    );

    return (
        <div className="best-container">
            <div className="best-header">
                <p>
                    Showing {shownTill} of{" "}
                    <span className="highlight-text">
                        {data.length} {resultType}
                    </span>
                </p>
            </div>

            <div className="card-grid">
                {data.slice(0, shownTill).map((item) => (
                    <FlightResultCard
                        key={item._id}
                        image={{ src: "/path/to/emirates-logo.png", alt: "Emirates" }}
                        liked={false}
                        data={item}
                    />
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
