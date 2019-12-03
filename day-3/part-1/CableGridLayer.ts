import {CableGrid} from './CableGrid';

export class CableGridLayer {
    private currentPosition: [number, number] = [0, 0];

    constructor(private cableGrid: CableGrid) {
        this.cableGrid = cableGrid;
    }

    public parseCommand(command: string, wireName: string): void {
        const letter: string = command.charAt(0);
        const length = parseInt(command.substr(1), 0);
        let direction: [number, number] = [0, 0];

        switch (letter.toUpperCase()) {
            case 'U':
                direction = [1, 0];
                break;
            case 'R':
                direction = [0, 1];
                break;
            case 'D':
                direction = [-1, 0];
                break;
            case 'L':
                direction = [0, -1];
                break;
            default:
                console.error(`Letter '${letter}' can not be parsed`);
        }

        this.handleCommand(direction, length, wireName);
    }

    private handleCommand(direction: [number, number], length: number, wireName: string): void {
        [...new Array(length)].forEach(() => {
            this.currentPosition[0] += direction[0];
            this.currentPosition[1] += direction[1];

            const cableOnPosition = {x: this.currentPosition[0], y: this.currentPosition[1], crossedWired: [wireName]};
            this.cableGrid.addCableOnPosition(cableOnPosition)
        });
    }
}
