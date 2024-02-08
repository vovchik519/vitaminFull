import React, { useEffect, useState } from 'react';
import styles from './OrderPlacement.module.scss';
import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import YandexMap from '../../components/YandexMap/YandexMap';
import axios from 'axios'
import ButtonDark from './../../ui/ButtonDark/ButtonDark';
import useOrders from '../../database-orders';
import BasketInside from '../../components/BasketInside/BasketInside';
import ThankYou from '../../components/ThankYou/ThankYou';
import emailjs from '@emailjs/browser';

const OrderPlacement = () => {
    let lang = localStorage.getItem('selectedLanguage');

    const [delivery, setDelivery] = useState(true)

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [addressMap, setAddressMap] = useState('');
    const handleLocationSelect = async (coordinates) => {
        try {
            // Выполняем запрос к Nominatim
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`
            );

            // Извлекаем адрес из ответа
            const { display_name } = response.data;
            setAddressMap(display_name);
        } catch (error) {
            console.error('Ошибка при получении адреса:', error);
        }

        // Устанавливаем выбранные координаты
        setSelectedLocations([coordinates]);
    };

    const { orders, addOrder, removeOrder } = useOrders();

    const handleRemoveToCart = (product) => {
        removeOrder(product);
    };
    const [isOpen, setIsOpen] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    
    useEffect(() => {
        if (delivery === true) {
            setAddressMap('')
        }
    }, [delivery])
    const handleSubmit = (event, additionalData) => {
        event.preventDefault();

        const serviceID = 'service_0362ci1';
        const templateID = 'template_e8y7ios';

        const formData = new FormData(event.target);
        const templateParams = {};
        formData.forEach((value, key) => {
            templateParams[key] = value;
        });
        templateParams.orders = []
        let ordersList = []
        for (let elem of additionalData) {
            const obj = {}
            obj.name = `Имя: ${elem.name} |`
            obj.city = `Город: ${elem.city} |`
            obj.price = `Цена: ${elem.price} Рублей |`
            obj.year = `Год: ${elem.year} |`
            obj.quantity = `Количество: ${elem.quantity}`
            obj.priceNumber = +elem.price
            obj.quantityNumber = elem.quantity
            ordersList.push(obj)
        }
        let priceAll = 0
        for (let elem of ordersList) {
            if (elem.quantityNumber === undefined || elem.quantityNumber === 1) {
                priceAll += elem.priceNumber
            } else {
                priceAll += elem.priceNumber * elem.quantityNumber;
            }
        }
        for (const key in ordersList) {
            templateParams.orders.push(ordersList[key])
        }
        if (addressMap) {
            templateParams.address = addressMap
        }
        templateParams.price = priceAll
        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                setBtnDisabled(true);
                setIsOpen(true)
                setTimeout(() => {
                    setIsOpen(false)
                    setBtnDisabled(false)
                }, 15000)
            })
            .catch((err) => {
                alert(JSON.stringify(err));
            });
    };
    const onSubmit = (event) => {
        handleSubmit(event, orders);
    };
    emailjs.init({
        publicKey: 'Fhpa1Ls471A5JsDGg',
        limitRate: {
            throttle: 15000,
        },
    })

    return (
        <>
            <Header />
            <main className={styles.wrapper}>
                <div className="container">
                    <div className={styles.wrap}>
                        <div className={styles.main}>
                            <ul className={styles.breadcrumbs}>
                                <li><Link to="/home">{lang === 'ru' ? 'Главная' : 'Home'}</Link></li>
                                <li><Link to="/store">{lang === 'ru' ? 'Магазин' : 'Store'}</Link></li>
                                <li><Link to="/store/order-placement">{lang === 'ru' ? 'Оформление заказа' : ''}</Link></li>
                            </ul>
                            <form className={styles.info} onSubmit={onSubmit}>
                                <fieldset>
                                    <ul className={styles.list}>
                                        <li className={styles.listItem}><h3>1. Контактные данные</h3>
                                            <ul className={styles.contact}>
                                                <li>
                                                    <label htmlFor="name">Имя*</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name='name'
                                                        placeholder='Валерий'
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="email">Почтовый ящик*</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name='email'
                                                        placeholder='mail@example.com'
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="address">Адрес доставки*</label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name='addressForm'
                                                        placeholder='Москва'
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="phone">Телефон*</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name='phone'
                                                        placeholder='+7 777 77 77 777'
                                                        required
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                        <li className={styles.listItem}><h3>2. Доставка</h3>
                                            <span className={styles.subTitle}>Курьерская доставка Почты России</span>
                                            <ul className={styles.switchingAdress}>
                                                <li onClick={() => setDelivery(true)} className={delivery === true ? styles.active : ''}>список
                                                </li>
                                                <li onClick={() => setDelivery(false)} className={delivery === false ? styles.active : ''}>карта</li>
                                            </ul>
                                            <div>
                                                {delivery ? (
                                                    <ul className={styles.listAddress}>
                                                        <li>
                                                            <input type="radio" id='vernadskogo' name="address" value='Проспект Вернадского, 18 к1' required/>
                                                            <label htmlFor="vernadskogo">Проспект Вернадского, 18 к1</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='gruzinskaya' name="address" value='Улица Малая Грузинская, 46' required/>
                                                            <label htmlFor="gruzinskaya">Улица Малая Грузинская, 46</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='universitetskii' name="address" value='Университетский проспект, 21 к1' required/>
                                                            <label htmlFor="universitetskii">Университетский проспект, 21 к1</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='molodogravardeiskaya' name="address" value='Молодогвардейская улица, 30' required/>
                                                            <label htmlFor="molodogravardeiskaya">Молодогвардейская улица, 30</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='rossoshanskaya' name="address" value='Россошанская улица, 7 к1Б' required/>
                                                            <label htmlFor="rossoshanskaya">Россошанская улица, 7 к1Б</label>
                                                        </li>
                                                    </ul>
                                                ) :
                                                    <div className={styles.mapWrap}>
                                                        <div className={styles.map}>
                                                            <YandexMap onLocationSelect={handleLocationSelect} />
                                                        </div>
                                                        <p>Адресс - {addressMap}</p>
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                        <li className={styles.listItem}><h3>3. Способ оплаты</h3>
                                            <div className={styles.payment}>
                                                <div>
                                                    <input type="radio" id='online' name='payment' value='Банковской картой онлайн' required/>
                                                    <label htmlFor="online">Банковской картой онлайн</label>
                                                </div>
                                                <div>
                                                    <input type="radio" id='offline' name='payment' value='Банковской картой при получении' required/>
                                                    <label htmlFor="offline">Банковской картой при получении</label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </fieldset>
                                <ButtonDark type="submit" name="перейти к оплате" disabled={btnDisabled} />
                            </form>
                        </div>
                        <div className={styles.right}>
                            <BasketInside orders={orders} removeOrder={removeOrder} orderPlacement={true} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <ThankYou isOpen={isOpen} title={lang === 'ru' ? 'Спасибо. Ваш заказ принят.' : 'Thank you. Your order has been accepted.'} />
        </>
    );
};
export default OrderPlacement;