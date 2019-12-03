import {readFile} from "fs";
import {CableGrid} from './CableGrid';
import {CableGridLayer} from './CableGridLayer';

readFile("./day-3/input/input.txt", 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	const cableGrid: CableGrid = new CableGrid();

	input.split("\r\n").filter(s => s.trim() !== "").forEach((wireCommands, index) => {
		const cableGridLayer: CableGridLayer = new CableGridLayer(cableGrid);

		wireCommands.split(",").forEach(wireCommand => {
			cableGridLayer.parseCommand(wireCommand, index.toString());
		})
	});

	const answer = cableGrid.findCrossedCablePositions().reduce((previousValue, currentValue) => {
		const stepCounters = cableGrid.findStepCounterByPosition(currentValue);

		// @ts-ignore
		const sum = Math.abs(stepCounters.get(currentValue.crossedWired[0])) + Math.abs(stepCounters.get(currentValue.crossedWired[1]));

		return (sum < previousValue) ? sum : previousValue;
	}, Number.MAX_VALUE);

	console.log(answer);
});
