import React, { useState } from 'react';
import styles from './BasketInside.module.scss';
import ButtonDark from '../../ui/ButtonDark/ButtonDark';
import LinkDark from '../../ui/LinkDark/LinkDark';
import sprite from './../../images/icons/sprite.svg';

const BasketInside = ({ orders, removeOrder, handleToggle, handleToggleTwo, orderPlacement }) => {
    let lang = localStorage.getItem('selectedLanguage');
    let productNumbers = orders.length

    let priceAll = 0;
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

    return (
        <div className={orderPlacement === true ? `${styles.wrap} ${styles.wrapTwo}` : styles.wrap}>
            <div className={styles.head}>
                <h2>{lang === 'ru' ? 'Корзина' : 'Cart'}&#x2f;<span>{productNumbers} {lang === 'ru' ? 'шт.' : 'pc.'}</span></h2>
                {handleToggle || handleToggleTwo ?
                    <button type="button" onClick={() => document.location.pathname === '/store/item' ? handleToggle() : handleToggleTwo()} className={styles.close}>
                        <svg className='icon'>
                            <use xlinkHref={`${sprite}#icon-basket-close`}></use>
                        </svg>
                    </button>
                    : null
                }
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
                {orderPlacement === true ?
                    null
                    :
                    productNumbers === 0 ?
                        <ButtonDark type='button' disabled={true} className={styles.link} name={lang === 'ru' ? 'оформить заказ' : 'place an order'} />
                        :
                        <LinkDark link='/store/order-placement' hiddenSvg={true} name={lang === 'ru' ? 'оформить заказ' : 'place an order'} className={styles.link} />
                }
            </div>
        </div>
    );
};
export default BasketInside;