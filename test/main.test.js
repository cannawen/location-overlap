let fs = require('fs');

let {didUserVisit} = require('../src/main');

describe('Google Location History Takeout data file', () => {
  describe('has user been to specific placeId', () => {
    let testData;

    beforeEach(() => {
      testData = JSON.parse(fs.readFileSync('./test/data/data.json', 'utf8'))
    })

    test('user did not visit place at all', () => {
      expect(didUserVisit(testData, "XYZTestPlaceId", 0, 1000000).length).toBe(0);
    })

    test('user visited before target time', () => {
      expect(didUserVisit(testData, "ABCTestPlaceId", 0 ,500).length).toBe(0);
    })

    test('user visited after target time', () => {
      expect(didUserVisit(testData, "ABCTestPlaceId", 2500, 3500).length).toBe(0);
    })

    test('user was there during target time', () => {      
      expect(didUserVisit(testData, "ABCTestPlaceId", 900, 2100).length).toBe(1);
      expect(didUserVisit(testData, "ABCTestPlaceId", 1100, 1900).length).toBe(1);
      expect(didUserVisit(testData, "ABCTestPlaceId", 900, 1900).length).toBe(1);
      expect(didUserVisit(testData, "ABCTestPlaceId", 1100, 2100).length).toBe(1);
    })

  })
})
