import React, { useState, useEffect } from 'react';

import styles from './Header.module.scss';
import Language from './../Language/Language';
import sprite from './../../images/icons/sprite.svg';
import { Link, NavLink } from 'react-router-dom';
import Basket from '../Basket/Basket';
import useOrders from '../../database-orders';

const Header = ({ handleToggle, ordersProduct }) => {
    let server = 'http://185.251.88.31:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let header = `${server}/api/header?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(header, {
                    headers: {
                        Authorization: `Bearer f66dbcdd40ea112c1922a33c00ef12399433cecaf44cc622f7ecb965b7462b1930e0bec5bb93f45ba485ada66eab5aaa548c1703eacf201a2a0bea3996cb0e746c94e9e316c737b4080eb53344edc4fe8d8bee794530d46926fdc72b75cb73a0cca89551386776de20138eea544f5458b22044468172b1a40f1a65a645e24998`
                    }
                });
                const data = await response.json();
                // logo
                setLogo(data.data.attributes.logo.data.attributes);
                // menu
                let menuList = []
                for (let i = 0; i < data.data.attributes.menu.data.attributes.item.length; i++) {
                    let menuItem = { name: '', link: '' }
                    menuItem.name = data.data.attributes.menu.data.attributes.item[i].name;
                    menuItem.link = data.data.attributes.menu.data.attributes.item[i].link;
                    menuList.push(menuItem)
                }
                setMenu(menuList);

            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);
    // logo
    const [logo, setLogo] = useState({});
    // menu
    const [menu, setMenu] = useState([]);

    const [menuOpen, setMenuOpen] = useState(false);

    let body = document.querySelector('body')
    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    };
    if (menuOpen === true) {
        body.classList.add('lock')
    } else {
        body.classList.remove('lock')
    }
    const { orders, removeOrder } = useOrders();
    const handleRemoveToCart = (product) => {
        removeOrder(product);
    };
    let productNumbers = orders.length
    return (
        <header className={styles.header}>
            <div className='container'>
                <div className={styles.header__wrapper}>
                    <div className={styles.left}>
                        <button type="button" className={`${styles.menu__burger} ${menuOpen ? styles.opened : ''}`} onClick={handleMenuOpen} aria-label="Открыть меню">
                            <svg className='icon'>
                                <use xlinkHref={`${sprite}#icon-burger-open`}></use>
                            </svg>
                        </button>
                        <div className={styles.logo}>
                            <Link to="/home" aria-label='Главная страница'>
                                <img src={`${logo.url}`} alt={logo.alternativeText} />
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.menu__modal} ${menuOpen ? styles.active : ''}`}>
                        <div className={styles.menu__modalWrap}>
                            <div className={styles.menu__logo}>
                                <Link to="/home" aria-label="Главная страница">
                                    <img src={`${logo.url}`} alt={logo.alternativeText} />
                                </Link>
                                <button type="button" className={styles.menu__burger} onClick={handleMenuOpen} aria-label="Закрыть меню">
                                    <svg className='icon'>
                                        <use xlinkHref={`${sprite}#icon-burger-close`}></use>
                                    </svg>
                                </button>
                            </div>
                            <nav className={styles.menu}>
                                <ul>
                                    {menu.map((item, index) => (
                                        <li key={index}>
                                            <NavLink to={item.link}>{item.name}</NavLink>
                                        </li>
                                    ))}
                                    <li className={styles.mobile}>
                                        <Language />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.desctop}>
                            <Language />
                        </div>
                        {document.location.pathname !== '/store/order-placement' ?
                            document.location.pathname !== '/store/item' ?
                                <Basket orders={orders} removeOrder={handleRemoveToCart} />
                                :
                                <button type="button" onClick={() => handleToggle()} className={styles.backetButton}>
                                    <svg className='icon'>
                                        <use xlinkHref={`${sprite}#icon-basket-button`}></use>
                                    </svg>
                                    <span className={styles.number}>
                                        <span>{ordersProduct.length}</span>
                                    </span>
                                </button>
                            : null
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;