import React, { useState } from 'react'
// import { useSelector, useDispatch } from "react-redux";
import "./FlightFilter.css"
import Dropdown from "../../../components/ui/Dropdown"
import Slider from "../../../components/ui/Slider"
import FilterRating from "../../../components/ui/FilterRating"
import Checkbox from "../../../components/ui/Checkbox";

export const FlightFilter = () => {

    const handleCheckboxChange = (checked, category, name) => {
        console.log(`Checkbox ${name} in category ${category} is now ${checked ? 'checked' : 'unchecked'}`);
        // Add your logic here to handle the checkbox change
    };
    const [open, setOpen] = useState(false);
    // const dispatch = useDispatch();
    // const flightFilterState = useSelector((state) => state.flightFilter);
    // const handleValueChange = (values) => {
    //     console.log("Slider values:", values);
    // };

    const airlines = ["Emirates", "Fly-Dubai", "Qatar", "Etihad"];
    return (
        <section className="flight-filter-container">
            <div className="flight-filter-title">
                {/* them button de khi screen < 1024 -> collapse and open filter */}
                <button className='flight-filter-button'>
                    <h2>Filter</h2>
                </button>

                <button className='flight-filter-resset-button'>
                    Reset
                </button>
            </div>

            <div className='flight-filter-detail'>
                <div>
                    {/* change price */}
                    <Dropdown title="Price" open={true}>
                        <div className="flight-filter-detail-slider">
                            <Slider
                                min={200}
                                max={1000}
                                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                            />
                        </div>
                    </Dropdown>

                    <Dropdown title="Departure Time" open={true}>
                        <div className="flight-filter-detail-slider">
                            <Slider
                                min={0}
                                max={1000}
                                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                            />
                        </div>
                    </Dropdown>

                    <Dropdown title="Rating" open={true}>
                        <FilterRating
                            // value={flightFilterState.rate}
                            value={1}
                            setValue={(rate) => {
                                console.log(rate);
                                // dispatch(setFlightFormFilters({ rate }));
                            }}
                            className="rating-filter"
                        />
                    </Dropdown>

                    <Dropdown title="Airlines" open={true}>
                        <div className="d-flex flex-column gap-3">
                            {airlines.map((name) => {
                                const IDfyName = name.split(" ").join("").toLowerCase(); // Tạo ID duy nhất từ tên hãng
                                return (
                                    <Checkbox
                                        key={name}
                                        onChange={(e) =>
                                            handleCheckboxChange(e.target.checked, "airlines", IDfyName)
                                        }
                                        name={IDfyName}
                                        id={IDfyName}
                                        label={name}
                                        // checked={flightFilterState.airlines.includes(IDfyName)}
                                        checked={false}
                                    />
                                );
                            })}
                        </div>
                    </Dropdown>

                    <Dropdown title="Trips" open={true}>
                        <div className="checkbox-group">
                            {[
                                "Round trip",
                                "One-Way",
                                "Multi-City",
                                "My Dates Are Flexible",
                            ].map((name) => {
                                const IDfyName = name.split(" ").join("").toLowerCase();

                                return (
                                    <Checkbox
                                        key={name}
                                        onChange={(checked) => handleCheckboxChange(checked, "trips", IDfyName)}
                                        name={IDfyName}
                                        id={IDfyName}
                                        label={name}
                                        // defaultChecked={flightFilterState.trips.includes(IDfyName)}
                                        checked={false}
                                    />
                                );
                            })}
                        </div>
                    </Dropdown>

                    <div className='flight-filter-button'>
                        <button
                            onClick={() => {
                                // setFilter(!filter);
                                // handleFilterApply();
                            }}
                            className={"bg-primary"}
                        >
                            Apply
                        </button>
                    </div>


                    {/* 
                        
                    
                    <div className={"flex justify-end py-4 w-full"}>
                        <Button
                            onClick={() => {
                                setFilter(!filter);
                                handleFilterApply();
                            }}
                            className={"bg-primary"}
                        >
                            Apply
                        </Button>
                    </div> */}
                </div>
            </div>
        </section >
    )
}