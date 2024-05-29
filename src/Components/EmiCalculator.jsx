import React, { useState } from "react";
import { tenureData } from "../Utils/Constants";
function EmiCalculator() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownpayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  function updateEMI(e) {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownpayment(dp.toFixed(0));
    //calculate emi and update it
    const emi = calculateEmi(dp);
    setEmi(emi);
  }
  function updateDownPayment(e) {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    //calculate dp and update it
    const dp = calculateDp(emi);
    setDownpayment(dp);
  }
  function calculateEmi(downPayment) {
    // emiAmt [P x R x (1+R)^N]/[(1+R)^N-1]
    if (!cost) return;
    const loanAmt = cost - downPayment;
    const rateOfInterset = interest / 100;
    const numOfYears = tenure / 12;
    const EMI =
      (loanAmt * rateOfInterset * (1 + rateOfInterset) ** numOfYears) /
      (1 + rateOfInterset) ** (numOfYears - 1);
    return Number(EMI / 12).toFixed(0);
  }
  function calculateDp(emi) {
    if (!cost) return;
  }
  return (
    <div className="mainClass">
      <span className="title">EMI Calculator</span>
      <span className="title">Total Cost Of Asset</span>
      <input
        type="number"
        placeholder="Total Cost of Assets"
        value={cost}
        onChange={(e) => {
          setCost(e.target.value);
        }}
      />
      <span className="title">Interset Rate(in %)</span>
      <input
        type="number"
        value={interest}
        onChange={(e) => {
          setInterest(e.target.value);
        }}
      />
      <span className="title">Processing Fee(in %)</span>
      <input
        type="number"
        value={fee}
        onChange={(e) => {
          setFee(e.target.value);
        }}
      />
      <span className="title">Down Payment</span>
      <div>
        <input
          type="range"
          value={downPayment}
          onChange={updateEMI}
          min={0}
          max={cost}
          className="slider"
        />
        <div className="labels">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>
      <span className="title">Loan Per Month</span>
      <div>
        <input
          type="range"
          min={calculateEmi(cost)}
          max={calculateEmi(0)}
          value={emi}
          onChange={updateDownPayment}
          className="slider"
        />
        <div className="labels">
          <label>{calculateEmi(cost)}</label>
          <b>{emi}</b>
          <label>{calculateEmi(0)}</label>
        </div>
      </div>
      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => {
                setTenure(t);
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default EmiCalculator;
