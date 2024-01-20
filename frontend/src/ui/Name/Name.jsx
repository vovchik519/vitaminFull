import React from 'react';
import styles from './Name.module.scss';
import sprite from './../../images/icons/sprite.svg';
const Name = (props) => {
    return (
        <div className={styles.name}>
            <svg className={styles.border}>
                <use xlinkHref={props.white === true ? `${sprite}#icon-name-border-white` : `${sprite}#icon-name-border`}></use>
            </svg>
            <span>{props.name}</span>
        </div>
    );
};

export default Name;