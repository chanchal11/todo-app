'use client';
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logIn } from '@/store/reducer/session';

const NavBar: React.FC = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.session.isLoggedIn);

    useEffect(() => {
        axios.get('/api/checkLogin').then((response) => {
            if (response?.data?.message === 'alreay logged in') {
                dispatch(logIn());
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <nav>
            <Link href="/todo">Home</Link>
            <Link href="/signup">Signup</Link>
            { isLoggedIn ?  (<Link href="/logout">Logout</Link>) : (<Link href="/login">Login</Link>) }
        </nav>
    );
};

export default NavBar;
