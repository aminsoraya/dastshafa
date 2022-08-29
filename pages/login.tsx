import React, { useReducer, useState } from 'react'
import styles from "../sass/Login.module.scss"
import { TextField, Card, Grid, InputAdornment, Typography, Button, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BackToProductButton from '../components/BackToProductButton';
import Image from "next/image"
import { useRouter } from 'next/router';
import { ChangeEnNumberToPer } from "../common"

const handleMobile = (state: {}, action: string): {} => {
    return { ...state, action };
}

function Login() {
    const router = useRouter();
    const [mobile, setMobile] = useState("");



    return (
        <div className={styles.main}>
            <Card variant="outlined" className={styles.card}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ mt: 2, mr: 2, ml: 2 }} >
                        <div className={styles.logo} >
                            <Image src="/logo.png"
                                layout="fill"
                                objectFit="contain"
                                alt="logo"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 13, mr: 2, ml: 2 }} >
                        <TextField
                            label="شماره موبایل"
                            id="outlined-start-adornment"
                            size='medium'
                            type="text"
                            fullWidth
                            placeholder='164564606'

                            autoComplete="false"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">09</InputAdornment>,
                            }}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mr: 2, ml: 2, mb: 2 }} >
                        <Button variant="contained" size='large' color="success" fullWidth >
                            ورود | ثبت نام
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default Login