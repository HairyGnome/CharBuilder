declare global {
  interface String {
    capitalize(): string;
    unslugify(): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.unslugify = function () {
  return this.replaceAll('_', ' ');
};

export {};
