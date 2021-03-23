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
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    })
  };

  useEffect(() => {

    var exampleSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    
    exampleSocket.onopen = function (event) {
      exampleSocket.send("ping");
    };

    exampleSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log('Message Received:', JSON.parse(event.data));

      if (data.type === 'SET_INTERVIEW') {
        console.log('setting interview');
        dispatch({ type: SET_INTERVIEW, id: data.id, interview: data.interview });
      }
    }

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      const [daysRes, appointmentsRes, interviewersRes] = all;

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
