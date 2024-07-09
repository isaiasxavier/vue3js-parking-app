export function sortParkingsByStopDesc(parkings) {
  return parkings.sort((a, b) => new Date(b.stop_time) - new Date(a.stop_time))
}

export function sortParkingsByStartTimeDesc(parkings) {
  return parkings.sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
}
