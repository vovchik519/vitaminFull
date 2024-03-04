import React, { useState, useEffect } from 'react';

import styles from './Product.module.scss';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import Name from './../../ui/Name/Name';
import ProductList from '../../components/ProductList/ProductList';
import { Link } from 'react-router-dom';
import useOrders from '../../database-orders';
import Basket from '../../components/Basket/Basket';
import sprite from './../../images/icons/sprite.svg';
import Error from '../../components/Error/Error';

const Product = ({ onLoading }) => {
    let server = 'https://vitamin-art.ru:4444'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let productPage = `${server}/api/shop-page?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(productPage, {
                    headers: {
                        Authorization: `Bearer f66dbcdd40ea112c1922a33c00ef12399433cecaf44cc622f7ecb965b7462b1930e0bec5bb93f45ba485ada66eab5aaa548c1703eacf201a2a0bea3996cb0e746c94e9e316c737b4080eb53344edc4fe8d8bee794530d46926fdc72b75cb73a0cca89551386776de20138eea544f5458b22044468172b1a40f1a65a645e24998`
                    }
                });
                const data = await response.json();

                const productArray = []
                for (let i = 0; i < data.data.attributes.catalogs.data.length; i++) {
                    for (let j = 0; j < data.data.attributes.catalogs.data[i].attributes.product.length; j++) {
                        productArray.push(data.data.attributes.catalogs.data[i].attributes.product[j])
                    }
                }
                setProductList(productArray)
                onLoading()
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // product
    const [productList, setProductList] = useState([]);
    const { orders, addOrder, removeOrder } = useOrders();
    const [popup, setPopup] = useState(false)
    const handleAddToCart = (product) => {
        if (orders.length < 20) {
            addOrder(product);
            const existingOrders = orders.find((order) => order.id === product.id)
            if (!existingOrders) {
                setPopup(true)
            }
        } else {
            alert('product limit 20 pcs')
        }
    };
    useEffect(() => {
        if (popup === true) {
            setTimeout(() => {
                setPopup(false)
            }, 3000)
        }
    }, [popup])
    const handleRemoveToCart = (product) => {
        removeOrder(product);
    };
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (open === true) {
                document.body.classList.add('hidden')
            } else {
                document.body.classList.remove('hidden')
            }
        }, 0)
    }, [open])

    const handleToggle = () => {
        setOpen(!open)
    }
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [productListOpen, setProductListOpen] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setDisplayedProducts(productList.slice(0, 6))
        }, 0)
    }, [productList])
    const showAllProducts = () => {
        if (displayedProducts.length === 6) {
            setDisplayedProducts(productList);
            setProductListOpen(true)
        } else {
            setDisplayedProducts(productList.slice(0, 6));
            setProductListOpen(false)
        }
    };
    return (
        <>
            <Header ordersProduct={orders} handleToggle={handleToggle} />
            <Basket orders={orders} removeOrder={handleRemoveToCart} handleToggle={handleToggle} open={open} />
            <main className={styles.wrapper}>
                <div className="container">
                    {productList.map((product, index) => (
                        product.id == window.location.hash.substring(1) ? (
                            <div key={index} className={styles.wrap}>
                                <section>
                                    <ul className={styles.breadcrumbs}>
                                        <li><Link to="/home">{lang === 'ru' ? 'Главная' : 'Home'}</Link></li>
                                        <li><Link to="/store">{lang === 'ru' ? 'Магазин' : 'Store'}</Link></li>
                                        <li><Link to={`/store/item#${product.id}`}>{product.name}</Link></li>
                                    </ul>
                                    <div className={styles.product}>
                                        <div className={styles.images}>
                                            <img src={product.image.data.attributes.url} alt={product.image.data.attributes.alternativeText} />
                                        </div>
                                        <div>
                                            <div className={styles.info}>
                                                <h2>
                                                    {product.name}
                                                </h2>
                                                <strong className={styles.price}>{product.price}
                                                    <svg className='icon'>
                                                        <use xlinkHref={`${sprite}#icon-coin-ru`}></use>
                                                    </svg>
                                                </strong>
                                                <div className={styles.productList}>
                                                    <h3>{lang === 'ru' ? 'Коротко о товаре:' : 'Short about the product:'}</h3>
                                                    <ul>
                                                        <li>{lang === 'ru' ? 'Город:' : 'City:'} <span>{product.city}</span></li>
                                                        <li>{lang === 'ru' ? 'Назначение:' : 'Purpose:'} <span>{product.purpose}</span></li>
                                                        <li>{lang === 'ru' ? 'Размер:' : 'Size:'} <span>{product.size}</span></li>
                                                        <li>{lang === 'ru' ? 'Наличие рамы:' : 'Presence of a frame:'} <span>{product.frame}</span></li>
                                                        <li>{lang === 'ru' ? 'Год создания:' : 'Year of creation:'} <span>{product.year}</span></li>
                                                    </ul>
                                                </div>
                                                <button type="button" className={styles.link} onClick={() => { handleAddToCart(product) }}>
                                                    {lang === 'ru' ? 'в корзину' : 'Add to basket'}
                                                    <svg className='icon'>
                                                        <use xlinkHref={`${sprite}#icon-arrow-basket`}></use>
                                                    </svg>
                                                </button>
                                            </div>
                                            {lang === 'ru' ?
                                                <details className={styles.description}>
                                                    <summary>
                                                        <span>ДОПОЛНЕНИЕ К ПОКУПКЕ</span>
                                                        <svg className='icon'>
                                                            <use xlinkHref={`${sprite}#icon-arrow-top`}></use>
                                                        </svg>
                                                    </summary>
                                                    <p>Спасибо за покупку, дорогие любители прекрасного!</p>
                                                    <p>Дед Валерий и его друзья несказанно рады тому, что вы приняли правильное решение и хоть</p>
                                                    <p>немного украсили свою жизнь и жизни дорогих вам людей.</p>
                                                    <p>Пожалуйста, будьте аккуратны, распаковывая полученные вами жикле.</p>
                                                    <p>Будут вопросы – обращайтесь.</p>
                                                    <p>Никогда не унывайте и не останавливайтесь на пути к своей цели!</p>
                                                    <p>Доброго вам сибирского здоровья, благополучия и удачи.</p>
                                                    <p>С уважением, Дед Валерий и его верные и надёжные друзья.</p>
                                                </details>
                                                :
                                                <details className={styles.description}>
                                                    <summary>
                                                        <span>ADDON TO YOUR PURCHASE</span>
                                                        <svg className='icon'>
                                                            <use xlinkHref={`${sprite}#icon-arrow-top`}></use>
                                                        </svg></summary>
                                                    <p>Thank you for your purchase, dear fine art admirers!</p>
                                                    <p>Grandpa Valerii and his friends are utmost glad for your wise decision to make slightly brighter your life</p>
                                                    <p>and the lives of your dear ones.</p>
                                                    <p>Please, unpack your giclee carefully.</p>
                                                    <p>Please, do not hesitate to approach me if required.</p>
                                                    <p>Be strong and never give up on your way to your goal!</p>
                                                    <p>Wishing you good Siberian health and good luck.</p>
                                                    <p>Sincerely yours, Grandpa Valerii and his devoted friends</p>
                                                </details>
                                            }
                                        </div>
                                    </div>
                                </section>
                                {popup === true ?
                                    <div className={styles.popup}>
                                        <div className={styles.imagesWrap}>
                                            <div className={styles.images}>
                                                <img src={product.image.data.attributes.url} alt={product.image.data.attributes.alternativeText} />
                                            </div>
                                        </div>
                                        <div className={styles.popapInfo}>
                                            <span>{lang === 'ru' ? 'Добавлен в корзину' : 'Added to cart'}</span>
                                            <h3>
                                                {product.name}
                                            </h3>
                                            <strong className={styles.price}>{product.price}
                                                <svg className='icon'>
                                                    <use xlinkHref={`${sprite}#icon-coin-ru`}></use>
                                                </svg>
                                            </strong>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                        ) : null
                    ))}
                </div>
                {!productList.some(product => product.id == window.location.hash.substring(1)) && <Error />}
                <section className={styles.list}>
                    <div className="container">
                        <div className={styles.title}>
                            <Name name={lang === 'ru' ? 'Магазин' : 'Store'} />
                            <h2>{lang === 'ru' ? 'Вам также может понравиться' : 'You may also like'}</h2>
                        </div>
                        <ProductList product={displayedProducts} />
                        {productList.length > 6 ?
                            <button type="button" className={styles.link} onClick={() => showAllProducts()}>
                                {lang === 'ru' ?
                                    !productListOpen ?
                                        'Смотреть все' :
                                        'Свернуть' :
                                    !productListOpen ?
                                        'See all' :
                                        'roll up'
                                }
                                <svg className='icon'>
                                    <use xlinkHref={`${sprite}#icon-arrow-basket`}></use>
                                </svg>
                            </button>
                            : null
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Product;