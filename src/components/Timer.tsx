import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { StartButton } from './StartButton';

export type ModeButtonProps = {
    text: string;
};

export const ModeButton: React.FC<ModeButtonProps> = ({ text }) => {
    return <button className="text-base cursor-pointer">{text}</button>;
};

export const convertTime = (initialSeconds = 14) => {
    if (initialSeconds < 10) {
        return `0${initialSeconds}`;
    }
    return `${initialSeconds}`;
};

export const Timer = () => {
    const INITIAL_SECONDS = 20;

    const { timeLeft, startInterval, resetInterval, stopInterval } =
        useInterval(INITIAL_SECONDS);
    const convetredSeconds = convertTime(timeLeft);

    const [startPressed, setStartPressed] = useState(false);

    const startClickHandler = () => {
        setStartPressed((prev) => !prev);
        if (startPressed) {
            stopInterval();
        } else {
            startInterval();
        }
    };

    const resetClickHandler = () => {
        setStartPressed(false);
        resetInterval();
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8 py-4 px-16 text-white rounded bg-green-500">
            <div className="flex justify-around items-center gap-3">
                <ModeButton text="Pomodoro" />
                <ModeButton text="Short break" />
                <ModeButton text="Long break" />
            </div>
            <div>
                <h1 className="text-center text-8xl font-bold">
                    00:{convetredSeconds}
                </h1>
            </div>
            <div className="w-full flex justify-center items-center gap-4">
                <StartButton
                    text={startPressed ? 'Stop' : 'Start'}
                    isPressed={startPressed}
                    onClick={startClickHandler}
                />
                <StartButton text="Reset" onClick={resetClickHandler} />
            </div>
        </div>
    );
};
