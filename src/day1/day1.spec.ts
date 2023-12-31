import day1 from './index';

const mockData = `
twone 
1two3four 
 eightwothree
line6line

78linenine

`;

const mockTotalPart1 = 13 + 66 + 78;
const mockTotalPart2 = 21 + 14 + 83 + 66 + 79;

describe('On Day 1', () => {
    it(`extracts a array of sanitaized strings from the data`, () => {
        expect(day1.getEntries(mockData)).toHaveLength(5);
    });

    it(`transforms spelled numbers to digits`, () => {
        expect(day1.lettersToDigits('1two3four')).toBe('1234');
        expect(day1.lettersToDigits('eightwothree')).toBe('823');
        expect(day1.lettersToDigits('twone')).toBe('21');
    });

    it(`extracts the first and last digit from an entry`, () => {
        expect(day1.getDigits('1line2line')).toBe(12);
        expect(day1.getDigits('line345')).toBe(35);
        expect(day1.getDigits('line6line')).toBe(66);
        expect(day1.getDigits('78line9')).toBe(79);
    });

    it(`sums all the digits`, () => {
        expect(day1.solveForPartOne(mockData)).toBe(mockTotalPart1.toString());
        expect(day1.solveForPartTwo(mockData)).toBe(mockTotalPart2.toString());
    });
});
