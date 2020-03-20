function findOverlap(confirmedData, unconfirmedData) {
  return confirmedData.timelineObjects
    .filter(timelineObject => timelineObject.placeVisit != undefined)
    .map(timelineObject => timelineObject.placeVisit)
    .filter(placeVisit => didUserVisit(unconfirmedData, placeVisit.location.placeId, placeVisit.duration.startTimestampMs, placeVisit.duration.endTimestampMs))
}

function didUserVisit(unconfirmedData, confirmedPlaceId, confirmedStartTime, confirmedEndTime) {
  return unconfirmedData.timelineObjects
    .filter(timelineObject => timelineObject.placeVisit != undefined)
    .map(timelineObject => timelineObject.placeVisit)
    .filter(placeVisit => placeVisit.location.placeId == confirmedPlaceId)
    .filter(placeVisit => {
        const dataStartTime = placeVisit.duration.startTimestampMs;
        const dataEndTime = placeVisit.duration.endTimestampMs;

        const unconfirmedUserWasTherePriorToConfirmedTime = confirmedEndTime < dataStartTime;
        const unconfirmedUserWasThereAfterConfirmedTime = confirmedStartTime > dataEndTime;

        return !(unconfirmedUserWasTherePriorToConfirmedTime || unconfirmedUserWasThereAfterConfirmedTime);
      }
    ).length === 1;
}

module.exports = {didUserVisit, findOverlap};
