import useInput from "../hooks/use-input";
const BasicForm = (props) => {
  const {
    isError: firstNameError,
    inputTouched: firstNameInputTouched,
    inputChangeHandler: firstNameInputChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    enteredInput: firstNameInputEntered,
    showError: showFirstNameError,
    resetInputHandler: firstNameInputResetHandler,
  } = useInput({
    onChange: (e) => e.target.value != null && e.target.value.trim().length > 0,
  });

  const {
    isError: lastNameError,
    inputTouched: lastNameInputTouched,
    enteredInput: lastNameInputEntered,
    showError: showLastNameError,
    inputChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    resetInputHandler: lastNameInputResetHandler,
  } = useInput({
    onChange: (e) => e.target.value.trim().length > 0,
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

  const {
    isError: passwordError,
    inputTouched: passwordInputTouched,
    enteredInput: passwordInputEntered,
    showError: showPasswordError,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    resetInputHandler: passwordInputResetHandler,
  } = useInput({
    onChange: (e) => e.target.value.trim().length > 8,
  });

  const {
    isError: confirmPasswordError,
    inputTouched: confirmPasswordInputTouched,
    enteredInput: confirmPasswordInputEntered,
    showError: showConfirmPasswordError,
    inputChangeHandler: confirmPasswordInputChangeHandler,
    inputBlurHandler: confirmPasswordInputBlurHandler,
    resetInputHandler: confirmPasswordInputResetHandler,
  } = useInput({
    onChange: (e) =>
      e.target.value.trim().length > 8 &&
      e.target.value.trim() === passwordInputEntered,
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (emailError || firstNameError || lastNameError || confirmPasswordError) {
      return;
    }
    console.log(
      "Submitting \n",
      "Name: ",
      firstNameInputEntered,
      " ",
      lastNameInputEntered,
      "\nEmail: ",
      emailInputEntered,
      "\nPassword: ",
      passwordInputEntered
    );
    firstNameInputResetHandler();
    lastNameInputResetHandler();
    emailInputResetHandler();
    passwordInputResetHandler();
    confirmPasswordInputResetHandler();
  };

  let formError = true;
  if (
    !firstNameError &&
    !lastNameError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError
  ) {
    formError = false;
  }

  return (
    <form className="basic-form">
      {/* <div className="control-group"> */}
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
        {showFirstNameError && <p className="error-text">Invalid FirstName!</p>}
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
      {/* </div> */}
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
      <div
        className={`form-control ${
          passwordInputTouched && passwordError ? "invalid" : ""
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={passwordInputEntered}
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
        />
        {showPasswordError && <p className="error-text">Invalid Password!</p>}
      </div>
      <div
        className={`form-control ${
          confirmPasswordInputTouched && confirmPasswordError ? "invalid" : ""
        }`}
      >
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPasswordInputEntered}
          onChange={confirmPasswordInputChangeHandler}
          onBlur={confirmPasswordInputBlurHandler}
        />
        {showConfirmPasswordError && (
          <p className="error-text">Invalid Confirm Password!</p>
        )}
      </div>
      <div className="form-control">
        <div className="form-actions">
          <button
            disabled={formError}
            type="button"
            onClick={formSubmitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
