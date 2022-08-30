import React, { useReducer, useState } from 'react'
import styles from "../sass/Login.module.scss"
import { TextField, Card, Grid, InputAdornment, Button, Input } from '@mui/material';
import Image from "next/image"
import { useRouter } from 'next/router';
import { IsNumberEntered } from "../common"


function Login() {
    const [mobile, setMobile] = useState("");
    const [mobileValid, setMobileValid] = useState<boolean | undefined>();
    const router = useRouter();

    const handleKeyDown = (event: any) => {
        let { keyCode } = event;
        let pattern = /^\d{8}$/

        if (!IsNumberEntered(keyCode))
            event.preventDefault();

        //check entered text is number and in proper length
        if (pattern.test(mobile)) {
            setMobileValid(true);
        }
        else
            setMobileValid(false)
    }
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
                                onClick={() => router.push("/")}
                                style={{ cursor: "pointer" }}
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
                            onKeyDown={handleKeyDown}
                            autoComplete="false"
                            error={!mobileValid}
                            helperText={!mobileValid && "شماره موبایل وارد شده صحیح نیست"}
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