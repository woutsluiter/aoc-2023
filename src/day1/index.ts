import { Day } from '../day';

class Day1 extends Day {
    entries: Array<string> = [];

    constructor() {
        super(1);
    }

    getEntries(input: string): Array<string> {
        return input
            .split('\n')
            .map((entry) => entry.trim())
            .filter((entry) => entry !== '');
    }

    getDigits(input: string): number {
        const regex = /\d/g;
        const matches = [...input.matchAll(regex)];
        const digits: Array<string> = [];

        matches.map((match, index) => {
            if (index === 0) {
                digits.push(match[0]);
            }

            if (index === matches.length - 1) {
                digits.push(match[0]);
            }
        });

        return Number(digits.join(''));
    }

    solveForPartOne(input: string): string {
        const entries = this.getEntries(input);
        let result = 0;

        entries.map((entry) => {
            result += this.getDigits(entry);
        });

        return result.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day1();
