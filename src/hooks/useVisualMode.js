import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  const back = () => {
    if (history.length < 2) {
      return;
    }
    
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    })
  };
  
  const mode = (history.slice(-1)[0]);
  return { mode, transition, back };
};

// setHistory(prev => ([...prev, mode]))