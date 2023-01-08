import React from 'react';
import { Link } from 'react-router-dom';
import ProductAddDropButton from '../UI/button/ProductAddDropButton';
import { TProductsItem, TProductPartialProps } from '../../types/types';

type TProductsListProps = {
  productsInCart: TProductPartialProps[];
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number): void;
  products: TProductsItem[];
}

export default function ProductsList(props: TProductsListProps) {
  const {
    productsInCart,
    addToCart,
    dropFromCart,
    products,
  } = props;
  return (
    <section style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
      {
        products.length
          ? products.map((product: TProductsItem) => (
            <div key={product.id}>
              <h3 style={{ fontSize: '1.5em' }}>{product.title}</h3>
              <img src={product.thumbnail} alt={product.title} width={200} height={150} style={{ objectFit: 'contain' }} />
              <dl>
                <dt>Category: </dt>
                <dd>{product.category}</dd>
              </dl>
              <dl>
                <dt>Brand: </dt>
                <dd>{product.brand}</dd>
              </dl>
              <dl>
                <dt>Price: </dt>
                <dd style={{ fontWeight: 'bold' }}>
                  {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(product.price)}
                </dd>
              </dl>
              <dl>
                <dt>Discount: </dt>
                <dd>
                  {product.discountPercentage}
                  %
                </dd>
              </dl>
              <dl>
                <dt>Rating: </dt>
                <dd>{product.rating}</dd>
              </dl>
              <dl>
                <dt>Stock: </dt>
                <dd>{product.stock}</dd>
              </dl>
              <ProductAddDropButton
                productId={product.id}
                productsInCart={productsInCart}
                addToCart={addToCart}
                dropFromCart={dropFromCart}
              />
              <Link to={`/product/${product.id}`} style={{ marginLeft: '30px' }}>Details</Link>
            </div>
          ))
          : 'No products found'
        }
    </section>
  );
}
