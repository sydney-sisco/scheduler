import React, {useState, useEffect} from "react";
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";

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

    const updateSpots = () => {
      
    };

    console.log('state.days:', state.days);

    const dayIndex = state.days.findIndex(day => day.name === state.day);
    console.log('day index for', state.day, 'is', dayIndex);

    const apptCount = 
      getAppointmentsForDay(state, state.day)
      .filter(day => day.interview !== null)
      .length
      + 1;
    
    console.log('booked appts for day:', apptCount);

    const day = {
      ...state.days[dayIndex],
      spots: 5 - apptCount
    }
    console.log('updated day obj:', day);

    const days = [...state.days];
    console.log('days array:',days);

    days[dayIndex].spots = apptCount;
    console.log('days array:',days);


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
