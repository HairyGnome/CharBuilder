import { defineStore } from 'pinia';
import type { Roll } from 'src/models/types';
import { useUiStore } from './ui-store';

const uiStore = useUiStore();

export const useDiceRollStore = defineStore('diceRollStore', {
  state() {
    return {
      amount: 1,
      dice: 20,
      modifier: 0,

      minAmount: 1,
      maxAmount: 20,
    };
  },

  actions: {
    rollDice(): Roll {
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
    },

    sendParamsAndOpen({
      amount,
      dice,
      modifier,
    }: {
      amount: number;
      dice: number;
      modifier: number;
    }) {
      this.amount = amount;
      this.dice = dice;
      this.modifier = modifier;
      uiStore.diceRollerShow = true;
    },

    setAmount(newAmount: number | string | null) {
      newAmount = Number(newAmount);

      if (isNaN(newAmount)) {
        return;
      }

      if (newAmount < this.minAmount) {
        this.amount = this.minAmount;
      } else if (newAmount > this.maxAmount) {
        this.amount = this.maxAmount;
      } else {
        this.amount = newAmount;
      }
    },
  },
});
