import React, { useCallback, useEffect, useRef, useState } from 'react';

export type ModeButtonProps = {
    text: string;
};

export const ModeButton: React.FC<ModeButtonProps> = ({ text }) => {
    return <button className="text-base cursor-pointer">{text}</button>;
};

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

export const useInterval = (
    callBack = () => console.log('on done'),
    initialTime = 10,
    delay = 1000
) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalref = useRef(0);

    useEffect(() => {
        return () => {
            console.log('cleaner function');
            clearInterval(intervalref.current);
        };
    }, []);

    const startInterval = () => {
        console.log('start interval func executed');
        intervalref.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 0) {
                    callBack();
                    clearInterval(intervalref.current);
                    return 0;
                }
                return prev - 1;
            });
        }, delay);
    };

    const stopInterval = () => {
        if (!intervalref.current) return;
        clearInterval(intervalref.current);
    };

    const resetInterval = () => {
        stopInterval();
        intervalref.current = 0;
        setTimeLeft(initialTime);
    };

    return { timeLeft, startInterval, stopInterval, resetInterval };
};

export const Timer = () => {
    const { timeLeft, startInterval, resetInterval, stopInterval } =
        useInterval();
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
                    00:{timeLeft}
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
