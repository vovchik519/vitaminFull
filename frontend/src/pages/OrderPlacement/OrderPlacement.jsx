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

const OrderPlacement = () => {
    let lang = localStorage.getItem('selectedLanguage');

    const [delivery, setDelivery] = useState(true)

    const [contact, setContact] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');

    const handleInputContact = (field, value) => {
        setContact({
            ...contact,
            [field]: value,
        });
    };

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

    let dataOrders = localStorage.getItem('orders');
    let dataOrdersArray = JSON.parse(dataOrders)
    let ordersList = []
    for (let elem of dataOrdersArray) {
        const obj = {}
        obj.name = elem.name
        obj.city = elem.city
        obj.price = elem.price
        obj.year = elem.year
        ordersList.push(obj)
    }
    useEffect(() => {
        setTimeout(() => {
            if (delivery === true) {
                setAddressMap('')
            } else {
                setAddress('')
            }
        }, 0)
    }, [delivery])

    const { orders, addOrder, removeOrder } = useOrders();

    const handleRemoveToCart = (product) => {
        removeOrder(product);
    };
    const [isOpen, setIsOpen] = useState(false)
    const handleSubmit = () => {
        console.log(contact, `Адрес доставки: ${address} ${addressMap}`, `Способ оплаты: ${payment}`, ordersList);
        setIsOpen(true)
    }

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
                            <form className={styles.info}>
                                <fieldset>
                                    <ul className={styles.list}>
                                        <li className={styles.listItem}><h3>1. Контактные данные</h3>
                                            <ul className={styles.contact}>
                                                <li>
                                                    <label htmlFor="name">Имя*</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        placeholder='Валерий'
                                                        value={contact.name}
                                                        onChange={(e) => handleInputContact('name', e.target.value)}
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="email">Почтовый ящик*</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        placeholder='mail@example.com'
                                                        value={contact.email}
                                                        onChange={(e) => handleInputContact('email', e.target.value)}
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="address">Адрес доставки*</label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        placeholder='Москва'
                                                        value={contact.address}
                                                        onChange={(e) => handleInputContact('address', e.target.value)}
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="phone">Телефон*</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        placeholder='+7 777 77 77 777'
                                                        value={contact.phone}
                                                        onChange={(e) => handleInputContact('phone', e.target.value)}
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
                                                            <input type="radio" id='vernadskogo' name="address" onChange={() => (setAddress('Проспект Вернадского, 18 к1'))} />
                                                            <label htmlFor="vernadskogo">Проспект Вернадского, 18 к1</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='gruzinslaya' name="address" onChange={() => (setAddress('Улица Малая Грузинская, 46'))} />
                                                            <label htmlFor="gruzinslaya">Улица Малая Грузинская, 46</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='universitetskii' name="address" onChange={() => (setAddress('Университетский проспект, 21 к1'))} />
                                                            <label htmlFor="universitetskii">Университетский проспект, 21 к1</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='molodogravardeiskaya' name="address" onChange={() => (setAddress('Молодогвардейская улица, 30'))} />
                                                            <label htmlFor="molodogravardeiskaya">Молодогвардейская улица, 30</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='rossoshanskaya' name="address" onChange={() => (setAddress('Россошанская улица, 7 к1Б'))} />
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
                                                    <input type="radio" id='online' name='payment' onChange={() => (setPayment('Банковской картой онлайн'))} />
                                                    <label htmlFor="online">Банковской картой онлайн</label>
                                                </div>
                                                <div>
                                                    <input type="radio" id='offline' name='payment' onChange={() => (setPayment('Банковской картой при получении'))} />
                                                    <label htmlFor="offline">Банковской картой при получении</label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </fieldset>
                            </form>
                        </div>
                        <div className={styles.right}>
                            <BasketInside orders={orders} removeOrder={removeOrder} orderPlacement={true} />
                        </div>
                        <ButtonDark type="button" name="перейти к оплате" click={() => handleSubmit()} />
                    </div>
                </div>
            </main>
            <Footer />
            <ThankYou isOpen={isOpen} title={lang === 'ru' ? 'Спасибо. Ваш заказ принят.' : 'Thank you. Your order has been accepted.'} />
        </>
    );
};
export default OrderPlacement;