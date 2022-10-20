import React, { forwardRef } from 'react';

export type SettingsInputProps = {
    id: string;
    value?: number;
};

export type Ref = HTMLInputElement;

// eslint-disable-next-line react/display-name
export const SettingsInput = forwardRef<Ref, SettingsInputProps>(
    ({ id }, ref) => {
        return (
            <input
                min={1}
                id={id}
                ref={ref}
                type={'number'}
                className="w-full px-2 py-2 mt-1 "
                placeholder="Время"
            />
        );
    }
);
