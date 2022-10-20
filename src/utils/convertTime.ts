export const convertTime = (initialSeconds: number) => {
    let minutes = `${0}`;
    let seconds = `${initialSeconds}`;

    if (initialSeconds >= 60) {
        const temp = Math.floor(initialSeconds / 60);
        const temp2 = initialSeconds % 60;
        minutes = `${temp}`;
        seconds = `${temp2}`;
    }

    if (+seconds < 10) {
        seconds = `0${seconds}`;
    }

    if (+minutes < 10) {
        minutes = `0${minutes}`;
    }

    return { minutes, seconds };
};
