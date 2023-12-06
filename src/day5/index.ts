import { Day } from '../day';

type CategoryMapType = { min: number; max: number; offset: number };

type AllMapsType = {
    seedToSoilMap: Array<CategoryMapType>;
    soilToFertilizerMap: Array<CategoryMapType>;
    fertilizerToWaterMap: Array<CategoryMapType>;
    waterToLightMap: Array<CategoryMapType>;
    lightToTemperatureMap: Array<CategoryMapType>;
    temperatureToHumidityMap: Array<CategoryMapType>;
    humidityToLocationMap: Array<CategoryMapType>;
};

type SeedRangeType = { min: number; max: number };

class Day5 extends Day {
    constructor() {
        super(5);
    }

    getSeeds(input: string): Array<number> {
        const seeds = input.match(/(?<=seeds: )(\d+\s)+/);

        if (!seeds) return [];

        return seeds[0].split(' ').map((seed) => Number(seed));
    }

    getSeedRanges(input: string): Array<SeedRangeType> {
        const seeds = input.match(/(?<=seeds: )(\d+\s)+/);

        if (!seeds) return [];

        const seedPairs = seeds[0].match(/(\d+\s?\d+)+/g);

        if (!seedPairs) return [];

        return seedPairs.map((pair) => {
            const splitPair = pair.split(' ').map((number) => Number(number));

            return {
                min: splitPair[0],
                max: splitPair[0] + splitPair[1] - 1,
            };
        });
    }

    getMap(input: string, type: string): Array<CategoryMapType> {
        const regex = new RegExp(`(?<=${type}\\smap:\\n)(\\d+\\s?)+`);
        const rows = input.match(regex);

        if (!rows) return [];

        const mappedArray: Array<CategoryMapType> = rows[0]
            .split('\n')
            .filter((row) => row.length > 0)
            .map((row) => {
                const rowArray = row.split(' ').map((number) => Number(number));
                const offset = rowArray[0] - rowArray[1];

                return {
                    min: rowArray[1],
                    max: rowArray[1] + rowArray[2] - 1,
                    offset,
                };
            });

        return mappedArray;
    }

    getAllMaps(input: string): AllMapsType {
        return {
            seedToSoilMap: this.getMap(input, 'seed-to-soil'),
            soilToFertilizerMap: this.getMap(input, 'soil-to-fertilizer'),
            fertilizerToWaterMap: this.getMap(input, 'fertilizer-to-water'),
            waterToLightMap: this.getMap(input, 'water-to-light'),
            lightToTemperatureMap: this.getMap(input, 'light-to-temperature'),
            temperatureToHumidityMap: this.getMap(
                input,
                'temperature-to-humidity'
            ),
            humidityToLocationMap: this.getMap(input, 'humidity-to-location'),
        };
    }

    getMappedValue(
        unmappedInput: number,
        maps: Array<CategoryMapType>
    ): number {
        const map = maps.find((map) =>
            this.isInRange(unmappedInput, map.min, map.max)
        );

        if (!map) return unmappedInput;

        return unmappedInput + map.offset;
    }

    isInRange(input: number, min: number, max: number) {
        return input >= min && input <= max;
    }

    getLocation(seed: number, maps: AllMapsType): number {
        const soil = this.getMappedValue(seed, maps.seedToSoilMap);
        const fertilizer = this.getMappedValue(soil, maps.soilToFertilizerMap);
        const water = this.getMappedValue(
            fertilizer,
            maps.fertilizerToWaterMap
        );
        const light = this.getMappedValue(water, maps.waterToLightMap);
        const temperature = this.getMappedValue(
            light,
            maps.lightToTemperatureMap
        );
        const humidity = this.getMappedValue(
            temperature,
            maps.temperatureToHumidityMap
        );
        const location = this.getMappedValue(
            humidity,
            maps.humidityToLocationMap
        );

        return location;
    }

    solveForPartOne(input: string): string {
        const results: Array<number> = [];
        const seeds = this.getSeeds(input);
        const maps = this.getAllMaps(input);

        seeds.forEach((seed) => {
            results.push(this.getLocation(seed, maps));
        });

        return Math.min(...results).toString();
    }

    solveForPartTwo(input: string): string {
        const results: Array<number> = [];
        const seedRanges = this.getSeedRanges(input);
        const maps = this.getAllMaps(input);

        seedRanges.forEach(({ min, max }) => {
            let seed = min;
            for (seed; seed <= max; seed++) {
                results.push(this.getLocation(seed, maps));
            }
        });

        return Math.min(...results).toString();
    }
}

export default new Day5();
