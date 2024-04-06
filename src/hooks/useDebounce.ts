import { SetStateAction, useEffect, useState } from "react";

type UseDebounceFunction = (value: string | number, delay?: number) => void;

const useDebounce: UseDebounceFunction = (value, delay = 1000) => {
  const [DebounceValue, setDebounceValue] =
    useState<SetStateAction<string | number>>("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return clearTimeout(timeout);
  }, [value, delay]);

  return DebounceValue;
};
export default useDebounce;
