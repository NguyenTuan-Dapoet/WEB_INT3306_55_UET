import React, { useState, useContext } from 'react';

// Context để chia sẻ giá trị cho ToggleGroup
const ToggleGroupContext = React.createContext({
    size: 'default',
    variant: 'default',
});

// ToggleGroup component
const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
    return (
        <div ref={ref} className={`d-flex align-items-center justify-content-center gap-1 ${className}`} {...props}>
            <ToggleGroupContext.Provider value={{ variant, size }}>
                {children}
            </ToggleGroupContext.Provider>
        </div>
    );
});

ToggleGroup.displayName = "ToggleGroup";

// ToggleGroupItem component
const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
    const context = useContext(ToggleGroupContext);
    const [isSelected, setIsSelected] = useState(false);

    const handleToggle = () => {
        setIsSelected((prev) => !prev);
    };

    // Lựa chọn lớp của variant và size từ context hoặc props
    const variantClass = variant || context.variant || 'primary';
    const sizeClass = size || context.size || 'lg';

    // Bootstrap button classes cho toggle items
    const buttonClasses = `btn btn-${variantClass} btn-${sizeClass} ${isSelected ? 'active' : ''} ${className}`;

    return (
        <button
            ref={ref}
            className={buttonClasses}
            onClick={handleToggle}
            {...props}
        >
            {children}
        </button>
    );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

// Export các component
export { ToggleGroup, ToggleGroupItem };
