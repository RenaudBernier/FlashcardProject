'use client'

import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';
import { firebaseConfig, auth } from '@/app/firebase';
import {redirect, useRouter} from 'next/navigation';
import {initializeApp, getApps} from "firebase/app";


export default function LoginCheck() {
    const user = auth.currentUser;

    if (!user) {
        redirect('/login');
    }

    return null
}