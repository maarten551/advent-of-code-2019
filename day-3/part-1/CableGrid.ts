import {CableGridPosition} from './CableGridPosition';

export class CableGrid {
    private cableOnPositions: Map<number, Map<number, CableGridPosition>> = new Map<number, Map<number, CableGridPosition>>();

    public addCableOnPosition(cableOnPosition: CableGridPosition): void {
        let x = this.cableOnPositions.get(cableOnPosition.x);
        if (!x) {
            x = new Map<number, CableGridPosition>();
            this.cableOnPositions.set(cableOnPosition.x, x);
        }

        let y = x.get(cableOnPosition.y);
        if (!y) {
            x.set(cableOnPosition.y, cableOnPosition);
        } else {
            // Remove all like named wires
            y.crossedWired = y.crossedWired.filter(crossed => crossed.toLowerCase() != cableOnPosition.crossedWired[0].toLowerCase());
            y.crossedWired.push(cableOnPosition.crossedWired[0]);
        }
    }

    public findCrossedCablePositions(): CableGridPosition[] {
        const result: CableGridPosition[] = [];

        this.cableOnPositions.forEach(value => {
            [...value.values()].filter(cableOnPosition => cableOnPosition.crossedWired.length > 1).forEach(c => result.push(c));
        });

        return result;
    }
}
