import { useState, useEffect } from "react";

export function getTimeElapsed(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return [hours, minutes, seconds].map((v) => v.toString().padStart(2, "0")).join(":");
}

interface TimeElapsedProps {
  readonly date: Date;
  readonly className?: string;
}

export function TimeElapsed({ date, className }: TimeElapsedProps) {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    const updateElapsedTime = () => {
      setElapsedTime(getTimeElapsed(date));
    };

    updateElapsedTime();
    const intervalId = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(intervalId);
  }, [date]);

  return <div className={className}>{elapsedTime}</div>;
}
