import {readFile} from "fs";

readFile("./day-4/input/input.txt", 'utf8', function (err, input) {
    if (err) {
        return console.log(err);
    }

    const inputNumbers = input.split("-").map(value => parseInt(value));
    const range: [number, number] = [inputNumbers[0], inputNumbers[1]];

    [...new Array(range[1] - range[0]).keys()]
        .map(i => i + range[0])
        .filter(i => validateNumber(range, i))
        .forEach((value, index, array) => console.log(`${array.length} - ${value}`));
});

function validateNumber(originRange: [number, number], currentNumber: number): boolean {
    const checks: ((range: [number, number], currentValue: number) => boolean)[] = [
        areNumbersIncreasingInSequence,
        atLeastTwoSameNumbersAdjacent
    ];

    return checks.every(fn => fn(originRange, currentNumber));
}

function areNumbersIncreasingInSequence(range: [number, number], currentValue: number): boolean {
    return currentValue.toString().split("")
        .map(c => parseInt(c))
        .every((numberInSequence, index, array) => {
            if (index === 0) {
                return true;
            }

            return numberInSequence >= array[index - 1];
        })
}

function atLeastTwoSameNumbersAdjacent(range: [number, number], currentValue: number): boolean {
    return currentValue.toString().split("")
        .map(c => parseInt(c))
        .some((numberInSequence, index, array) => {
            if (index === array.length - 1) {
                return false;
            }

            return numberInSequence === array[index + 1];
        })
}
