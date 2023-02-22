// import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    error: nameError,
    enteredInput: nameEnteredInput,
    inputTouched: nameTouched,
    showError: showNameError,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
  } = useInput({
    onChange: (e) => e.target.value.trim().length === 0,
  });

  const {
    error: emailError,
    enteredInput: emailEnteredInput,
    inputTouched: emailTouched,
    showError: showEmailError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
  } = useInput({
    onChange: (e) =>
      e.target.value.trim().search("@") <= 0 ||
      e.target.value.trim().search("@") >= e.target.value.trim().length - 1,
  });

  // let focusType = "";
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!emailError.value && !nameError.value) {
      console.log(
        "Submitting \nName : ",
        nameEnteredInput.value,
        "\nEmail : ",
        emailEnteredInput.value
      );
      nameEnteredInput.setState("");
      emailEnteredInput.setState("");
      nameTouched.setState(false);
      emailTouched.setState(false);
      emailError.setState(true);
      nameError.setState(true);
    }
  };

  let formError = true;
  if (!nameError.value && !emailError.value) {
    formError = false;
  }

  return (
    <form>
      <div
        className={`form-control ${
          nameTouched.value && nameError.value && "invalid"
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameEnteredInput.value}
          // {...(focusType === "name" ? `focus='true'` : "")}
        />
      </div>
      {showNameError.value && <p className="error-text">Invalid Name!</p>}
      <div
        className={`form-control ${
          emailTouched.value && emailError.value && "invalid"
        }`}
      >
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailEnteredInput.value}
          // {...(focusType === "email" ? `focus='true'` : "")}
        />
      </div>
      {showEmailError.value && <p className="error-text">Invalid Email!</p>}
      <div className="form-actions">
        <button onClick={formSubmitHandler} disabled={formError}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
