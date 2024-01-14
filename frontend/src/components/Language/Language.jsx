import React, { useState, useEffect } from 'react';
import styles from './Language.module.scss';
import sprite from './../../images/icons/sprite.svg';

const Language = () => {
    let [lang, setLang] = useState(localStorage.getItem('selectedLanguage') || 'ru');
    if (!localStorage.getItem('selectedLanguage')) {
        localStorage.setItem('selectedLanguage', 'ru');
        document.location.reload()
    }
    const changeLang = (newLang) => {
        setLang(newLang);
        localStorage.setItem('selectedLanguage', newLang);
        document.location.reload()
        if (document.location.pathname === '/item' || document.location.pathname === '/poem' || document.location.pathname === '/store/item') {
            window.history.back();
        }
    };
    return (
        <div className={styles.language}>
            <div className={styles.border}>
                <svg>
                    <use xlinkHref={`${sprite}#icon-border-one`}></use>
                </svg>
            </div>
            <button onClick={() => changeLang('ru')}>Рус</button>
            <button onClick={() => changeLang('en')}>Eng</button>
        </div>
    );
};

export default Language;