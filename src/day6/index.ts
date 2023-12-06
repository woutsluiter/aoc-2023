import { Day } from '../day';

class Day6 extends Day {
    constructor() {
        super(6);
    }

    getData(input: string): Array<[number, number]> {
        const data = input.match(/\d+/g);

        if (!data) return [];

        const numberData = data.map((number) => parseInt(number));

        return [...Array(numberData.length / 2)].map((_, index) => {
            return [
                numberData[index],
                numberData[index + numberData.length / 2],
            ];
        });
    }

    getNormalizedData(input: string): [number, number] {
        const time = input.match(/(?<=Time:\s+)(\d+\s+)+/);
        const distance = input.match(/(?<=Distance:\s+)(\d+\s+)+/);

        if (!time || !distance) return [0, 0];

        const sanitizedTime = time[0].replace(/\s+/g, '');
        const sanitizedDistance = distance[0].replace(/\s+/g, '');

        return [parseInt(sanitizedTime), parseInt(sanitizedDistance)];
    }

    getTotalOptimalTimings(race: [number, number]): number {
        const [raceTime, record] = race;
        let total = 0;
        let time = 0;

        for (time; time < raceTime; time++) {
            const distance = time * (raceTime - time);

            if (distance > record) {
                total++;
            }
        }

        return total;
    }

    solveForPartOne(input: string): string {
        const races = this.getData(input);
        const timings = races.map((race) => this.getTotalOptimalTimings(race));

        let result = 1;

        timings.forEach((time) => {
            result = time * result;
        });

        return result.toString();
    }

    solveForPartTwo(input: string): string {
        const race = this.getNormalizedData(input);
        const timings = this.getTotalOptimalTimings(race);

        return timings.toString();
    }
}

export default new Day6();
