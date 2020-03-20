function didUserVisit(data, targetPlaceId) {
  return data
    .timelineObjects
    .filter(timelineObject => timelineObject.placeVisit != undefined)
    .map(timelineObject => timelineObject.placeVisit.location.placeId)
    .find(placeId => placeId === targetPlaceId) != undefined;
}

module.exports = {didUserVisit};
