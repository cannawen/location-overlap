function didUserVisit(data, targetPlaceId, startTime, endTime) {
  return data
    .timelineObjects
    .filter(timelineObject => timelineObject.placeVisit != undefined)
    .map(timelineObject => timelineObject.placeVisit)
    .filter(placeVisit => placeVisit.location.placeId == targetPlaceId)
    .filter(placeVisit => {
        const dataStartTime = placeVisit.duration.startTimestampMs;
        const dataEndTime = placeVisit.duration.endTimestampMs;

        const userWasTherePriorToDataTime = endTime < dataStartTime;
        const userWasThereAfterToDataTime = startTime > dataEndTime;

        return !(userWasThereAfterToDataTime || userWasTherePriorToDataTime);
      }
    );
}

module.exports = {didUserVisit};
