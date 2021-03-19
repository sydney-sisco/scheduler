import React, {useState, useEffect} from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {
      setState({...state, appointments});
    })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      inverview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      setState({...state, appointments});
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

      setState(prev => ({
        ...prev,
        days: daysRes.data,
        appointments: appointmentsRes.data,
        interviewers: interviewersRes.data
      }));
    });
  }, []);
  
  
  return {state, setDay, bookInterview, cancelInterview};
};
