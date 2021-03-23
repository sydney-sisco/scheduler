import React, {useEffect} from 'react';
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  };

  function confirmDelete(){
    transition(DELETING, true);
    
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  //TODO: make this an anonymous function
  function tryDelete(){
    transition(CONFIRM);
  };

  useEffect(() => {
    if(props.interview && mode === EMPTY) {
      transition(SHOW);
    }

    if(!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode])

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={tryDelete}
            onEdit={()=>transition(EDIT)}
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
        {mode === CONFIRM && <Confirm 
          message={'Are you sure you want to delete?'}
          onConfirm={confirmDelete}
          onCancel={back}
        />}
        {mode === DELETING && <Status message={'Deleting'}/>}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && <Error message={'Cound not save appointment'} onClose={back}/>}
        {mode === ERROR_DELETE && <Error message={'Could not cancel appointment'} onClose={back}/>}
    </article>
  );
};
