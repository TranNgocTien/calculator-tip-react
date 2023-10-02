import "./styles.css";
import { useState } from "react";
export default function App() {
  const [cost, setCost] = useState(0);
  const [yourService, setYourService] = useState(0);
  const [friendService, setFriendService] = useState(0);

  function calcTotalPercentTip() {
    return (
      (Number(yourService) + Number(friendService)) /
      (yourService === 0 || friendService === 0 ? 1 : 2)
    );
  }
  let percentTip = calcTotalPercentTip();
  function calcTotalPay() {
    return Number(cost) + Number(cost) * (Number(percentTip) / 100);
  }
  let totalPay = calcTotalPay();
  return (
    <div className="App">
      <BillCost onSetCost={setCost} cost={cost} />
      <YourService
        yourService={yourService}
        onSetYourService={setYourService}
      />
      <FriendService
        friendService={friendService}
        onSetFriendService={setFriendService}
      />
      {cost > 0 || yourService > 0 || friendService > 0 ? (
        <h1>
          You pay ${totalPay} (${cost} + ${percentTip} tip)
        </h1>
      ) : (
        ""
      )}
      <ButtonReset
        onSetCost={setCost}
        onSetYourService={setYourService}
        onSetFriendServcice={setFriendService}
      />
    </div>
  );
}

function BillCost({ onSetCost, cost }) {
  function handleClick(e) {
    onSetCost(e.target.value);
  }
  return (
    <div style={{ display: "flex" }}>
      <p>How much was the bill?</p>
      <input type="text" value={cost} onChange={(e) => handleClick(e)} />
    </div>
  );
}

function YourService({ yourService, onSetYourService }) {
  return (
    <div style={{ display: "flex" }}>
      <p>How did you like the service?</p>
      <OptionService onSetService={onSetYourService} service={yourService} />
    </div>
  );
}

function FriendService({ onSetFriendService, yourService }) {
  return (
    <div style={{ display: "flex" }}>
      <p>How đi your friend like the service?</p>

      <OptionService service={yourService} onSetService={onSetFriendService} />
    </div>
  );
}

function OptionService({ onSetService, service }) {
  function handleSubmit(e) {
    onSetService(e.target.value);
  }
  return (
    <select value={service} onChange={(e) => handleSubmit(e)}>
      <option value="0">Dissatisfied (0%)</option>
      <option value="5">It was okay (5%)</option>
      <option value="10">It was good (10%)</option>
      <option value="20">Absolutely amazing! (20%)</option>
    </select>
  );
}

function ButtonReset({ onSetCost, onSetYourService, onSetFriendServcice }) {
  function handleReset() {
    onSetCost(0);
    onSetYourService(0);
    onSetFriendServcice(0);
  }
  return <button onClick={handleReset}>Reset</button>;
}
