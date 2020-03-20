let fs = require('fs');

function findOverlap(confirmedDataFilePath, unconfirmedDataFilePath) {
  const confirmedData = JSON.parse(fs.readFileSync(confirmedDataFilePath, 'utf8'))
  const unconfirmedData = JSON.parse(fs.readFileSync(unconfirmedDataFilePath, 'utf8'))
  return confirmedData.timelineObjects
    .filter(timelineObject => timelineObject.placeVisit != undefined)
    .map(timelineObject => timelineObject.placeVisit)
    .reduce((memo, placeVisit) => {
      const unconfirmedVisit = findUserVisit(unconfirmedData, placeVisit.location.placeId, placeVisit.duration.startTimestampMs, placeVisit.duration.endTimestampMs)[0];
      if (unconfirmedVisit != undefined) {
        memo.push({
          "placeId": placeVisit.location.placeId,
          "startTimestampMs": Math.max(placeVisit.duration.startTimestampMs, unconfirmedVisit.duration.startTimestampMs),
          "endTimestampMs": Math.min(placeVisit.duration.endTimestampMs, unconfirmedVisit.duration.endTimestampMs)
        });
      }
      return memo;
    }, [])
}

function findUserVisit(unconfirmedData, confirmedPlaceId, confirmedStartTime, confirmedEndTime) {
  return unconfirmedData.timelineObjects
    .filter(timelineObject => timelineObject.placeVisit != undefined)
    .map(timelineObject => timelineObject.placeVisit)
    .filter(placeVisit => placeVisit.location.placeId == confirmedPlaceId)
    .filter(placeVisit => {
        const dataStartTime = parseInt(placeVisit.duration.startTimestampMs, 10);
        const dataEndTime = parseInt(placeVisit.duration.endTimestampMs, 10);

        return dataStartTime < confirmedEndTime && confirmedStartTime < dataEndTime;
      }
    )
}

function didUserVisit(unconfirmedData, confirmedPlaceId, confirmedStartTime, confirmedEndTime) {
  return findUserVisit(unconfirmedData, confirmedPlaceId, confirmedStartTime, confirmedEndTime).length === 1;
}

module.exports = {didUserVisit, findOverlap};
