import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

/*
InterviewerListItem component displays the avatar
(and name, if selected) of an individual interviewer.
It is displayed within the InterviewerList component.
*/

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
