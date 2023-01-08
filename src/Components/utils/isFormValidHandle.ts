// eslint-disable-next-line no-unused-vars
type TIsFormValidHandle = (args: boolean[]) => boolean

const isFormValidHandle: TIsFormValidHandle = (args) => {
  const result = args.reduce<boolean>((acc, bool) => {
    if (!bool) {
      // eslint-disable-next-line no-param-reassign
      acc = false;
      return acc;
    }
    return acc;
  }, true);

  return result;
};

export default isFormValidHandle;
