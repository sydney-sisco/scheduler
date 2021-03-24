import React from "react";
import DayListItem from "components/DayListItem";

/*
DayList component holds the contents of the app's
sidebar. It shows a list of days and their spots
remaining.
*/

export default function DayList(props) {
  const dayListItems = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));

  return <ul>{dayListItems}</ul>;
}
