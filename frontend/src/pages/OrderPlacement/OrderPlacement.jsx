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

const OrderPlacement = ({ onLoading }) => {
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
    setTimeout(() => {
        onLoading()
    }, 0)
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
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const [phoneNumber, setPhoneNumber] = useState('+7');

    const handlePhoneNumberChange = (event) => {
        const input = event.target.value;

        const hasPlusInBeginning = input.startsWith('+');

        let filteredInput = input.replace(/[^0-9+]/g, '');

        if (!hasPlusInBeginning) {
            filteredInput = filteredInput.replace(/^\+/, '');
        }

        let formattedNumber = '';

        if (hasPlusInBeginning) {
            if (filteredInput.length <= 12) {
                formattedNumber = filteredInput.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4');
            } else {
                return formattedNumber
            }
        } else {
            if (filteredInput.length <= 11) {
                formattedNumber = filteredInput.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4');
            } else {
                return formattedNumber
            }
        }

        setPhoneNumber(formattedNumber);
    };
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
                                <li><Link to="/store/order-placement">{lang === 'ru' ? 'Оформление заказа' : 'Order placement'}</Link></li>
                            </ul>
                            <form className={styles.info} onSubmit={onSubmit}>
                                <fieldset>
                                    <ul className={styles.list}>
                                        <li className={styles.listItem}><h3>1. {lang === 'ru' ? 'Контактные данные' : 'Contact details'}</h3>
                                            <ul className={styles.contact}>
                                                <li>
                                                    <label htmlFor="name">{lang === 'ru' ? 'Имя*' : 'Name*'}</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name='name'
                                                        placeholder={lang === 'ru' ? 'Валерий' : 'Valeria'}
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="email">{lang === 'ru' ? 'Почтовый ящик*' : 'Mailbox*'}</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name='email'
                                                        placeholder='mail@example.com'
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="phone">{lang === 'ru' ? 'Телефон*' : 'Phone*'}</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name='phone'
                                                        value={phoneNumber}
                                                        onChange={handlePhoneNumberChange}
                                                        placeholder='+7 (777) 777-7777'
                                                        required
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                        {/* <li className={styles.listItem}><h3>2. {lang === 'ru' ? 'Доставка' : 'Delivery'}</h3>
                                            <span className={styles.subTitle}>{lang === 'ru' ? 'Курьерская доставка Почты России' : 'Courier delivery right to your door by the Russian Post'}</span>
                                            <ul className={styles.switchingAdress}>
                                                <li onClick={() => setDelivery(true)} className={delivery === true ? styles.active : ''}>{lang === 'ru' ? 'список' : 'list'}
                                                </li>
                                                <li onClick={() => setDelivery(false)} className={delivery === false ? styles.active : ''}>{lang === 'ru' ? 'карта' : 'map'}</li>
                                            </ul>
                                            <div>
                                                {delivery ? (
                                                    <ul className={styles.listAddress}>
                                                        <li>
                                                            <input type="radio" id='vernadskogo' name="address" value='Проспект Вернадского, 18 к1' required />
                                                            <label htmlFor="vernadskogo">{lang === 'ru' ? 'Проспект Вернадского, 18 к1' : 'Prospect Vernadskogo, 18 k1'}</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='gruzinskaya' name="address" value='Улица Малая Грузинская, 46' required />
                                                            <label htmlFor="gruzinskaya">{lang === 'ru' ? 'Улица Малая Грузинская, 46' : 'Malaya Gruzinskaya Street, 46'}</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='universitetskii' name="address" value='Университетский проспект, 21 к1' required />
                                                            <label htmlFor="universitetskii">{lang === 'ru' ? 'Университетский проспект, 21 к1' : 'Universitetsky prospect, 21 k1'}</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='molodogravardeiskaya' name="address" value='Молодогвардейская улица, 30' required />
                                                            <label htmlFor="molodogravardeiskaya">{lang === 'ru' ? 'Молодогвардейская улица, 30' : 'Molodogvardeyskaya Street, 30'}</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id='rossoshanskaya' name="address" value='Россошанская улица, 7 к1Б' required />
                                                            <label htmlFor="rossoshanskaya">{lang === 'ru' ? 'Россошанская улица, 7 к1Б' : 'Rossoshanskaya street, 7 k1B'}</label>
                                                        </li>
                                                    </ul>
                                                ) :
                                                    <div className={styles.mapWrap}>
                                                        <div className={styles.map}>
                                                            <YandexMap onLocationSelect={handleLocationSelect} />
                                                        </div>
                                                        <p>{lang === 'ru' ? 'Адрес ' : 'Address '} - {addressMap}</p>
                                                    </div>
                                                }
                                            </div>
                                            </li> */}
                                        <li className={styles.listItem}><h3>2. {lang === 'ru' ? 'Доставка Почтой РФ' : 'Delivery by Russian Post'}</h3>
                                            <ul className={styles.list}>
                                                <li>
                                                    <label htmlFor="city">{lang === 'ru' ? 'Город*' : 'City*'}</label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name='city'
                                                        placeholder={lang === 'ru' ? 'Москва' : 'Moscow'}
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="address">{lang === 'ru' ? 'Адрес*' : 'Address*'}</label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name='address'
                                                        placeholder={lang === 'ru' ? 'Проспект Вернадского, 18 к1' : 'Prospect Vernadskogo, 18 k1'}
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label htmlFor="postcode">{lang === 'ru' ? 'Почтовый индекс*' : 'Postcode*'}</label>
                                                    <input
                                                        type="text"
                                                        id="postcode"
                                                        name='postcode'
                                                        placeholder='101000'
                                                        required
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                        <li className={styles.listItem}><h3>3. {lang === 'ru' ? 'Оплата по СБП:' : 'Payment via SBP:'}</h3>
                                            <div className={styles.payment}>
                                                <div className={styles.paymentInfo}>
                                                    <p><span>{lang === 'ru' ? 'Номер телефона:' : 'Phone number:'}</span> +7 926 535 49 40</p>
                                                    <p><span>{lang === 'ru' ? 'Валюта получаемого перевода:' : 'Currency of transfer:'}</span> {lang === 'ru' ? 'Российский рубль (RUB)' : 'Russian ruble (RUB)'}</p>
                                                    <p><span>{lang === 'ru' ? 'Получатель:' : 'Recipient:'}</span> {lang === 'ru' ? 'МАЛЬКОВ ВАЛЕРИЙ АРКАДЬЕВИЧ' : 'MALKOV VALERY ARKADIEVICH'}</p>
                                                    <p><span>{lang === 'ru' ? 'Номер счёта:' : 'Account number:'}</span> 40817810738171947010</p>
                                                    <p><span>{lang === 'ru' ? 'Банк получателя:' : 'Recipient bank:'}</span> {lang === 'ru' ? 'ПАО Сбербанк' : 'PJSC Sberbank'}</p>
                                                    <p><span>{lang === 'ru' ? 'БИК:' : 'Bank identification code (BIC):'}</span> 044525225</p>
                                                    <p><span>{lang === 'ru' ? 'Корр. счёт:' : 'Correspondent account:'}</span> 30101810400000000225</p>
                                                    <p><span>{lang === 'ru' ? 'ИНН:' : 'Tax identification number (INN):'}</span> 7707083893</p>
                                                    <p><span>{lang === 'ru' ? 'КПП:' : 'Reason code of tax registration (KPP):'}</span> 773643001</p>
                                                    <p><span>{lang === 'ru' ? 'ОКПО:' : 'Primary state registration number (OGRN):'}</span> 57972160</p>
                                                    <p><span>{lang === 'ru' ? 'ОГРН:' : 'SWIFT code:'}</span> 1027700132195</p>
                                                    <p><span>{lang === 'ru' ? 'SWIFT-код:' : 'Bank postal address:'}</span> SABRRUMM</p>
                                                    <p><span>{lang === 'ru' ? 'Почтовый адрес банка:' : 'Bank postal address:'}</span> {lang === 'ru' ? '109544, МОСКВА, УЛ.Б.АНДРОНЬЕВСКАЯ,6' : '109544, MOSCOW, B.ANDRONYEVSKAYA STREET, 6'}</p>
                                                    <p><span>{lang === 'ru' ? 'Почтовый адрес доп.офиса:' : 'Additional office postal address:'}</span> {lang === 'ru' ? '125368, Г.МОСКВА, 3-ИЙ МИТИНСКИЙ ПЕРЕУЛОК, 6, КОРПУС 1' : '125368, MOSCOW, 3rd MITINSKY LANE, 6, BUILDING 1'}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </fieldset>
                                <ButtonDark type="submit" name={lang === 'ru' ? 'Заказать' : 'Order'} disabled={btnDisabled} />
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