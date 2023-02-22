import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const inputRef = useRef();
  const [error, setError] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);
  const setErrorHandler = () => {
    setError(true);
    setShowErrorText(true);
    setTimeout(() => {
      setShowErrorText(false);
    }, 1500);
  };

  const inputChangeHandler = (e) => {
    if (e.target.value.trim().length === 0) {
      setError(true);
      // inputRef.current.style.border = "1px solid red";
      // inputRef.current.style.borderCorlor = "#240370";
    } else {
      setError(false);
      // inputRef.current.style.borderCorlor = "none";
      // inputRef.current.style.border = "1px solid black";
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim().length === 0) {
      inputRef.current.focus();
      setErrorHandler();
    } else {
      setError(false);
      console.log("Submitting name " + inputRef.current.value);
      setEnteredName("");
    }
  };

  return (
    <form className={`${error ? "invalid" : ""}`}>
      {showErrorText && <p className="error-text">Invalid input!</p>}
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={inputRef}
          onChange={inputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button onClick={formSubmitHandler}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
