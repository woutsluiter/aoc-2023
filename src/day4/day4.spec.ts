import day4 from './index';

const mockData = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

const mockResultPartOne = '13';
const mockResultPartTwo = '30';

describe('On Day 4', () => {
    it(`extracts a array of sanitaized strings from the data`, () => {
        expect(day4.getEntries(mockData)).toHaveLength(6);
    });

    it(`gets the winning numbers`, () => {
        expect(
            day4.getWinningNumbers(
                'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            )
        ).toEqual(['41', '48', '83', '86', '17']);
    });

    it(`gets the card numbers`, () => {
        expect(
            day4.getCardNumbers(
                'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            )
        ).toEqual(['83', '86', '6', '31', '17', '9', '48', '53']);
    });

    it(`calculates the points`, () => {
        expect(day4.calculatePoints(0)).toBe(0);
        expect(day4.calculatePoints(1)).toBe(1);
        expect(day4.calculatePoints(2)).toBe(2);
        expect(day4.calculatePoints(3)).toBe(4);
        expect(day4.calculatePoints(4)).toBe(8);
        expect(day4.calculatePoints(5)).toBe(16);
    });

    it(`sums the points of the cards`, () => {
        expect(day4.solveForPartOne(mockData)).toBe(mockResultPartOne);
    });

    it(`sums the total amount of cards`, () => {
        expect(day4.solveForPartTwo(mockData)).toBe(mockResultPartTwo);
    });
});
