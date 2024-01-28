'use client';
import axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import styles from '../page.module.css';
import { useDispatch } from "react-redux";
import { logOut } from "@/store/reducer/session";

export default function Logout() {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('/api/logout').then(() => {
           dispatch(logOut()); 
           router.push('/login'); 
        });
    },[]);
    return (
        <main className={styles.main} >Loging out ...</main>
    )
}