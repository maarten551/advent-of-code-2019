import {readFile} from "fs";

function detemineResult(opcodeArray: number[], noun: number, verb: number) {
	opcodeArray[1] = noun;
	opcodeArray[2] = verb;
	let stop = false;

	for (let i = 0; i < opcodeArray.length && !stop; i++) {
		const currentValue = opcodeArray[i];

		switch (true) {
			case currentValue === 99:
				stop = true;
				break;
			case currentValue > 2:
				continue;
			case currentValue === 1:
				opcodeArray[opcodeArray[i + 3]] = opcodeArray[opcodeArray[i + 1]] + opcodeArray[opcodeArray[i + 2]];
				break;
			case currentValue === 2:
				opcodeArray[opcodeArray[i + 3]] = opcodeArray[opcodeArray[i + 1]] * opcodeArray[opcodeArray[i + 2]];
				break;
		}

		i += 3;
	}

	return opcodeArray[0];
}

readFile("./day-2/input/input.txt", 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	const opcodeArray = input.split(",").map(s => s.trim()).map(value => parseInt(value));

	[...Array(100).keys()].forEach(noun => {
		[...Array(100).keys()].forEach(verb => {
			let result = detemineResult([...opcodeArray], noun, verb);
			if (result === 19690720) {
				console.log(100 * noun + verb);
			}
		});
	});



	console.log(opcodeArray[0]);
});