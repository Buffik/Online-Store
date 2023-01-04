import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import TestForMain from '../../Components/TestForMain';

function Main() {
  // const { cartItems } = props;
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

  type TProductsItem = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    discountPercentage: number;
    images: string[];
    rating: number;
    stock: number;
    thumbnail: string;
  }

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
                <button type="button">Add to cart</button>
                <Link to={`/${item.id}`}>Details</Link>
              </div>
            ))
        }
    </>
  );
}

export default Main;
