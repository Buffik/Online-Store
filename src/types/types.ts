export type TProductsItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  discountPercentage: number;
  images?: string[];
  rating: number;
  stock: number;
  thumbnail: string;
}

export type TProductPartialProps = {
  id: number,
  count: number
}

export type TProductCartIdCountProps = {
  data: TProductPartialProps
  productIndex: number
}

export type TProductHandlers = {

  // eslint-disable-next-line no-unused-vars, no-undef
  onClickHandlerIncrease: (event: React.MouseEvent<HTMLButtonElement>) => void,
  // eslint-disable-next-line no-unused-vars, no-undef
  onClickHandlerDecrease: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type TProductsCart = TProductsItem & TProductHandlers & TProductCartIdCountProps

export type TPromoCodesArr = {
  name: string
  discount: number
}[];

export interface IPromoCodeHandler {
  todo: string
  discount: number
  // eslint-disable-next-line no-unused-vars, no-undef
  setCode: (event: React.MouseEvent<HTMLButtonElement>, isAdd: boolean) => void
}

export interface IAddHandler extends IPromoCodeHandler{
  code: string
  // eslint-disable-next-line no-unused-vars
  inputData: (string:string) => void
}
