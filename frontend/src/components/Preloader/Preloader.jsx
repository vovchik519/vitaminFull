import React from 'react';
import styles from './Preloader.module.scss';

const Preloader = (props) => {
    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.wrap}>
                    <span className={styles.loader}></span>
                </div>
            </div>
        </section>
    );
};

export default Preloader;