import React, { useEffect, useState } from 'react';
import styles from './OrderPlacement.module.scss';
import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import YandexMap from '../../components/YandexMap/YandexMap';
import axios from 'axios'

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
    useEffect(() => {
        setTimeout(() => {
            if (delivery === true) {
                setAddressMap('')
            } else {
                setAddress('')
            }
        }, 0)
        }, [delivery])
    const handleSubmit = () => {
        console.log(contact, address, payment, addressMap);
    }
    return (
        <>
            <Header />
            <main>
                <ul className={styles.breadcrumbs}>
                    <li><Link to="/home">{lang === 'ru' ? 'Главная' : 'Home'}</Link></li>
                    <li><Link to="/store">{lang === 'ru' ? 'Магазин' : 'Store'}</Link></li>
                    <li><Link to="/store/order-placement">{lang === 'ru' ? 'Оформление заказа' : ''}</Link></li>
                </ul>
                <form className={styles.info}>
                    <fieldset>
                        <ol>
                            <li><h3>Контактные данные</h3>
                                <ul>
                                    <li>
                                        <label htmlFor="name">Имя*</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={contact.name}
                                            onChange={(e) => handleInputContact('name', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="email">Почтовый ящик*</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={contact.email}
                                            onChange={(e) => handleInputContact('email', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="address">Адрес доставки*</label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={contact.address}
                                            onChange={(e) => handleInputContact('address', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="phone">Телефон*</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={contact.phone}
                                            onChange={(e) => handleInputContact('phone', e.target.value)}
                                        />
                                    </li>
                                </ul>
                            </li>
                            <li><h3>Доставка</h3>
                                <span>Курьерская доставка Почты России</span>
                                <ul>
                                    <li onClick={() => setDelivery(true)}>список
                                    </li>
                                    <li onClick={() => setDelivery(false)}>карта</li>
                                </ul>
                                <div>
                                    {delivery ? (
                                        <ul>
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
                                        <YandexMap onLocationSelect={handleLocationSelect} />
                                    }
                                </div>
                            </li>
                            <li><h3>Способ оплаты</h3>
                                <div>
                                    <input type="radio" id='online' name='payment' onChange={() => (setPayment('Банковской картой онлайн'))} />
                                    <label htmlFor="online">Банковской картой онлайн</label>
                                </div>
                                <div>
                                    <input type="radio" id='offline' name='payment' onChange={() => (setPayment('Банковской картой при получении'))} />
                                    <label htmlFor="offline">Банковской картой при получении</label>
                                </div>
                            </li>
                        </ol>
                        <button type="button" onClick={() => handleSubmit()}>перейти к оплате</button>
                    </fieldset>
                </form>
            </main>
            <Footer />
        </>
    );
};
export default OrderPlacement;