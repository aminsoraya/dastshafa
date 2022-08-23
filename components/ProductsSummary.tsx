import React, { FC } from 'react'
import { Typography, Container, Divider, Grid, Button } from '@mui/material';
import { TProductResult } from "../state/actionTypes"
import CardProduct from "../components/CardProduct"
import SkeletonLoading from "../components/SkeletonLoading"
import { ChangeEnNumberToPer } from "../common"
import Link from 'next/link'

interface IProducts {
    products: TProductResult[],
    countAll: number
}
const ProductsSummary: FC<IProducts> = ({ products, countAll }) => {
    const ConditionalRendering = () => {
        if (products) {
            return products.map((product, index) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                    <CardProduct product={product} index={index * 40} />
                </Grid>
            ))
        }
        else {
            <SkeletonLoading itemCount={4} />
        }
    }

    return (
        <Container sx={{ pt: 2 }} >
            <Typography gutterBottom variant="h4" component="div" mt={4} sx={{ direction: "rtl" }} display="flex"  >
                محصولات
            </Typography>
            <Divider variant='fullWidth' />
            <Grid container spacing={2} sx={{ mt: 2, direction: "rtl" }}>
                {ConditionalRendering()}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Link href="/products">
                        <Button variant="text" color='info' fullWidth >
                            مشاهده همه محصولات ({ChangeEnNumberToPer(countAll)} کالا)
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductsSummary