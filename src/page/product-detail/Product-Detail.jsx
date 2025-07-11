import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Grid,
  Paper,
  Divider,
  Rating,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Close as CloseIcon,
  FavoriteBorder as FavoriteIcon,
  Share as ShareIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

// Static JSON data
const productData = {
  id: 79901,
  name: "DESERT CLUTCH",
  category: "ACCESSORIES",
  price: 69.00,
  originalPrice: 89.00,
  currency: "€",
  inStock: 65,
  rating: 4.5,
  reviewCount: 127,
  description: "Suede imitation in Polyester",
  features: [
    "Removable, adjustable shoulder strap",
    "A large compartment with three smaller compartments, one of which is closed with a zipper",
    "Premium quality synthetic leather",
    "Elegant gold-tone hardware"
  ],
  dimensions: {
    width: "27 cm",
    height: "19 cm", 
    depth: "11 cm"
  },
  stockByLocation: [
    { location: "Oxtorgsgrand", stock: 65 },
    { location: "Centrallager", stock: 340 },
    { location: "Sveavägen", stock: 46 },
    { location: "Upplandsgatan", stock: 43 }
  ],
  relatedProducts: [
    { name: "ALBA SKIRT", image: "/api/placeholder/150/150" },
    { name: "CLAIRE BLACK", image: "/api/placeholder/150/150" },
    { name: "DRAPPER COAT", image: "/api/placeholder/150/150" }
  ]
};

