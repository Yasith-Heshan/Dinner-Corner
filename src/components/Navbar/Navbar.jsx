"use client"
import Link from "next/link";
import styles from './Navbar.module.css'
import {usePathname} from "next/navigation";
import {UserAuth} from "@/app/context/AuthContext";
import React, {useState} from "react";

const pages = [
    {
        id: 1,
        title: 'ඇනවුම් කරන්න',
        url: '/ordernow'
    },
    {
        id: 2,
        title: 'භාර දී ඇති ඇනවුම්',
        url: '/orders',
    },
    {
        id: 3,
        title: 'Google Sign IN',
        url: '#'
    },
    {
        id: 4,
        title: 'Sign Out',
        url: '#'
    }


]

const NavBar = () => {
    const pathname = usePathname();

    const {user,googleSignIn,googleSignInWithRedirect, logout} = UserAuth();

    const [isOpen, setIsOpen] = useState(false);


    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleSignIn = async ()=>{
        try{
            await googleSignIn();
        }catch (error){
            console.log(error);
        }
    }
    const handleSignOut = async ()=>{
        setIsOpen(false)
        try{
            await logout();
        }catch (error){
            console.log(error);
        }
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        DinnerCorner
                    </Link>
                </div>
            </div>
            <ul className={styles.navLinks}>
                {
                    pages.map(
                        (page,index) => {

                            const isActive = pathname.startsWith(page.url)
                            return (
                                <React.Fragment key={index}>
                                    {
                                        page.id !== 2 && page.id !== 3 && page.id !== 4 &&
                                        (<li key={page.id}>
                                                <Link className={isActive ? styles.activateLink : ''} href={page.url}>
                                                    {page.title}
                                                </Link>
                                            </li>
                                        )}
                                    {
                                        page.id === 2 && user && (
                                            <li key={page.id}>
                                                <Link className={isActive ? styles.activateLink : ''} href={page.url}>
                                                    {page.title}
                                                </Link>
                                            </li>
                                        )
                                    }
                                    {
                                        page.id === 3 && !user && (
                                            <li key={page.id}>
                                                <Link onClick={handleSignIn} className={isActive ? styles.activateLink : ''} href={page.url}>
                                                    {page.title}
                                                </Link>
                                            </li>
                                        )
                                    }
                                    {
                                        page.id === 4 &&  user &&(
                                            <li key={page.id}>
                                                <div className={styles.dropdown}>
                                                    <button className={styles['dropdown-toggle']} onClick={handleToggle}>
                                                        {user.displayName} {/* Replace 'Username' with the actual username */}
                                                    </button>
                                                    {isOpen && (
                                                        <div className={styles['dropdown-menu']}>
                                                            <button className={styles['dropdown-item']} onClick={handleSignOut}>
                                                                Logout
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    }

                                </React.Fragment>
                            );

                        }
                    )
                }
            </ul>
        </nav>
    )
}

export default NavBar;