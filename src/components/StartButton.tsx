import React from 'react';

export type StartButtonProps = {
    text: string;
    isPressed?: boolean;
    onClick: () => void;
};

export const StartButton: React.FC<StartButtonProps> = ({
    text,
    onClick,
    isPressed,
}) => {
    return (
        <button
            className={`text-green-500 bg-white rounded w-3/4 py-4 transition-all ${
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
