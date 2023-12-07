import day5 from './index';

const mockInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

const mockSeedToSoilMap = [
    { min: 50, max: 97, offset: 2 },
    { min: 98, max: 99, offset: -48 },
];

const mockSoilToFertilizerMap = [
    { min: 0, max: 14, offset: 39 },
    { min: 15, max: 51, offset: -15 },
    { min: 52, max: 53, offset: -15 },
];

const mockOutputPartOne = '35';
const mockOutputPartTwo = '46';

describe('On Day 5', () => {
    it('gets all the seeds', () => {
        expect(day5.getSeeds(mockInput)).toEqual([79, 14, 55, 13]);
    });

    it('gets all the seed ranges', () => {
        expect(day5.getSeedRanges(mockInput)).toEqual([
            { min: 79, max: 92 },
            { min: 55, max: 67 },
        ]);
    });

    it('gets the maps of a category', () => {
        expect(day5.getMap(mockInput, 'seed-to-soil')).toEqual(
            mockSeedToSoilMap
        );

        expect(day5.getMap(mockInput, 'soil-to-fertilizer')).toEqual(
            mockSoilToFertilizerMap
        );
    });

    it('gets the mapped value of a category', () => {
        expect(day5.getMappedValue(79, mockSeedToSoilMap)).toEqual(81);
        expect(day5.getMappedValue(14, mockSeedToSoilMap)).toEqual(14);
        expect(day5.getMappedValue(55, mockSeedToSoilMap)).toEqual(57);
        expect(day5.getMappedValue(13, mockSeedToSoilMap)).toEqual(13);

        expect(day5.getMappedValue(81, mockSoilToFertilizerMap)).toEqual(81);
        expect(day5.getMappedValue(14, mockSoilToFertilizerMap)).toEqual(53);
        expect(day5.getMappedValue(57, mockSoilToFertilizerMap)).toEqual(57);
        expect(day5.getMappedValue(13, mockSoilToFertilizerMap)).toEqual(52);
    });

    it('gets the location of a seed', () => {
        expect(day5.getLocation(79, day5.getAllMaps(mockInput))).toEqual(82);
        expect(day5.getLocation(14, day5.getAllMaps(mockInput))).toEqual(43);
    });

    it('shows the lowest location number of any of the seeds', () => {
        expect(day5.solveForPartOne(mockInput)).toBe(mockOutputPartOne);
    });

    it('shows the lowest location number of any of the seeds', () => {
        expect(day5.solveForPartTwo(mockInput)).toBe(mockOutputPartTwo);
    });
});
