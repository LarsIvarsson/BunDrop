import React from "react";
import CountdownTimer from "../components/CountdownTimer";

function Confirmation() {
  // hårdkodad väntetid satt till 30 sekunder (omräknat till ms)
  const estWait = 30 * 1000;
  // tidpunkt för beställning  (just nu)
  const orderPlaced = new Date().getTime();
  // uträkning för när maten ska vara framme (nu + 30sek)
  const estDelivery = orderPlaced + estWait;

  return (
    <div className="view-frame white-bg text-center">
      <h1>Tack för din beställning!</h1>
      <br />
      <hr />
      <span>
        Våra kockar steker din mat så snabbt det bara går och den beräknas vara
        hos dig om: <br />
        <CountdownTimer targetDate={estDelivery} />
      </span>
    </div>
  );
}

export default Confirmation;
