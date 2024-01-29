import React, { useEffect, useState } from 'react';
import styles from './ThankYou.module.scss';
import sprite from './../../images/icons/sprite.svg';

const ThankYou = ({ isOpen, title }) => {
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])
    if (open === true) {
        setTimeout(() => {
            setOpen(false)
        }, 2000)
    }

    return (
        open &&
        <div className={styles.wrapper}>
            <h2>{title}</h2>
            <div className={styles.icon}>
                <svg className='icon'>
                    <use xlinkHref={`${sprite}#icon-checkmark`}></use>
                </svg>
            </div>
            <button type='button' aria-label='close' onClick={() => setOpen(false)} className={styles.exit}>
                <svg className='icon'>
                    <use xlinkHref={`${sprite}#icon-close-popup`}></use>
                </svg>
            </button>
        </div>
    );
};

export default ThankYou;