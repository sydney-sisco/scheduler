import React from "react";

/*
Empty component is shown in spots that do not
have a booked appointment. It displays an image 
that can be clicked to display the Form.
*/

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
