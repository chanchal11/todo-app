'use client';
import axios from 'axios';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import  Link  from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logIn } from '@/store/reducer/session';
import Providers from './StoreProvider';
import NavBar from './components/NavBar';
import TopLoading from './components/TopLoading';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
         <TopLoading />   
        <NavBar />{children}</Providers></body>
    </html>
  )
}