export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (increment) => {
    setQuantity(prev => Math.max(1, prev + increment));
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (!isOpen) return null;

  const discountPercentage = Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100);

  return (
    <Box sx={{ 
      maxWidth: 1000, 
      mx: 'auto', 
      p: 2, 
      bgcolor: '#fafafa',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        bgcolor: 'white',
        p: 2,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
          Product Details
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            onClick={() => setIsFavorite(!isFavorite)}
            sx={{ color: isFavorite ? '#f44336' : '#666' }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton sx={{ color: '#666' }}>
            <ShareIcon />
          </IconButton>
          <Button 
            onClick={() => setIsOpen(false)}
            sx={{ color: '#1976d2' }}
          >
            Close
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Paper sx={{ 
        p: 4, 
        mb: 2, 
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative' }}>
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <Chip 
                  label={`-${discountPercentage}%`}
                  sx={{ 
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 1,
                    bgcolor: '#f44336',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              )}
              
              {/* Enhanced Product Image */}
              <Box sx={{ 
                width: '100%', 
                height: 400, 
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                background: 'linear-gradient(135deg, #D2B48C 0%, #DEB887 50%, #F4A460 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* Realistic Clutch Bag */}
                <Box sx={{
                  width: '70%',
                  height: '50%',
                  background: 'linear-gradient(145deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
                  borderRadius: '12px 12px 8px 8px',
                  position: 'relative',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                  transform: 'perspective(200px) rotateX(5deg)',
                  
                  // Flap
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-8px',
                    left: '10%',
                    width: '80%',
                    height: '25%',
                    background: 'linear-gradient(145deg, #654321 0%, #8B4513 100%)',
                    borderRadius: '8px 8px 4px 4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  },
                  
                  // Clasp
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '8px',
                    background: 'linear-gradient(145deg, #FFD700 0%, #FFA500 100%)',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }
                }}>
                  {/* Strap */}
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '85%',
                    width: '4px',
                    height: '60px',
                    background: 'linear-gradient(90deg, #654321 0%, #8B4513 100%)',
                    borderRadius: '2px',
                    transform: 'rotate(15deg)',
                    transformOrigin: 'top'
                  }} />
                  
                  {/* Side detail */}
                  <Box sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '30%',
                    width: '2px',
                    height: '40%',
                    background: 'linear-gradient(180deg, #654321 0%, #8B4513 100%)',
                    borderRadius: '1px'
                  }} />
                </Box>
              </Box>

              {/* Image thumbnails */}
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                mt: 2,
                justifyContent: 'center'
              }}>
                {[1, 2, 3, 4].map((i) => (
                  <Box key={i} sx={{
                    width: 60,
                    height: 60,
                    bgcolor: i === 1 ? '#e3f2fd' : '#f5f5f5',
                    border: i === 1 ? '2px solid #1976d2' : '1px solid #ddd',
                    borderRadius: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {i}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline" sx={{ 
                color: '#1976d2', 
                fontSize: '0.75rem',
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}>
                {productData.category}
              </Typography>
              
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                mb: 1,
                color: '#1a1a1a'
              }}>
                {productData.name}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={productData.rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" sx={{ color: '#666' }}>
                  ({productData.reviewCount} reviews)
                </Typography>
              </Box>
              
              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}>
                  {productData.currency}{productData.price.toFixed(2)}
                </Typography>
                {productData.originalPrice > productData.price && (
                  <Typography variant="h6" sx={{ 
                    textDecoration: 'line-through',
                    color: '#999'
                  }}>
                    {productData.currency}{productData.originalPrice.toFixed(2)}
                  </Typography>
                )}
              </Box>

              {/* Stock Status */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <VerifiedIcon sx={{ color: '#4caf50', fontSize: '1.2rem' }} />
                <Chip 
                  label={`${productData.inStock} IN STOCK`}
                  sx={{ 
                    bgcolor: '#4caf50', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
            </Box>

            {/* Description */}
            <Typography variant="body1" sx={{ mb: 2, color: '#555', lineHeight: 1.6 }}>
              {productData.description}
            </Typography>
            
            {/* Features */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Key Features:
              </Typography>
              {productData.features.map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ 
                    width: 6, 
                    height: 6, 
                    bgcolor: '#1976d2', 
                    borderRadius: '50%',
                    mt: 1,
                    mr: 1,
                    flexShrink: 0
                  }} />
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Dimensions */}
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Dimensions:
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Width: {productData.dimensions.width} • Height: {productData.dimensions.height} • Depth: {productData.dimensions.depth}
              </Typography>
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Quantity:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  sx={{ 
                    bgcolor: '#f5f5f5',
                    '&:hover': { bgcolor: '#e0e0e0' },
                    '&:disabled': { bgcolor: '#f5f5f5', opacity: 0.5 }
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                
                <Box sx={{ 
                  minWidth: 60, 
                  textAlign: 'center',
                  p: 1,
                  border: '1px solid #ddd',
                  borderRadius: 1
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {quantity}
                  </Typography>
                </Box>
                
                <IconButton 
                  onClick={() => handleQuantityChange(1)}
                  sx={{ 
                    bgcolor: '#f5f5f5',
                    '&:hover': { bgcolor: '#e0e0e0' }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Trust Indicators */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ShippingIcon sx={{ color: '#4caf50', fontSize: '1.2rem' }} />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Free shipping
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <SecurityIcon sx={{ color: '#4caf50', fontSize: '1.2rem' }} />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Secure payment
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  flex: 1,
                  py: 1.5,
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': { 
                    borderColor: '#1565c0',
                    bgcolor: '#f3f8ff'
                  }
                }}
              >
                Add to Wishlist
              </Button>
              <Button 
                variant="contained" 
                sx={{ 
                  flex: 2,
                  py: 1.5,
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1565c0' },
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Buy Now - {productData.currency}{(productData.price * quantity).toFixed(2)}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Enhanced Tabs */}
        <Box sx={{ mt: 4 }}>
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 'bold',
                textTransform: 'none'
              }
            }}
          >
            <Tab label="Stock Availability" />
            <Tab label="You May Also Like" />
            <Tab label="Care Instructions" />
          </Tabs>

          {/* Stock Tab */}
          {selectedTab === 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Stock by Location
              </Typography>
              <Grid container spacing={2}>
                {productData.stockByLocation.map((location, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {location.location}
                        </Typography>
                        <Chip 
                          label={`${location.stock} pcs`}
                          sx={{ 
                            bgcolor: location.stock > 50 ? '#4caf50' : location.stock > 20 ? '#ff9800' : '#f44336',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Recommendations Tab */}
          {selectedTab === 1 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Recommended for You
              </Typography>
              <Grid container spacing={3}>
                {productData.relatedProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                      }
                    }}>
                      <Box sx={{ 
                        height: 150, 
                        bgcolor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px 4px 0 0'
                      }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {product.name}
                        </Typography>
                      </Box>
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          From €45.00
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Care Instructions Tab */}
          {selectedTab === 2 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Care Instructions
              </Typography>
              <Box sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  To keep your Desert Clutch looking its best:
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Spot clean only with a damp cloth
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Store in the provided dust bag when not in use
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Avoid exposure to direct sunlight for extended periods
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Keep away from sharp objects that might scratch the surface
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}