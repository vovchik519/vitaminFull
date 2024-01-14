import React, { useEffect, useState } from 'react';
import styles from './Basket.module.scss';
import sprite from './../../images/icons/sprite.svg';
import { Link } from 'react-router-dom';

const Basket = ({ orders, removeOrder, handleToggle, open }) => {
    let lang = localStorage.getItem('selectedLanguage');

    let priceAll = 0;
    let productNumbers = orders.length


    const [quanity, setQuanity] = useState(0)

    const plusQuanity = () => {
        setQuanity(() => quanity + 1)
    }
    const minusQuanity = () => {
        if (quanity > 0) {
            setQuanity(() => quanity - 1)
        } else if (quanity <= 1) {
        }
    }
    if (document.location.pathname !== '/store/item') {
    }
    const [openTwo, setOpenTwo] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (setOpenTwo === true) {
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
                <article className={styles.wrapper}>
                    <div className={styles.container}>
                        <div className={styles.wrap}>
                            <div className={styles.head}>
                                <h2>{lang === 'ru' ? 'Корзина' : 'Cart'}&#x2f;<span>{productNumbers} {lang === 'ru' ? 'шт.' : 'pc.'}</span></h2>
                                <button type="button" onClick={() => document.location.pathname === '/store/item' ? handleToggle() : handleToggleTwo()} className={styles.close}>
                                    <svg className='icon'>
                                        <use xlinkHref={`${sprite}#icon-basket-close`}></use>
                                    </svg>
                                </button>
                            </div>
                            <ul className={styles.list}>
                                {orders && orders.map((product, index) => {
                                    priceAll += +product.price;
                                    return (
                                        <li key={index} className={styles.item}>
                                            <div className={styles.imageWrap}>
                                                <div className={styles.image}>
                                                    <img src={product.image.data.attributes.url} alt={product.image.data.attributes.alternativeText} />
                                                </div>
                                            </div>
                                            <div className={styles.info}>
                                                <div className={styles.infoWrap}>
                                                    <h3>{product.name}</h3>
                                                    <span>{lang === 'ru' ? 'Размер:' : 'Size:'} <span>{product.size}</span></span>
                                                    <span>{lang === 'ru' ? 'Наличие рамы:' : 'Presence of a frame:'} <span>{product.frame}</span></span>
                                                </div>
                                                <strong className={styles.price}>{product.price}
                                                    <svg className='icon'>
                                                        <use xlinkHref={`${sprite}#icon-coin-ru`}></use>
                                                    </svg>
                                                </strong>
                                            </div>
                                            <div className={styles.button}>
                                                <div className={styles.quanity}>
                                                    <button type="button" onClick={() => minusQuanity()} id='minus'>-</button>
                                                    <span>{quanity}</span>
                                                    <button type="button" onClick={() => plusQuanity()}>+</button>
                                                </div>
                                                <button type="button" onClick={() => removeOrder(product)} className={styles.deleteOrder}>
                                                    <svg className='icon'>
                                                        <use xlinkHref={`${sprite}#icon-basket-close`}></use>
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className={styles.order}>
                                <h3>{lang === 'ru' ? 'Сумма заказа' : 'Order amount'}</h3>
                                <ul>
                                    <li>
                                        <span className={styles.orderName}>{lang === 'ru' ? 'Стоимость товара' : 'Cost of goods'}</span>
                                        <span className={styles.price}>{priceAll} ₽</span>
                                    </li>
                                    <li>
                                        <span className={styles.orderName}>{lang === 'ru' ? 'Итого' : 'Total'}</span>
                                        <span className={styles.price}>{priceAll} ₽</span>
                                    </li>
                                </ul>
                                <Link to='/store/order-placement' className={styles.link}>{lang === 'ru' ? 'оформить заказ' : 'place an order'}</Link>
                            </div>
                        </div>
                    </div>
                </article> :
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