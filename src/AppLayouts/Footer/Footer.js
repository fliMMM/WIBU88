import React from 'react';
import { Typography } from '@mui/material';
import styles from './Footer.module.css'

function Footer(){
    return(
        <div className={styles.container}>
            <Typography variant='h1'>Đây là Footer</Typography>
        </div>
    )
}
export default Footer;