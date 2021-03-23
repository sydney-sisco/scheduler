import React, {useReducer, useEffect} from "react";
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


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
    
    // exampleSocket.onopen = function (event) {
    //   exampleSocket.send("ping");
    // };

    exampleSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      // console.log('Message Received:', JSON.parse(event.data));

      if (data.type === 'SET_INTERVIEW') {
        // console.log('setting interview');
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
