import { useEffect, useRef, useState } from 'react';

export const useInterval = (
    initialTime = 10,
    delay = 1000,
    callBack = () => console.log('on done')
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
