'use client'
import { useState } from 'react';

import Spinner from "@/components/Spinner/Spinner";
import {useRouter} from "next/navigation";
import styles from './page.module.css';

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push('/orderNow'); // Replace 'dashboard' with your actual authenticated page
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <h1>Login Page</h1>
                <button className={styles.loginButton} onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default Login;
