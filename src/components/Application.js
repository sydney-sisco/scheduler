import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Dude McTester",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Foo Bar",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

export default function Application(props) {

  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState('Monday');

  // combine the state for day, days, and appointments into a state

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    // appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  
  // const setDays = days => setState({ ...state, days });
  const setDays = days => setState(prev => ({ ...prev, days }));
  
  useEffect(() => {
    const url = `/api/days`;

    axios.get(url)
    .then((response) => {
      setDays([...response.data]);
    })
    .catch((response) => {
      console.log('catch:', response);
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {
          appointments.map((appointment) => <Appointment key={appointment.id} {...appointment} />)
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
