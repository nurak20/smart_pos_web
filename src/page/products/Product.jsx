import React, { useState, useEffect } from 'react';
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
    Snackbar,
    Alert,
    CircularProgress,
    Paper,
    Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    Add as AddIcon,
    Close as CloseIcon,
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { StyleColors } from '../../util/helper/Extension';
import POSFormTextField from '../../components/pos_text_field';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import LabelIcon from '@mui/icons-material/Label';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import { ProductService } from './Service';
import { CategoryService } from '../category/CategoryService';
import POSFormImageUpload from '../../components/file_upload';

const Product = () => {
    // State hooks
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [isCreateNew, setIsCreateNew] = useState(true);
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
        brand_name: '',
        barcode: ''
    });
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({ open: false, message: '', severity: 'success', duration: 6000 });
    const [categories, setCategories] = useState([]);

    // Fetch products and categories
    useEffect(() => {
        getProductListing();
        getCategoriesListing();
    }, []);

    const getProductListing = async () => {
        try {
            const res = await ProductService.getProducts();
            setProducts(res);
        } catch (err) {
            console.error('Error fetching products:', err);
            showNotification('Failed to fetch products', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getCategoriesListing = async () => {
        try {
            const res = await CategoryService.getCategories();
            setCategories(res);
        } catch (err) {
            console.error('Error fetching categories:', err);
            showNotification('Failed to fetch categories', 'error');
        }
    };

    // Enhanced notification helper
    const showNotification = (message, severity, duration = 6000) => {
        setNotify({ open: true, message, severity, duration });
    };

    // Handlers
    const handleOpen = ({ type = "create", data = null }) => {
        setIsCreateNew(type === "create");
        if (type === "update" && data) {
            setFormData({
                category_id: data.category_id,
                code: data.code,
                product_name: data.product_name,
                cost_price: data.cost_price,
                selling_price: data.selling_price,
                stock: data.stock,
                description: data.description,
                warehouse_id: data.warehouse_id,
                image_url: data.image_url,
                group_code: data.group_code,
                brand_name: data.brand_name,
                barcode: data.barcode || '',
                product_id: data.product_id,
            });
        }
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
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
            brand_name: '',
            barcode: ''
        });
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
                code: formData.code || new Date().getTime(),
                warehouse_id: null,
                created_by: 'c161a77f-94d2-4ea5-a34f-15cf43f61eda',
                updated_by: 'c161a77f-94d2-4ea5-a34f-15cf43f61eda',
            };
            
            if (isCreateNew) {
                await ProductService.createNewProduct({ payload });
                showNotification('Product created successfully', 'success');
            } else {
                await ProductService.updateProduct({ payload, productId: formData.product_id });
                showNotification('Product updated successfully', 'success');
            }
            
            getProductListing();
            handleClose();
        } catch (err) {
            console.error('Error saving product:', err);
            showNotification('Failed to save product', 'error');
        }
    };

    // DataGrid columns configuration
    const columns = [
        {
            field: 'product',
            headerName: 'Product',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={params.row.image_url} />
                    {params.row.product_name}
                </Box>
            )
        },
        {
            field: 'code',
            headerName: 'Code',
            flex: 0.5,
            minWidth: 120
        },
        {
            field: 'barcode',
            headerName: 'Barcode',
            flex: 0.5,
            minWidth: 150
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 0.5,
            minWidth: 120,
            renderCell: (params) => (
                categories.find(c => c.id === params.row.category_id)?.name || ''
            )
        },
        {
            field: 'selling_price',
            headerName: 'Price',
            flex: 0.5,
            minWidth: 100,
            renderCell: (params) => `$${params.row.selling_price}`
        },
        {
            field: 'stock',
            headerName: 'Stock',
            flex: 0.5,
            minWidth: 100
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton color='success' onClick={() => handleOpen({ type: "update", data: params.row })}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color='error'>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ background: 'white', borderRadius: '10px', pb: 2 }}>
            <AppBar position="static" sx={{ background: 'white' }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2 }}>
                    <Typography variant="h5" color={StyleColors.textDarkGray} sx={{ flexGrow: 1 }}>
                        Product Management
                    </Typography>
                    <Button 
                        startIcon={<AddIcon />} 
                        onClick={() => handleOpen({ type: "create" })} 
                        sx={StyleColors.ButtonStyle}
                    >
                        New Product
                    </Button>
                </Box>
            </AppBar>

            <Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <TextField
                    placeholder="Search by name or barcode..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <SearchIcon /> }}
                />
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper sx={{ m: 2, height: '100%', maxHeight: '900px' }} elevation={0}>
                    <DataGrid
                        rows={products.filter(p =>
                            p.product_name.toLowerCase().includes(search.toLowerCase()) ||
                            (p.barcode && p.barcode.toLowerCase().includes(search.toLowerCase()))
                        )}
                        columns={columns}
                        pageSize={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
                        pagination
                        disableSelectionOnClick
                        getRowId={(row) => row.product_id}
                        sx={{
                            borderRadius: 0,
                            border: 'none',
                            '& .MuiDataGrid-cell': {
                                borderBottom: 'none',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                borderBottom: 'none',
                                backgroundColor: '#f5f5f5',
                            },
                            '& .MuiDataGrid-columnSeparator': {
                                display: 'none',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none',
                                backgroundColor: '#f5f5f5',
                            },
                            '& .MuiDataGrid-virtualScroller': {
                                backgroundColor: '#ffffff',
                            },
                            '& .MuiDataGrid-row:hover': {
                                cursor: 'pointer',
                                backgroundColor: 'rgba(166, 166, 166, 0.04)',
                            },
                            '& .MuiDataGrid-row.Mui-selected': {
                                backgroundColor: StyleColors.appColorLv1,
                            },
                            '& .MuiDataGrid-row.Mui-selected:hover': {
                                backgroundColor: StyleColors.appColorLv1,
                            },
                            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus': {
                                outline: 'none',
                            },
                        }}
                    />
                </Paper>
            )}

            {/* Product Dialog */}
            <Dialog 
                open={openDialog} 
                fullWidth 
                maxWidth="md" 
                onClose={handleClose}
            >
                <DialogTitle>
                    {isCreateNew ? 'Create New Product' : 'Update Product'}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ 
                            position: 'absolute', 
                            right: 8, 
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
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
                                name="code"
                                label="Product Code"
                                prefixIcon={<CodeIcon />}
                                value={formData.code}
                                onChange={handleChange}
                            />

                            <POSFormTextField
                                name="barcode"
                                label="Barcode"
                                prefixIcon={<CodeIcon />}
                                value={formData.barcode}
                                onChange={handleChange}
                                placeholder="Enter barcode"
                            />

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

                            <POSFormImageUpload
                                name="image_url"
                                label="Upload Image"
                                uploadPreset="NurakPOS"
                                value={formData.image_url}
                                onUpload={(url) => {
                                    setFormData(prev => ({ ...prev, image_url: url }));
                                }}
                                onError={(err) => {
                                    showNotification('Failed to upload image', 'error');
                                }}
                            />

                            <POSFormTextField
                                name="description"
                                label="Description"
                                multiline
                                rows={3}
                                prefixIcon={<DescriptionIcon />}
                                value={formData.description}
                                onChange={handleChange}
                                sx={{ gridColumn: '1 / -1' }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button 
                            onClick={handleClose}
                            sx={StyleColors.ButtonStyleOutline}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            sx={StyleColors.ButtonStyle}
                        >
                            Save Product
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Enhanced Notification Snackbar */}
            <Snackbar
                open={notify.open}
                autoHideDuration={notify.duration}
                onClose={() => setNotify(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    severity={notify.severity} 
                    onClose={() => setNotify(prev => ({ ...prev, open: false }))}
                    sx={{ width: '100%' }}
                >
                    {notify.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Product;