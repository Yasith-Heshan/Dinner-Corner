"use client"
import Link from "next/link";
import styles from './Navbar.module.css'
import {usePathname} from "next/navigation";
import {UserAuth} from "@/app/context/AuthContext";
import {useState} from "react";

const pages = [
    {
        id: 1,
        title: 'ඇනවුම් කරන්න',
        url: '/ordernow'
    },
    {
        id: 2,
        title: 'භාර දී ඇනවුම්',
        url: '/orders',
    },
    {
        id: 3,
        title: 'Login',
        url: '#'
    },
    {
        id: 4,
        title: 'Logout',
        url: '#'
    }


]

const NavBar = () => {
    const pathname = usePathname();

    const {user,googleSignIn, logout} = UserAuth();

    const [isOpen, setIsOpen] = useState(false);

    console.log(user);

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
                        (page) => {

                            const isActive = pathname.startsWith(page.url)
                            return (
                                <>
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

                                </>
                            );

                        }
                    )
                }
            </ul>
        </nav>
    )
}

export default NavBar;