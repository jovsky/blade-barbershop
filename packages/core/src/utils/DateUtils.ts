export default class DateUtils {
  static today() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  // new Date(), '09:45'
  static applyTime(date: Date, time: string): Date {
    const newDate = new Date(date);
    const parts = time.split(":");
    newDate.setHours(parseInt(parts[0]!), parseInt(parts[1]!));
    return newDate;
  }

  static toDateTimeLocaleString(date: Date, locales = "en-US") {
    if (locales === "en-US") {
      return date.toLocaleString(locales, {
        dateStyle: "long",
        timeStyle: "short",
      });
    }
    if (locales === "pt-BR") {
      return date
        .toLocaleString(locales, { dateStyle: "long", timeStyle: "long" })
        .slice(0, -4);
    }
    return "DateUtils";
  }
}
