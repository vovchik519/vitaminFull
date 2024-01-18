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
        if (document.location.pathname === '/item') {
            document.location.hash = ''
            document.location.pathname = '/for-kids'
        } else if (document.location.pathname === '/poem') {
            document.location.hash = ''
            document.location.pathname = '/pantry'
        } else if (document.location.pathname === '/store/item') {
            document.location.hash = ''
            document.location.pathname = '/store'
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