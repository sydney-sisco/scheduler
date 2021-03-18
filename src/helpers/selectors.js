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

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  };
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(element => element.name === day)

  if (!dayObj) {
    return []
  }

  return dayObj.interviewers.map(appointmentID => state.interviewers[appointmentID]);
}
