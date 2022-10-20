import React from 'react';
import { StartButton } from './StartButton';

export type TimerProps = {
    seconds: string;
    minutes: string;
    app_color: string;
    startPressed: boolean;
    onStartClick: () => void;
    onResetClick: () => void;
};

export const Timer: React.FC<TimerProps> = ({
    seconds,
    minutes,
    app_color,
    startPressed,
    onStartClick,
    onResetClick,
}) => {
    const startClickHandler = () => {
        onStartClick();
    };

    const resetClickHandler = () => {
        onResetClick();
    };

    return (
        <>
            <div>
                <h1 className="text-center text-8xl font-bold">
                    {minutes}:{seconds}
                </h1>
            </div>
            <div className="w-full flex justify-center items-center gap-4">
                <StartButton
                    text={startPressed ? 'Stop' : 'Start'}
                    app_color={app_color}
                    isPressed={startPressed}
                    onClick={startClickHandler}
                />
                <StartButton
                    text="Reset"
                    onClick={resetClickHandler}
                    app_color={app_color}
                />
            </div>
        </>
    );
};
