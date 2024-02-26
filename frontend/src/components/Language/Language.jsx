import React, { useState, useEffect } from 'react';
import styles from './Language.module.scss';
import sprite from './../../images/icons/sprite.svg';

const Language = ({ ru, en }) => {
    let [lang, setLang] = useState(localStorage.getItem('selectedLanguage') || 'ru');
    if (!localStorage.getItem('selectedLanguage')) {
        localStorage.setItem('selectedLanguage', 'ru');
        document.location.reload()
    }
    const changeLang = (newLang) => {
        setTimeout(() => {
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
        }, 0)
    };
    return (
        <>
            {ru !== true && en !== true ?
                <div className={styles.language}>
                    <div className={styles.border}>
                        <svg>
                            <use xlinkHref={`${sprite}#icon-border-one`}></use>
                        </svg>
                    </div>
                    <button type='button' onClick={() => changeLang('ru')}>Рус</button>
                    <button type='button' onClick={() => changeLang('en')}>Eng</button>
                </div>
                :
                <> {ru === true ?
                    <div className={`${styles.language} ${styles.solo}`} onClick={() => changeLang('ru')}>
                        <div className={styles.border}>
                            <svg>
                                <use xlinkHref={`${sprite}#icon-border-two`}></use>
                            </svg>
                        </div>
                        <button type='button' >Рус</button>
                    </div> :
                    <div className={`${styles.language} ${styles.solo}`} onClick={() => changeLang('en')}>
                        <div className={styles.border}>
                            <svg>
                                <use xlinkHref={`${sprite}#icon-border-two`}></use>
                            </svg>
                        </div>
                        <button type='button'>Eng</button>
                    </div>
                }
                </>
            }
        </>
    );
};

export default Language;