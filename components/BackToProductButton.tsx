import React from 'react'
import { Button } from "@mui/material"
import { useRouter } from "next/router"

function BackToProductButton() {
    const router = useRouter();

    return (
        <Button variant='outlined' color="info" onClick={() => router.push("/products", undefined, { shallow: true })}>بازگشت به فروشگاه</Button>
    )
}

export default BackToProductButton