import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { convertTime } from '../utils/convertTime';
import { StartButton } from './StartButton';

// TODO: Break, сделать таймер с кнопками независимыми , в него передавать время и мод (работа / короткий перервыв / длинный перерыв)

export type ModeButtonProps = {
    text: string;
};

export const ModeButton: React.FC<ModeButtonProps> = ({ text }) => {
    return <button className="text-base cursor-pointer">{text}</button>;
};

export type TimerProps = {
    seconds: string;
    minuets: string;
    onStartClick: (isPressed: boolean) => void;
    onResetClick: () => void;
};

export const Timer: React.FC<TimerProps> = ({
    seconds,
    minuets,
    onStartClick,
    onResetClick,
}) => {
    const [startPressed, setStartPressed] = useState(false);

    const startClickHandler = () => {
        setStartPressed((prev) => !prev);
        onStartClick(startPressed);
    };

    const resetClickHandler = () => {
        setStartPressed(false);
        onResetClick();
    };

    return (
        <>
            <div>
                <h1 className="text-center text-8xl font-bold">
                    {minuets}:{seconds}
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
        </>
    );
};

export const PomodoroPanel = () => {
    const INITIAL_SECONDS = 1500; // 25 min

    const { timeLeft, startInterval, resetInterval, stopInterval } =
        useInterval(INITIAL_SECONDS);
    const { seconds: convetredSeconds, minuets: convertetMinuets } =
        convertTime(timeLeft);

    const onStartClick = (isPressed: boolean) => {
        if (isPressed) {
            stopInterval();
        } else {
            startInterval();
        }
    };

    const onResetClick = () => {
        resetInterval();
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8 py-4 px-16 text-white rounded bg-green-500">
            <div className="flex justify-around items-center gap-3">
                <ModeButton text="Pomodoro" />
                <ModeButton text="Short break" />
                <ModeButton text="Long break" />
            </div>

            <Timer
                minuets={convertetMinuets}
                seconds={convetredSeconds}
                onStartClick={onStartClick}
                onResetClick={onResetClick}
            />
        </div>
    );
};
