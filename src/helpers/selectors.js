export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  // return state.days.find(element => element.name === day)
  // .appointments
  // .map(appointmentID => state.appointments[appointmentID]);
  // console.log('yo?', appointmentsIDsForDay);

  const appointmentsIDsForDay = state.days.find(element => element.name === day)

  if (!appointmentsIDsForDay) {
    return []
  }

  return appointmentsIDsForDay.appointments.map(appointmentID => state.appointments[appointmentID]);
}
