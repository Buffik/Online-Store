const formatPrice = (price: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(price);

export default formatPrice;
