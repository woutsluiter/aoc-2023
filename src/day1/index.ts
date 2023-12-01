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

    lettersToDigits(input: string): string {
        const spelledDigits = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
        };

        Object.keys(spelledDigits).forEach((key) => {
            [...input.matchAll(new RegExp(key, 'gi'))].map((match) => {
                const output = [];

                if (match.index !== undefined) {
                    if (match.index > 0) {
                        output.push(input.slice(0, match.index + 1));
                    }

                    input = [
                        ...output,
                        spelledDigits[key as keyof typeof spelledDigits],
                        input.slice(match.index + 1),
                    ].join('');
                }
            });
        });

        return input.replace(/\D/g, '');
    }

    getDigits(input: string): number {
        const matches = [...input.matchAll(/\d/g)];
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
        const entries = this.getEntries(input);
        let result = 0;

        entries.map((entry) => {
            const entryToDigits = this.lettersToDigits(entry);
            result += this.getDigits(entryToDigits);
        });

        return result.toString();
    }
}

export default new Day1();
