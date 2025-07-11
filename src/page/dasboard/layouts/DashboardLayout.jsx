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
    createTheme
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
    Logout as LogoutIcon
} from '@mui/icons-material';
import { theme } from '../Dashboard';
import { StyleColors } from '../../../util/helper/Extension';

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeItem, setActiveItem] = useState('Overview');
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

    const handleNavItemClick = (text) => {
        setActiveItem(text);
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', }}>
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
                        onClick={() => handleNavItemClick(item.text)}
                        sx={{
                            mx: 1,
                            mb: 0.5,
                            borderRadius: 1,
                            '&.Mui-selected': {
                                backgroundColor: StyleColors.componentsGreen,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: StyleColors.componentsHover,
                                },
                                '& .MuiListItemIcon-root': {
                                    color: 'white',
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
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', }}>
            {/* App Bar */}
            <AppBar
                position="fixed"
                elevation={0}

                sx={{

                    background: 'none',
                    width: { md: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
                    ml: { md: sidebarOpen ? `${drawerWidth}px` : 0 },
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar>
                    <IconButton

                        aria-label="toggle drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: StyleColors.textGray }}>
                        {activeItem}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton aria-label="notifications">
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton

                            onClick={handleMenuClick}
                            aria-label="user menu"
                            aria-controls="user-menu"
                            aria-haspopup="true"
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                <PersonIcon />
                            </Avatar>
                        </IconButton>
                    </Box>
                </Toolbar>

            </AppBar>

            {/* User Menu */}
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                elevation={1}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        minWidth: 180,
                    },
                }}
            >
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: sidebarOpen ? drawerWidth : 0 }, flexShrink: { md: 0 } }}
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
                    flexGrow: 1,
                    width: { md: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};



const navigationItems = [
    { text: 'Overview', icon: DashboardIcon, path: '/' },
    { text: 'Sales', icon: SalesIcon, path: '/sales' },
    { text: 'Inventory', icon: InventoryIcon, path: '/inventory' },
    { text: 'Reports', icon: ReportsIcon, path: '/reports' },
];


export default DashboardLayout;


