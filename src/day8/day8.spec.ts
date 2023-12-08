import day8 from './index';

const mockData = `
RL

BBB = (DDD, EEE)
AAA = (BBB, CCC)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (CCC, DDD)
`;

const mockAltData = `
LLR

BBB = (AAA, ZZZ)
AAA = (BBB, BBB)
ZZZ = (AAA, BBB)
`;

const mockNodeMap = new Map([
    ['BBB', ['DDD', 'EEE']],
    ['AAA', ['BBB', 'CCC']],
    ['CCC', ['ZZZ', 'GGG']],
    ['DDD', ['DDD', 'DDD']],
    ['EEE', ['EEE', 'EEE']],
    ['GGG', ['GGG', 'GGG']],
    ['ZZZ', ['CCC', 'DDD']],
]);

const mockResultPartOne = '2';
const mockResultPartOneAlt = '6';

describe('On Day 8', () => {
    it('gets directions', () => {
        expect(day8.getDirections(mockData)).toEqual(['R', 'L']);
        expect(day8.getDirections(mockAltData)).toEqual(['L', 'L', 'R']);
    });

    it('gets nodes', () => {
        expect(day8.getNodes(mockData)).toEqual(mockNodeMap);
    });

    it(`returns the amount of step to reach ZZZ`, () => {
        expect(day8.solveForPartOne(mockData)).toBe(mockResultPartOne);
        expect(day8.solveForPartOne(mockAltData)).toBe(mockResultPartOneAlt);
    });
});
