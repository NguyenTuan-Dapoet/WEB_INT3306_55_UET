import React from "react";
import "./FilterRating.css";
import { ToggleGroup, ToggleGroupItem } from './Toggle';

const FilterRating = ({ className, value, setValue }) => {
    // Hàm xử lý khi giá trị toggle thay đổi
    const handleToggleChange = (selectedValues) => {
        setValue(selectedValues);
    };

    return (
        <ToggleGroup
            className={`filter-rating ${className}`}
            value={value}
            onValueChange={handleToggleChange}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <ToggleGroupItem
                    key={star}
                    value={String(star)}
                    className={Array.isArray(value) && value.includes(String(star)) ? "active" : ""}
                    aria-label={`Toggle ${star} star`}
                >
                    +{star}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}

export default FilterRating
