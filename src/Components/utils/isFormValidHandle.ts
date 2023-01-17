type TIsFormValidHandle = (args: boolean[]) => boolean

const isFormValidHandle: TIsFormValidHandle = (args) => {
  const result = args.reduce<boolean>((acc, bool) => {
    if (!bool) {
      return false;
    }
    return acc;
  }, true);

  return result;
};

export default isFormValidHandle;
