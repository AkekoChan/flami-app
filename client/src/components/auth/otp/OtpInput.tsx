import { useMemo } from "react";
import { RE_DIGIT } from "../../../utils/constants";

interface OtpInputProps {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
}

const OtpInput = ({ value, valueLength, onChange }: OtpInputProps) => {
  const valueItems = useMemo(() => {
    const valueArray = value.trim().split("");
    const items: string[] = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [value, valueLength]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = event.target;
    let targetValue = target.value.trim();
    console.log(targetValue);
    const isTargetValueDigit = RE_DIGIT.test(targetValue);
    console.log(isTargetValueDigit);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.trim().substring(0, index) +
        targetValue +
        value.trim().substring(index + 1);

      onChange(newValue.replace(/\s/g, ""));

      if (!isTargetValueDigit) {
        return;
      }

      handleFocusNext(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const target = event.target as HTMLInputElement;
    const targetValue = target.value;

    if (key === "ArrowDown" || key === "ArrowRight") {
      event.preventDefault();
      return handleFocusNext(target);
    }

    if (key === "ArrowUp" || key === "ArrowLeft") {
      event.preventDefault();
      return handleFocusPrev(target);
    }

    target.setSelectionRange(0, target.value.length);

    if (key !== "Backspace" || targetValue !== "") {
      return;
    }

    handleFocusPrev(target);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { target } = event;

    target.setSelectionRange(0, target.value.length);
  };

  const handleFocusNext = (target: HTMLInputElement) => {
    const nextElement = target.nextElementSibling as HTMLInputElement | null;

    if (nextElement) {
      nextElement.focus();
    }
  };

  const handleFocusPrev = (target: HTMLInputElement) => {
    const previousElement =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElement) {
      previousElement.focus();
    }
  };
  return (
    <div className="grid grid-cols-6 gap-4">
      {valueItems.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          value={digit}
          className="h-16 rounded-xl bg-alabaster-600 border-alabaster-400 border-3 outline-none text-center text-2xl focus:border-tree-poppy-500"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
        />
      ))}
    </div>
  );
};

export default OtpInput;
