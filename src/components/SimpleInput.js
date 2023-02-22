import { useState } from "react";

const SimpleInput = (props) => {
  // const inputRef = useRef();
  const [nameError, setNameError] = useState(true);
  const [enteredName, setEnteredName] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [showEmailErrorText, setShowEmailErrorText] = useState(
    emailError && emailTouched
  );
  const [showNameErrorText, setShowNameErrorText] = useState(
    nameError && nameTouched
  );

  // let showNameErrorText = nameError && nameTouched;
  // let showEmailErrorText = emailError && emailTouched;

  const setErrorHandler = (args) => {
    args.setError(true);
    args.setShowErrorText(true);
    return setTimeout(() => {
      args.setShowErrorText(false);
    }, 1500);
  };

  const nameInputBlurHandler = () => {
    setNameTouched(true);
    if (nameError) {
      focusType = "name";
      setErrorHandler({
        setError: setNameError,
        setShowErrorText: setShowNameErrorText,
      });
    }
  };

  const emailInputBlurHandler = () => {
    setEmailTouched(true);
    if (emailError) {
      focusType = "email";
      setErrorHandler({
        setError: setEmailError,
        setShowErrorText: setShowEmailErrorText,
      });
    }
  };
  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
    if (e.target.value.trim().length === 0) {
      setNameError(true);
      // inputRef.current.style.border = "1px solid red";
      // inputRef.current.style.borderCorlor = "#240370";
    } else {
      setNameError(false);
      // inputRef.current.style.borderCorlor = "none";
      // inputRef.current.style.border = "1px solid black";
    }
  };

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
    if (
      e.target.value.trim().search("@") <= 0 ||
      e.target.value.trim().search("@") >= e.target.value.trim().length - 1
    ) {
      setEmailError(true);
      // inputRef.current.style.border = "1px solid red";
      // inputRef.current.style.borderCorlor = "#240370";
    } else {
      setEmailError(false);
      // inputRef.current.style.borderCorlor = "none";
      // inputRef.current.style.border = "1px solid black";
    }
  };

  let focusType = "";
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!emailError && !nameError) {
      console.log(
        "Submitting \nName : ",
        enteredName,
        "\nEmail : ",
        enteredEmail
      );
      setEnteredName("");
      setEnteredEmail("");
      setNameTouched(false);
      setEmailTouched(false);
      setEmailError(true);
      setNameError(true);
    }
  };

  let formError = true;
  if (!nameError && !emailError) {
    formError = false;
  }

  return (
    <form>
      <div className={`form-control ${nameTouched && nameError && "invalid"}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
          {...(focusType === "name" ? `focus='true'` : "")}
        />
      </div>
      {showNameErrorText && <p className="error-text">Invalid Name!</p>}
      <div
        className={`form-control ${emailTouched && emailError && "invalid"}`}
      >
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
          {...(focusType === "email" ? `focus='true'` : "")}
        />
      </div>
      {showEmailErrorText && <p className="error-text">Invalid Email!</p>}
      <div className="form-actions">
        <button onClick={formSubmitHandler} disabled={formError}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
