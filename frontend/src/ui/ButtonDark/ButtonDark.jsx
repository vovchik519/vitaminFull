import React from 'react';
import styles from './ButtonDark.module.scss';
import sprite from './../../images/icons/sprite.svg';

const ButtonDark = (props) => {
    return (
        <button className={styles.link}>
            <span>
                {props.name}
            </span>
        </button>
    );
};

export default ButtonDark;