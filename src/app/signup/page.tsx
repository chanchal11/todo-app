"use client";
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { startLoading, stopLoading } from '@/store/reducer/ui';

 export default function Register() {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.ui);
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    
    const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            dispatch(startLoading());
            const response = await axios.post("/api/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            dispatch(stopLoading());
        }
    }

    useEffect(() => {
        if(!isLoading || (user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ) ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user, isLoading]);




    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form onSubmit={onSignup} >
                   <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                    />
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
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Container>
    );
 }           