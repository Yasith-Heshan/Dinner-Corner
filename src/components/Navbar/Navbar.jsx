"use client"
import Link from "next/link";
import styles from './Navbar.module.css'
import {usePathname} from "next/navigation";

const pages = [
    {
        id: 1,
        title: 'ඇනවුම් කරන්න',
        url: '/ordernow'
    },
    {
        id: 2,
        title: 'භාර ගත් ඇනවුම්',
        url: '/acceptedorders',},

]

const NavBar = () => {
    const pathname = usePathname();
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
                                <li key={page.id}>
                                    <Link className={isActive ? styles.activateLink : ''} href={page.url}>
                                        {page.title}
                                    </Link>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </nav>
    )
}

export default NavBar;