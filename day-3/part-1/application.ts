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

	const sortedOnClosest = cableGrid.findCrossedCablePositions().sort((a, b) => {
		return  (Math.abs(a.x) + Math.abs(a.y)) - (Math.abs(b.x) + Math.abs(b.y));
	});

	console.log(Math.abs(sortedOnClosest[0].x) + Math.abs(sortedOnClosest[0].y));
});
