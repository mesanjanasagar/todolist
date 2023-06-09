import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setToken, setUser } from '../state/features/auth';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [login, setLogin] = useState(true);
    const form = useForm();
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (values) => {
        if (login) {
            if (user.email === values.email && user.password === values.password) {
                dispatch(
                    setToken("login")
                )
                navigate('/')
            } else {
                alert("User is not registered");
            }
        } else {
            dispatch(setUser(values));
            reset();
            setLogin(true);
        }

    };
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#FAF8F1'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#C58940' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {login ? "Sign in" : "Sign up"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        {!login ?
                            <><Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    {...register('firstName', { required: "First name is required" })}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Last Name"
                                        {...register('lastName', { required: "Last name is required" })}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        margin="normal"
                                        fullWidth
                                        autoFocus
                                    />
                                </Grid> </> : ""}
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                {...register('email', { required: "Email is required" })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                margin="normal"
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                {...register('password', { required: "Password is required" })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                margin="normal"
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2, bgcolor: "#C58940", ":hover": {
                                bgcolor: "#E5BA73"
                            }
                        }}
                    >
                        {login ? "Sign in" : "Sign up"}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                variant="body2"
                                color={"#27374D"}
                                onClick={() => setLogin(!login)}>
                                {login ? "Don't have an account? Sign Up" : "Already have an account? Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}