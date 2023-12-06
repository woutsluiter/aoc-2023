import day6 from './index';

const mockData = `
    Time:      7  15   30
    Distance:  9  40  200
`;

const mockDataSets: Array<[number, number]> = [
    [7, 9],
    [15, 40],
    [30, 200],
];

const mockResultPartOne = '288';
const mockResultPartTwo = '71503';

describe('On Day 6', () => {
    it('gets the data sets', () => {
        expect(day6.getData(mockData)).toEqual(mockDataSets);
    });

    it('gets the normalized data', () => {
        expect(day6.getNormalizedData(mockData)).toEqual([71530, 940200]);
    });

    it('returns the amount of optimal timings', () => {
        expect(day6.getTotalOptimalTimings(mockDataSets[0])).toEqual(4);
        expect(day6.getTotalOptimalTimings(mockDataSets[1])).toEqual(8);
        expect(day6.getTotalOptimalTimings(mockDataSets[2])).toEqual(9);
    });

    it(`returns the multiplied margin error of all races`, () => {
        expect(day6.solveForPartOne(mockData)).toBe(mockResultPartOne);
    });

    it(`returns the amount of timings for the race `, () => {
        expect(day6.solveForPartTwo(mockData)).toBe(mockResultPartTwo);
    });
});
