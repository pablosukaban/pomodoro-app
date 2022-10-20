import React, { useRef } from 'react';
import { SettingsInput } from './SettingsInput';
import { XCircle } from 'phosphor-react';

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
        <div
            className={`fixed w-full h-full z-100 flex items-center justify-center bg-gray-600 bg-opacity-30 `}
        >
            <div className="bg-gray-50 rounded text-black max-w-[500px] px-4 py-4">
                <div className="flex justify-between items-center mb-1">
                    <h1>Настройки таймера</h1>
                    <div onClick={closeHandler} className="cursor-pointer">
                        <XCircle size={24} weight="fill" />
                    </div>
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
                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={submitHandler}
                        className="border border-gray-500 rounded px-4 py-2"
                    >
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};
