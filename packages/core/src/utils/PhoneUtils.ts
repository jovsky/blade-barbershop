export default class PhoneUtils {
  static format(phone: string): string {
    if (!phone) return ''
    const digits = this.unformat(phone)
    return digits.length <= 10
      ? this.replaceNumbers(digits, '(xx) xxxx-xxxx')
      : this.replaceNumbers(digits, '(xx) xxxxx-xxxx')
  }

  static unformat(phone: string): string {
    if (!phone) return ''
    return phone.replace(/\D/g, '').slice(0, 11)
  }

  private static replaceNumbers(phone: string, ref: string): string {
    let formatted = phone
      .split('')
      .reduce((phone, digit) => {
        return phone.replace('x', digit)
      }, ref)
      .replace(/x/g, '')
    if (phone.length <= 2) formatted = formatted.replace(')', '').replace(' ', '')
    if (phone.length <= 6) formatted = formatted.replace('-', '')
    return formatted
  }
}
