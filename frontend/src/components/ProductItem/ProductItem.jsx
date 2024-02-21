import React from 'react';

import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import sprite from './../../images/icons/sprite.svg';

function handleReloadClick() {
    setTimeout(() => {
        window.location.reload();
    }, 0)
};

const ProductItem = (props) => {
    const lang = localStorage.getItem('selectedLanguage');
    return (
        <li>
            <Link to={`/store/item#${props.id}`} aria-label={lang === 'ru' ? `Перейти к товару` : 'Go to product'} onClick={handleReloadClick}>
                <div className={`product__item ${styles.item}`}>

                    <div className={styles.image}>
                        <img src={props.image.data.attributes.url} alt={props.image.data.attributes.alternativeText} />
                    </div>
                    <div className={styles.info}>
                        <h3>{props.name}</h3>
                        <p className={styles.size}>{lang === 'ru' ? `Размер ${props.size} см.` : `Size ${props.size} cm.`}</p>
                        <p className={styles.price}>{lang === 'ru' ? `Цена: ${props.price} ₽` : `Price: ${props.price} ₽`}</p>
                    </div>
                    {/* <div>
                    <button type="button" className={styles.link} onClick={() => { handleAddToCart(product) }}>
                    <svg className='icon'>
                    <use xlinkHref={`${sprite}#icon-basket`}></use>
                    </svg>
                    </button>
                </div> */}
                </div>
            </Link>
        </li>
    );
};

export default ProductItem;