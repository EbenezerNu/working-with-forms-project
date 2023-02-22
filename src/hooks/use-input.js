import { useState } from "react";

const useInput = () => {
  const [inputError, setInputError] = useState(true);
  const [enteredInput, setEnteredInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);
  const [showErrorText, setShowErrorText] = useState(
    inputError && inputTouched
  );

  return {
    error: inputError,
    enteredInput: enteredInput,
    inputTouched: inputTouched,
    showError: showErrorText,
  };
};

export default useInput;
