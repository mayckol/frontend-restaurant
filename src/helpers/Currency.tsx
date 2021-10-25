interface ICurrency {
  value: number | string;
}
export function MaskCurrency({ value }: ICurrency) {
  return <>${Number(value).toFixed(2)}</>;
}