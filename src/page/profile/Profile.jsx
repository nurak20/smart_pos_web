import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Lock as LockIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PremiumPosProfile = () => {
  const navigate = useNavigate();

  const user = {
    name: 'NUTH',
    avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQIBS2JtLNK5esll1g4BunmYPA-kvp3UQiqsRNBhRYUwMhhyvjW',
    lastLogin: 'Today at 9:30 AM',
    version: '1.2.3',
  };

  const handleEditProfile = () => navigate('/edit-profile');
  const handleChangePassword = () => navigate('/change-password');
  const handleLogout = () => navigate('/login');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff', // appColorLv1
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      {/* Avatar and Name */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={user.avatar}
          sx={{
            width: 160,
            height: 160,
            border: '6px solid white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          }}
        />
        <Typography
          fontWeight={700}
          sx={{ 
            mt: 2, 
            color: '#825567', // appColorLv7
            fontSize: '2.2rem', 
            letterSpacing: '2px',
          }}
        >
          {user.name}
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ 
        width: '100%', 
        maxWidth: 440, 
        mb: 4,
        borderColor: '#b08499' // appColorLv5
      }} />

      {/* Buttons with 4px border radius */}
      <Stack spacing={3} width="100%" maxWidth={440}>
        <Button
          variant="contained"
          onClick={handleEditProfile}
          startIcon={<EditIcon sx={{ fontSize: 30, color: '#825567' }} />}
          sx={{
            backgroundColor: 'white',
            color: '#825567', // appColorLv7
            fontSize: '1.25rem',
            fontWeight: 700,
            textTransform: 'none',
            height: 70,
            borderRadius: '4px', // 4px border radius
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f4eff2', // appColorLv2
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            },
          }}
          fullWidth
        >
          Edit Profile
        </Button>

        <Button
          variant="contained"
          onClick={handleChangePassword}
          startIcon={<LockIcon sx={{ fontSize: 30, color: '#825567' }} />}
          sx={{
            backgroundColor: 'white',
            color: '#825567', // appColorLv7
            fontSize: '1.25rem',
            fontWeight: 700,
            textTransform: 'none',
            height: 70,
            borderRadius: '4px', // 4px border radius
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f4eff2', // appColorLv2
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            },
          }}
          fullWidth
        >
          Change Password
        </Button>

        <Button
          variant="contained"
          onClick={handleLogout}
          startIcon={<LogoutIcon sx={{ fontSize: 30, color: '#825567' }} />}
          sx={{
            backgroundColor: 'white',
            color: '#825567', // appColorLv7
            fontSize: '1.25rem',
            fontWeight: 700,
            textTransform: 'none',
            height: 70,
            borderRadius: '4px', // 4px border radius
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f4eff2', // appColorLv2
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            },
          }}
          fullWidth
        >
          Logout
        </Button>
      </Stack>

      {/* Footer Info */}
      <Box sx={{ 
        mt: 6, 
        textAlign: 'center', 
        color: '#b08499' // appColorLv5
      }}>
        <Typography variant="body1">
          Last login: {user.lastLogin}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          Version {user.version}
        </Typography>
      </Box>
    </Box>
  );
};

export default PremiumPosProfile;