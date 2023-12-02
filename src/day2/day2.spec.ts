import day2 from './index';

const mockDataPartOne = `
Game 1: 2 green, 12 blue; 6 red, 6 blue; 8 blue, 5 green, 5 red; 5 green, 13 blue; 3 green, 7 red, 10 blue; 13 blue, 8 red
Game 2: 1 green, 7 red; 1 green, 9 red, 3 blue; 4 blue, 5 red
Game 30: 2 red, 2 blue, 60 green; 1 blue, 2 red, 2 green; 3 blue, 3 green
Game 40: 20 red, 20 blue, 60 green; 10 blue, 20 red, 20 green; 30 blue, 30 green
`;

const mockTotalPartOne = '3';

const mockDataPartTwo = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

const mockTotalPartTwo = `2286`;

describe('On Day 2', () => {
    it(`extracts a array of sanitaized strings from the data`, () => {
        expect(day2.getEntries(mockDataPartOne)).toHaveLength(4);
    });

    it(`gets the id of the game as number`, () => {
        expect(day2.getGameId('Game 1: 2 green, 12 blue')).toBe(1);
        expect(day2.getGameId('Game 100: 2 green, 12 blue')).toBe(100);
        expect(day2.getGameId('Game: 2 green, 12 blue')).toBe(0);
    });

    it(`gets the maximum digit of a color from a game`, () => {
        expect(
            day2.getMaximumOfColor(
                '2 green, 12 blue; 6 red, 6 blue; 8 blue, 5 green, 5 red; 5 green, 13 blue',
                'red'
            )
        ).toBe(6);
        expect(
            day2.getMaximumOfColor(
                '2 green, 12 blue; 6 red, 6 blue; 8 blue, 5 green, 5 red; 5 green, 13 blue',
                'green'
            )
        ).toBe(5);
        expect(
            day2.getMaximumOfColor(
                '2 green, 12 blue; 6 red, 6 blue; 8 blue, 5 green, 5 red; 5 green, 13 blue',
                'blue'
            )
        ).toBe(13);
    });

    it(`validates if a game satisfies the game parameters`, () => {
        expect(
            day2.validateGame(
                'Game 1: 1 green, 7 red; 1 green, 9 red, 3 blue; 4 blue, 5 red'
            )
        ).toBe(true);
        expect(
            day2.validateGame(
                'Game 2: 100 green, 70 red; 10 green, 90 red, 30 blue; 40 blue, 50 red'
            )
        ).toBe(false);
    });

    it(`returns the power of a game`, () => {
        expect(
            day2.getGamePower(
                'Game 1: 1 green, 7 red; 1 green, 9 red, 3 blue; 4 blue, 5 red'
            )
        ).toEqual(9 * 1 * 4);
        expect(
            day2.getGamePower('Game 2: 2 green; 10 green, 14 blue; 4 blue')
        ).toBe(10 * 14 * 0);
    });

    it(`sums all the valid games`, () => {
        expect(day2.solveForPartOne(mockDataPartOne)).toBe(mockTotalPartOne);
    });

    it(`sums the power of all games`, () => {
        expect(day2.solveForPartTwo(mockDataPartTwo)).toBe(mockTotalPartTwo);
    });
});
