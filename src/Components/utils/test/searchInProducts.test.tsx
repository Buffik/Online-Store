import searchInProducts from '../searchInProducts';

const array = [{
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

const paramsObjectTitleIph = {
  search: 'iph',
};

const paramsObjectDescriptionAni = {
  search: 'ani',
};

const paramsObjectPrice109 = {
  search: '109',
};

const paramsObjectDiscount96 = {
  search: '96',
};

const paramsObjectRating4Dot = {
  search: '4.',
};

const paramsObjectStock34 = {
  search: '34',
};

const paramsObjectBrandApple = {
  search: 'Apple',
};

const paramsObjectCategoryFra = {
  search: 'fra',
};

const paramsObjectNoOverlap = {
  search: 'all',
};

const paramsObjectEmpty = {};

const resultTitleIph = [{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
}, {
  id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', price: 899, discountPercentage: 17.94, rating: 4.44, stock: 34, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/2/1.jpg', 'https://i.dummyjson.com/data/products/2/2.jpg', 'https://i.dummyjson.com/data/products/2/3.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'],
}];

const resultDescriptionAni = [{
  id: 11, title: 'perfume Oil', description: 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', price: 13, discountPercentage: 8.4, rating: 4.26, stock: 65, brand: 'Impression of Acqua Di Gio', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/11/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/11/1.jpg', 'https://i.dummyjson.com/data/products/11/2.jpg', 'https://i.dummyjson.com/data/products/11/3.jpg', 'https://i.dummyjson.com/data/products/11/thumbnail.jpg'],
}];

const resultPrice109 = [{
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
}];

const resultDiscount96 = [{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
}];

const resultRating4Dot = [{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
}, {
  id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', price: 899, discountPercentage: 17.94, rating: 4.44, stock: 34, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/2/1.jpg', 'https://i.dummyjson.com/data/products/2/2.jpg', 'https://i.dummyjson.com/data/products/2/3.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'],
}, {
  id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', images: ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg'],
}, {
  id: 11, title: 'perfume Oil', description: 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', price: 13, discountPercentage: 8.4, rating: 4.26, stock: 65, brand: 'Impression of Acqua Di Gio', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/11/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/11/1.jpg', 'https://i.dummyjson.com/data/products/11/2.jpg', 'https://i.dummyjson.com/data/products/11/3.jpg', 'https://i.dummyjson.com/data/products/11/thumbnail.jpg'],
}];

const resultStock34 = [{
  id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', price: 899, discountPercentage: 17.94, rating: 4.44, stock: 34, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/2/1.jpg', 'https://i.dummyjson.com/data/products/2/2.jpg', 'https://i.dummyjson.com/data/products/2/3.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'],
}];

const resultBrandApple = [{
  id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
}, {
  id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', price: 899, discountPercentage: 17.94, rating: 4.44, stock: 34, brand: 'Apple', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/2/1.jpg', 'https://i.dummyjson.com/data/products/2/2.jpg', 'https://i.dummyjson.com/data/products/2/3.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'],
}];

const resultCategoryFra = [{
  id: 11, title: 'perfume Oil', description: 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', price: 13, discountPercentage: 8.4, rating: 4.26, stock: 65, brand: 'Impression of Acqua Di Gio', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/11/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/11/1.jpg', 'https://i.dummyjson.com/data/products/11/2.jpg', 'https://i.dummyjson.com/data/products/11/3.jpg', 'https://i.dummyjson.com/data/products/11/thumbnail.jpg'],
}, {
  id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', images: ['https://i.dummyjson.com/data/products/12/1.jpg', 'https://i.dummyjson.com/data/products/12/2.jpg', 'https://i.dummyjson.com/data/products/12/3.png', 'https://i.dummyjson.com/data/products/12/4.jpg', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg'],
}];

describe('searchInProducts', () => {
  test('Correctly searches by title', () => {
    expect(searchInProducts(array, paramsObjectTitleIph)).toEqual(resultTitleIph);
  });
  test('Correctly searches by description', () => {
    expect(searchInProducts(array, paramsObjectDescriptionAni)).toEqual(resultDescriptionAni);
  });
  test('Correctly searches by price', () => {
    expect(searchInProducts(array, paramsObjectPrice109)).toEqual(resultPrice109);
  });
  test('Correctly searches by discount', () => {
    expect(searchInProducts(array, paramsObjectDiscount96)).toEqual(resultDiscount96);
  });
  test('Correctly searches by rating', () => {
    expect(searchInProducts(array, paramsObjectRating4Dot)).toEqual(resultRating4Dot);
  });
  test('Correctly searches by stock', () => {
    expect(searchInProducts(array, paramsObjectStock34)).toEqual(resultStock34);
  });
  test('Correctly searches by brand', () => {
    expect(searchInProducts(array, paramsObjectBrandApple)).toEqual(resultBrandApple);
  });
  test('Correctly searches by category', () => {
    expect(searchInProducts(array, paramsObjectCategoryFra)).toEqual(resultCategoryFra);
  });
  test('Returns correct results when there is no overlap', () => {
    expect(searchInProducts(array, paramsObjectNoOverlap)).toEqual([]);
  });
  test('Returns correct results when no search query is passed', () => {
    expect(searchInProducts(array, paramsObjectEmpty)).toEqual(array);
  });
});
