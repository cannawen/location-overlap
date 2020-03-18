const fs = require('fs');

const {didUserVisit} = require('../src/main');

describe('Google Location History Takeout data file', () => {
  describe('has user been to specific placeId', () => {
    let testData;

    beforeEach(() => {
      testData = JSON.parse(fs.readFileSync('./test/data/data.json', 'utf8'))
    })

    test('yes', () => {
      expect(didUserVisit(testData, "ABCTestPlaceId")).toBe(true);
    })

    test('no', () => {
      expect(didUserVisit(testData, "XYZTestPlaceId")).toBe(false);
    })
  })
})
