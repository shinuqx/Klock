import { useState, useEffect } from 'react';

// interface TimerOptions {
//   currentTime: number;
//   currentDate: number;
// }

export function useClock() {

  //   const onTimeUpRef  = useRef(timeString);
  // useEffect(() => {
  //   onTimeUpRef.current = timeString;
  // }, [timeString]);

  const now= new Date();
  let timeString = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit', 
    hour12: true,
  }) .format(now);

  let dateString = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(now);

  const [currentTime, setCurrentTime] = useState(timeString);
  const [currentDate, setDateTime] = useState(dateString);
  const refreshInterval= 5000;

  useEffect(() => {  
    const timerId = setInterval(() => setCurrentTime(timeString), refreshInterval);
    console.log(refreshInterval, "Hook- timeString",timeString);      
    return () => clearInterval(timerId);
}, [refreshInterval, timeString]);

  return {
    currentTime,
    currentDate
  };
}
