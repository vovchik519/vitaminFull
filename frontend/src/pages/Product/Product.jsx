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

const Product = () => {
    let server = 'http://localhost:1337'

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
                        Authorization: `Bearer 58303d79acc986f444df5932f716217edce1c5edfe351b102c6798fa35321513a948f9e0893441006de97f9bee7e431df11705646be6ab8e3421c8a821313abae71eb8d2561561a2bb07eafcf38a43cced71675eb73e65a61ba3c1554719d231ae2bc7f0132064db98e11c19f0bafa3c6f5fe261269c8459b07f0c07b8d20172`
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
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // product
    const [productList, setProductList] = useState([]);
    const { orders, addOrder, removeOrder } = useOrders();
    const handleAddToCart = (product) => {
        addOrder(product);
    };
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
    useEffect(() => {
        setTimeout(() => {
            setDisplayedProducts(productList.slice(0, 6))
        }, 0)
    }, [productList])
    const showAllProducts = () => {
        if (displayedProducts.length === 6) {
            setDisplayedProducts(productList);
        } else {
            setDisplayedProducts(productList.slice(0, 6));
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
                            <section key={index}>
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
                                                    <span>Инструкции по уходу</span>
                                                    <svg className='icon'>
                                                        <use xlinkHref={`${sprite}#icon-arrow-top`}></use>
                                                    </svg>
                                                </summary>
                                                <p>Спасибо за покупку! Чтобы гарантировать, что ваша картина была доставлена в идеальном состоянии, следуйте приведенным ниже инструкциям по распаковке:</p>
                                                <ol>
                                                    <li>Найдите язычок на одном конце ленты и осторожно вытащите ленту из крафт-бумаги. Будьте осторожны, чтобы не порвать бумагу или картину внутри. Мы не рекомендуем использовать канцелярский нож или любой другой острый инструмент, чтобы разрезать ленту и/или бумагу. </li>
                                                    <li>Разверните картину из крафт-бумаги на ровную поверхность.</li>
                                                </ol>
                                                <p>Обратите внимание, что мы не несем ответственности за ущерб, вызванный небрежной распаковкой.</p>
                                                <p>Если у вас есть какие-либо вопросы или сомнения по поводу вашей работы, не стесняйтесь обращаться к нам по <a href="mailto:v.a.malkov@mail.ru">v.a.malkov@mail.ru</a>.
                                                    Еще раз благодарим вас за покупку и надеемся, что вам понравятся ваши  произведения искусства!</p>
                                            </details>
                                            :
                                            <details className={styles.description}>
                                                <summary>
                                                    <span>Care instructions</span>
                                                    <svg className='icon'>
                                                        <use xlinkHref={`${sprite}#icon-arrow-top`}></use>
                                                    </svg></summary>
                                                <p>Thank you for your purchase! To ensure your painting has been delivered in perfect condition, follow the unpacking instructions below:</p>
                                                <ol>
                                                    <li>
                                                        Locate the tab on one end of the ribbon and carefully pull the ribbon out of the kraft paper. Be careful not to tear the paper or picture inside. We do not recommend using a stationery knife or any other sharp tool to cut the ribbon and/or paper.
                                                    </li>
                                                    <li>
                                                        Unroll the kraft paper painting onto a flat surface.
                                                    </li>
                                                </ol>
                                                <p>Please note that we are not responsible for damage caused by careless unpacking.</p>
                                                <p>If you have any questions or concerns about your artwork, feel free to contact us at <a href="v.a.malkov@mail.ru">v.a.malkov@mail.ru</a>.</p>
                                                <p>Thank you again for your purchase and we hope you enjoy your artwork!</p>
                                            </details>
                                        }
                                    </div>
                                </div>
                            </section>
                        ) : null
                    ))}
                </div>
                <section className={styles.list}>
                    <div className="container">
                        <div className={styles.title}>
                            <Name name={lang === 'ru' ? 'Магазин' : 'Store'} />
                            <h2>{lang === 'ru' ? 'Вам также может понравиться' : 'You may also like'}</h2>
                        </div>
                        <ProductList product={displayedProducts} />
                        <button type="button" className={styles.link} onClick={() => showAllProducts()}>
                            {lang === 'ru' ? 'Смотреть все' : 'See all'}
                            <svg className='icon'>
                                <use xlinkHref={`${sprite}#icon-arrow-basket`}></use>
                            </svg>
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Product;