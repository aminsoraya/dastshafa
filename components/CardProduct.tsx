import React, { FC } from 'react'
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import styles from "../sass/Product.module.scss"
import { NumberCommaSeperator, ChangeEnNumberToPer, CalculateDiscount } from "../common"
import { TProductResult } from "../state/actionTypes"
import { flow } from "lodash/fp"
import Badge from '@mui/material/Badge';
import Grow from '@mui/material/Grow';
import { useRouter } from "next/router"

type productProps = {
    product: TProductResult
    index: number
}

const CardProduct: FC<productProps> = ({ product, index }) => {
    let formatPrice = flow(NumberCommaSeperator, ChangeEnNumberToPer);
    let router = useRouter();
    return (
        <Grow
            in={true}
            style={{ transformOrigin: '0 0 0', transitionDelay: `${index}ms` }}

        >
            <Card>
                <CardMedia
                    component="img"
                    height="250"
                    image={product?.img}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ direction: "rtl" }} component="div" display={'flex'} justifyContent="space-between">
                        {product?.title}
                        <span style={{ marginLeft: 10 }}>
                            <Badge badgeContent={`${ChangeEnNumberToPer(product?.discount)}%`} color="error">
                            </Badge>
                        </span>
                    </Typography>
                    <Typography variant='caption' color="gray">
                        موجودی انبار {ChangeEnNumberToPer(product?.weight)} کیلوگرم
                    </Typography>
                    <Typography variant="h6" sx={{ direction: "rtl", pt: 2 }} >
                        <span className={styles.FormatDiscountPrice} >{formatPrice(product?.price.toString())}</span>
                        <span> {` ${formatPrice(CalculateDiscount(product?.price, product?.discount).toString())} تومان`}</span>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button fullWidth color="success" variant="contained" onClick={() => router.push(`product/${product?.id}/${product?.title}`)} >
                        خرید
                    </Button>
                </CardActions>
            </Card>
        </Grow>
    )
}
export default CardProduct;