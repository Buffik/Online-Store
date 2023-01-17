function checkUniqueImgs(
  arrImgSizes: number[],
  arrImg: string[],
  callBack: (arr: string[]) => void,
) {
  const result = arrImgSizes.reduce<string[]>((acc, el, index) => {
    if (
      arrImgSizes.indexOf(el)
      !== arrImgSizes.lastIndexOf(el)
      && !acc.includes(arrImg[index])
      && !acc.includes(arrImg[arrImgSizes.indexOf(el)])
    ) {
      return [...acc, arrImg[arrImgSizes.indexOf(el)]];
    }
    if (arrImgSizes.indexOf(el) === arrImgSizes.lastIndexOf(el) && !acc.includes(arrImg[index])) {
      return [...acc, arrImg[index]];
    }
    return acc;
  }, []);

  callBack(result);
}

export default checkUniqueImgs;
