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

  const updateSpots = (dayName, days, appointments) => {
    const spots = days
      .find(day => day.name === dayName)
      .appointments
      .reduce((spots, appointmentID)=>
        !appointments[appointmentID].interview ? ++spots : spots
        , -1); // -1 only works for saving,not deleting..
    
    // console.log('spots:', spots);

    const newDays = days.map(days => {
      if (days.name === dayName) {
        return { ...days, spots }
      }
      return days;
    })
    return newDays;
  };

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
      const days = updateSpots(state.day, state.days, state.appointments);
      setState({...state, appointments, days});
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

      // const days = updateSpots(state.day, state.days, state.appointments);
      // setState({...state, appointments, days});
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
