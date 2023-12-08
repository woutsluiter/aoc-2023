import { Day } from '../day';

class Day8 extends Day {
    constructor() {
        super(8);
    }

    getDirections(input: string): Array<string> {
        const directions = input.match(/[LR]+/);

        if (!directions) return [];

        return directions[0].split('');
    }

    getNodes(input: string): Map<string, [string, string]> {
        const nodes = input.match(/\w{3} = \(\w{3}, \w{3}\)+/g);
        const map = new Map();

        if (!nodes) return map;

        nodes.forEach((node) => {
            const identifier = node.match(/\w{3}/);
            const valueA = node.match(/(?<=\()\w{3}/);
            const valueB = node.match(/\w{3}(?=\))/);

            if (identifier && valueA && valueB) {
                map.set(identifier[0], [valueA[0], valueB[0]]);
            }
        });

        return map;
    }

    solveForPartOne(input: string): string {
        const directions = this.getDirections(input);
        const nodes = this.getNodes(input);
        let result = 0;
        let directionIndex = 0;
        let currentLocation = 'AAA';

        do {
            const direction = directions[directionIndex] === 'L' ? 0 : 1;
            const nextLocation = nodes.get(currentLocation)?.[direction];

            if (!nextLocation) {
                break;
            }

            currentLocation = nextLocation;
            result = result + 1;
            directionIndex =
                directionIndex === directions.length - 1
                    ? 0
                    : directionIndex + 1;
        } while (currentLocation !== 'ZZZ');
        // } while (result < nodes.size);

        return result.toString();
    }

    solveForPartTwo(input: string): string {
        return '';
    }
}

export default new Day8();
