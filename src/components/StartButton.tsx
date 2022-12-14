import React from 'react';

export type StartButtonProps = {
    text: string;
    app_color: string;
    isPressed?: boolean;
    onClick: () => void;
};

export const StartButton: React.FC<StartButtonProps> = ({
    text,
    app_color,
    onClick,
    isPressed,
}) => {
    return (
        <button
            className={`${app_color} bg-white rounded w-3/4 py-4 transition-all active:translate-y-0.5 active:border-none ${
                isPressed
                    ? 'translate-y-0.5 border-none '
                    : 'border-b-[6px] border-b-gray-300 '
            }`}
            onClick={onClick}
        >
            <span className="uppercase font-bold leading-tight text-xl">
                {text}
            </span>
        </button>
    );
};
