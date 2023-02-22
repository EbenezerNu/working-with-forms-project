// import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    isError: nameError,
    enteredInput: nameEnteredInput,
    inputTouched: nameTouched,
    showError: showNameError,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
    resetInputHandler: nameResetHandler,
  } = useInput({
    onChange: (e) => e.target.value != null && e.target.value.trim().length > 0,
  });

  const {
    isError: emailError,
    enteredInput: emailEnteredInput,
    inputTouched: emailTouched,
    showError: showEmailError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    resetInputHandler: emailResetHandler,
  } = useInput({
    onChange: (e) =>
      e.target.value.trim().search("@") > 0 &&
      e.target.value.trim().search("@") < e.target.value.trim().length - 1,
  });

  // let focusType = "";
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!emailError && !nameError) {
      console.log(
        "Submitting \nName : ",
        nameEnteredInput,
        "\nEmail : ",
        emailEnteredInput
      );

      nameResetHandler();
      emailResetHandler();
    }
  };

  let formError = true;
  if (!nameError && !emailError) {
    formError = false;
  }

  return (
    <form>
      <div
        className={`form-control ${nameTouched && nameError ? "invalid" : ""}`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameEnteredInput}
          // {...(focusType === "name" ? `focus='true'` : "")}
        />
      </div>
      {showNameError && <p className="error-text">Invalid Name!</p>}
      <div
        className={`form-control ${
          emailTouched && emailError ? "invalid" : ""
        }`}
      >
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailEnteredInput}
          // {...(focusType === "email" ? `focus='true'` : "")}
        />
      </div>
      {showEmailError && <p className="error-text">Invalid Email!</p>}
      <div className="form-actions">
        <button onClick={formSubmitHandler} disabled={formError}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
