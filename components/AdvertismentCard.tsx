import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Container } from "@mui/material"
import VerifiedIcon from '@mui/icons-material/Verified';
import ScaleIcon from '@mui/icons-material/Scale';
import PaidIcon from '@mui/icons-material/Paid';

export default function ImgMediaCard() {
    return (
        <Container sx={{ pt: 10 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} >
                    <Card sx={{ background: "#f9f3f3" }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" align='center' component="div">
                                <VerifiedIcon sx={{ fontSize: 70 }} color="success" />
                            </Typography>
                            <Typography gutterBottom variant="h6" align='center' component="div">
                                تضمین کیفیت
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign={'justify'} sx={{ direction: "rtl" }} lineHeight={2}>
                                یکی از نگرانی هایی که برای همه وجود داره اینه که آیا محصولی که سفارش دادم مرغوب هست ؟ باید خدمتتون عرض شود که ما به طور جد این مهم رو تضمین میکنیم. تمامی کالاهای این سایت کیفیت لازم رو برخوردار هستند
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <Card sx={{ background: "#f9f3f3" }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" align='center' component="div">
                                <ScaleIcon sx={{ fontSize: 70 }} color="success" />
                            </Typography>
                            <Typography gutterBottom variant="h6" align='center' component="div">
                                خرید به مقدار دلخواه
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign={'justify'} sx={{ direction: "rtl" }} lineHeight={2}>
                                یکی از ویژگی های ممتاز سایت ما خرید بر حسب مقدار دلخواه و مورد نیاز شما عزیزان است . بدین صورت که تو صفحه محصول ، هرچقدر که لازم دارید رو وزن میکنید و درخواست خرید همون مقدار رو میدید
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ background: "#f9f3f3" }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" align='center' component="div">
                                <PaidIcon sx={{ fontSize: 70 }} color="success" />
                            </Typography>
                            <Typography gutterBottom variant="h6" align='center' component="div">
                                تخفیف به ازای تمامی کالاها
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign={'justify'} sx={{ direction: "rtl" }} lineHeight={2}>
                                تخفیف همواره یکی از جوانب تاثیر گذار یه خرید خوب به حساب میاد ، ما سعی کردیم علاوه بر قیمت مناسب ، تو تمامی محصولاتمون تخفیف رو لحاظ کنیم تا شمامشتریان عزیز خرید خوبی رو تجربه کنند
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>

    );
}
