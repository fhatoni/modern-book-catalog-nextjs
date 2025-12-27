import React, { ReactNode } from "react";

interface ControlBarProps {
    children: ReactNode;
}

const ControlBar: React.FC<ControlBarProps> = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between my-8 px-4 w-full">
            {children}
        </div>
    );
};

export default ControlBar;
