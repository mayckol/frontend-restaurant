interface ICreditCardInput {
  value: string;
  setValue: (value: string) => void;
  isRequired?: boolean;
}
export function InputTypeCardNumber({
  value,
  setValue,
  isRequired = false,
}: ICreditCardInput) {
  function validateMask(char: string) {
    return !isNaN(Number(char));
  }

  function maskCreditCard(e: React.FormEvent<HTMLInputElement>) {
    if (!validateMask(e.currentTarget.value.slice(-1))) {
      setValue(e.currentTarget.value.slice(0, -1));
      return;
    }
    const breakPoints = [4, 9, 14];
    const limit = 19;
    const { length } = e.currentTarget.value;
    if (breakPoints.includes(length)) {
      setValue(e.currentTarget.value + "-");
      return;
    }
    if (length > limit) {
      setValue(e.currentTarget.value.substring(0, limit));
      return;
    }
    setValue(e.currentTarget.value);
  }
  return (
    <input
      onChange={maskCreditCard}
      type="text"
      name="card-number"
      placeholder="xxxx-xxxx-xxxx-xxxx (card number)"
      size={20}
      max={16}
      value={value}
      required={isRequired}
    />
  );
}

interface ICreditCardCVV {
  value?: number;
  setValue: (value: number) => void;
  isRequired?: boolean;
}
export function InputTypeCVV({
  value,
  setValue,
  isRequired = false,
}: ICreditCardCVV) {
  function handleCVVInput(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length > 3) {
      setValue(Number(e.currentTarget.value.substring(0, 3)));
      return;
    }
    setValue(Number(e.currentTarget.value));
  }
  return (
    <input
      onChange={handleCVVInput}
      type="number"
      name="cvv"
      placeholder="cvv"
      required={isRequired}
      value={value || ""}
    />
  );
}
