import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Container, Typography, Divider, Grid, Alert } from '@mui/material';
import useActionHandler from '../hooks/useActionHandler';
import useSelectorHandler from '../hooks/useSelectorHandler';
import CardProduct from "../components/CardProduct"
import SkeletonLoading from '../components/SkeletonLoading';
import { useRouter } from 'next/router';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ChangeEnNumberToPer } from "../common"
import { IProductResult } from '../state/actionTypes';

enum Sort {
    ASC = "asc",
    DES = "des"
}
function Products() {
    const { fetchProducts } = useActionHandler();
    let { loading, data } = useSelectorHandler(state => state.products);
    const router = useRouter();
    const [sort, setSort] = useState<Sort | null>()


    let mounted = true;
    useEffect(() => {
        if (mounted) {
            fetchProducts()
        }

        return () => { mounted = false }
    }, [router])

    let filterdData = useMemo(() => {
        if (sort == Sort.ASC)
            return data.sort((a, b) => a.price - b.price)
        else if (sort == Sort.DES)
            return data.sort((a, b) => b.price - a.price)
        return data
    }, [sort, data])

    const conditionalRendering = () => {
        if (loading)
            return <Grid container spacing={2} sx={{ mt: 2, direction: "rtl" }} >
                <SkeletonLoading itemCount={8} />
            </Grid>

        if (filterdData)
            return <Grid container spacing={2} sx={{ mt: 2, direction: "rtl" }}>
                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <div style={{ display: "flex", position: "relative" }}>
                        <FilterListIcon />
                        <Typography variant='body2'>
                            مرتب سازی :
                        </Typography>
                        <Typography variant='body2' sx={{ pr: 3 }} color={sort == Sort.ASC ? 'red' : `gray`}>
                            <a href="#" onClick={() => setSort(Sort.ASC)}>ارزان ترین</a>
                        </Typography>
                        <Typography variant='body2' sx={{ pr: 3 }} color={sort == Sort.DES ? 'red' : `gray`}>
                            <a href='#' onClick={() => setSort(Sort.DES)}>گران ترین</a>
                        </Typography>
                        <Typography variant='body2' sx={{ pr: 3 }} color="gray" position={"absolute"} left={0}>
                            {ChangeEnNumberToPer(data.length)} کالا
                        </Typography>
                    </div>
                    <Divider />
                </Grid>
                {filterdData?.map((product, index) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                        <CardProduct product={product} index={index * 40} />
                    </Grid>
                ))}
            </Grid>
    }

    return (
        <Container>
            {
                conditionalRendering()
            }

        </Container>
    )
}

export default Products
