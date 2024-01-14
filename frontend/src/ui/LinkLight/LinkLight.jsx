import React from 'react';
import styles from './LinkLight.module.scss';
import sprite from './../../images/icons/sprite.svg';
import { Link } from 'react-router-dom';

const LinkLight = (props) => {
    return (
        <Link to={props.link} className={styles.link}>
            <span>
                {props.name}
            </span>
            <svg className='link'>
                <use xlinkHref={`${sprite}#icon-arrow-link`}></use>
            </svg>
        </Link>
    );
};

export default LinkLight;