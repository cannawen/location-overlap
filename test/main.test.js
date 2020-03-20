let fs = require('fs');

let {didUserVisit, findOverlap} = require('../src/main');

describe('Two data sets', () => {
  let confirmedData;
  let unconfirmedData;

  beforeEach(() => {
    confirmedData = JSON.parse(fs.readFileSync('./test/data/confirmedData.json', 'utf8'))
    unconfirmedData = JSON.parse(fs.readFileSync('./test/data/unconfirmedData.json', 'utf8'))
  })

  test('find overlap', () => {
    expect(findOverlap(confirmedData, unconfirmedData)).toEqual([{
        "placeId": "DEFTestPlaceId", 
        "startTimestampMs" : 3500,
        "endTimestampMs" : 4000
      }, {
        "placeId": "ABCTestPlaceId", 
        "startTimestampMs" : 7500,
        "endTimestampMs" : 7600
      }])
  })
})

describe('has user been to specific placeId', () => {
  let testData;

  beforeEach(() => {
    testData = JSON.parse(fs.readFileSync('./test/data/unconfirmedData.json', 'utf8'))
  })

  test('user did not visit place at all', () => {
    expect(didUserVisit(testData, "XYZTestPlaceId", 0, 1000000)).toBe(false);
  })

  test('user visited before target time', () => {
    expect(didUserVisit(testData, "ABCTestPlaceId", 0, 500)).toBe(false);
  })

  test('user visited after target time', () => {
    expect(didUserVisit(testData, "ABCTestPlaceId", 2500, 3500)).toBe(false);
  })

  test('user was there during target time', () => {
    expect(didUserVisit(testData, "ABCTestPlaceId", 900, 2100)).toBe(true);
    expect(didUserVisit(testData, "ABCTestPlaceId", 1100, 1900)).toBe(true);
    expect(didUserVisit(testData, "ABCTestPlaceId", 900, 1900)).toBe(true);
    expect(didUserVisit(testData, "ABCTestPlaceId", 1100, 2100)).toBe(true);
  })

})

