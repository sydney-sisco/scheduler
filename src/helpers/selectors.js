/*
getAppointmentsForDay returns an array of appointment objects
for a given day.
*/
export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(element => element.name === day)

  if (!dayObj) {
    return []
  }

  return dayObj.appointments.map(appointmentID => state.appointments[appointmentID]);
}

/*
getInterview returns an object with interview and interviewer
data, or null if the interview does not exist.
*/
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  };
}

/*
getInterviewersForDay returns an array of interviewer objects
for a given day.
*/
export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(element => element.name === day)

  if (!dayObj) {
    return []
  }

  return dayObj.interviewers.map(appointmentID => state.interviewers[appointmentID]);
}
