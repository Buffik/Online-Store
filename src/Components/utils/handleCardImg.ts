const cardImgPlaceholder = 'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
const cardImgVisa = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
const cardImgMasterCard = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
const cardImgAExpress = 'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg';
const handleCardImg = (data: string) => {
  const firstDigit = data.split('')[0];
  switch (firstDigit) {
    case '3':
      return cardImgAExpress;

    case '4':
      return cardImgVisa;

    case '5':
      return cardImgMasterCard;
    default:
      return cardImgPlaceholder;
  }
};
export default handleCardImg;
