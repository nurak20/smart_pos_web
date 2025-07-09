import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Snackbar,
    Alert,
    CircularProgress,
    Paper
} from '@mui/material';
import {
    Add as AddIcon,
    Close as CloseIcon,
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { axiosGET } from '../../service/ApiService';
import { StyleColors } from '../../util/helper/Extension';
import POSFormTextField from '../../components/pos_text_field';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import LabelIcon from '@mui/icons-material/Label';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';

const API_GET = 'v1/products';
const API_POST = 'https://api.txteams.net/api/v1/products';

const Product = () => {
    // State hooks
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({
        category_id: '',
        code: '',
        product_name: '',
        cost_price: '',
        selling_price: '',
        stock: '',
        description: '',
        warehouse_id: '',
        image_url: '',
        group_code: '',
        brand_name: ''
    });
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({ open: false, message: '', severity: 'success' });

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosGET('v1/products');
                console.log(res.data);
                setProducts(res.data || []);
            } catch (err) {
                setNotify({ open: true, message: 'Failed to load products', severity: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Handlers
    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => {
        setOpenDialog(false);
        setFormData({ category_id: '', code: '', product_name: '', cost_price: '', selling_price: '', stock: '', description: '', warehouse_id: '', image_url: '', group_code: '', brand_name: '' });
        setErrors({});
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.category_id) errs.category_id = 'Required';
        if (!formData.product_name) errs.product_name = 'Required';
        if (!formData.cost_price || parseFloat(formData.cost_price) < 0) errs.cost_price = 'Invalid';
        if (!formData.selling_price || parseFloat(formData.selling_price) < 0) errs.selling_price = 'Invalid';
        if (!formData.stock || parseInt(formData.stock) < 0) errs.stock = 'Invalid';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const payload = {
                ...formData,
                created_by: 'c161a77f-94d2-4ea5-a34f-15cf43f61eda',
                updated_by: 'c161a77f-94d2-4ea5-a34f-15cf43f61eda',
            };
            await axios.post(API_POST, payload);
            setNotify({ open: true, message: 'Product created', severity: 'success' });
            // Reload list
            const { data } = await axios.get(API_GET);
            setProducts(data.data || []);
            handleClose();
        } catch (err) {
            setNotify({ open: true, message: 'Creation failed', severity: 'error' });
        }
    };

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); };

    // Filtered & paginated
    const filtered = products.filter(p => p.product_name.toLowerCase().includes(search.toLowerCase()));
    const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Sample categories
    const categories = [
        { id: '3aad7eb4-6799-4f0e-a906-31ee20f261a7', name: 'Beauty & Cosmetics' },
        { id: '2e52d617-7fd8-41a0-86d7-3969730285d0', name: 'Fashion & Apparel' },
        { id: '1234567-1234-1234-1234-123456789012', name: 'Electronics' },
        { id: '9876543-9876-9876-9876-987654321098', name: 'Home & Garden' }
    ];

    return (
        <Box sx={{ background: 'white' }}>
            <AppBar position="static" sx={{ background: 'white' }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2 }}>
                    <Typography variant="h5" color={StyleColors.textDarkGray} sx={{ flexGrow: 1 }}>Product Management</Typography>
                    <Button startIcon={<AddIcon />} onClick={handleOpen} sx={StyleColors.ButtonStyle}>New Product</Button>
                </Box>
            </AppBar>

            {/* <Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <TextField
                    placeholder="Search…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <SearchIcon /> }}
                />
            </Box> */}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
            ) : (
                <Paper sx={{ m: 2 }} elevation={0}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Stock</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginated.map(row => (
                                    <TableRow key={row.product_id}>
                                        <TableCell>{row.product_name}</TableCell>
                                        <TableCell>{row.code}</TableCell>
                                        <TableCell>{categories.find(c => c.id === row.category_id)?.name}</TableCell>
                                        <TableCell>${row.selling_price}</TableCell>
                                        <TableCell>{row.stock}</TableCell>
                                        <TableCell align="right">
                                            <IconButton><VisibilityIcon /></IconButton>
                                            <IconButton><EditIcon /></IconButton>
                                            <IconButton><DeleteIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={filtered.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}

            {/* Dialog */}
            <Dialog open={openDialog} fullWidth maxWidth="md">
                <DialogTitle>
                    Create New Product
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <form onSubmit={handleSubmit} noValidate>
                    <DialogContent dividers>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <POSFormTextField
                                name="product_name"
                                label="Product Name"
                                prefixIcon={<LabelIcon />}
                                value={formData.product_name}
                                onChange={handleChange}
                                error={!!errors.product_name}
                                helperText={errors.product_name}
                                required
                            />

                            <POSFormTextField
                                select
                                name="category_id"
                                label="Category"
                                prefixIcon={<CategoryIcon />}
                                value={formData.category_id}
                                onChange={handleChange}
                                error={!!errors.category_id}
                                helperText={errors.category_id}
                                required
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </POSFormTextField>

                            <POSFormTextField
                                name="cost_price"
                                label="Cost Price"
                                type="number"
                                prefixIcon={<AttachMoneyIcon />}
                                value={formData.cost_price}
                                onChange={handleChange}
                                error={!!errors.cost_price}
                                helperText={errors.cost_price}
                                required
                            />

                            <POSFormTextField
                                name="selling_price"
                                label="Selling Price"
                                type="number"
                                prefixIcon={<AttachMoneyIcon />}
                                value={formData.selling_price}
                                onChange={handleChange}
                                error={!!errors.selling_price}
                                helperText={errors.selling_price}
                                required
                            />

                            <POSFormTextField
                                name="stock"
                                label="Stock"
                                type="number"
                                prefixIcon={<InventoryIcon />}
                                value={formData.stock}
                                onChange={handleChange}
                                error={!!errors.stock}
                                helperText={errors.stock}
                                required
                            />

                            <POSFormTextField
                                name="brand_name"
                                label="Brand Name"
                                prefixIcon={<LabelIcon />}
                                value={formData.brand_name}
                                onChange={handleChange}
                            />

                            <POSFormTextField
                                name="group_code"
                                label="Group Code"
                                prefixIcon={<CodeIcon />}
                                value={formData.group_code}
                                onChange={handleChange}
                            />

                            <POSFormTextField
                                name="image_url"
                                label="Image URL"
                                prefixIcon={<ImageIcon />}
                                value={formData.image_url}
                                onChange={handleChange}
                            />

                            <POSFormTextField
                                name="description"
                                label="Description"
                                multiline
                                rows={3}
                                prefixIcon={<DescriptionIcon />}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleClose} sx={StyleColors.ButtonStyleOutline}>Cancel</Button>
                        <Button type="submit" sx={StyleColors.ButtonStyle}>Save Product</Button>

                    </DialogActions>
                </form>
            </Dialog>

            {/* Notification */}
            <Snackbar
                open={notify.open}
                autoHideDuration={6000}
                onClose={() => setNotify(prev => ({ ...prev, open: false }))}
            >
                <Alert severity={notify.severity} onClose={() => setNotify(prev => ({ ...prev, open: false }))}>
                    {notify.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Product;
