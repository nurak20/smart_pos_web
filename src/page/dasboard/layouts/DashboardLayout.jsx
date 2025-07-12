import React, { useState, useMemo } from 'react';
import {
    ThemeProvider,
    CssBaseline,
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    useMediaQuery,
    Container,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Chip,
    LinearProgress,
    createTheme,
    Button
} from '@mui/material';

import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    PointOfSale as SalesIcon,
    Inventory as InventoryIcon,
    Assessment as ReportsIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
    TrendingUp as TrendingUpIcon,
    Receipt as ReceiptIcon,
    Assignment as AssignmentIcon,
    Warning as WarningIcon,
    AccountCircle as AccountCircleIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    CategoryRounded,
    ImportContactsRounded,
    ArrowBackIosNew,
    ArrowDownward,
    ArrowDropDown
} from '@mui/icons-material';
import { theme } from '../Dashboard';
import { StyleColors } from '../../../util/helper/Extension';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import POSAppBar from './POSAppBar';

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeItem, setActiveItem] = useState('Overview');
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { logout, user, openPos, isAdmin } = useAuth();

    const drawerWidth = 280;

    const handleDrawerToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handleNavItemClick = (text, path) => {
        setActiveItem(text);
        navigate(path);
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', paddingLeft: 2, paddingTop: 2, paddingBottom: 2, background: 'rgba(134, 25, 25, 0)', pe: 0 }}>
            <Box sx={{ background: 'white', height: '100%', borderRadius: 2, }}>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',

                        p: 2,
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Avatar
                        variant="rounded"
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dxWcWXGNh_rO1UCfYKTy9TfPLwsTd6ilJw&s'
                        sx={{
                            bgcolor: 'primary.main',
                            width: 48,
                            height: 48,
                        }}
                    />


                    <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" fontWeight="bold" color={StyleColors.textDarkGray}>
                            RS Shopping
                        </Typography>
                        <Typography variant="caption" color={StyleColors.textGray}>
                            Point of Sale System
                        </Typography>
                    </Box>
                </Box>
                <List sx={{ flex: 1, pt: 2, px: 1 }}>
                    {navigationItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            selected={activeItem === item.text}
                            onClick={() => handleNavItemClick(item.text, item.path)}
                            sx={{

                                mx: 1,
                                mb: 0.5,
                                borderRadius: 0.5,
                                '&.Mui-selected': {
                                    background: 'none',
                                    color: StyleColors.appColorLv7,
                                    '&:hover': {
                                        backgroundColor: StyleColors.appColorLv1,
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: StyleColors.appColorLv7,
                                    },
                                },
                            }}
                            aria-label={`Navigate to ${item.text}`}
                        >
                            <ListItemIcon>
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}

                    <ListItemButton


                        onClick={() => openPos()}
                        sx={{

                            mx: 1,
                            mb: 0.5,
                            borderRadius: 0.5,
                            '&.Mui-selected': {
                                background: 'none',
                                color: StyleColors.appColorLv7,
                                '&:hover': {
                                    backgroundColor: StyleColors.appColorLv1,
                                },
                                '& .MuiListItemIcon-root': {
                                    color: StyleColors.appColorLv7,
                                },
                            },
                        }}

                    >
                        <ListItemIcon>
                            <ImportContactsRounded />
                        </ListItemIcon>
                        <ListItemText primary='Sales' />
                    </ListItemButton>

                </List>

            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', }}>
            {/* App Bar */}

            {/* User Menu */}


            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: sidebarOpen ? drawerWidth : 0 }, flexShrink: { md: 0 }, }}
            >
                {isMobile ? (
                    <Drawer
                        variant="temporary"
                        open={sidebarOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                ) : (
                    <Drawer
                        variant="persistent"
                        open={sidebarOpen}
                        sx={{

                            '& .MuiDrawer-paper': {
                                backgroundColor: 'background.default',

                                boxSizing: 'border-box',
                                border: 'none',
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                )}
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{

                    width: { md: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                }}
            >
                <POSAppBar />

                {children}
            </Box>
        </Box>
    );
};



const navigationItems = [
    { text: 'Overview', icon: DashboardIcon, path: '/' },
    { text: 'Product', icon: InventoryIcon, path: '/product' },
    { text: 'Categories', icon: CategoryRounded, path: '/category' },
    { text: 'Reports', icon: ReportsIcon, path: '/reports' },
    { text: 'Orders', icon: ReceiptIcon, path: '/order' },
    { text: 'Product Detail', icon: AssignmentIcon, path: '/productd' },

];


export default DashboardLayout;


