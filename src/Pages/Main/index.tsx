import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductAddDropButton from '../../Components/UI/button/ProductAddDropButton';
// import TestForMain from '../../Components/TestForMain';
import { TProductsItem, TProductPartialProps } from '../../types/types';

type TProps = {
  productsInCart: TProductPartialProps[];
  // productsInCartCount: TProductPartialProps[];
  // products: TProductsItem[] | null;
  // eslint-disable-next-line no-unused-vars
  // increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  // decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number): void;
}

function Main(props: TProps) {
  const { productsInCart, addToCart, dropFromCart } = props;
  // const testArr = [1, 2, 3, 4];
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=10');
    const productsList = await response.json();
    setProducts(productsList.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // type TProductsItem = {
  //   id: number;
  //   title: string;
  //   description: string;
  //   price: number;
  //   category: string;
  //   brand: string;
  //   discountPercentage: number;
  //   images: string[];
  //   rating: number;
  //   stock: number;
  //   thumbnail: string;
  // }

  return (
    <>
      {
            products.map((item: TProductsItem) => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <img src={item.thumbnail} alt={item.title} />
                <dl>
                  <dt>Category: </dt>
                  <dd>{item.category}</dd>
                </dl>
                <dl>
                  <dt>Brand: </dt>
                  <dd>{item.brand}</dd>
                </dl>
                <dl>
                  <dt>Price: </dt>
                  <dd>
                    $
                    {item.price}
                  </dd>
                </dl>
                <dl>
                  <dt>Discount: </dt>
                  <dd>
                    {item.discountPercentage}
                    %
                  </dd>
                </dl>
                <dl>
                  <dt>Rating: </dt>
                  <dd>{item.rating}</dd>
                </dl>
                <dl>
                  <dt>Stock: </dt>
                  <dd>{item.stock}</dd>
                </dl>
                <ProductAddDropButton
                  value={item.id}
                  productsInCart={productsInCart}
                  // isProductInCart={isProductInCart(item.id)}
                  // onClick={}
                  addToCart={addToCart}
                  dropFromCart={dropFromCart}
                />
                <Link to={`/${item.id}`}>Details</Link>
              </div>
            ))
        }
    </>
  );
}

export default Main;
