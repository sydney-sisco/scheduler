import React from 'react';
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((response) => {
      //TODO: Do I need this?
      console.log('catch:', response);
    })
  };

  function cancel(){
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      console.log('???');
      transition(EMPTY);
      console.log('!!!');
    })
    .catch((response) => {
      //TODO: Do I need this?
      console.log('catch:', response);
    });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={cancel}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message={'Saving'}/>}
        {mode === DELETING && <Status message={'Deleting'}/>}
    </article>
  );
};
