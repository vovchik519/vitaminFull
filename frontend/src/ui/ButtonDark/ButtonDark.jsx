import React from 'react';
import styles from './ButtonDark.module.scss';
import sprite from './../../images/icons/sprite.svg';

const ButtonDark = (props) => {
    return (
        <button className={`${styles.link} globalButtonDark`} type={props.type} onClick={props.click}>
            <span>
                {props.name}
            </span>
        </button>
    );
};

export default ButtonDark;