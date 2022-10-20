import { useState } from 'react';

export const initialModesList: PomodoroModeType[] = [
    {
        type: 'work',
        // seconds: 1500,
        title: 'Время работать!',
        seconds: 5,
        panel_bg: 'bg-green-600',
        app_bg: 'bg-green-500',
    },

    {
        type: 'short_break',
        title: 'Время отдыхать!',
        seconds: 7,
        panel_bg: 'bg-blue-600',
        app_bg: 'bg-blue-500',
    },

    {
        type: 'long_break',
        title: 'Время конкретно отдыхать!',
        seconds: 9,
        panel_bg: 'bg-purple-600',
        app_bg: 'bg-purple-500',
    },
];

export type PomodoroModeType = {
    type: string;
    title: string;
    seconds: number;
    app_bg: string;
    panel_bg: string;
};

export const usePomodoroMode = (modesList: PomodoroModeType[]) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextMode = () => {
        console.log('next mode funct');

        setCurrentStep((prev) => {
            if (prev === modesList.length - 1) return 0;
            return prev + 1;
        });
    };

    return { currentMode: modesList[currentStep], nextMode };
};
