export type TProductsItem = {
  id?: number;
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
}

export type TProductHandlers = {

  // eslint-disable-next-line no-unused-vars, no-undef
  onClickHandlerIncrease: (event: React.MouseEvent<HTMLButtonElement>) => void,
  // eslint-disable-next-line no-unused-vars, no-undef
  onClickHandlerDecrease: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type TProductsCart = TProductsItem & TProductHandlers & TProductCartIdCountProps
