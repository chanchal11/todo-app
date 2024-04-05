"use client";
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import {useRouter} from "next/navigation";
import axios from "axios";
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '@/store/reducer/session';
import { RootState } from '@/store';
import { startLoading, stopLoading } from '@/store/reducer/ui';

 export default function Login() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const isLoading = useSelector((state: RootState) => state.ui.isLoading);

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            dispatch(startLoading());
            const response = await axios.post("/api/login", user);
            dispatch(logIn());
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push('/todo');
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
            dispatch(stopLoading());
        }
    }

    useEffect(() => {
                const token = document.cookie.split('; ').find(row => row.startsWith('token='));
                if (token) {
                    router.push('/todo');
                }
    }, []);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    useEffect(() => {
        if(isLoading) {
            setButtonDisabled(true);
        }else {
            setButtonDisabled(false);
        }
    }, [ isLoading ] )

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={onLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={buttonDisabled}
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
 }           