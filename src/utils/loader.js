function getButtonText(buttonText, tail, button) {
  return /\w*e\b/.test(buttonText)
    ? /\w*e\b/.exec(buttonText).toString().replace(/\w\b/, tail)
    : button.textContent.toString() + tail;
}

export const loader = ({
  dots,
  completeTimeDelay,
  buttonSelector,
  clickHandler,
  callbackEnd = () => {},
  onError = () => {},
  onSuccess = () => {},
}) => {
  const { interval, count } = dots;
  const button = buttonSelector;
  button.setAttribute("disabled", true);
  const buttonText = button.textContent.toString();
  const buttonStateProcessing = getButtonText(buttonText, "ing", button);
  const buttonStateComplete = getButtonText(buttonText, "ed", button);

  button.textContent = buttonStateProcessing;
  const loop = () => {
    button.textContent =
      button.textContent.length > buttonStateProcessing.length + count
        ? `${buttonStateProcessing}`
        : button.textContent + ".";
  };
  let intervalController = setInterval(loop, interval);

  clickHandler()
    .then((res) => {
      clearInterval(intervalController);
      button.textContent = `${buttonStateComplete} successfully`;
      setTimeout(() => {
        onSuccess();
      }, completeTimeDelay);
    })
    .catch((res) => {
      button.textContent = `Failed`;
      setTimeout("", completeTimeDelay * 2);
      clearInterval(intervalController);
      console.log(res);
    })
    .finally(() => {
      setTimeout(() => {
        callbackEnd();
      }, completeTimeDelay);

      setTimeout(() => {
        button.textContent = `${buttonText}`;
        button.removeAttribute("disabled");
      }, completeTimeDelay * 2);
    });
};
