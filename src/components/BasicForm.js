import useInput from "../hooks/use-input";
const BasicForm = (props) => {
  const {
    isError: firstNameError,
    inputTouched: firstNameInputTouched,
    inputChangeHandler: firstNameInputChangeHandler,
    inputBlurhandler: firstNameInputBlurHandler,
    enteredInput: firstNameInputEntered,
    showError: showFirstNameError,
    resetInputHandler: firstNameInputResetHandler,
  } = useInput({
    onChange: (e) => e.target.value != null && e.target.value.trim().length > 0,
  });

  const {
    isError: lastNameError,
    inputTouched: lastNameInputTouched,
    inputChangeHandler: lastNameInputChangeHandler,
    inputBlurhandler: lastNameInputBlurHandler,
    enteredInput: lastNameInputEntered,
    showError: showLastNameError,
    resetInputHandler: lastNameInputResetHandler,
  } = useInput({
    onChange: (e) => e.target.value != null && e.target.value.trim().length > 0,
  });

  const {
    isError: emailError,
    inputTouched: emailInputTouched,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    enteredInput: emailInputEntered,
    showError: showEmailError,
    resetInputHandler: emailInputResetHandler,
  } = useInput({
    onChange: (e) =>
      e.target.value.trim().search("@") > 0 &&
      e.target.value.trim().search("@") < e.target.value.trim().length - 1,
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (emailError || firstNameError || lastNameError) {
      return;
    }
    console.log(
      "Submitting \n",
      "Name: ",
      firstNameInputEntered,
      " ",
      lastNameInputEntered,
      "\nEmail: ",
      emailInputEntered
    );
    firstNameInputResetHandler();
    lastNameInputResetHandler();
    emailInputResetHandler();
  };

  let formError = true;
  if (!firstNameError && !lastNameError && !emailError) {
    formError = false;
  }

  return (
    <form>
      <div className="control-group">
        <div
          className={`form-control ${
            firstNameInputTouched && firstNameError ? "invalid" : ""
          }`}
        >
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstNameInputEntered}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {showFirstNameError && (
            <p className="error-text">Invalid FirstName!</p>
          )}
        </div>
        <div
          className={`form-control ${
            lastNameInputTouched && lastNameError ? "invalid" : ""
          }`}
        >
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastNameInputEntered}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {showLastNameError && <p className="error-text">Invalid LastName!</p>}
        </div>
      </div>
      <div
        className={`form-control ${
          emailInputTouched && emailError ? "invalid" : ""
        }`}
      >
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={emailInputEntered}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {showEmailError && <p className="error-text">Invalid Email!</p>}
      </div>
      <div className="form-actions">
        <button disabled={formError} type="submit" onSubmit={formSubmitHandler}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
