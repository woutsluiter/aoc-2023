import { Day } from '../day';

class Day4 extends Day {
    constructor() {
        super(4);
    }

    getEntries(input: string): Array<string> {
        return input
            .split('\n')
            .map((entry) => entry.trim())
            .filter((entry) => entry !== '');
    }

    getWinningNumbers(card: string): Array<string> {
        return card.split(':')[1].split('|')[0].match(/\d+/g) || [];
    }

    getCardNumbers(card: string): Array<string> {
        return card.split(':')[1].split('|')[1].match(/\d+/g) || [];
    }

    calculatePoints(amount: number): number {
        if (amount > 0) {
            return Math.pow(2, amount - 1);
        }

        return 0;
    }

    solveForPartOne(input: string): string {
        const cards = this.getEntries(input);
        let result = 0;

        cards.forEach((card) => {
            const cardNumbers = this.getCardNumbers(card);
            const winningNumbers = this.getWinningNumbers(card);
            const matches: Array<string> = [];

            winningNumbers.forEach((number) => {
                if (cardNumbers.includes(number)) {
                    matches.push(number);
                }
            });

            result += this.calculatePoints(matches.length);
        });

        return result.toString();
    }

    solveForPartTwo(input: string): string {
        const cards = this.getEntries(input);
        const cardCopies = new Map();
        let result = 0;

        cards.forEach((card, index) => {
            const cardNumbers = this.getCardNumbers(card);
            const winningNumbers = this.getWinningNumbers(card);
            const wonCards: Array<string> = [];
            const newCardAmount = cardCopies.get(`${index + 1}`) + 1 || 1;

            winningNumbers.forEach((number) => {
                if (cardNumbers.includes(number)) {
                    wonCards.push(number);
                }
            });

            cardCopies.set(`${index + 1}`, newCardAmount);

            [...Array(cardCopies.get(`${index + 1}`))].forEach(() => {
                wonCards.forEach((_card, count) => {
                    const nextCardIndex = count + index + 2;
                    const newCardAmount =
                        cardCopies.get(`${nextCardIndex}`) + 1 || 1;

                    cardCopies.set(`${nextCardIndex}`, newCardAmount);
                });
            });
        });

        cardCopies.forEach((cardAmount) => {
            result += cardAmount;
        });

        return result.toString();
    }
}

export default new Day4();
