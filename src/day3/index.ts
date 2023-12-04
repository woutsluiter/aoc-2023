import { Day } from '../day';

class Day3 extends Day {
    constructor() {
        super(3);
    }

    getEntries(input: string): Array<string> {
        return input
            .split('\n')
            .map((entry) => entry.trim())
            .filter((entry) => entry !== '');
    }

    getAdjacentPartNumbers(line: string, partIndex: number): Array<number> {
        const partNumbers: Array<number> = [];
        const foundNumbers = [...line.matchAll(/\d+/g)];

        foundNumbers.forEach((number) => {
            if (number.index == undefined) return;

            const preceedingIndex = number.index - 1;
            const succeedingIndex = number.index + number[0].length;

            if (partIndex >= preceedingIndex && partIndex <= succeedingIndex) {
                partNumbers.push(parseInt(number[0]));
            }
        });

        return partNumbers;
    }

    solveForPartOne(input: string): string {
        const lines = this.getEntries(input);
        const partNumbers: Array<number> = [];
        const partRegex = /[^\w\.]/g;
        let result = 0;

        lines.forEach((line, lineIndex) => {
            [...line.matchAll(partRegex)].forEach((part) => {
                const { index: partIndex } = part;

                if (!partIndex) return;

                // Check previous line
                if (lineIndex > 0) {
                    partNumbers.push(
                        ...this.getAdjacentPartNumbers(
                            lines[lineIndex - 1],
                            partIndex
                        )
                    );
                }

                // Check current line
                partNumbers.push(
                    ...this.getAdjacentPartNumbers(line, partIndex)
                );

                // Check next line
                if (lineIndex < lines.length) {
                    partNumbers.push(
                        ...this.getAdjacentPartNumbers(
                            lines[lineIndex + 1],
                            partIndex
                        )
                    );
                }
            });
        });

        partNumbers.forEach((number) => {
            result += number;
        });

        return result.toString();
    }

    solveForPartTwo(input: string): string {
        const lines = this.getEntries(input);
        const partNumbers: Array<number> = [];
        const partRegex = /\*/g;
        let result = 0;

        lines.forEach((line, lineIndex) => {
            [...line.matchAll(partRegex)].forEach((part) => {
                const { index: partIndex } = part;
                const matchingNumbers = [];

                if (!partIndex) return;

                // Check previous line
                if (lineIndex > 0) {
                    matchingNumbers.push(
                        ...this.getAdjacentPartNumbers(
                            lines[lineIndex - 1],
                            partIndex
                        )
                    );
                }

                // Check current line
                matchingNumbers.push(
                    ...this.getAdjacentPartNumbers(line, partIndex)
                );

                // Check next line
                if (lineIndex < lines.length) {
                    matchingNumbers.push(
                        ...this.getAdjacentPartNumbers(
                            lines[lineIndex + 1],
                            partIndex
                        )
                    );
                }

                if (matchingNumbers.length === 2) {
                    partNumbers.push(matchingNumbers[0] * matchingNumbers[1]);
                }
            });
        });

        partNumbers.forEach((number) => {
            result += number;
        });

        return result.toString();
    }
}

export default new Day3();
