import {CableGridPosition} from './CableGridPosition';

export class CableGrid {
    private cableOnPositions: Map<number, Map<number, CableGridPosition>> = new Map<number, Map<number, CableGridPosition>>();
    private stepCache: Map<string, Map<number, Map<number, number>>> = new Map<string, Map<number, Map<number, number>>>();

    public addCableOnPosition(cableOnPosition: CableGridPosition, stepCounter: number): void {
        this.cacheStepCounterOnPosition(cableOnPosition, stepCounter);

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

    private cacheStepCounterOnPosition(cableOnPosition: CableGridPosition, stepCounter: number): void {
        let name = cableOnPosition.crossedWired[0];
        let nameCache = this.stepCache.get(name);
        if (!nameCache) {
            nameCache = new Map<number, Map<number, number>>();
            this.stepCache.set(name, nameCache);
        }

        let xCache = nameCache.get(cableOnPosition.x);
        if (!xCache) {
            xCache = new Map<number, number>();
            nameCache.set(cableOnPosition.x, xCache);
        }

        xCache.set(cableOnPosition.y, stepCounter);
    }

    public findCrossedCablePositions(): CableGridPosition[] {
        const result: CableGridPosition[] = [];

        this.cableOnPositions.forEach(value => {
            [...value.values()].filter(cableOnPosition => cableOnPosition.crossedWired.length > 1).forEach(c => result.push(c));
        });

        return result;
    }

    public findStepCounterByPosition(position: CableGridPosition): Map<string, number> {
        const result = new Map<string, number>();

        position.crossedWired.forEach(wireName => {
            let step = this.stepCache.get(wireName)?.get(position.x)?.get(position.y);
            if (step) {
                result.set(wireName, step);
            }
        });

        return result;
    }
}
