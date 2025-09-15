import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");

  // Handle button clicks
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Clear input
  const clearInput = () => {
    setInput("");
  };

  // Calculate result
  const calculate = () => {
    try {
      setInput(eval(input).toString()); // simple eval usage
    } catch {
      setInput("Error");
    }
  };

  // 🔹 Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        // If key is a number or operator
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        event.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        clearInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "300px" }}>
        <h3 className="text-center mb-3">🧮 Calculator</h3>

        {/* Display */}
        <input
          type="text"
          value={input}
          className="form-control mb-3 text-end"
          readOnly
        />

        {/* Buttons */}
        <div className="d-grid gap-2">
          <div className="d-flex gap-2">
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("7")}>7</button>
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("8")}>8</button>
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("9")}>9</button>
            <button className="btn btn-warning flex-fill" onClick={() => handleClick("/")}>÷</button>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("4")}>4</button>
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("5")}>5</button>
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("6")}>6</button>
            <button className="btn btn-warning flex-fill" onClick={() => handleClick("*")}>×</button>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("1")}>1</button>
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("2")}>2</button>
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("3")}>3</button>
            <button className="btn btn-warning flex-fill" onClick={() => handleClick("-")}>−</button>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick("0")}>0</button>
            <button className="btn btn-secondary flex-fill" onClick={() => handleClick(".")}>.</button>
            
          {/* Clear Button */}
          <button className="btn btn-danger flex-fill" onClick={clearInput}>C</button>
            <button className="btn btn-warning flex-fill" onClick={() => handleClick("+")}>+</button>
          </div>
            <button className="btn btn-success flex-fill" onClick={calculate}>=</button>

        </div>
      </div>
    </div>
  );
}

export default App;
