import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Slider.css";

const Slider = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const rangeRef = useRef(null);

    // Convert value to percentage
    const getPercent = useCallback(
        (value) => ((value - min) / (max - min)) * 100,
        [min, max]
    );

    // Update range styles when `minVal` changes
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (rangeRef.current) {
            rangeRef.current.style.left = `${minPercent}%`;
            rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Update range styles when `maxVal` changes
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (rangeRef.current) {
            rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Emit updated values to parent component
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div className="slider-container">
            {/* Left Thumb */}
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="slider-thumb thumb--left"
                style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
            />

            {/* Right Thumb */}
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="slider-thumb thumb--right"
            />

            {/* Track and Range */}
            <div className="slider">
                <div className="slider__track" />
                <div ref={rangeRef} className="slider__range" />
                <div className="slider__left-value">{minVal}</div>
                <div className="slider__right-value">{maxVal}</div>
            </div>
        </div>
    );
};

Slider.propTypes = {
    min: PropTypes.number.isRequired, // Giá trị tối thiểu
    max: PropTypes.number.isRequired, // Giá trị tối đa
    onChange: PropTypes.func.isRequired, // Hàm callback khi giá trị thay đổi
};

export default Slider;
