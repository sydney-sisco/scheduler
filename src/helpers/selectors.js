export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(element => element.name === day)

  if (!dayObj) {
    return []
  }

  return dayObj.appointments.map(appointmentID => state.appointments[appointmentID]);
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  console.log('interviewer from state:', state.interviewers[interview.interviewer]);
  console.log('interview:', interview);

  const returnObj = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]

  }

  console.log('returning:', returnObj);

  return returnObj;
}