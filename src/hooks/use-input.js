import { useState } from "react";

const setErrorHandler = (args) => {
  args.setError(true);
  args.setShowErrorText(true);
  return setTimeout(() => {
    args.setShowErrorText(false);
  }, 1500);
};

const useInput = (props) => {
  const [inputError, setInputError] = useState(true);
  const [enteredInput, setEnteredInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);
  const [showErrorText, setShowErrorText] = useState(
    inputError && inputTouched
  );

  const inputBlurHandler = () => {
    setInputTouched(true);
    if (inputError) {
      setErrorHandler({
        setError: setInputError,
        setShowErrorText: setShowErrorText,
      });
    }
  };

  const onChangeHandler = (e) => {
    setEnteredInput(e.target.value);
    if (props.onChange(e)) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const resetInputHandler = () => {
    setInputTouched(false);
    setInputError(true);
    setEnteredInput("");
  };

  return {
    isError: inputError,
    enteredInput: enteredInput,
    inputTouched: inputTouched,
    showError: showErrorText,
    inputBlurHandler: inputBlurHandler,
    inputChangeHandler: onChangeHandler,
    resetInputHandler: resetInputHandler,
  };
};

export default useInput;
