import { Day } from '../day';

// type HandType =
//     | 'fiveOfAKind'
//     | 'fourOfAKind'
//     | 'fullHouse'
//     | 'threeOfAKind'
//     | 'twoPair'
//     | 'onePair'
//     | 'highCard';

export type HandType = {
    bet: number;
    cards: string;
    score?: number;
};

class Day7 extends Day {
    constructor() {
        super(7);
    }

    getHands(input: string): Array<HandType> {
        const hands = input.match(/\w{5}\s\d+/g);

        if (!hands) return [];

        return hands.map((hand) => {
            const splitHand = hand.split(' ');
            return {
                cards: splitHand[0],
                bet: Number(splitHand[1]),
            };
        });
    }

    getCardValue(card: string, withJoker = false): number {
        if (!isNaN(parseInt(card))) return parseInt(card);

        switch (card) {
            case 'A':
                return 14;
            case 'K':
                return 13;
            case 'Q':
                return 12;
            case 'J':
                return withJoker ? 1 : 11;
            default:
                return 10;
        }
    }
    /* 
        1: High card
        2: One pair
        3: Two pair
        4: Three of a kind
        5: Full house
        6: Four of a kind
        7: Five of a kind 
     */
    getHandScore(sortedHand: Map<string, number>, jokers = 0): number {
        const cards = [...sortedHand.entries()];
        const nextCard = cards[0][1] === 5 ? 0 : cards[1][1];
        const matchNumber =
            cards[0][0] === 'J' ? cards[0][1] + nextCard : cards[0][1] + jokers;

        switch (matchNumber) {
            case 5:
                // Full house
                return 7;
            case 4:
                // Four of a kind
                return 6;
            case 3:
                if (cards[1][1] === 2) {
                    // Full House
                    return 5;
                }
                // Three of a kind
                return 4;
            case 2:
                if (cards[1][1] === 2) {
                    // Two pair
                    return 3;
                }
                // One pair
                return 2;
            case 1:
            default:
                // High card
                return 1;
        }
    }

    evaluateHand(hand: HandType, withJoker = false): HandType {
        const map = new Map<string, number>();
        const jokers = withJoker ? hand.cards.match(/J/g)?.length : 0;

        hand.cards.split('').forEach((card) => {
            const amount = (map.get(card) || 0) + 1;

            map.set(card, amount);
        });

        const sortedMap = new Map<string, number>(
            [...map.entries()].sort((a, b) => b[1] - a[1])
        );

        return {
            ...hand,
            score: this.getHandScore(sortedMap, jokers),
        };
    }

    compareCards(handA: HandType, handB: HandType, withJoker = false): number {
        const handAArray = handA.cards.split('');
        const handBArray = handB.cards.split('');
        let index = 0;
        let score = 0;

        for (index; index < handAArray.length; index++) {
            const scoreA = this.getCardValue(handAArray[index], withJoker);
            const scoreB = this.getCardValue(handBArray[index], withJoker);

            if (scoreA !== scoreB) {
                score = scoreA - scoreB;
                break;
            }
        }

        return score;
    }

    sortHands(hands: Array<HandType>, withJoker = false): Array<HandType> {
        return hands
            .map<HandType>((hand) => this.evaluateHand(hand, withJoker))
            .sort((handA, handB) => {
                if (!handA.score || !handB.score) return 0;

                return (
                    handA.score - handB.score ||
                    this.compareCards(handA, handB, withJoker)
                );
            });
    }

    solveForPartOne(input: string): string {
        const hands = this.getHands(input);
        const sortedHands = this.sortHands(hands);
        let total = 0;

        sortedHands.forEach((hand, index) => {
            const rank = index + 1;

            total = total + rank * hand.bet;
        });

        return total.toString();
    }

    solveForPartTwo(input: string): string {
        const hands = this.getHands(input);
        const sortedHands = this.sortHands(hands, true);
        let total = 0;

        sortedHands.forEach((hand, index) => {
            const rank = index + 1;

            total = total + rank * hand.bet;
        });

        return total.toString();
    }
}

export default new Day7();
