import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = newMode => {
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  }

  const back = () => {
    // setMode(history.pop());
    // setHistory(prev => prev.slice(0, -1));
    console.log(mode, history);
    setMode(history[history.length-2]);
    setHistory(prev => prev.slice(0, -1));
  };

  return { mode, transition, back };
};
