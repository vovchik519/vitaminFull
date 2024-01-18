import React from 'react';
import styles from './Error.module.scss';

const Error = () => {
    let lang = localStorage.getItem('selectedLanguage');

    return (
        <div className={styles.wrapper}>
            <h2>{lang === 'ru' ? 'Страница не найдена' : 'Page not found'}</h2>
        </div>
    );
};
export default Error;