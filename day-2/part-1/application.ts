import {readFile} from "fs";

readFile("./day-2/input/input.txt", 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	const opcodeArray = input.split(",").map(s => s.trim()).map(value => parseInt(value));
	opcodeArray[1] = 12;
	opcodeArray[2] = 2;
	let stop = false;

	for(let i = 0; i < opcodeArray.length && !stop; i++) {
		const currentValue = opcodeArray[i];

		switch (true) {
			case currentValue === 99:
				stop = true;
				break;
			case currentValue > 2:
				continue;
			case currentValue === 1:
				opcodeArray[opcodeArray[i+3]] = opcodeArray[opcodeArray[i+1]] + opcodeArray[opcodeArray[i+2]];
				break;
			case currentValue === 2:
				opcodeArray[opcodeArray[i+3]] = opcodeArray[opcodeArray[i+1]] * opcodeArray[opcodeArray[i+2]];
				break;
		}

		i += 3;
	}

	console.log(opcodeArray[0]);
});