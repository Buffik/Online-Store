/* eslint-disable no-param-reassign */
function checkUniqueImgs(
  arrImgSizes: number[],
  arrImg: string[],
  // eslint-disable-next-line no-unused-vars
  callBack: (arr: string[]) => void,
) {
  const result = arrImgSizes.reduce<string[]>((acc, el, index) => {
    // if (!acc.includes(arrImg[index])) {
    //   acc = [...acc, arrImg[index]];
    // }
    if (
      arrImgSizes.indexOf(el)
      !== arrImgSizes.lastIndexOf(el)
      && !acc.includes(arrImg[index])
      && !acc.includes(arrImg[arrImgSizes.indexOf(el)])
    ) {
      acc = [...acc, arrImg[arrImgSizes.indexOf(el)]];
      return acc;
    }
    if (arrImgSizes.indexOf(el) === arrImgSizes.lastIndexOf(el) && !acc.includes(arrImg[index])) {
      acc = [...acc, arrImg[index]];
      return acc;
    }
    return acc;
  }, []);

  callBack(result);
}

export default checkUniqueImgs;
