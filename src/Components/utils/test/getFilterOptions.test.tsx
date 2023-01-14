import getFilterOptions from '../getFilterOptions';

const array1 = [{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
}, {
  id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', price: 899, discountPercentage: 17.94, rating: 4.44, stock: 34, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/2/1.jpg', 'https://i.dummyjson.com/data/products/2/2.jpg', 'https://i.dummyjson.com/data/products/2/3.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'],
}];

const array2 = [{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
}, {
  id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', price: 899, discountPercentage: 17.94, rating: 4.44, stock: 34, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/2/1.jpg', 'https://i.dummyjson.com/data/products/2/2.jpg', 'https://i.dummyjson.com/data/products/2/3.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'],
}, {
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
}, {
  id: 11, title: 'perfume Oil', description: 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', price: 13, discountPercentage: 8.4, rating: 4.26, stock: 65, brand: 'Impression of Acqua Di Gio', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/11/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/11/1.jpg', 'https://i.dummyjson.com/data/products/11/2.jpg', 'https://i.dummyjson.com/data/products/11/3.jpg', 'https://i.dummyjson.com/data/products/11/thumbnail.jpg'],
}, {
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
}];

const result1 = ['smartphones'];

const result2 = ['fragrances', 'laptops', 'smartphones'];

const result3 = ['Apple', 'HP Pavilion', 'Impression of Acqua Di Gio', 'Royal_Mirage'];

describe('getFilterOptions', () => {
  test('Gets a single category', () => {
    expect(getFilterOptions(array1, 'category')).toEqual(result1);
  });
  test('Gets all categories in the correct order', () => {
    expect(getFilterOptions(array2, 'category')).toEqual(result2);
  });
  test('Gets all brands in the correct order', () => {
    expect(getFilterOptions(array2, 'brand')).toEqual(result3);
  });
});
