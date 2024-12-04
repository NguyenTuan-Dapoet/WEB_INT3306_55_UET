import React, { useState } from "react";
import { CheckboxCustom } from "./CheckboxCustom";
import "./Checkbox.css"; // Import file CSS

const Checkbox = ({ className, error, id, name, label, ...props }) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <div
            className={`checkbox-container ${error ? "checkbox-error" : ""} ${className || ""
                }`}
        >
            {/* Hidden input để xử lý form */}
            <input type="hidden" value={checked ? "on" : ""} name={name} />
            <CheckboxCustom
                id={id}
                checked={checked}
                onChange={handleCheckboxChange}
                className="checkbox-input"
                {...props}
            />
            {label && (
                <label htmlFor={id} className="checkbox-label">
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
