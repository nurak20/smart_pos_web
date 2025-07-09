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
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { CategoryService } from './CategoryService';
import POSFormImageUpload from '../../components/file_upload';

const API_GET = 'v1/categories';
const API_POST = 'https://api.txteams.net/api/v1/categories';

const Category = () => {
    // State hooks
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'true',
        image: ''
    });
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({ open: false, message: '', severity: 'success' });

    // Fetch categories
    useEffect(() => {
        getCategoriesListing();
    }, []);

    const getCategoriesListing = async () => {
        try {
            const res = await CategoryService.getCategories();

            setCategories(res || []);
        } catch (err) {

        } finally {
            setLoading(false);
        }
    };

    // Handlers
    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => {
        setOpenDialog(false);
        setFormData({ name: '', description: '', status: 'true', image: '' });
        setErrors({});
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.name) errs.name = 'Category name is required';
        if (!formData.description) errs.description = 'Description is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const payload = {
                ...formData,
                created_by: 'current-user-id',
                updated_by: 'current-user-id',
            };
            const res = await CategoryService.createNewCategory({ payload: payload });
            if (res) {
                getCategoriesListing();
                handleClose();

            }

        } catch (err) {

        }
    };

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); };

    // Filtered & paginated
    const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Status options
    const statusOptions = [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
    ];

    return (
        <Box sx={{ background: 'white' }}>
            <AppBar position="static" sx={{ background: 'white' }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2 }}>
                    <Typography variant="h5" color={StyleColors.textDarkGray} sx={{ flexGrow: 1 }}>Category Management</Typography>
                    <Button startIcon={<AddIcon />} onClick={handleOpen} sx={StyleColors.ButtonStyle}>New Category</Button>
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginated.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>
                                            <span style={{
                                                color: row.status === 'true' ? '#4caf50' : '#f44336',
                                                fontWeight: 'bold'
                                            }}>
                                                {row.status === 'true' ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
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
                    Create New Category
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
                                name="name"
                                label="Category Name"
                                prefixIcon={<CategoryIcon />}
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                            />

                            <POSFormTextField
                                select
                                name="status"
                                label="Status"
                                prefixIcon={<ToggleOnIcon />}
                                value={formData.status}
                                onChange={handleChange}
                                error={!!errors.status}
                                helperText={errors.status}
                                required
                            >
                                {statusOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </POSFormTextField>

                            <POSFormTextField
                                name="description"
                                label="Description"
                                multiline
                                rows={3}
                                prefixIcon={<DescriptionIcon />}
                                value={formData.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                required
                            />
                            <POSFormImageUpload
                                name="image"
                                label="Upload Image"
                                uploadPreset="NurakPOS"
                                value={formData.image}
                                onUpload={(e) => {
                                    setFormData(prev => ({ ...prev, ['image']: e }));
                                    if (errors[name]) setErrors(prev => ({ ...prev, ['image']: e }));
                                }}
                                onError={(err) => null}
                            />

                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleClose} sx={StyleColors.ButtonStyleOutline}>Cancel</Button>
                        <Button type="submit" sx={StyleColors.ButtonStyle}>Save Category</Button>
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

export default Category;