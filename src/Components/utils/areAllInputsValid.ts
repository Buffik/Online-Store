// eslint-disable-next-line no-unused-vars
type TareAllInputsValid = (args: boolean[]) => boolean

const areAllInputsValid: TareAllInputsValid = (args) => {
  const result = args.reduce<boolean>((acc, bool) => {
    if (bool) {
      // eslint-disable-next-line no-param-reassign
      acc = false;
      return acc;
    }
    return acc;
  }, true);

  return result;
};

export default areAllInputsValid;
