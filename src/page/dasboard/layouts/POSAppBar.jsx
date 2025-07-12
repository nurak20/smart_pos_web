import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Box,
    Avatar,
    Badge,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    ArrowDropDown,
    CloseRounded
} from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';

// Assuming StyleColors is imported from somewhere - you'll need to add this import
// import { StyleColors } from '../path/to/StyleColors';

const POSAppBar = ({ activeItem, handleDrawerToggle, ispLeftRight = true, isPos = false }) => {
    const { user, isAdmin, logout, openPos } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    p: ispLeftRight ? 2 : 0,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                }}
            >
                <Toolbar sx={{
                    borderRadius: 2,
                    boxShadow: 'rgba(237, 237, 237, 0.2) 0px 8px 24px',
                    background: 'white',
                    width: '100%',
                }}>
                    <IconButton
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={() => isPos ? openPos() : handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        {
                            isPos ? <CloseRounded /> : <MenuIcon />

                        }

                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: 'text.secondary' // Replace StyleColors.textGray with MUI theme color
                        }}
                    >
                        {activeItem}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton aria-label="notifications">
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Button
                            sx={{
                                background: 'rgb(246, 246, 246)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                justifyContent: 'start',
                                borderRadius: 2
                            }}
                            onClick={handleMenuClick}
                            aria-label="user menu"
                            aria-controls="user-menu"
                            aria-haspopup="true"
                        >
                            <Avatar sx={{ width: 32, height: 32 }} src={user?.image_url} />
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.primary' }} // Replace StyleColors.textDarkGray
                                >
                                    {user?.last_name}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 10,
                                        textAlign: 'start',
                                        color: 'text.secondary' // Replace StyleColors.textGray
                                    }}
                                >
                                    {isAdmin ? 'Admin' : 'User'}
                                </Typography>
                            </Box>
                            <ArrowDropDown color='disabled' />
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

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
                <MenuItem onClick={() => logout()} sx={{ color: 'red' }}>
                    <ListItemIcon sx={{ color: 'red' }}>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default POSAppBar;