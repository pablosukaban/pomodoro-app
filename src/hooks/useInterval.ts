import { useCallback, useEffect, useRef, useState } from 'react';

export const useInterval = (
    initialTime: number,
    callBack = () => console.log('on done')
) => {
    const delay = 1000;
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalref = useRef(0);

    const startInterval = useCallback(() => {
        intervalref.current = setInterval(
            () => setTimeLeft((prev) => prev - 1),
            delay
        );
    }, []);

    const stopInterval = () => {
        if (!intervalref.current) return;
        clearInterval(intervalref.current);
    };

    const resetInterval = () => {
        if (!intervalref.current) return;
        stopInterval();
        intervalref.current = 0;
        setTimeLeft(initialTime);
    };

    useEffect(() => {
        if (intervalref.current && timeLeft <= 0) {
            clearInterval(intervalref.current);
            intervalref.current = 0;
            callBack();
        }
    }, [timeLeft]);

    useEffect(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);

    useEffect(() => {
        return () => clearInterval(intervalref.current);
    }, []);

    return { timeLeft, startInterval, stopInterval, resetInterval };
};
