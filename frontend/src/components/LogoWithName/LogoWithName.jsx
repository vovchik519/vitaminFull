import React from 'react';
import styles from './LogoWithName.module.scss';

const LogoWithName = (props) => {
    let server = 'https://vitamin-art.ru:4444'
    
    return (
        <div className={`${styles.logo} ${props.theme !== undefined ? styles[props.theme] : ''}`}>
            <img src={`${props.url}`} alt={props.alt} width={62} height={56} className={styles.imgWhite} />
            <img src={`${props.urlWhite}`} alt={props.alt} width={62} height={56} className={styles.imgBlack} />
            <p className={props.visibility !== undefined ? props.visibility : ''}>{props.name}</p>
        </div>
    );
};

export default LogoWithName;