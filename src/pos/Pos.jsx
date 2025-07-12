import React, { useState, useMemo, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import {
    AppBar,
    Toolbar,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Badge,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Container,
    Paper,

    Avatar,
    useTheme,
    useMediaQuery
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Add,
    Remove,
    Delete,
    Search,
    ShoppingCart,
    Payment,
    Category,
    Inventory,
    PowerSettingsNew,
    CheckCircle
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { axiosGET, axiosPOST } from '../service/ApiService';
import './global.css';
import { StyleColors } from '../util/helper/Extension';
import POSAppBar from '../page/dasboard/layouts/POSAppBar';

// Product Service Provider - Clean, professional code structure
class ProductService {
    static categories = [
        { id: 'all', name: 'All Products', color: '#825567' },
        { id: 'beverages', name: 'Beverages', color: '#825567' },
        { id: 'snacks', name: 'Snacks', color: '#825567' },
        { id: 'electronics', name: 'Electronics', color: '#825567' },
        { id: 'clothing', name: 'Clothing', color: '#825567' },
        { id: 'books', name: 'Books', color: '#825567' }
    ];

    static getCategories() {
        return this.categories;
    }

    static async getProducts() {
        const response = await axiosGET(`v1/products`);
        return response.data;
    }

    static getProductsByCategory(categoryId, products) {
        if (categoryId === 'all') return products || [];
        return products.filter(product => product.category_id === categoryId);
    }

    static searchProducts(query, products) {
        if (!query || !products) return products || [];
        const searchTerm = query.toLowerCase();
        return products.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm) ||
            product.brand_name?.toLowerCase().includes(searchTerm) ||
            product.code.toLowerCase().includes(searchTerm) ||
            product.description?.toLowerCase().includes(searchTerm)
        );
    }

    static getCategoryById(id) {
        return this.categories.find(cat => cat.id === id);
    }
}

// Payment Service Provider
class PaymentService {
    static paymentMethods = [
        {
            id: 'cash',
            name: 'Cash',
            icon: '💵',
            src: "https://www.usatoday.com/gcdn/-mm-/e76b3f8780406e2332171b90051c86d67cb0349b/c=0-85-2122-1282/local/-/media/USATODAY/USATODAY/2014/09/04/1409858217000-492529263.jpg?width=2122&height=1197&fit=crop&format=pjpg&auto=webp"
        },
        {
            id: 'ac',
            name: 'ACLEDA Bank Plc. - Cambodia',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM37KLHTgu31C4LMRGMBzIu7QwwJXVeOC-EA&s'
        },
    ];

    static getPaymentMethods() {
        return this.paymentMethods;
    }

    static calculateTotal(items) {
        return items.reduce((total, item) => total + (item.selling_price * item.quantity), 0);
    }

    static calculateItemCount(items) {
        return items.reduce((count, item) => count + item.quantity, 0);
    }
}

