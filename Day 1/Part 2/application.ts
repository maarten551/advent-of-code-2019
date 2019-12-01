import {readFile} from "fs";

readFile("./input/input.txt", 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	const answer = input.split("\r\n").map(value => parseInt(value)).reduce((previousValue, currentValue) => {
		return previousValue + calculateTotalRequiredFuelForModule(currentValue);
	}, 0);

	console.log(answer);
});

function calculateTotalRequiredFuelForModule(initialModuleWeight: number): number {
	let fuelAmount = transformInputPart(initialModuleWeight);

	for (let fuelForFuelAmount = transformInputPart(fuelAmount); fuelForFuelAmount > 0; fuelForFuelAmount = transformInputPart(fuelForFuelAmount)) {
		fuelAmount += fuelForFuelAmount;
	}

	return fuelAmount;
}

function transformInputPart(inputPart: number): number {
	return (Math.floor(inputPart / 3)) - 2;
}
