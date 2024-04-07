type DebounceFunction = <Parameter extends any[]>(
  cb: (...args: Parameter) => void,
  delay?: number
) => (...args: Parameter) => void;

const debounce: DebounceFunction = (cb, delay = 1000) => {
  let timeOut: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export default debounce;