export default function POSAdminSystem() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sellList, setSellList] = useState([]);
    const [paymentDialog, setPaymentDialog] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingPayment, setProcessingPayment] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { user } = useAuth();
    const posContainerRef = useRef(null);


    // Load cart from cookies on initial render
    useEffect(() => {
        const savedCart = Cookies.get('pos_cart');
        if (savedCart) {
            try {
                setSellList(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart data from cookies', e);
                Cookies.remove('pos_cart');
            }
        }
    }, []);

    // Save cart to cookies whenever it changes
    useEffect(() => {
        if (sellList.length > 0) {
            Cookies.set('pos_cart', JSON.stringify(sellList), { expires: 7 });
        } else {
            Cookies.remove('pos_cart');
        }
    }, [sellList]);

    // Fetch products from API
    useEffect(() => {


        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getProducts();
            setAllProducts(data || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setAllProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Get filtered products based on category and search
    const filteredProducts = useMemo(() => {
        let list = allProducts;

        if (selectedCategory !== 'all') {
            list = list.filter(p => p.category_id === selectedCategory);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(p =>
                p.product_name.toLowerCase().includes(q) ||
                p.brand_name?.toLowerCase().includes(q) ||
                p.code.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            );
        }

        return list;
    }, [allProducts, selectedCategory, searchQuery]);

    // Add product to sell list or update quantity if exists
    const addToSellList = (product) => {
        setSellList(prevList => {
            const existingItem = prevList.find(item => item.product_id === product.product_id);
            if (existingItem) {
                return prevList.map(item =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevList, { ...product, quantity: 1 }];
            }
        });
    };

    // Update quantity in sell list
    const updateQuantity = (product_id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromSellList(product_id);
            return;
        }
        setSellList(prevList =>
            prevList.map(item =>
                item.product_id === product_id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Remove item from sell list
    const removeFromSellList = (product_id) => {
        setSellList(prevList => prevList.filter(item => item.product_id !== product_id));
    };

    // Clear the entire cart
    const clearCart = () => {
        setSellList([]);
    };

    // Calculate totals
    const totalAmount = PaymentService.calculateTotal(sellList);
    const totalItems = PaymentService.calculateItemCount(sellList);

    // Process payment and create order
    const processPayment = async () => {
        if (!selectedPaymentMethod) return;

        try {
            const orderData = {
                order: {
                    order_date: new Date().toISOString(),
                    total_amount_usd: totalAmount,
                    total_amount_riel: totalAmount * 4000,
                    exchange_rate: 4000,
                    address_id: "550e8400-e29b-41d4-a716-446655440000",
                    user_id: "550e8400-e29b-41d4-a716-446655440001",
                    description: `POS Order - ${sellList.length} items`,
                    delivery_status: "pending",
                    delivery_completed: false,
                    delivery_cost: 0.00,
                    order_status_text: "Order confirmed",
                    order_status_state: "confirmed",
                    payment_status: "completed",
                    payment_type: selectedPaymentMethod?.join(', '),
                    discount_amount: 0.00,
                    event_discount_id: null,
                    sub_total: totalAmount
                },
                order_detail: sellList.map(item => ({
                    product_id: item.product_id,
                    qty: item.quantity,
                    price: parseFloat(item.selling_price || 0),
                    discount: 0,
                    discount_unit: "percentage",
                    discount_amount: 0.00,
                    sub_total: parseFloat(item.selling_price || 0) * item.quantity,
                    total_usd: parseFloat(item.selling_price || 0) * item.quantity,
                    total_riel: parseFloat(item.selling_price || 0) * item.quantity * 4000,
                    created_by: "pos_admin"
                }))
            };

            const response = await axiosPOST('v1/order/invoice', orderData);

            if (response) {
                sendOrderNotification(response);
                clearCart();
                setSelectedPaymentMethod([]);
                setPaymentDialog(false);
                fetchProducts();

            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to process order');
            }

        } catch (error) {
            console.error('Payment processing error:', error);
            alert(`Payment failed: ${error.message}\nPlease try again.`);
            setPaymentDialog(true);
        }
    };

    const sendOrderNotification = async (orderResponse) => {
        const order = orderResponse.data.order_info;
        const items = orderResponse.data.order_details;

        const formatCurrency = (amount) => parseFloat(amount).toFixed(2);
        const formatRiel = (amount) => new Intl.NumberFormat('en-US').format(parseFloat(amount));

        const itemsList = items.map(item => `
            🛒 <b>${item.product_code}</b>
            ├─ Quantity: ${item.qty}
            ├─ Price: $${formatCurrency(item.price)}
            ${item.discount ? `├─ Discount: ${item.discount}${item.discount_unit === 'percentage' ? '%' : ''}` : ''}
            └─ Subtotal: $${formatCurrency(item.sub_total)}
            `).join('\n');

        const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
        const manageLink = `https://admin.txteams.net/manage-order?order=${order.order_id}`;

        const message = `
            <b>🛍️ NEW ORDER #${order.order_id.slice(0, 8).toUpperCase()}</b>
            ━━━━━━━━━━━━━━━━━━━━━
            <b>📅 Order Date:</b> ${new Date(order.order_date).toLocaleString()}
            <b>🔄 Status:</b> ${order.order_status_text} (${order.order_status_state})
            <b>💳 Payment:</b> ${order.payment_type.replace('_', ' ').toUpperCase()} • ${order.payment_status.toUpperCase()}

            <b>📦 ORDER ITEMS (${totalItems})</b>
            ${itemsList}

            <b>💰 ORDER SUMMARY</b>
            ├─ Subtotal: $${formatCurrency(order.sub_total)}
            ├─ Discount: $${formatCurrency(order.discount_amount)}
            ├─ Delivery: $${formatCurrency(order.delivery_cost)}
            ├─ Exchange Rate: ៛${formatCurrency(order.exchange_rate)}/$
            └─ <b>TOTAL: $${formatCurrency(order.total_amount_usd)} (៛${formatRiel(order.total_amount_riel)})</b>

            <b>🚚 Delivery Status:</b> ${order.delivery_status.toUpperCase()} ${order.delivery_completed ? '✅' : '🕒'}
            <b>📝 Notes:</b> ${order.description || 'No additional notes'}

            <a href="${manageLink}">🔗 Manage This Order</a>

            <i>Order created at: ${new Date(order.created_date).toLocaleString()}</i>
            `;

        const res = await axiosPOST('telegram/send-message', {
            chatId: "1415543660",
            message: message,
            parseMode: "HTML"
        });
        const res2 = await axiosPOST('telegram/send-message', {
            chatId: "5006388556",
            message: message,
            parseMode: "HTML"
        });

        return res;
    };

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    bgcolor: 'grey.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography variant="h6">Loading products...</Typography>
            </Box>
        );
    }
    const Translate = (t) => {
        return "pos";
    }

    return (
        <Box ref={posContainerRef} sx={{ minHeight: '100vh', width: '100%', position: 'fixed', top: 0, overscrollBehavior: 'none', backgroundColor: "rgb(244, 244, 244)", }}>

            <Container maxWidth="xl" sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 3 } }}>
                <POSAppBar ispLeftRight={false} isPos />
                <Box sx={{ mt: 2 }}></Box>
                <Grid container spacing={{ xs: 1, md: 2, }}>

                    {/* Left Panel - Products */}
                    <Grid
                        size={{ xs: 12, md: 8, lg: 8 }}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            p: { xs: 1, md: 2 }
                        }}
                    >
                        {/* Category Filters */}
                        <Box sx={{ p: { xs: 1, md: 2 } }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    mb: 2,
                                    overflowX: "auto",
                                    pb: 1,
                                    "&::-webkit-scrollbar": {
                                        height: "4px"
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "rgba(0,0,0,0.2)",
                                        borderRadius: "2px"
                                    }
                                }}
                            >
                                {ProductService.getCategories().map((category) => (
                                    <Button
                                        key={category.id}
                                        variant={selectedCategory === category.id ? "contained" : "outlined"}
                                        onClick={() => setSelectedCategory(category.id)}
                                        sx={{
                                            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                                            py: 2,
                                            px: 3,
                                            boxShadow: "none",
                                            borderRadius: "15px",
                                            fontWeight: "600",
                                            textTransform: "capitalize",
                                            border: "0px solid",
                                            borderColor: selectedCategory === category.id ? StyleColors.appColorLv7 : "grey.300",
                                            bgcolor: selectedCategory === category.id ? StyleColors.appColorLv7 : StyleColors.appColorLv2,
                                            color: selectedCategory === category.id ? 'white' : '#99697d',
                                            flexShrink: 0
                                        }}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        {/* Products Grid */}
                        <Grid
                            container
                            spacing={{ xs: 1, sm: 1.5, md: 2 }}
                            sx={{
                                maxHeight: { xs: "calc(100vh - 200px)", md: "calc(100vh - 220px)" },
                                overflowY: "auto",
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none"
                                },
                                msOverflowStyle: "none",
                                px: { xs: 1, md: 2 },
                                py: 1
                            }}
                        >
                            {filteredProducts.length === 0 ? (
                                <Grid size={12}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            textAlign: "center",
                                            color: "text.secondary",
                                            py: 4,
                                            fontSize: { xs: "1rem", md: "1.25rem" }
                                        }}
                                    >
                                        {searchQuery ? `No products found for "${searchQuery}"` : `${Translate({ km: "មិនមានផលិតផលទេ", en: "No products available" })}`}
                                    </Typography>
                                </Grid>
                            ) : (
                                filteredProducts.map((product) => (
                                    <Grid key={product.id} size={{ xs: 6, sm: 4, md: 4, lg: 3, xl: 3 }}>
                                        <Card

                                            elevation={0}
                                            sx={{
                                                borderRadius: "10px",
                                                height: "100%",
                                                cursor: "pointer",
                                                transition: "transform 0.2s, box-shadow 0.2s",
                                                border: "none",
                                                boxShadow: "rgba(201, 201, 201, 0.2) 0px 8px 24px",
                                                borderColor: "grey.50",
                                                "&:hover": {

                                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"

                                                },
                                                "&:active": {
                                                    transform: "translateY(0px)"
                                                }
                                            }}
                                            onClick={() => product.stock > 0 ? addToSellList(product) : null}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={product.image_url || 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}
                                                alt={product.product_name}
                                                sx={{
                                                    height: { xs: 80, sm: 120, md: 160, lg: 180 },
                                                    objectFit: "cover"
                                                }}
                                                onError={(e) => (e.target.src = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg')}
                                            />
                                            <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        mb: 1,
                                                        color: "GrayText",
                                                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "0.875rem" },
                                                        lineHeight: { xs: 1.2, md: 1.4 },
                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    {product.product_name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        mb: 1,
                                                        color: "GrayText",
                                                        fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" },
                                                        lineHeight: { xs: 1.2, md: 1.4 },
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    Stock : {product.stock}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Grid>

                    {/* Right Panel - Sell List (Desktop Only) */}
                    <Grid size={{ md: 4, lg: 4 }} sx={{ display: { xs: 'none', md: 'block', } }}>
                        <Paper
                            sx={{
                                p: 3,
                                boxShadow: "rgba(212, 212, 212, 0.15) 0px 48px 60px 0px;",

                                position: "sticky",
                                top: 16,
                                borderRadius: "10px",
                                backgroundColor: "white",
                                minHeight: '680px',
                                maxHeight: "calc(100vh - 120px)",
                                display: "flex",
                                flexDirection: "column"
                            }}
                            elevation={0}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <ShoppingCart sx={{ mr: 1 }} />
                                {Translate({
                                    km: `បញ្ជីលក់ (${totalItems} ទំនិញ)`,
                                    en: `Sell List (${totalItems} items)`
                                })}
                            </Typography>

                            {sellList.length === 0 ? (
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ textAlign: "center", py: 4 }}
                                    >
                                        {Translate({ km: 'មិនមានទំនិញក្នុងបញ្ជី', en: 'No items in sell list' })}
                                    </Typography>
                                </Box>
                            ) : (
                                <List sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "500px", }}>
                                    {sellList.map((item) => (
                                        <Box key={item.product_id}>
                                            <ListItem sx={{ px: 0 }}>
                                                <ListItemText
                                                    primary={item.product_name}
                                                    secondary={`$${parseFloat(item.selling_price || 0).toFixed(2)} each`}
                                                    sx={{ flexGrow: 1 }}
                                                />
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <IconButton size="small" onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>
                                                        <Remove fontSize="small" />
                                                    </IconButton>
                                                    <Typography sx={{ mx: 1, minWidth: 32, textAlign: "center" }}>
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton size="small" onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>
                                                        <Add fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </ListItem>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ textAlign: "right", mr: 2, mb: 1 }}
                                            >
                                                Subtotal: ${(parseFloat(item.selling_price || 0) * item.quantity).toFixed(2)}
                                            </Typography>
                                            <Divider />
                                        </Box>
                                    ))}
                                </List>
                            )}

                            {/* Spacer to push payment section to bottom */}
                            <Box sx={{ flexGrow: 1 }} />

                            {/* Payment Section - Always at bottom */}
                            <Box sx={{ my: 2, p: 2, bgcolor: "grey.50", borderRadius: 2.8 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
                                >
                                    <span>{Translate({ km: 'ចំនួនទំនិញសរុប ៖', en: 'Total Items:' })}</span>
                                    <span>{totalItems}</span>
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="success.main"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontWeight: "bold"
                                    }}
                                >
                                    <span>{Translate({ km: 'ចំនួនទឹកប្រាក់សរុប :', en: 'Total Amount:' })}</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={sellList.length === 0}
                                onClick={() => setPaymentDialog(true)}
                                sx={{ ...StyleColors.ButtonStyle, py: 3.5, borderRadius: 2.8, fontWeight: '600' }}
                                startIcon={<Payment />}
                            >
                                Payment
                            </Button>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>

            {/* Mobile Bottom Cart Summary */}
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'white',
                    borderTop: 1,
                    borderColor: 'divider',
                    boxShadow: 3,
                    zIndex: 50,
                    p: 2
                }}
            >
                {sellList.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                            {totalItems} items • ${totalAmount.toFixed(2)}
                        </Typography>
                    </Box>
                )}
                <Box sx={{ display: "flex", gap: 1 }}>
                    {sellList.length > 0 && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={clearCart}
                            sx={{ minWidth: "auto", px: 2 }}
                        >
                            <Delete fontSize="small" />
                        </Button>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setPaymentDialog(true)}
                        disabled={sellList.length === 0}
                        sx={{
                            bgcolor: '#825567',
                            color: "white"
                        }}
                        startIcon={<Payment />}
                    >
                        {sellList.length === 0 ? 'Cart Empty' : `Pay $${totalAmount.toFixed(2)}`}
                    </Button>
                </Box>
            </Box>

            {/* Payment Dialog */}
            <Dialog
                open={paymentDialog}
                onClose={() => setPaymentDialog(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
                    <Payment sx={{ mr: 1 }} />
                    {Translate({ km: 'ការទូទាត់', en: 'Payment' })}
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            {Translate({ km: 'ធាតុក្នុងបញ្ជី', en: 'Items in Cart' })}
                        </Typography>
                        <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                            {sellList.map((item) => (
                                <ListItem key={item.code} sx={{ px: 0 }}>
                                    <ListItemText
                                        primary={`${item.product_name} (x${item.quantity})`}
                                        secondary={`$${(item.selling_price * item.quantity).toFixed(2)}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            {Translate({ km: 'សរុប', en: 'Total' })}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>{Translate({ km: 'ចំនួនទំនិញសរុប', en: 'Total Items' })}:</Typography>
                            <Typography>{totalItems}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>{Translate({ km: 'ចំនួនទឹកប្រាក់សរុប', en: 'Total Amount' })}:</Typography>
                            <Typography variant="h6" color="success.main">
                                ${totalAmount.toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ mb: 1, }}>
                            {Translate({ km: 'វិធីសារពើការទូទាត់', en: 'Payment Method' })}
                        </Typography>
                        <Grid container spacing={2}>
                            {PaymentService.getPaymentMethods().map((method) => (
                                <Grid item xs={6} key={method.id}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            cursor: 'pointer',
                                            borderColor: selectedPaymentMethod.includes(method.id)
                                                ? '#99697d'
                                                : 'divider',
                                            backgroundColor: selectedPaymentMethod.includes(method.id)
                                                ? '#99697d'
                                                : 'background.paper',
                                            '&:hover': {
                                                borderColor: 'primary.main'
                                            }
                                        }}
                                        onClick={() => {
                                            if (selectedPaymentMethod.includes(method.id)) {
                                                setSelectedPaymentMethod(
                                                    selectedPaymentMethod.filter(id => id !== method.id)
                                                );
                                            } else {
                                                setSelectedPaymentMethod([...selectedPaymentMethod, method.id]);
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {method.icon && (
                                                <Typography variant="h5" sx={{ mr: 1 }}>
                                                    {method.icon}
                                                </Typography>
                                            )}
                                            {method.src && (
                                                <Avatar
                                                    src={method.src}
                                                    sx={{ width: 24, height: 24, mr: 1 }}
                                                />
                                            )}
                                            <Typography>{method.name}</Typography>
                                            {selectedPaymentMethod.includes(method.id) && (
                                                <CheckCircle
                                                    color="success"
                                                    sx={{ ml: 'auto' }}
                                                />
                                            )}
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={() => setPaymentDialog(false)}
                        sx={{ color: 'text.secondary' }}
                    >
                        {Translate({ km: 'បោះបង់', en: 'Cancel' })}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={processPayment}
                        disabled={selectedPaymentMethod.length === 0 || processingPayment}
                        sx={{
                            bgcolor: '#825567',
                            color: 'white',
                            minWidth: 120
                        }}
                    >
                        {processingPayment ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            Translate({ km: 'បញ្ជាក់', en: 'Confirm' })
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}