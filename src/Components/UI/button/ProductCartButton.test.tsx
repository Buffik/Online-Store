import { render, screen } from '@testing-library/react';
import ProductCartButton from './ProductCartButton';

test('renders main page - test not done!', () => {
  render(<ProductCartButton onClick={() => console.log('click')} value={0}>Test button</ProductCartButton>);
  const textElement = screen.getByText(/Test button/i);
  expect(textElement).toBeInTheDocument();
});
