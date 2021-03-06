import React from "react";

/*
Status component is shown when asynchronous 
actions are occuring, such as saving changes
to the server.
*/

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  )
}
