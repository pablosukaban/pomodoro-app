import React, { useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { convertTime } from '../utils/convertTime';
import { initialModesList, usePomodoroMode } from '../hooks/usePomodoroMode';
import { Timer } from './Timer';
import { ModeButton } from './ModeButton';
import { SettingsModal } from './SettingsModal';

export const PomodoroPanel = () => {
    const [startPressed, setStartPressed] = useState(false);

    const { currentMode, nextMode, setNeededMode } =
        usePomodoroMode(initialModesList);

    const timeOut = () => {
        nextMode();
        resetInterval();
        startInterval();
    };

    const { timeLeft, startInterval, resetInterval, stopInterval } =
        useInterval(currentMode.seconds, timeOut);

    const { seconds: convetredSeconds, minutes: convertetMinutes } =
        convertTime(timeLeft);

    const onStartClick = () => {
        if (startPressed) {
            stopInterval();
            setStartPressed(false);
        } else {
            startInterval();
            setStartPressed(true);
        }
    };

    const onResetClick = () => {
        resetInterval();
        setStartPressed(false);
    };

    return (
        <div
            className={`min-h-screen flex justify-center items-center relative ${currentMode.panel_bg}`}
        >
            <div
                className={`flex flex-col justify-center items-center gap-8 py-4 px-16 text-white rounded ${currentMode.app_bg}`}
            >
                <div className="flex justify-around items-center gap-3">
                    <ModeButton
                        isCurrent={currentMode.id === 1}
                        text="Pomodoro"
                        clickHandler={() => setNeededMode(1)}
                    />
                    <ModeButton
                        isCurrent={currentMode.id === 2}
                        text="Short break"
                        clickHandler={() => setNeededMode(2)}
                    />
                    <ModeButton
                        isCurrent={currentMode.id === 3}
                        text="Long break"
                        clickHandler={() => setNeededMode(3)}
                    />
                </div>

                <h1 className={`text-xl`}>{currentMode.title}</h1>

                <Timer
                    app_color={currentMode.app_color}
                    startPressed={startPressed}
                    minutes={convertetMinutes}
                    seconds={convetredSeconds}
                    onStartClick={onStartClick}
                    onResetClick={onResetClick}
                />
            </div>
        </div>
    );
};
