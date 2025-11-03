import React, { useState } from "react";
import "./App.css";

export default function LoanEligibilityChecker() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [existingEMI, setExistingEMI] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [result, setResult] = useState("");
  const [color, setColor] = useState("");

  const handleCheckEligibility = () => {
    if (!name || !age || !salary || !existingEMI || !loanAmount) {
      setResult("❌ Please fill all fields.");
      setColor("red");
      return;
    }

    const ageNum = parseInt(age);
    const salaryNum = parseFloat(salary);
    const existingEMINum = parseFloat(existingEMI);
    const loanAmountNum = parseFloat(loanAmount);

    if (ageNum < 21 || ageNum > 60) {
      setResult("❌ Not Eligible: Age must be between 21 and 60.");
      setColor("red");
      return;
    }

    if (loanAmountNum > 10 * salaryNum) {
      setResult("❌ Not Eligible: Loan exceeds 10 × monthly salary.");
      setColor("red");
      return;
    }

    const proposedEMI = loanAmountNum * 0.1;
    const DTI = ((existingEMINum + proposedEMI) / salaryNum) * 100;

    if (DTI > 60) {
      setResult(`❌ Not Eligible: DTI = ${DTI.toFixed(2)}% exceeds 60%.`);
      setColor("red");
    } else {
      setResult(`✅ Eligible! DTI = ${DTI.toFixed(2)}%`);
      setColor("green");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🏦 Loan Eligibility Checker</h2>

        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />

        <label>Monthly Salary</label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />

        <label>Existing EMI / Debts</label>
        <input type="number" value={existingEMI} onChange={(e) => setExistingEMI(e.target.value)} />

        <label>Loan Amount Requested</label>
        <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />

        <button onClick={handleCheckEligibility}>Check Loan Eligibility</button>

        {result && <p className="result" style={{ color }}>{result}</p>}
      </div>
    </div>
  );
}
