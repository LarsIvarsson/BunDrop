import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "../hooks/useCountdown";

const DeliverNotice = () => {
  return (
    <div className="deliver-notice">
      <p>Maten är levererad!</p>
    </div>
  );
};

const ShowCounter = ({ hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <DateTimeDisplay value={hours} type={"Timmar"} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Minuter"} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Sekunder"} />
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [hours, minutes, seconds] = useCountdown(targetDate);

  if (hours + minutes + seconds <= 0) {
    return <DeliverNotice />;
  } else {
    return <ShowCounter hours={hours} minutes={minutes} seconds={seconds} />;
  }
};

export default CountdownTimer;
