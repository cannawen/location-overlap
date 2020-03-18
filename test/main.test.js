const {didUserVisit} = require('../src/main');

describe('Google Location History Takeout data file', () => {
  describe('has user been to specific location', () => {
    test('yes', () => {
      const testData = 
      { 
        "timelineObjects" : 
        [
          {
            "placeVisit" :
            {
              "placeId" : "ABCTestPlaceId"
            }
          }
        ]
      }
      expect(didUserVisit(testData, "ABCTestPlaceId")).toBe(true);
    })
    test('no', () => {
      const testData = 
      { 
        "timelineObjects" : 
        [
          {
            "placeVisit" :
            {
              "placeId" : "ABCTestPlaceId"
            }
          }
        ]
      }
      expect(didUserVisit(testData, "XYZTestPlaceId")).toBe(false);
    })
  })
})
