import {readFile} from "fs";

readFile("./day-1/input/input.txt", 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	const answer = input.split("\r\n").map(value => parseInt(value)).reduce((previousValue, currentValue) => {
		return previousValue + transformInputPart(currentValue);
	}, 0);

	console.log(answer);
});

function transformInputPart(inputPart: number): number {
	return (Math.floor(inputPart / 3)) - 2;
}
