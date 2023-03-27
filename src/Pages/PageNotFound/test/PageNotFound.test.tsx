import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import PageNotFound from '../index';

test('Correctly renders page 404', () => {
  render(<HashRouter><PageNotFound /></HashRouter>);
  const title = screen.getByText(/Error 404: Page Not Found!/i);
  const image = screen.getByAltText(/A confused person inside a box/i) as HTMLImageElement;
  const link = screen.getByText(/Back to main/i);
  expect(title).toBeInTheDocument();
  expect(image.src).toContain('empty.png');
  expect(link).toBeInTheDocument();
});
