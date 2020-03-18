function didUserVisit(data, targetPlaceId) {
  return data
    .timelineObjects
    .map(timelineObject => timelineObject.placeVisit.location.placeId)
    .find(placeId => placeId === targetPlaceId) != undefined;
}

module.exports = {didUserVisit};
