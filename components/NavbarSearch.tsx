import React, { useContext, useState, useEffect, FC } from 'react'
import styles from "../sass/NavbarSearch.module.scss"
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import Context from "../context"
import { Alert } from "@mui/material"
import { Typography, IconButton, Divider } from '@mui/material';
import { ChangeEnNumberToPer, NumberCommaSeperator, CalculateDiscount } from "../common"
import { flow } from "lodash/fp"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { AxiosProductInstance } from "../service"
import { TProductResult } from "../state/actionTypes"
import { useRouter } from "next/router"

interface ISearchResponse {
    products: TProductResult[],
    notFound: boolean
}
function NavbarSearch() {
    const [textSearch, setTextSearch] = useState("")
    const [responseData, setResponseData] = useState<ISearchResponse>();
    const { toggleScroll } = useContext(Context)
    const fomratMoney = flow(NumberCommaSeperator, ChangeEnNumberToPer);
    const router = useRouter();

    useEffect(() => {
        SearchTerm()
    }, [textSearch])

    const SearchTerm = async () => {
        await AxiosProductInstance
            .post<ISearchResponse>("SearchProductsInfo", { term: textSearch })
            .then(({ data: { products, notFound } }) => setResponseData({ products, notFound }));
    }

    const ConditionlRendering = () => {
        if (responseData?.notFound) {
            return <Alert variant='filled' severity='error' dir='rtl' >
                موردی یافت نشد
            </Alert>
        }
        else if (responseData?.products) {
            return responseData?.products?.filter(({ title }) => title.indexOf(textSearch) > -1 && textSearch.length > 0).map((product, index) => {
                return <div key={index} onClick={() => router.replace(`/product/${product?.id}/${product?.title}`, undefined, { shallow: false })} style={{ cursor: "pointer" }}>
                    <div className={styles.searchItems}>
                        <Image src={product.img} alt={product.title} width={50} height={50} />
                        <div className={styles.title}>
                            <Typography variant='caption' color={'black'} >{product.title}</Typography>
                            <Typography variant='caption' color={'#8d8d93'} >{fomratMoney(CalculateDiscount(product.price, product.discount).toString())} تومان</Typography>
                        </div>
                        <IconButton className={styles.button}>
                            <ShoppingCartCheckoutIcon />
                        </IconButton>

                    </div>
                    {responseData?.products && <Divider />}
                </div>
            })
        }
    }
    return (
        <div className={styles.search} >
            <SearchIcon className={styles.icon} />
            <input type="search" onChange={(e) => setTextSearch(e.target.value)} onKeyDown={toggleScroll} name="" id="" placeholder='جستجو ...' />
            <div className={styles.searchContent} style={{ display: ((responseData?.products?.length ?? 0) > 0 || responseData?.notFound) ? "block" : "none" }}>
                {ConditionlRendering()}
            </div>
        </div>
    )
}

export default NavbarSearch