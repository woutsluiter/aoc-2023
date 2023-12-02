import { Day } from '../day';

class Day2 extends Day {
    maxRed = 12;
    maxGreen = 13;
    maxBlue = 14;

    constructor() {
        super(2);
    }

    getEntries(input: string): Array<string> {
        return input
            .split('\n')
            .map((entry) => entry.trim())
            .filter((entry) => entry !== '');
    }

    getGameId(input: string): number {
        const match = input.match(/\d+(?=:)/);

        return match ? Number(match[0]) : 0;
    }

    getMaximumOfColor(input: string, color: string): number {
        const pattern = new RegExp(`\\d+(?=\\s${color})`, 'g');
        const matches = input.match(pattern)?.map((match) => Number(match));

        if (!matches) {
            return 0;
        }

        return Math.max(...matches);
    }

    validateGame(game: string): boolean {
        const gameMaxRed = this.getMaximumOfColor(game, 'red');
        const gameMaxGreen = this.getMaximumOfColor(game, 'green');
        const gameMaxBlue = this.getMaximumOfColor(game, 'blue');

        return (
            gameMaxRed <= this.maxRed &&
            gameMaxGreen <= this.maxGreen &&
            gameMaxBlue <= this.maxBlue
        );
    }

    getGamePower(game: string): number {
        const minimumRedCubes = this.getMaximumOfColor(game, 'red');
        const minimumGreenCubes = this.getMaximumOfColor(game, 'green');
        const minimumBlueCubes = this.getMaximumOfColor(game, 'blue');

        return minimumRedCubes * minimumGreenCubes * minimumBlueCubes;
    }

    solveForPartOne(input: string): string {
        const entries = this.getEntries(input);
        let result = 0;

        entries.forEach((game) => {
            const id = this.getGameId(game);
            const validGame = this.validateGame(game);

            if (validGame) {
                result += id;
            }
        });

        return result.toString();
    }

    solveForPartTwo(input: string): string {
        const entries = this.getEntries(input);
        let result = 0;

        entries.forEach((game) => {
            result += this.getGamePower(game);
        });

        return result.toString();
    }
}

export default new Day2();
