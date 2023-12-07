import day7, { HandType } from './index';

const mockData = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

const mockHands: Array<HandType> = [
    {
        cards: '32T3K',
        bet: 765,
    },
    {
        cards: 'T55J5',
        bet: 684,
    },
    {
        cards: 'KK677',
        bet: 28,
    },
    {
        cards: 'KTJJT',
        bet: 220,
    },
    {
        cards: 'QQQJA',
        bet: 483,
    },
];

const mockEvaluatedHands: Array<HandType> = [
    {
        cards: '32T3K',
        bet: 765,
        score: 2,
    },
    {
        cards: 'T55J5',
        bet: 684,
        score: 4,
    },
    {
        cards: 'KK677',
        bet: 28,
        score: 3,
    },
    {
        cards: 'KTJJT',
        bet: 220,
        score: 3,
    },
    {
        cards: 'QQQJA',
        bet: 483,
        score: 4,
    },
];

const mockSortedHands: Array<HandType> = [
    {
        cards: '32T3K',
        bet: 765,
        score: 2,
    },
    {
        cards: 'KTJJT',
        bet: 220,
        score: 3,
    },
    {
        cards: 'KK677',
        bet: 28,
        score: 3,
    },
    {
        cards: 'T55J5',
        bet: 684,
        score: 4,
    },
    {
        cards: 'QQQJA',
        bet: 483,
        score: 4,
    },
];

const mockHandsWithJokers: Array<HandType> = [
    {
        cards: 'JJJJJ',
        bet: 765,
    },
    {
        cards: 'T55J5',
        bet: 684,
    },
    {
        cards: 'KK677',
        bet: 28,
    },
    {
        cards: 'JJTJJ',
        bet: 220,
    },
    {
        cards: 'QQQJA',
        bet: 483,
    },
];

const mockEvaluatedHandsWithJokers: Array<HandType> = [
    {
        cards: 'JJJJJ',
        bet: 765,
        score: 7,
    },
    {
        cards: 'T55J5',
        bet: 684,
        score: 6,
    },
    {
        cards: 'KK677',
        bet: 28,
        score: 3,
    },
    {
        cards: 'JJTJJ',
        bet: 220,
        score: 7,
    },
    {
        cards: 'QQQJA',
        bet: 483,
        score: 6,
    },
];

const mockSortedHandsWithJokers: Array<HandType> = [
    {
        cards: 'KK677',
        bet: 28,
        score: 3,
    },
    {
        cards: 'T55J5',
        bet: 684,
        score: 6,
    },
    {
        cards: 'QQQJA',
        bet: 483,
        score: 6,
    },
    {
        cards: 'JJJJJ',
        bet: 765,
        score: 7,
    },
    {
        cards: 'JJTJJ',
        bet: 220,
        score: 7,
    },
];

const mockResultPartOne = '6440';
const mockResultPartTwo = '5905';

describe('On Day 7', () => {
    it('gets all hands', () => {
        expect(day7.getHands(mockData)).toEqual(mockHands);
    });

    it('returns the value of a card', () => {
        expect(day7.getCardValue('2')).toBe(2);
        expect(day7.getCardValue('9')).toBe(9);
        expect(day7.getCardValue('T')).toBe(10);
        expect(day7.getCardValue('J')).toBe(11);
        expect(day7.getCardValue('Q')).toBe(12);
        expect(day7.getCardValue('K')).toBe(13);
        expect(day7.getCardValue('A')).toBe(14);
    });

    it('evaluates a hand', () => {
        expect(day7.evaluateHand(mockHands[0])).toEqual(mockEvaluatedHands[0]);
        expect(day7.evaluateHand(mockHands[1])).toEqual(mockEvaluatedHands[1]);
        expect(day7.evaluateHand(mockHands[2])).toEqual(mockEvaluatedHands[2]);
        expect(day7.evaluateHand(mockHands[3])).toEqual(mockEvaluatedHands[3]);
        expect(day7.evaluateHand(mockHands[4])).toEqual(mockEvaluatedHands[4]);
    });

    it('evaluates a hand with Jokers', () => {
        expect(day7.evaluateHand(mockHandsWithJokers[0], true)).toEqual(
            mockEvaluatedHandsWithJokers[0]
        );
        expect(day7.evaluateHand(mockHandsWithJokers[1], true)).toEqual(
            mockEvaluatedHandsWithJokers[1]
        );
        expect(day7.evaluateHand(mockHandsWithJokers[2], true)).toEqual(
            mockEvaluatedHandsWithJokers[2]
        );
        expect(day7.evaluateHand(mockHandsWithJokers[3], true)).toEqual(
            mockEvaluatedHandsWithJokers[3]
        );
        expect(day7.evaluateHand(mockHandsWithJokers[4], true)).toEqual(
            mockEvaluatedHandsWithJokers[4]
        );
    });

    it('sorts hands', () => {
        expect(day7.sortHands(mockHands)).toEqual(mockSortedHands);
    });

    it('sorts hands with Jokers', () => {
        expect(day7.sortHands(mockHandsWithJokers, true)).toEqual(
            mockSortedHandsWithJokers
        );
    });

    it(`returns the total winnings`, () => {
        expect(day7.solveForPartOne(mockData)).toBe(mockResultPartOne);
    });

    it(`returns the total winnings with Jokers`, () => {
        expect(day7.solveForPartTwo(mockData)).toBe(mockResultPartTwo);
    });
});
