export default class CurrencyUtils {
  static formatCurrency(value: number | string, showCents = true) {
    const num = Number(value);

    const currency = Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format(num);

    if (!showCents) return currency.slice(0, -3);

    return currency;
  }
}
