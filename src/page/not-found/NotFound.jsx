import React from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Card,
    CardContent,
    Stack
} from '@mui/material';
import {
    Home as HomeIcon,
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    ErrorOutline as ErrorIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StyleColors } from '../../util/helper/Extension';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSearch = () => {
        navigate('/search');
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: 2, sm: 3 }
        }}>
            <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2 } }}>
                <Card sx={{
                    borderRadius: { xs: 2, sm: 4 },
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <CardContent sx={{ 
                        p: { xs: 3, sm: 6 }, 
                        textAlign: 'center',
                        '&:last-child': { pb: { xs: 3, sm: 6 } }
                    }}>
                        {/* 404 Display */}
                        <Box sx={{ 
                            position: 'relative',
                            mb: { xs: 3, sm: 4 },
                            display: 'inline-block'
                        }}>
                            <Typography 
                                variant="h1" 
                                sx={{
                                    fontSize: { xs: '6rem', sm: '8rem', md: '12rem' },
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                                    lineHeight: 1,
                                    mb: 0
                                }}
                            >
                                404
                            </Typography>
                        </Box>

                        {/* Main Message */}
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                color: '#2c3e50',
                                mb: { xs: 1, sm: 2 },
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
                            }}
                        >
                            Oops! Page Not Found
                        </Typography>

                        <Typography 
                            variant="h6" 
                            color="text.secondary"
                            sx={{
                                mb: { xs: 3, sm: 4 },
                                maxWidth: 600,
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
                            }}
                        >
                            The page you're looking for doesn't exist or has been moved. 
                            Don't worry, it happens to the best of us!
                        </Typography>

                        {/* Action Buttons */}
                        <Stack 
                            direction={{ xs: 'column', sm: 'row' }} 
                            spacing={2}
                            justifyContent="center"
                            sx={{ mb: { xs: 3, sm: 4 } }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<HomeIcon />}
                                onClick={handleGoHome}
                                sx={{
                                    ...StyleColors.ButtonStyle,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    minWidth: { xs: '100%', sm: 160 },
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
                                    }
                                }}
                            >
                                Go Home
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default NotFound;