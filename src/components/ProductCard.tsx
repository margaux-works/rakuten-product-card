import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface Product {
  brand: string;
  href: string;
  title: string;
  newPrice: string;
  usedPrice: string;
  image: string;
}

export const ProductCard = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/src/data/products.json') // simulate API Call
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch(() => setProduct(null)); // if error occurs, component does not render
  }, []);

  if (!product) return null;

  return (
    <Card
      component="a"
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        width: '343',
        boxShadow: 1,
        borderRadius: 2,
        textDecoration: 'none',
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '120px auto',
        alignItems: 'center',
        '&:hover .product-title': { textDecoration: 'underline' },
      }}
    >
      <Box
        component="img"
        src={product.image}
        alt={product.title}
        sx={{ width: '100%', height: 'auto', padding: '1rem' }}
      />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto auto auto auto',
          padding: '1rem',
          gap: 0.5,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: '#696969', fontWeight: 'bold' }}
        >
          {product.brand}
        </Typography>
        <Typography
          variant="body1"
          className="product-title"
          sx={{
            color: '#333',
            fontWeight: '700',
          }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#BF0000',
            fontSize: 20,
            fontWeight: 'bold',
            lineHeight: '25px',
          }}
        >
          {product.newPrice}{' '}
          <span style={{ fontSize: 14, lineHeight: '18px' }}> Neuf</span>
        </Typography>
        <Typography variant="body2" sx={{ color: '#333' }}>
          Occasion dès <strong>{product.usedPrice}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};
