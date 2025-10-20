import type { Roll } from 'src/models/types';

export default class DiceRoller {
  constructor(
    readonly amount: number,
    readonly dice: number,
    readonly modifier: number,
  ) {}

  roll(): Roll {
    const rolls = [];
    for (let i = 0; i < Number(this.amount); i++) {
      const roll = Math.floor(Math.random() * Number(this.dice) + 1);
      rolls.push(Number(roll));
    }
    let sum = rolls.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    sum += Number(this.modifier);
    return {
      rolls: rolls,
      modifier: this.modifier,
      sum,
    };
  }
}
