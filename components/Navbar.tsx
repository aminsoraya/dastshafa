import React from 'react'
import Button from '@mui/material/Button';
import styles from "../sass/Navbar.module.scss"
import { ShoppingCart, Person } from "@mui/icons-material"
import { Container } from "@mui/material"
import Image from 'next/image';
import { useRouter } from 'next/router';

function Navbar() {
    const router = useRouter();
    return (
        <div className={styles.navbar}>
            <Container>
                <ul className={styles.items}>
                    <li>
                        <ShoppingCart />
                    </li>
                    <li>
                        <Person />
                    </li>
                </ul>
                <div className={styles.logo} >
                    <Image src="/logo.png"
                        onClick={() => router.push("/")}
                        layout="fill"
                        objectFit="contain"
                        alt="logo"
                    />
                </div>
            </Container>
        </div>
    )
}

export default Navbar