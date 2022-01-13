export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static newShortGuid() {
    return Math.random().toString(36).slice(-6).toUpperCase();
  }
  static returnCurrencyString(input: number | string) {
    let result = "";
    if (typeof input === "number") {
      result = new Intl.NumberFormat("sv-se", {
        style: "currency",
        currency: "SEK",
      }).format(input);
    } else if (typeof input === "string") {
      result = new Intl.NumberFormat("sv-se", {
        style: "currency",
        currency: "SEK",
      }).format(Number.parseFloat(input));
    }
    return result;
  }
}
export class StringFormatting {
  static capitalizeFirstLetter(input:string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}
