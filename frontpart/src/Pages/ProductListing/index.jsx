import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import SideBar from '../../components/Sidebar';
import ProductItem from '../../components/ProductItem';
import { Select, MenuItem, IconButton, Box, CircularProgress } from '@mui/material';
import { GridView, ViewList } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Error in ProductItem:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', color: 'error.main', py: 6 }}>
          <Typography variant="h6">Something went wrong while loading products.</Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    category: null,
    priceRange: null,
    availability: [],
    sizes: [],
    colors: [],
  });

  const productsPerPage = 9;

  const fetchProducts = useCallback(
    async (appliedFilters = filters) => {
      try {
        setLoading(true);
        setError('');

        // Construct query params
        const params = {};
        if (appliedFilters.category) params.category = appliedFilters.category;
        if (appliedFilters.priceRange) {
          params.minPrice = appliedFilters.priceRange[0];
          params.maxPrice = appliedFilters.priceRange[1];
        }
        if (appliedFilters.availability.length > 0) {
          params.availability = appliedFilters.availability.join(',');
        }
        if (appliedFilters.sizes.length > 0) {
          params.sizes = appliedFilters.sizes.join(',');
        }
        if (appliedFilters.colors.length > 0) {
          params.colors = appliedFilters.colors.join(',');
        }

        const response = await axios.get('http://localhost:5000/api/products/get', { params });

        const fetchedProducts = Array.isArray(response.data.products)
          ? response.data.products
          : Array.isArray(response.data)
          ? response.data
          : [];

        setProducts(fetchedProducts);
        setCurrentPage(1);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = React.useMemo(() => {
    let sorted = [...products];

    switch (sortOption) {
      case 'popularity':
        sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, sortOption]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleApplyFilters = async (filters) => {
    try {
      const { category, ...otherFilters } = filters;

      if (!category) {
        console.warn('Category is required to fetch products.');
        return;
      }

      const url = `http://localhost:5000/api/products/category/${encodeURIComponent(category)}`;

      const response = await axios.get(url, {
        params: otherFilters,
      });

      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Failed to fetch filtered products:', error);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 6 },
        background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)',
        minHeight: '100vh',
      }}
    >
      <Box maxWidth="1200px" mx="auto" mb={5}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              '&:hover': { color: '#FF3D3D' },
            }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/fashion"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              '&:hover': { color: '#FF3D3D' },
            }}
          >
            Fashion
          </Link>
          <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>Products</Typography>
        </Breadcrumbs>
      </Box>

      <Box maxWidth="1200px" mx="auto" display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <Box
          flexBasis={{ md: '25%', lg: '20%' }}
          bgcolor="white"
          p={3}
          borderRadius={3}
          boxShadow="0 4px 15px rgba(0,0,0,0.1)"
          minWidth={{ xs: '100%', md: 'auto' }}
        >
          <SideBar onApplyFilters={handleApplyFilters} />
        </Box>

        <Box
          flex={1}
          bgcolor="white"
          p={{ xs: 3, md: 4 }}
          borderRadius={3}
          boxShadow="0 6px 20px rgba(0,0,0,0.12)"
          display="flex"
          flexDirection="column"
          minHeight="70vh"
        >
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            mb={3}
            gap={2}
          >
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
              Showing{' '}
              <Box component="span" sx={{ fontWeight: 'bold', color: 'red' }}>
                {currentProducts.length}
              </Box>{' '}
              of{' '}
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                {sortedProducts.length}
              </Box>{' '}
              products
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Sort by:
              </Typography>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  color: '#FF3D3D',
                  fontWeight: 700,
                  minWidth: 150,
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#FF3D3D' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF3D3D' },
                  '.MuiSvgIcon-root': { color: '#FF3D3D' },
                }}
              >
                <MenuItem value="recommended">Recommended</MenuItem>
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                <MenuItem value="newest">Newest Arrivals</MenuItem>
              </Select>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                View:
              </Typography>
              <IconButton
                onClick={() => setViewMode('grid')}
                sx={{
                  color: viewMode === 'grid' ? '#FF3D3D' : 'gray',
                  borderRadius: 1,
                  '&:hover': { bgcolor: '#ffeaea' },
                }}
                aria-label="Grid view"
              >
                <GridView />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                sx={{
                  color: viewMode === 'list' ? '#FF3D3D' : 'gray',
                  borderRadius: 1,
                  '&:hover': { bgcolor: '#ffeaea' },
                }}
                aria-label="List view"
              >
                <ViewList />
              </IconButton>
            </Box>
          </Box>

          <Box
            component="hr"
            sx={{ borderColor: 'divider', mb: 3, opacity: 0.3 }}
          />

          {loading ? (
            <Box sx={{ py: 10, textAlign: 'center' }}>
              <CircularProgress color="secondary" />
              <Typography mt={2} color="text.secondary" variant="body1">
                Loading products...
              </Typography>
            </Box>
          ) : error ? (
            <Box sx={{ py: 10, textAlign: 'center' }}>
              <Typography color="error" variant="h6">
                {error}
              </Typography>
            </Box>
          ) : currentProducts.length === 0 ? (
            <Box sx={{ py: 10, textAlign: 'center' }}>
              <Typography color="text.secondary" variant="h6">
                No products available.
              </Typography>
            </Box>
          ) : (
            <>
              <ErrorBoundary>
                <Box
                  display="grid"
                  gridTemplateColumns={
                    viewMode === 'grid'
                      ? 'repeat(auto-fit, minmax(250px, 1fr))'
                      : '1fr'
                  }
                  gap={3}
                >
                  {currentProducts.map((product) => (
                    <Box
                      key={product._id}
                      sx={{
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow:
                            '0 8px 24px rgba(255, 61, 61, 0.2)',
                        },
                      }}
                    >
                      <ProductItem product={product} viewMode={viewMode} />
                    </Box>
                  ))}
                </Box>
              </ErrorBoundary>

              {totalPages > 1 && (
                <Box mt={6} display="flex" justifyContent="center">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="secondary"
                    shape="rounded"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontWeight: 700,
                        borderRadius: 2,
                      },
                      '& .MuiPaginationItem-page.Mui-selected': {
                        backgroundColor: '#FF3D3D',
                        color: 'white',
                        boxShadow: '0 0 8px #FF3D3D',
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductListing;
