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
import { ProductService } from './Service';
import { CategoryService } from '../category/CategoryService';
import POSFormImageUpload from '../../components/file_upload';


const Product = () => {
    // State hooks
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
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
        brand_name: ''
    });
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({ open: false, message: '', severity: 'success' });

    // Fetch products
    useEffect(() => {
        getProductListing();
    }, []);

    const getProductListing = async () => {
        try {
            const res = await ProductService.getProducts();
            setProducts(res);
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    // Handlers
    // inside your component, update handleOpen:
    const handleOpen = ({ type = "create", data = null }) => {
        setIsCreateNew(type === "create");
        if (type === "update" && data) {
            // seed the form with the product you clicked
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
                // keep the id handy for the update call
                product_id: data.product_id,
            });
        }
        setOpenDialog(true);
    };


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
                code: new Date().getTime(),
                warehouse_id: null,
                created_by: 'c161a77f-94d2-4ea5-a34f-15cf43f61eda',
                updated_by: 'c161a77f-94d2-4ea5-a34f-15cf43f61eda',
            };
            if (isCreateNew) {
                await ProductService.createNewProduct({ payload: payload });
            } else {
                await ProductService.updateProduct({ payload: payload, productId: formData.product_id });
            }
            getProductListing();
            handleClose();
        } catch (err) {

        }
    };

    // Sample categories
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategoriesListing = async () => {
            try {
                const res = await CategoryService.getCategories();
                setCategories(res)
            } catch (err) {
                console.log(err)
            }
        }
        getCategoriesListing();
    }, [])

    // Filtered data for DataGrid
    const filteredProducts = products.filter(p =>
        p.product_name.toLowerCase().includes(search.toLowerCase())
    );

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
                    <IconButton color='default' onClick={() => handleOpen({ type: "update", data: params.row })} sx={{ bgcolor: StyleColors.appColorLv1 }} size='small'>
                        <EditIcon />
                    </IconButton>
                    <IconButton color='default' sx={{ bgcolor: StyleColors.appColorLv1 }} size='small' className='ms-2'>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ background: 'white', pb: 2, borderRadius: '12px', overflow: 'hidden' }}>
            <AppBar position="static" sx={{ background: 'white', }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2 }}>
                    <Typography variant="h5" color={StyleColors.textDarkGray} sx={{ flexGrow: 1 }}>Product Management</Typography>
                    <Button startIcon={<AddIcon />} onClick={() => handleOpen({ type: "create" })} sx={StyleColors.ButtonStyle}>New Product</Button>
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
                <Paper sx={{ m: 2, height: '100%', maxHeight: '900px' }} elevation={0}>
                    <DataGrid
                        rows={filteredProducts}
                        columns={columns}
                        pageSize={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
                        pagination
                        rowHeight={70}
                        disableSelectionOnClick
                        getRowId={(row) => row.product_id}
                        sx={StyleColors.tableStyle}
                    />
                </Paper>
            )}

            {/* Dialog */}
            <Dialog open={openDialog} fullWidth maxWidth="md">
                <DialogTitle>
                    {isCreateNew ? 'Create New Product' : 'Update Product'}
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
                            {/* 
                            <POSFormTextField
                                name="group_code"
                                label="Group Code"
                                prefixIcon={<CodeIcon />}
                                value={formData.group_code}
                                onChange={handleChange}
                            /> */}


                            <POSFormImageUpload
                                name="image_url"
                                label="Upload Image"
                                uploadPreset="NurakPOS"
                                value={formData.image_url}
                                onUpload={(e) => {
                                    setFormData(prev => ({ ...prev, ['image_url']: e }));
                                    if (errors[name]) setErrors(prev => ({ ...prev, ['image_url']: e }));
                                }}
                                onError={(err) => null}
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