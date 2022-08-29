import React from 'react'
import { Button } from "@mui/material"
import { useRouter } from "next/router"

interface IDefaultProps {
    fullWidth?: boolean
}

const BackToProductButton: React.FC<IDefaultProps> = ({ fullWidth }) => {
    const router = useRouter();
    return (
        <Button variant='outlined' fullWidth={typeof fullWidth !== 'undefined'} color="info" onClick={() => router.push("/products", undefined, { shallow: false })}>بازگشت به فروشگاه</Button>
    )
}
export default BackToProductButton