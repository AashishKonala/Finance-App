import { useState } from "react";

function App() {
  const [salary, setSalary] = useState("");
  const [expense, setExpense] = useState("");

  const handleSubmit = () => {
    alert(`Salary: ${salary}, Expense: ${expense}`);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Finance Manager 💰</h1>

      <div style={{ margin: "10px" }}>
        <input
          type="number"
          placeholder="Enter Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      <div style={{ margin: "10px" }}>
        <input
          type="number"
          placeholder="Enter Expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Calculate</button>
    </div>
  );
}

export default App;
