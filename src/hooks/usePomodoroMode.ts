import { useState } from 'react';

export const initialModesList: PomodoroModeType[] = [
    {
        id: 1,
        type: 'work',
        // seconds: 1500,
        title: 'Время работать!',
        seconds: 25 * 60,
        panel_bg: 'bg-green-600',
        app_bg: 'bg-green-500',
        app_color: 'text-green-500',
    },

    {
        id: 2,
        type: 'short_break',
        title: 'Время отдыхать!',
        seconds: 5 * 60,
        panel_bg: 'bg-blue-600',
        app_bg: 'bg-blue-500',
        app_color: 'text-blue-500',
    },

    {
        id: 3,
        type: 'long_break',
        title: 'Время конкретно отдыхать!',
        seconds: 15 * 60,
        panel_bg: 'bg-indigo-600',
        app_bg: 'bg-indigo-500',
        app_color: 'text-indigo-500',
    },
];

export type PomodoroModeType = {
    id: number;
    type: string;
    title: string;
    seconds: number;
    app_bg: string;
    panel_bg: string;
    app_color: string;
};

export const usePomodoroMode = (modesList: PomodoroModeType[]) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextMode = () => {
        setCurrentStep((prev) => {
            if (prev === modesList.length - 1) return 0;
            return prev + 1;
        });
    };

    const setNeededMode = (modeId: number) => {
        const foundMode = modesList.find((mode) => mode.id === modeId);
        if (!foundMode) return;
        setCurrentStep(modesList.indexOf(foundMode));
    };

    return { currentMode: modesList[currentStep], nextMode, setNeededMode };
};
