import React, { useEffect, useState } from 'react';
import styles from './Basket.module.scss';
import sprite from './../../images/icons/sprite.svg';
import BasketInside from '../BasketInside/BasketInside';

const Basket = ({ orders, removeOrder, handleToggle, open }) => {
    let productNumbers = orders.length

    if (document.location.pathname !== '/store/item') {
    }
    const [openTwo, setOpenTwo] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (open === true || openTwo === true) {
                document.body.classList.add('hidden')
            } else {
                document.body.classList.remove('hidden')
            }
        }, 0)
    }, [openTwo])

    const handleToggleTwo = () => {
        setOpenTwo(!openTwo)
    }
    return (
        <>
            {open || openTwo ?
                <aside className={styles.wrapper} onClick={() => {
                    if(handleToggle){
                        handleToggle()
                    }
                    setOpenTwo(false)
                }}>
                    <div className={styles.container} onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <BasketInside orders={orders} removeOrder={removeOrder} handleToggle={handleToggle} handleToggleTwo={handleToggleTwo} />
                    </div>
                </aside> :
                document.location.pathname !== '/store/item' ?
                    <button type="button" onClick={() => handleToggleTwo()} className={styles.backetButton}>
                        <svg className='icon'>
                            <use xlinkHref={`${sprite}#icon-basket-button`}></use>
                        </svg>
                        <span className={styles.number}>
                            <span>{productNumbers}</span>
                        </span>
                    </button> : null
            }
        </>
    )
};

export default Basket;