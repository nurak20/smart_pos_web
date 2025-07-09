import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
    Link,
    Alert,
    CircularProgress,
    Divider,
    Avatar,
    Container,
    Paper,
    Grid,
    useTheme,
    useMediaQuery,
    Fade,
    Slide
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Person,
    Lock,
    ShoppingBag,
    Security,
    TrendingUp,
    Inventory
} from '@mui/icons-material';
import { StyleColors } from '../../util/helper/Extension';
import { axiosPOST } from '../../service/ApiService';
import { useAuth } from '../../context/AuthProvider';

const initialValues = {
    username: '',
    password: '',
};

export default function Login() {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // client-side field validation
    const validate = (fieldVals = values) => {
        const temp = { ...errors };
        if ('username' in fieldVals) {
            temp.username = fieldVals.username
                ? ''
                : 'Username is required.';
        }
        if ('password' in fieldVals) {
            temp.password =
                fieldVals.password.length >= 6
                    ? ''
                    : 'Password must be at least 6 characters.';
        }
        setErrors(temp);
        return Object.values(temp).every((x) => x === '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        validate({ [name]: value });
        if (serverError) setServerError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        if (!validate()) return;

        setSubmitting(true);
        const payload = {
            username: values.username,
            password: values.password,
        };
        const res = await axiosPOST('auth/login', payload);
        if (res) {
            console.log(res);
            setSubmitting(true);
            login(res);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        }



    };

    const features = [
        { icon: <Security />, text: 'Secure & Fast Authentication' },
        { icon: <Inventory />, text: 'Manage Your Products' },
        { icon: <TrendingUp />, text: 'Track Your Sales' }
    ];

    return (
        <Box
            sx={{
                height: '90vh',
                // height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, }}>
                <Fade in timeout={1000}>
                    <Paper
                        elevation={2}
                        sx={{
                            borderRadius: 4,
                            overflow: 'hidden',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <div className='container-fluid' sx={{ minHeight: isMobile ? 'auto' : '600px' }}>
                            <div className="row">
                                {/* Left Panel - Branding */}
                                <div className="col-md-6"
                                    style={{
                                        background: 'linear-gradient(135deg,rgb(226, 101, 153) 0%,rgb(162, 75, 108) 100%)',
                                        color: 'white',
                                        p: { xs: 4, md: 6 },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: '-50%',
                                            left: '-50%',
                                            width: '200%',
                                            height: '200%',
                                            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                                            animation: 'pulse 4s ease-in-out infinite',
                                            '@keyframes pulse': {
                                                '0%, 100%': { transform: 'scale(1)' },
                                                '50%': { transform: 'scale(1.1)' },
                                            },
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative', zIndex: 2 }}>
                                        <Slide direction="down" in timeout={1200}>
                                            <Box sx={{ mb: 4 }}>
                                                <Avatar
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dxWcWXGNh_rO1UCfYKTy9TfPLwsTd6ilJw&s'
                                                    sx={{
                                                        width: 150,
                                                        height: 150,
                                                        mb: 3,
                                                        mx: 'auto',
                                                        boxShadow: '0 6px 20px 2px rgba(153, 35, 94, 0.8)',
                                                        background: 'rgba(255, 255, 255, 0.2)',
                                                        backdropFilter: 'blur(10px)',
                                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                                    }}
                                                >

                                                </Avatar>
                                                <Typography
                                                    variant="h3"
                                                    component="h1"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        mb: 1,
                                                        background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                                                        backgroundClip: 'text',
                                                        WebkitBackgroundClip: 'text',
                                                        color: 'transparent',
                                                        textShadow: '0 0 20px rgba(255,255,255,0.5)',
                                                    }}
                                                >
                                                    RS Shopping
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        opacity: 0.9,
                                                        fontWeight: 300,
                                                        mb: 4
                                                    }}
                                                >
                                                    Welcome back to your store
                                                </Typography>
                                            </Box>
                                        </Slide>

                                        <Slide direction="up" in timeout={1500}>
                                            <Box sx={{ space: 3 }}>
                                                {features.map((feature, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            mb: 2,
                                                            opacity: 0.9,
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                opacity: 1,
                                                                transform: 'translateX(10px)',
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ mr: 2, display: 'flex' }}>
                                                            {feature.icon}
                                                        </Box>
                                                        <Typography variant="body1">
                                                            {feature.text}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Slide>
                                    </Box>
                                </div>

                                {/* Right Panel - Login Form */}
                                <div className='col-md-6'
                                >
                                    <Box sx={{ p: { xs: 4, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                                        <Slide direction="left" in timeout={1000}>
                                            <Box>
                                                <Typography
                                                    variant="h4"
                                                    component="h2"
                                                    sx={{
                                                        mb: 1,
                                                        fontWeight: 'bold',
                                                        color: 'rgb(222, 65, 117)',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    Sign In
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="text.secondary"
                                                    sx={{ mb: 4, textAlign: 'center' }}
                                                >
                                                    Enter your credentials to access your account
                                                </Typography>

                                                {serverError && (
                                                    <Fade in>
                                                        <Alert
                                                            severity="error"
                                                            sx={{
                                                                mb: 3,
                                                                borderRadius: 2,
                                                                '& .MuiAlert-icon': {
                                                                    fontSize: '1.2rem'
                                                                }
                                                            }}
                                                        >
                                                            {serverError}
                                                        </Alert>
                                                    </Fade>
                                                )}

                                                <Box component="form" onSubmit={handleSubmit} sx={{ space: 3 }}>
                                                    <TextField
                                                        fullWidth
                                                        label="Username"
                                                        name="username"
                                                        value={values.username}
                                                        onChange={handleChange}
                                                        error={!!errors.username}
                                                        helperText={errors.username}
                                                        sx={{ ...StyleColors.TextFieldStyle, mb: 3 }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Person color="action" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        variant="outlined"
                                                    />

                                                    <TextField
                                                        fullWidth
                                                        label="Password"
                                                        name="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        error={!!errors.password}
                                                        helperText={errors.password}
                                                        sx={{ ...StyleColors.TextFieldStyle, mb: 3 }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Lock color="action" />
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                        edge="end"
                                                                    >
                                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        variant="outlined"
                                                    />

                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={rememberMe}
                                                                    onChange={(e) => setRememberMe(e.target.checked)}
                                                                    color="primary"
                                                                />
                                                            }
                                                            label="Remember me"
                                                        />
                                                        <Link
                                                            href="#"
                                                            variant="body2"
                                                            color="primary"
                                                            sx={{
                                                                textDecoration: 'none',
                                                                color: 'rgb(222, 65, 117)',
                                                                '&:hover': {
                                                                    textDecoration: 'underline',
                                                                }
                                                            }}
                                                        >
                                                            Forgot password?
                                                        </Link>
                                                    </Box>

                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        size="large"
                                                        disabled={submitting}
                                                        sx={{
                                                            py: 1.5,
                                                            mb: 3,
                                                            background: 'linear-gradient(45deg,rgb(224, 85, 141) 30%,rgb(230, 41, 104) 90%)',
                                                            boxShadow: '0 3px 5px 2px rgba(234, 102, 146, 0.3)',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                background: 'linear-gradient(45deg,rgb(234, 102, 155) 30%,rgb(192, 50, 98) 90%)',
                                                                transform: 'translateY(-2px)',
                                                                boxShadow: '0 6px 20px 2px rgba(234, 102, 159, 0.4)',
                                                            },
                                                            '&:active': {
                                                                transform: 'translateY(0)',
                                                            },
                                                        }}
                                                    >
                                                        {submitting ? (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <CircularProgress size={20} color="inherit" />
                                                                <span>Signing in...</span>
                                                            </Box>
                                                        ) : (
                                                            'Sign In'
                                                        )}
                                                    </Button>

                                                    <Divider sx={{ my: 3 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            or
                                                        </Typography>
                                                    </Divider>

                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Don't have an account?{' '}
                                                            <Typography
                                                                sx={{

                                                                    fontWeight: 'bold',
                                                                    textDecoration: 'none',
                                                                    '&:hover': {
                                                                        textDecoration: 'underline',
                                                                    }
                                                                }}
                                                            >
                                                                Sign up
                                                            </Typography>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Slide>
                                    </Box>
                                </div>

                            </div>
                        </div>
                    </Paper>
                </Fade>
            </Container>


        </Box>
    );
}