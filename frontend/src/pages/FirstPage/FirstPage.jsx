import React, { useState, useEffect } from 'react';

import styles from './FirstPage.module.scss';
import sprite from './../../images/icons/sprite.svg';
import Language from './../../components/Language/Language';
import LogoWithName from './../../components/LogoWithName/LogoWithName';
import { Link } from 'react-router-dom';

const FirstPage = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage')
    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let firstPage = `${server}/api/first-page?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(firstPage, {
                    headers: {
                        Authorization: `Bearer 58303d79acc986f444df5932f716217edce1c5edfe351b102c6798fa35321513a948f9e0893441006de97f9bee7e431df11705646be6ab8e3421c8a821313abae71eb8d2561561a2bb07eafcf38a43cced71675eb73e65a61ba3c1554719d231ae2bc7f0132064db98e11c19f0bafa3c6f5fe261269c8459b07f0c07b8d20172`
                    }
                });
                const data = await response.json();
                // firstpage data
                setData(data.data.attributes);
                // logo
                setLogo(data.data.attributes.logo);
                setLogoImg(data.data.attributes.logo.icon.data.attributes);
                setLogoWhiteImg(data.data.attributes.logo.iconWhite.data.attributes);
                // background
                setBackground(data.data.attributes.background.data.attributes);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // firstpage data
    const [data, setData] = useState({});
    // logo
    const [logo, setLogo] = useState({});
    const [logoImg, setLogoImg] = useState({});
    const [logoWhiteImg, setLogoWhiteImg] = useState({});
    // background
    const [background, setBackground] = useState({});
    let backgroundStyle = {
        backgroundImage: `url(${background.url})`,
    }
    return (
        <section className={styles.firstPage} style={backgroundStyle}>
            <div className={styles.head}>
                <Link to="/home" aria-label="Главная страница" className={styles.logo}>
                    <LogoWithName
                        visibility='desctop'
                        url={logoImg.url}
                        urlWhite={logoWhiteImg.url}
                        alt={logoImg.alternativeText}
                        name={logo.name}
                    />
                </Link>
                <h1>{data.title}</h1>
            </div>
            <div className={styles.foot}>
                <Language />
                <Link to='/home' className={styles.link} aria-label={data.buttonName}>
                    <svg className="icon">
                        <use xlinkHref={`${sprite}#icon-arrow-right`}></use>
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default FirstPage;