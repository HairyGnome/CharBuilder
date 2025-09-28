declare global {
  interface String {
    capitalize(): string;
    unslugify(): string;
    slugify(): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.unslugify = function () {
  return this.replaceAll('_', ' ');
};

String.prototype.slugify = function () {
  return this.replaceAll(' ', '_');
};

export {};
