export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW:
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview ? { ...action.interview } : null
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      const days = updateSpots(state.day, state.days, appointments);

      return {...state, appointments, days}
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

const updateSpots = (dayName, days, appointments) => {
  const spots = days
    .find(day => day.name === dayName)
    .appointments
    .reduce((spots, appointmentID)=>
      !appointments[appointmentID].interview ? ++spots : spots
      , 0);

  const newDays = days.map(days => {
    if (days.name === dayName) {
      return { ...days, spots }
    }
    return days;
  })
  return newDays;
};
