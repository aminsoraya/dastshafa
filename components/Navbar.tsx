import React, { useMemo, useState } from 'react'
import styles from "../sass/Navbar.module.scss"
import { ShoppingCart, Person } from "@mui/icons-material"
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Alert, AlertTitle, Button, Typography } from "@mui/material"
import { Divider, Badge } from '@mui/material';
import { ChangeEnNumberToPer, NumberCommaSeperator } from "../common"
import { flow } from "lodash/fp"
import useSelectorHandler from "../hooks/useSelectorHandler"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useActionHandler from '../hooks/useActionHandler';
import NavbarSearch from './NavbarSearch';

function Navbar() {
    const router = useRouter();
    const fomratMoney = flow(NumberCommaSeperator, ChangeEnNumberToPer);
    const { cart } = useSelectorHandler(state => state.cart)
    const { RemoveFromCart } = useActionHandler();

    const FullPaymentPrice = cart.reduce((state, current) => state + parseFloat(current.discountPrice.toString()), 0);

    return (
        <div className={styles.navbar}>
            <ul className={styles.items}>
                <li className={styles.cart}>
                    <Badge badgeContent={ChangeEnNumberToPer(cart?.length)} color="error">
                        <ShoppingCart />
                    </Badge>

                    <div className={styles.cartmenu}>
                        {
                            cart.map(({ id, title, img, discountPrice }, index) => {
                                return <div key={index} className="m-2">
                                    <div style={{ display: "flex", position: "relative" }}>
                                        <div className={styles.cartImg} >
                                            <Image
                                                src={img}
                                                alt={title}
                                                width={100}
                                                height={100}
                                                layout="responsive"
                                                loading='lazy'
                                            />
                                        </div>
                                        <div className={styles.labels}>
                                            <span>{title}</span>
                                            <span className={styles.price}>
                                                {fomratMoney(discountPrice.toString())} تومان
                                            </span>
                                        </div>
                                        <div className={styles.tray} onClick={() => RemoveFromCart(id)} >
                                            <DeleteForeverIcon />
                                        </div>
                                    </div>
                                    <Divider />

                                </div>
                            })
                        }
                        {cart?.length > 0 && <>
                            <Typography variant='body2' sx={{ dir: "rtl", textAlign: "right", mt: 1 }}>
                                جمع کل {fomratMoney(FullPaymentPrice.toString())} تومان
                            </Typography>
                            <Button fullWidth color="success" sx={{ mt: 2 }} variant='contained' onClick={() => router.push("/login", undefined, { shallow: true })}>
                                پرداخت آنلاین
                            </Button></>
                        }
                        {cart?.length == 0 &&
                            <Alert severity="error" variant='outlined'>
                                <AlertTitle></AlertTitle>
                                سبد خرید شما خالی است
                            </Alert>
                        }
                    </div>
                </li>
                <li className={styles.user}>
                    <Person />
                    <div className={styles.dropDown}>
                        <Button variant='outlined' color='primary' size='small' fullWidth onClick={() => router.push("/login", undefined, { shallow: true })}>ورود| ثبت نام</Button>
                    </div>
                </li>
            </ul>
            <NavbarSearch />
            <div className={styles.logo} >
                <Image src="/logo.png"
                    onClick={() => router.push("/")}
                    layout="fill"
                    objectFit="contain"
                    alt="logo"
                />
            </div>
        </div>
    )
}

export default Navbar
