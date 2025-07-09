import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Checkbox,
    FormControlLabel,
    Link,
    Divider,
    Avatar
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    Login as LoginIcon
} from '@mui/icons-material';
import { StyleColors } from '../../util/helper/Extension';
import axios from 'axios';

const API_LOGIN = 'https://api.txteams.net/api/v1/auth/login';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'error' });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        setLoading(true);
        setAlert({ show: false, message: '', severity: 'error' });
        
        try {
            const response = await axios.post(API_LOGIN, {
                email: formData.email,
                password: formData.password
            });
            
            if (response.data.success) {
                // Store token if remember me is checked
                if (formData.rememberMe) {
                    localStorage.setItem('authToken', response.data.token);
                } else {
                    sessionStorage.setItem('authToken', response.data.token);
                }
                
                setAlert({ 
                    show: true, 
                    message: 'Login successful! Redirecting...', 
                    severity: 'success' 
                });
                
                // Redirect to dashboard or home page
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            setAlert({ 
                show: true, 
                message: errorMessage, 
                severity: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            padding: 2
        }}>
            <Card sx={{
                maxWidth: 400,
                width: '100%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                borderRadius: 3
            }}>
                <CardContent sx={{ p: 4 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Avatar src='data:image/jpeg;base64,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'/>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to your account to continue
                        </Typography>
                    </Box>

                    {/* Alert */}
                    {alert.show && (
                        <Alert 
                            severity={alert.severity} 
                            sx={{ mb: 3 }}
                            onClose={() => setAlert({ ...alert, show: false })}
                        >
                            {alert.message}
                        </Alert>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                )
                            }}
                            sx={{ mb: 3 }}
                            required
                        />

                        <TextField
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{ mb: 2 }}
                            required
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Link href="/forgot-password" variant="body2" color="primary">
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                ...StyleColors.ButtonStyle,
                                height: 48,
                                mb: 2,
                                fontSize: 16,
                                textTransform: 'none'
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                or
                            </Typography>
                        </Divider>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <Link href="/register" color="primary" sx={{ fontWeight: 'bold' }}>
                                    Sign up here
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;