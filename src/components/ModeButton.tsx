import React from 'react';

export type ModeButtonProps = {
    isCurrent: boolean;
    text: string;
    clickHandler: () => void;
};

export const ModeButton: React.FC<ModeButtonProps> = ({
    text,
    isCurrent,
    clickHandler,
}) => {
    return (
        <button
            className={`text-base cursor-pointer ${
                isCurrent && 'font-bold text-xl'
            }}`}
            onClick={clickHandler}
        >
            {text}
        </button>
    );
};
