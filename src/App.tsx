import { Container, Box } from '@mui/material';
import { ProductCard } from './components/ProductCard';

export default function App() {
  return (
    <Box
      sx={{
        backgroundColor: '#f7f7f7',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <ProductCard />
      </Container>
    </Box>
  );
}
