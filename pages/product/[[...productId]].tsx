import React, { useState, useMemo } from 'react'
import { ICartResult } from "../../state/actionTypes"
import { GetServerSideProps } from 'next'
import { AxiosProductInstance } from "../../service"
import { Grid, Typography, Button, Slider, Container } from "@mui/material"
import Image from "next/image"
import styles from "../../sass/ProductDetail.module.scss"
import { flow } from "lodash/fp"
import { CalculateDiscount, NumberCommaSeperator, ChangeEnNumberToPer, IAddToCartVariable, IFullScreenDialogVariable } from "../../common"
import FullScreenDialog from "../../components/FullScreenDialog"
import useActionHandler from "../../hooks/useActionHandler"
import SnakBar from "../../components/Snackbar"
import BackToProductButton from "../../components/BackToProductButton"


interface TProduct {
    product: ICartResult
}

const ProductDetail: React.FC<TProduct> = ({ product }) => {
    const { img, title, benefical, price, description, weight, discount } = product;
    const formatPrice = flow(NumberCommaSeperator, ChangeEnNumberToPer)
    const [weightSteper, setWeightSteper] = useState(0.000);

    //redux
    const { AddToCart } = useActionHandler();

    //Snackbar
    const [addToCartMessage, setAddToCartMessage] = useState<IAddToCartVariable>()
    const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false)

    //Snackbar
    const [textMoreInfo, setTextMoreInfo] = useState<IFullScreenDialogVariable>()
    const [textMoreInfoOpen, setTextMoreInfoOpen] = useState<boolean>(false)

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setWeightSteper(newValue);
        }
    };
    function valueLabelFormat(value: number) {
        const units = {
            GE: 'گرم',
            KG: "کیلوگرم"
        };
        return `${ChangeEnNumberToPer(value)} ${value > 0.999 ? units.KG : units.GE}`;
    }

    let paymentPrice = useMemo(() => {
        let calcDiscountPrice = CalculateDiscount(
            price,
            discount
        );
        let paymentUnit = (weightSteper * 1000) / 100;
        return weightSteper == 0 ? 0 : (calcDiscountPrice * paymentUnit).toFixed(0);
    }, [weightSteper]);

    const AddToCartFunction = (): void => {
        if (weightSteper === 0) {
            setAddToCartMessage({ severity: "error", text: "ابتدا مقدار مورد نیاز را تعیین کنید" })
            setAddToCartOpen(true);
        } else {
            product.discountPrice = paymentPrice as number;
            AddToCart(product);
            setAddToCartMessage({ severity: "success", text: "با موفقیت به سبد خرید اضافه شد" })
            setAddToCartOpen(true);
        }
    }

    const ShowOpenDialog = ({ text, title }: IFullScreenDialogVariable): void => {
        setTextMoreInfo({ text, title });
        setTextMoreInfoOpen(true);
    }

    return <>
        <FullScreenDialog open={textMoreInfoOpen} text={textMoreInfo?.text} title={textMoreInfo?.title} handleClose={() => setTextMoreInfoOpen(false)} />
        <SnakBar open={addToCartOpen} text={addToCartMessage?.text} handleClose={() => { setAddToCartOpen(false) }} severity={addToCartMessage?.severity} />

        <Container>
            <Grid container sx={{ direction: "rtl", pt: 2 }}>
                <Grid lg={5} md={6} sm={12} xs={12}>
                    <div className={styles.image}>
                        <Image src={img} alt={title} width={500} height={500} layout="responsive" objectFit="cover" />
                        <div className={styles.plantTitleBackground}>
                            <h2 className={styles.plantTitleText}>{title}</h2>
                        </div>
                    </div>

                </Grid>
                <Grid lg={7} md={6} sm={12} xs={12} className={styles.item}>
                    <Grid lg={12} container sx={{ pr: 2, pl: 2 }} className={styles.textSection}>
                        <Grid lg={2} xs={3}>
                            <Typography variant='caption' color="gray">تعریف</Typography>
                        </Grid>
                        <Grid lg={10} xs={9} sx={{ position: "relative" }}>
                            <Typography variant="caption" component="div" textAlign={"justify"} lineHeight={3} maxHeight="210px" overflow={"hidden"} className={styles.paragraph}>
                                {description.substring(0, 270)}
                            </Typography>
                            <Button variant='text' onClick={() => ShowOpenDialog({ text: description, title: "تعریف" })} size="small" sx={{ position: "absolute", left: 0, bottom: 0 }} >بیشتر بخوانید</Button>
                        </Grid>
                    </Grid>
                    <Grid lg={12} container sx={{ pr: 2, pl: 2, mt: 1 }} className={styles.textSection}>
                        <Grid lg={2} xs={3}>
                            <Typography variant='caption' color="gray">کاربرد دارویی</Typography>
                        </Grid>
                        <Grid lg={10} xs={9} sx={{ position: "relative" }} >
                            <Typography variant='caption' maxHeight="210px" component="div" lineHeight={3} className={styles.paragraph}>{benefical.substring(0, 270)}</Typography>
                            <Button variant='text' onClick={() => ShowOpenDialog({ text: benefical, title: "کاربردی دارویی" })} size="small" sx={{ position: "absolute", left: 0, bottom: 0 }} >بیشتر بخوانید</Button>
                        </Grid>
                    </Grid>
                    <Grid lg={12} container sx={{ pr: 2, pl: 1, mt: 1 }} className={styles.textSection}>
                        <Grid lg={2} xs={3} >
                            <Typography variant='caption' color="gray">تخفیف</Typography>
                        </Grid>
                        <Grid lg={10} xs={6} >
                            <Typography variant='caption'>%{ChangeEnNumberToPer(discount)}</Typography>
                        </Grid>
                    </Grid>
                    <Grid lg={12} container sx={{ pr: 2, pl: 1, mt: 1 }} className={styles.textSection}>
                        <Grid lg={2} xs={3} >
                            <Typography variant='caption' color="gray">فی</Typography>
                        </Grid>
                        <Grid lg={10} xs={6} >
                            <Typography variant='caption'>هر صد گرم {formatPrice(CalculateDiscount(price, discount).toString())} تومان</Typography>
                        </Grid>
                    </Grid>
                    <Grid lg={12} container sx={{ pr: 2, pl: 1, mt: 1 }} className={styles.textSection}>
                        <Grid lg={2} xs={12} >
                            <Typography variant='caption' color="gray">مقدار مورد نیاز</Typography>
                        </Grid>
                        <Grid lg={10} xs={12} >
                            <Slider
                                sx={{
                                    '& input[type="range"]': {
                                        WebkitAppearance: 'slider-vertical',
                                    },
                                }}

                                defaultValue={0}
                                min={0}
                                max={weight}
                                step={0.001}
                                onChange={handleChange}
                                valueLabelFormat={valueLabelFormat}
                                valueLabelDisplay="on"
                            //onKeyDown={preventHorizontalKeyboardNavigation}
                            />
                        </Grid>
                    </Grid>
                    <Grid lg={12} container sx={{ pr: 2, pl: 1, mt: 1 }} className={styles.textSection}>
                        <Grid lg={2} xs={3} >
                            <Typography variant='caption' color="gray">قیمت پرداختی</Typography>
                        </Grid>
                        <Grid lg={10} xs={6} >
                            <Typography variant='caption' >{formatPrice(paymentPrice?.toString())} تومان</Typography>
                        </Grid>
                    </Grid>
                    <Grid lg={12} container sx={{ pr: 2, pl: 1, mt: 1 }} className={styles.textSection}>
                        <Grid lg={3} md={4} sm={5} xs={6} >
                            <Button variant='contained' color="warning" onClick={() => AddToCartFunction()} >افزودن به سبد خرید</Button>
                        </Grid>
                        <Grid lg={3} md={4} sm={5} xs={6} >
                            <BackToProductButton />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </>
}

export default ProductDetail
export const getServerSideProps: GetServerSideProps = async (context) => {
    let [productId] = context?.params?.productId as string[];

    let { data } = await AxiosProductInstance.post("FetchProductById", { productId });

    return {
        props: {
            product: data,
        }
    };
}


