import React, {useReducer, useEffect} from "react";
import axios from 'axios';


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
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
        interview: { ...action.interview }
      };
  
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      return {...state, appointments}
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      inverview: null
    };

    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    })
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      const [daysRes, appointmentsRes, interviewersRes] = all;
      console.log(daysRes.data, appointmentsRes.data, interviewersRes.data);

      dispatch({ 
        type: SET_APPLICATION_DATA,
        days: daysRes.data,
        appointments: appointmentsRes.data,
        interviewers: interviewersRes.data
      });
    });
  }, []);
  
  return {state, setDay, bookInterview, cancelInterview};
};
