'use client';
import { useEffect, useRef } from 'react';
import { initializeApp, getApps, setLogLevel } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
import { firebaseConfig, db, auth } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import {setDoc, doc} from 'firebase/firestore';


export default function LoginForm() {
    const containerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {

        if (!getApps().length) initializeApp(firebaseConfig);

        import('firebaseui').then((firebaseui) => {

            const ui =
                firebaseui.auth.AuthUI.getInstance() ??
                new firebaseui.auth.AuthUI(getAuth());

            ui.start(containerRef.current, {
                signInFlow: 'popup',
                signInOptions: [GoogleAuthProvider.PROVIDER_ID],
                callbacks: {
                    // fires after Google sign-in succeeds
                    signInSuccessWithAuthResult: () => {
                        const user = auth.currentUser;
                        setDoc(doc(db, "root", user.uid), {
                            email: user.email
                        }, {merge: true} );
                        console.log("test");
                        router.push('/');
                        return false;
                    },
                },
            });
        });

        /* 3 ─ optional: listen for auth state in case of redirect flow */
        const unsub = onAuthStateChanged(getAuth(), async (user) => {
            if (user) {
                await setDoc(doc(db, "root", user.uid), {
                    email: user.email
                }, {merge: true} );
                console.log("test");
                router.push('/');
            }
        });
        return () => unsub();
    }, []);

    return <div ref={containerRef} id="firebaseui-auth-container" />;
}