import { render, screen, waitFor } from '@testing-library/react';
import { ProductCard } from '../components/ProductCard';

declare const global: any; // Fix for Jest not recognizing global.fetch

// Mock API response
const mockProduct = {
  brand: 'Apple',
  href: 'https://fr.shopping.rakuten.com/mfp/8450776/apple-iphone-14',
  title: 'Apple iPhone 11 128 Go Double SIM Noir Sidéral',
  newPrice: '754 €',
  usedPrice: '720,99 €',
  image: 'https://fr.shopping.rakuten.com/photo/4075345048_ML_NOPAD.jpg',
};

//  Mock `fetch` to return the mock product data
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockProduct),
  })
) as jest.Mock;

describe('ProductCard Component', () => {
  // Test1: Product details render correctly
  test('renders product details correctly', async () => {
    render(<ProductCard />);

    await waitFor(() =>
      expect(screen.getByText(mockProduct.brand)).toBeInTheDocument()
    );
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.newPrice)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.usedPrice)).toBeInTheDocument();
  });

  //Test2: Component does NOT render if there is no product data
  test('does not render if product data is missing', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(null),
      })
    ) as jest.Mock;

    render(<ProductCard />);

    await waitFor(() =>
      expect(screen.queryByText(mockProduct.brand)).not.toBeInTheDocument()
    );
  });
});
