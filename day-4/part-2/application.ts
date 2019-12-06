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
        atLeastTwoSameNumbersAdjacent,
        adjacentAreNotPartOfALargerGroup
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

function adjacentAreNotPartOfALargerGroup(range: [number, number], currentValue: number): boolean {
    const numberString = currentValue.toString();
    const groups: string[] = [];

    for (let i = 0; i < numberString.length; i++) {
        const currentChar = numberString[i];

        let j = i + 1;
        for (; j < numberString.length && currentChar === numberString[j]; j++) {
        }

        if (j - i >= 2) {
            groups.push(currentChar.repeat(j - i));
            i = (j-1);
        }
    }

    return groups.some(value => value.length === 2);
}
