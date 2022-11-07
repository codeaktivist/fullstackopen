const average = require('../utils/testing').average

describe('average', () => {
    test('average of 1', () => {
        expect(average([1])).toBe(1)
    })

    test('average of many integers', () => {
        expect(average([1,2,3,4,5,6])).toBe(3.5)
    })

    test('average of an empty array', () => {
        expect(average([])).toBe(0)
    })
})