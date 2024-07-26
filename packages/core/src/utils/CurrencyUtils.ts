import { LOCALE } from "../constants";

const currencies = {
  "pt-BR": "BRL",
  "en-US": "USD",
};

export default class CurrencyUtils {
  static formatCurrency(value: number | string, showCents = true) {
    const num = Number(value);

    const currency = Intl.NumberFormat(LOCALE, {
      currency:
        LOCALE in currencies
          ? currencies[LOCALE as keyof typeof currencies]
          : null,
      style: "currency",
    }).format(num);

    if (!showCents) return currency.slice(0, -3);

    return currency;
  }
}
