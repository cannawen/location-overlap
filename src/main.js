function didUserVisit(data, targetPlaceId) {
  return data
    .timelineObjects
    .filter(timelineObject => timelineObject.placeVisit != undefined)
    .filter(timelineObject => timelineObject.placeVisit.location.placeId == targetPlaceId);
}

module.exports = {didUserVisit};
