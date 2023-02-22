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
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  return {
    error: {
      value: inputError,
      setState: setInputError,
    },
    enteredInput: {
      value: enteredInput,
      setState: setEnteredInput,
    },
    inputTouched: {
      value: inputTouched,
      setState: setInputTouched,
    },
    showError: {
      value: showErrorText,
      setState: setShowErrorText,
    },
    inputBlurHandler: inputBlurHandler,
    inputChangeHandler: onChangeHandler,
  };
};

export default useInput;
