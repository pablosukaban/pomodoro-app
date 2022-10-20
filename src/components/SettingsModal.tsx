import React, { useRef } from 'react';
import { SettingsInput } from './SettingsInput';

export type OptionsType = {
    id: string;
    text: string;
    value: number;
    minValue?: number;
    maxValue?: number;
};

export type SettingsModalProps = {
    visible: boolean;
    closeHandler: () => void;
    changeTimeHandler: (a: string, b: string, c: string) => void;
};

export const SettingsModal: React.FC<SettingsModalProps> = ({
    visible,
    closeHandler,
    changeTimeHandler,
}) => {
    const pomodoroRef = useRef<HTMLInputElement>(null);
    const shortBreakRef = useRef<HTMLInputElement>(null);
    const longBreakRef = useRef<HTMLInputElement>(null);

    const submitHandler = () => {
        if (
            !pomodoroRef.current?.value ||
            !shortBreakRef.current?.value ||
            !longBreakRef.current?.value
        )
            return;
        changeTimeHandler(
            pomodoroRef.current.value,
            shortBreakRef.current.value,
            longBreakRef.current.value
        );
    };

    if (!visible) return <></>;

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gray-50 rounded text-black max-w-[500px] px-4 py-4">
                <div className="flex justify-between items-center">
                    <h1>Настройки таймера</h1>
                    <button onClick={closeHandler}>Close</button>
                </div>
                <hr />
                <div className="flex justify-around items-center gap-4 mt-2">
                    <div className="flex-1">
                        <label htmlFor={'pomodoro'}>Помодоро</label>
                        <SettingsInput
                            id={'pomodoro'}
                            value={20}
                            ref={pomodoroRef}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor={'short_break'}>Короткий перерыв</label>
                        <SettingsInput
                            id={'short_break'}
                            value={5}
                            ref={shortBreakRef}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor={'long_break'}>Длинный перерыв</label>
                        <SettingsInput id={''} value={15} ref={longBreakRef} />
                    </div>
                </div>
                <div className="grid items-center mt-2">
                    <button onClick={submitHandler}>Подтвердить</button>
                </div>
            </div>
        </div>
    );
};
