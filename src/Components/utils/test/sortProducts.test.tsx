import sortProducts from '../sortProducts';

const array = [{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
},
{
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
}, {
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
}];

const paramsObjectPriceAscending = {
  category: 'laptops',
  lala: 'la',
  sortby: 'price-ascending',
};

const paramsObjectPriceDescending = {
  category: 'laptops',
  lala: 'la',
  sortby: 'price-descending',
};

const paramsObjectRatingAscending = {
  category: 'laptops',
  lala: 'la',
  sortby: 'rating-ascending',
};

const paramsObjectRatingDescending = {
  category: 'laptops',
  lala: 'la',
  sortby: 'rating-descending',
};

const paramsObjectDiscountAscending = {
  category: 'laptops',
  lala: 'la',
  sortby: 'discount-ascending',
};

const paramsObjectDiscountDescending = {
  category: 'laptops',
  lala: 'la',
  sortby: 'discount-descending',
};

const paramsObjectEmpty = {};

const paramsObjectIncorrectSortingValue = {
  category: 'laptops',
  lala: 'la',
  sortby: 'discount-d',
};

const resultPriceAscending = [{
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
},
{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
},
{
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
}];

const resultPriceDescending = [{
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
},
{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
},
{
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
}];

const resultRatingAscending = [{
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
},
{
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
},
{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
}];

const resultRatingDescending = [{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
},
{
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
},
{
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
}];

const resultDiscountAscending = [{
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
},
{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
},
{
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
}];

const resultDiscountDescending = [{
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
},
{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
},
{
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
}];

describe('sortProducts', () => {
  test('Correctly sorts by price, ascending', () => {
    expect(sortProducts(array, paramsObjectPriceAscending)).toEqual(resultPriceAscending);
  });
  test('Correctly sorts by price, descending', () => {
    expect(sortProducts(array, paramsObjectPriceDescending)).toEqual(resultPriceDescending);
  });
  test('Correctly sorts by rating, ascending', () => {
    expect(sortProducts(array, paramsObjectRatingAscending)).toEqual(resultRatingAscending);
  });
  test('Correctly sorts by rating, descending', () => {
    expect(sortProducts(array, paramsObjectRatingDescending)).toEqual(resultRatingDescending);
  });
  test('Correctly sorts by discount, ascending', () => {
    expect(sortProducts(array, paramsObjectDiscountAscending)).toEqual(resultDiscountAscending);
  });
  test('Correctly sorts by discount, descending', () => {
    expect(sortProducts(array, paramsObjectDiscountDescending)).toEqual(resultDiscountDescending);
  });
  test('Does not change array if sorting is not specified or has incorrect value', () => {
    expect(sortProducts(array, paramsObjectEmpty)).toEqual(array);
    expect(sortProducts(array, paramsObjectIncorrectSortingValue)).toEqual(array);
  });
});
