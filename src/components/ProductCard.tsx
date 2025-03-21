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
    fetch(`${import.meta.env.BASE_URL}data/products.json`) // simulate API Call with correct path for gh-pages
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setProduct(null); // if error occurs, component does not render
      });
  }, []);

  if (!product) return null;

  return (
    <Card
      component="a"
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        maxWidth: 343,
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
        alt={product.title || 'Product image'}
        sx={{
          width: '120px',
          height: '120px',
          padding: '0.75rem',
        }}
      />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto auto auto auto',
          gap: 0.5,
          paddingTop: '12px',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: '16px !important',
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
            fontSize: '14px',
            lineHeight: '18px',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
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
          }}
        >
          {product.newPrice} <span style={{ fontSize: 14 }}> Neuf</span>
        </Typography>
        <Typography variant="body2" sx={{ color: '#333' }}>
          Occasion dès{' '}
          <span style={{ fontWeight: 600, fontSize: 20 }}>
            {product.usedPrice}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};
