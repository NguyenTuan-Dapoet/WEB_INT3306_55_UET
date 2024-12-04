import React, { useState } from "react";
import { Check } from "lucide-react";
import "./CheckboxCustom.css";

const CheckboxCustom = React.forwardRef(
    ({ className, defaultChecked, disabled, ...props }, ref) => {
        const [isChecked, setIsChecked] = useState(defaultChecked || false);

        const handleToggle = () => {
            if (!disabled) {
                setIsChecked(!isChecked); // Thay đổi trạng thái bật/tắt
            }
        };

        return (
            <div
                ref={ref}
                role="checkbox"
                aria-checked={isChecked}
                className={`checkbox ${isChecked ? "checked" : ""} ${className}`}
                tabIndex={0}
                onClick={handleToggle}
                onKeyPress={(e) => e.key === "Enter" && handleToggle()} // Hỗ trợ bật/tắt bằng phím Enter
                {...props}
            >
                {isChecked && (
                    <div className="checkbox-indicator">
                        <Check size={17} />
                    </div>
                )}
            </div>
        );
    }
);

CheckboxCustom.displayName = "CheckboxCustom";

export { CheckboxCustom };
