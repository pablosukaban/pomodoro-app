import React, { useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { convertTime } from '../utils/convertTime';
import { initialModesList, usePomodoroMode } from '../hooks/usePomodoroMode';
import { Timer } from './Timer';
import { ModeButton } from './ModeButton';
import { SettingsModal } from './SettingsModal';

export const PomodoroPanel = () => {
    const [startPressed, setStartPressed] = useState(false);
    const [settingsWindowOpened, setSettingsWindowOpened] = useState(false);
    const [modesListState, setModesListState] = useState(initialModesList);

    const { currentMode, nextMode, setNeededMode } =
        usePomodoroMode(modesListState);

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

    const changeTimeHandler = (p: string, s: string, l: string) => {
        const newModesList = [
            {
                id: 1,
                type: 'work',
                // seconds: 1500,
                title: 'Время работать!',
                seconds: +p * 60,
                panel_bg: 'bg-green-600',
                app_bg: 'bg-green-500',
                app_color: 'text-green-500',
            },

            {
                id: 2,
                type: 'short_break',
                title: 'Время отдыхать!',
                seconds: +s * 60,
                panel_bg: 'bg-blue-600',
                app_bg: 'bg-blue-500',
                app_color: 'text-blue-500',
            },

            {
                id: 3,
                type: 'long_break',
                title: 'Время конкретно отдыхать!',
                seconds: +l * 60,
                panel_bg: 'bg-indigo-600',
                app_bg: 'bg-indigo-500',
                app_color: 'text-indigo-500',
            },
        ];
        setSettingsWindowOpened(false);
        setModesListState(newModesList);
    };

    return (
        <div
            className={`min-h-screen flex justify-center items-center relative ${currentMode.panel_bg}`}
        >
            <div
                className={`flex flex-col justify-center items-center gap-8 py-4 px-16 text-white rounded ${currentMode.app_bg}`}
            >
                <SettingsModal
                    visible={settingsWindowOpened}
                    changeTimeHandler={changeTimeHandler}
                />
                <button
                    className="absolute top-10 right-10"
                    onClick={() => setSettingsWindowOpened((prev) => !prev)}
                >
                    Settings
                </button>
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
