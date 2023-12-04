import day3 from './index';

const mockData = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

const mockTotalPartOne = '4361';
const mockTotalPartTwo = '467835';

describe('On Day 3', () => {
    it(`extracts a array of sanitaized strings from the data`, () => {
        expect(day3.getEntries(mockData)).toHaveLength(10);
    });

    it(`returns part numbers adjacent to a certain index`, () => {
        expect(day3.getAdjacentPartNumbers('467..114..', 3)).toEqual([467]);
        expect(day3.getAdjacentPartNumbers('467.114...', 3)).toEqual([
            467, 114,
        ]);
        expect(day3.getAdjacentPartNumbers('467..114..', 0)).toEqual([467]);
        expect(day3.getAdjacentPartNumbers('467..114..', 4)).toEqual([114]);
        expect(day3.getAdjacentPartNumbers('467...114.', 9)).toEqual([114]);
        expect(day3.getAdjacentPartNumbers('467....114', 6)).toEqual([114]);
    });

    it(`returns the sum of all parts`, () => {
        expect(day3.solveForPartOne(mockData)).toBe(mockTotalPartOne);
    });

    it(`returns the gear ratio of all gears`, () => {
        expect(day3.solveForPartTwo(mockData)).toBe(mockTotalPartTwo);
    });
});
