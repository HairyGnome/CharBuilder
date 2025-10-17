export const rules = {
  min: (minimum: number) => {
    return (value: number): true | string => {
      return value >= minimum ? true : `Value must be greater or equal to ${minimum}`;
    };
  },
  max: (maximum: number) => {
    return (value: number): true | string => {
      return value <= maximum ? true : `Value must be smaller or equal to ${maximum}`;
    };
  },
};
