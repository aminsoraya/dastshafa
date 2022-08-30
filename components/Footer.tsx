import React from 'react'
import styles from "../sass/Footer.module.scss"
import { Input, Button, Grid, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GoogleIcon from '@mui/icons-material/Google';

function Footer() {
    return (
        <div className={styles.main}>
            <Grid container textAlign="center">
                <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                    <Typography variant='overline'>
                        <GoogleIcon sx={{ mr: 2, color: "gray" }} />
                        <WhatsAppIcon sx={{ color: "gray" }} />
                        <InstagramIcon sx={{ ml: 2, color: "gray" }} />
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} spacing={2} >
                    <Typography variant='caption'>تمامی حقوق سایت متعلق به امین ثریا است</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
