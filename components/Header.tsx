import React from 'react'
import styles from "../sass/Header.module.scss"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function Header() {
    return (
        <div className={styles.header}>
            <h1>داروخانه آنلاین شما</h1>
            <KeyboardDoubleArrowDownIcon sx={{ color: "white" }} className={styles.down} />
        </div>
    )
}

export default Header