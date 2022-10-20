export const convertTime = (initialSeconds: number) => {
    // console.log('converted');

    let minuets = `${0}`;
    let seconds = `${initialSeconds}`;

    if (initialSeconds >= 60) {
        const temp = Math.floor(initialSeconds / 60);
        const temp2 = initialSeconds % 60;
        minuets = `${temp}`;
        seconds = `${temp2}`;
    }

    if (+seconds < 10) {
        seconds = `0${seconds}`;
    }

    if (+minuets < 10) {
        minuets = `0${minuets}`;
    }

    return { minuets, seconds };
};
