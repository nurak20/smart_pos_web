import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
    Divider,
    Paper,
    CircularProgress,
    Button,
    Stack,
    IconButton,
    Badge,
    Tooltip,
    Alert,
    AlertTitle,
    Fade,
    Skeleton
} from '@mui/material';
import {
    ShoppingCart,
    LocalShipping,
    Payment,
    Receipt,
    CheckCircle,
    Pending,
    Error as ErrorIcon,
    Info,
    ArrowBack,
    Print,
    Download,
    Refresh,
    CurrencyExchange
} from '@mui/icons-material';

const ImprovedOrderDetails = () => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Demo data - replace with actual API call
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setOrderData({
                    order_info: {
                        order_date: "2024-01-15T10:30:00Z",
                        delivery_status: "confirmed",
                        payment_type: "Credit Card",
                        payment_status: "completed",
                        exchange_rate: "4100",
                        description: "Standard delivery order with multiple items",
                        sub_total: "249.99",
                        delivery_cost: "15.00",
                        discount_amount: "25.00",
                        total_amount_usd: "239.99",
                        total_amount_riel: "983960"
                    },
                    order_details: [
                        {
                            product_code: "WBH-001",
                            qty: "1",
                            price: "149.99",
                            discount_amount: "15.00",
                            total_usd: "134.99",
                            total_riel: "553459"
                        },
                        {
                            product_code: "USC-002",
                            qty: "2",
                            price: "24.99",
                            discount_amount: "5.00",
                            total_usd: "44.98",
                            total_riel: "184418"
                        },
                        {
                            product_code: "PC-003",
                            qty: "1",
                            price: "75.00",
                            discount_amount: "5.00",
                            total_usd: "70.00",
                            total_riel: "287000"
                        }
                    ]
                });
                setLoading(false);
            }, 1500);
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount, currency = 'USD') => {
        if (currency === 'USD') {
            return `$${parseFloat(amount).toFixed(2)}`;
        } else if (currency === 'RIEL') {
            return `${parseFloat(amount).toLocaleString()} ៛`;
        }
        return amount;
    };

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return { color: 'success', icon: <CheckCircle />, label: 'Confirmed' };
            case 'pending': return { color: 'warning', icon: <Pending />, label: 'Pending' };
            case 'processing': return { color: 'info', icon: <Info />, label: 'Processing' };
            case 'shipped': return { color: 'secondary', icon: <LocalShipping />, label: 'Shipped' };
            case 'delivered': return { color: 'success', icon: <CheckCircle />, label: 'Delivered' };
            case 'cancelled': return { color: 'error', icon: <ErrorIcon />, label: 'Cancelled' };
            default: return { color: 'default', icon: <Info />, label: status };
        }
    };

    const getPaymentStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return { color: 'success', icon: <CheckCircle />, label: 'Completed' };
            case 'pending': return { color: 'warning', icon: <Pending />, label: 'Pending' };
            case 'failed': return { color: 'error', icon: <ErrorIcon />, label: 'Failed' };
            default: return { color: 'default', icon: <Info />, label: status };
        }
    };

    // Loading state with skeleton
    if (loading) {
        return (
            <Box minHeight="100vh" bgcolor="#f8fafc" py={3}>
                <Container maxWidth="lg">
                    <Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
                        <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
                        <Skeleton variant="text" width="50%" height={24} sx={{ mb: 4 }} />
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box minHeight="100vh" bgcolor="#f8fafc" display="flex" alignItems="center" justifyContent="center">
                <Container maxWidth="sm">
                    <Alert severity="error" sx={{ borderRadius: 3 }}>
                        <AlertTitle>Order Not Found</AlertTitle>
                        {error}
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                onClick={() => window.history.back()}
                                startIcon={<ArrowBack />}
                            >
                                Go Back
                            </Button>
                        </Box>
                    </Alert>
                </Container>
            </Box>
        );
    }

    if (!orderData) {
        return (
            <Box minHeight="100vh" bgcolor="#f8fafc" display="flex" alignItems="center" justifyContent="center">
                <Typography color="text.secondary">No order data available</Typography>
            </Box>
        );
    }

    const { order_info, order_details } = orderData;
    const deliveryStatus = getStatusConfig(order_info.delivery_status);
    const paymentStatus = getPaymentStatusConfig(order_info.payment_status);

    return (
        <Fade in={true} timeout={600}>
            <Box minHeight="100vh" bgcolor="#f8fafc" py={3}>
                <Container maxWidth="lg">
                    <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        {/* Header */}
                        <Box sx={{ 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            p: 4
                        }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                                        Order Details
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                        Order placed on {formatDate(order_info.order_date)}
                                    </Typography>
                                </Box>
                                <Stack direction="row" spacing={1}>
                                    <Tooltip title="Print Order">
                                        <IconButton sx={{ color: 'white' }}>
                                            <Print />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Download Receipt">
                                        <IconButton sx={{ color: 'white' }}>
                                            <Download />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refresh">
                                        <IconButton sx={{ color: 'white' }}>
                                            <Refresh />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        </Box>

                        <Box p={4}>
                            {/* Status Cards */}
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card sx={{ 
                                        height: '100%', 
                                        borderRadius: 2,
                                        border: `2px solid ${deliveryStatus.color === 'success' ? '#4caf50' : '#e0e0e0'}`,
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Badge
                                                badgeContent={deliveryStatus.icon}
                                                color={deliveryStatus.color}
                                                sx={{ mb: 2 }}
                                            >
                                                <LocalShipping sx={{ fontSize: 40, color: 'grey.500' }} />
                                            </Badge>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Delivery Status
                                            </Typography>
                                            <Chip
                                                label={deliveryStatus.label}
                                                color={deliveryStatus.color}
                                                variant="filled"
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Card sx={{ 
                                        height: '100%', 
                                        borderRadius: 2,
                                        border: `2px solid ${paymentStatus.color === 'success' ? '#4caf50' : '#e0e0e0'}`,
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Badge
                                                badgeContent={paymentStatus.icon}
                                                color={paymentStatus.color}
                                                sx={{ mb: 2 }}
                                            >
                                                <Payment sx={{ fontSize: 40, color: 'grey.500' }} />
                                            </Badge>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Payment Status
                                            </Typography>
                                            <Chip
                                                label={paymentStatus.label}
                                                color={paymentStatus.color}
                                                variant="filled"
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Card sx={{ height: '100%', borderRadius: 2 }}>
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Payment sx={{ fontSize: 40, color: 'grey.500', mb: 2 }} />
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Payment Method
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold">
                                                {order_info.payment_type}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Card sx={{ height: '100%', borderRadius: 2 }}>
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <CurrencyExchange sx={{ fontSize: 40, color: 'grey.500', mb: 2 }} />
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Exchange Rate
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold">
                                                1 USD = {parseFloat(order_info.exchange_rate).toLocaleString()} ៛
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Description */}
                            <Card sx={{ mb: 4, borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Info sx={{ mr: 1 }} />
                                        Order Description
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {order_info.description}
                                    </Typography>
                                </CardContent>
                            </Card>

                            {/* Order Items */}
                            <Card sx={{ mb: 4, borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ShoppingCart sx={{ mr: 1 }} />
                                        Order Items ({order_details.length})
                                    </Typography>
                                    <List>
                                        {order_details.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <ListItem 
                                                    alignItems="flex-start" 
                                                    sx={{ 
                                                        px: 0,
                                                        '&:hover': {
                                                            bgcolor: 'grey.50',
                                                            borderRadius: 1
                                                        }
                                                    }}
                                                >
                                                    <ListItemAvatar sx={{ mr: 2 }}>
                                                        <Avatar
                                                            src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/03/9fe6c9ec-162f-4156-bb7e-4ee28dc65092-e1488324765390.jpg?auto=format&q=60&w=1760&h=1325&fit=crop&crop=faces"
                                                            alt={`Product ${item.product_code}`}
                                                            sx={{ width: 70, height: 70, borderRadius: 2 }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="h6" component="div" fontWeight="bold">
                                                                Product: {item.product_code}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Box sx={{ mt: 1 }}>
                                                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                                                    <Chip
                                                                        label={`Qty: ${item.qty}`}
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="outlined"
                                                                    />
                                                                    <Chip
                                                                        label={`Unit: ${formatCurrency(item.price)}`}
                                                                        size="small"
                                                                        color="secondary"
                                                                        variant="outlined"
                                                                    />
                                                                    {item.discount_amount !== "0" && (
                                                                        <Chip
                                                                            label={`Discount: ${formatCurrency(item.discount_amount)}`}
                                                                            size="small"
                                                                            color="error"
                                                                            variant="filled"
                                                                        />
                                                                    )}
                                                                </Stack>
                                                            </Box>
                                                        }
                                                    />
                                                    <Box textAlign="right">
                                                        <Typography variant="h6" fontWeight="bold" color="primary">
                                                            {formatCurrency(item.total_usd)}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {formatCurrency(item.total_riel, 'RIEL')}
                                                        </Typography>
                                                    </Box>
                                                </ListItem>
                                                {index < order_details.length - 1 && <Divider sx={{ my: 1 }} />}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>

                            {/* Order Summary */}
                            <Card sx={{ 
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                color: 'white'
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Receipt sx={{ mr: 1 }} />
                                        Order Summary
                                    </Typography>
                                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 3, borderRadius: 2 }}>
                                        <Stack spacing={2}>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Subtotal:</Typography>
                                                <Typography fontWeight="bold">{formatCurrency(order_info.sub_total)}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Delivery:</Typography>
                                                <Typography fontWeight="bold">{formatCurrency(order_info.delivery_cost)}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Discount:</Typography>
                                                <Typography fontWeight="bold">-{formatCurrency(order_info.discount_amount)}</Typography>
                                            </Box>
                                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="h6" fontWeight="bold">
                                                    Total (USD):
                                                </Typography>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {formatCurrency(order_info.total_amount_usd)}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                    Total (Riel):
                                                </Typography>
                                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                    {formatCurrency(order_info.total_amount_riel, 'RIEL')}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Fade>
    );
};

export default ImprovedOrderDetails;