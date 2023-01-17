import React from 'react';

export type TProductsItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

export type TProductsItemWithImages = TProductsItem & {
  images: string[];
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
  onClickHandlerIncrease: (event: React.MouseEvent<HTMLButtonElement>) => void,
  onClickHandlerDecrease: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type TProductsCart = TProductsItem & TProductHandlers & TProductCartIdCountProps

export type TPromoCodesArr = {
  name: string
  discount: number
}[];

export interface IPromoCodeHandler {
  todo: string
  code: string
  discount: number
  setCode: (event: React.MouseEvent<HTMLButtonElement>, isAdd: boolean) => void
}

export interface IAddHandler extends IPromoCodeHandler{
  code: string
  inputData: (string:string) => void
}

export type TValidations = {
  [key:string]: boolean
};

export type TSearchParamsObject = Record<string, string>;

export type TSetSearchParamsObject = (searchParamsObject: TSearchParamsObject) => void;

// export enum filterTypes {
//   category = 'category',
//   brand = 'brand',
//   price = 'price',
//   stock = 'stock',
// }

export type TFilterSelectionTypes = 'category' | 'brand';

export type TFilterRangeTypes = 'price' | 'stock';
