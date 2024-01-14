import React from 'react';
import styles from './Name.module.scss';

const Name = (props) => {
    return (
        <div className={styles.name}>
            <span>{props.name}</span>
        </div>
    );
};

export default Name;