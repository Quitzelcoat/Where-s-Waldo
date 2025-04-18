/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Timer = ({ start, onTick }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!start) {
      setSeconds(0);
      return;
    }
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => {
    if (onTick) onTick(seconds);
  }, [seconds, onTick]);

  return <div className="timer">Time: {seconds}s</div>;
};

export default Timer;
