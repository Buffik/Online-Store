type TareAllInputsValid = (args: boolean[]) => boolean

const areAllInputsValid: TareAllInputsValid = (args) => {
  const result = args.reduce<boolean>((acc, bool) => {
    if (bool) {
      return false;
    }
    return acc;
  }, true);

  return result;
};

export default areAllInputsValid;
