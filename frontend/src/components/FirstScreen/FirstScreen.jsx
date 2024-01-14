import React from 'react';
import styles from './FirstScreen.module.scss';

const FirstScreen = (props) => {
    let server = 'http://localhost:1337'
    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.info}>
                    <div className={styles.titleWrap}>
                        <span className={styles.name}>{props.name}</span>
                        <h1>{props.titleStart} <span>{props.titleColored}</span> {props.titleEnd}</h1>
                    </div>
                    <div className={styles.description}>
                        <p>{props.description}</p>
                    </div>
                </div>
            </div>
            <div className={styles.images}>
                {props.decoration !== undefined ?
                    <img src={`${props.decoration}`} className={styles.decoration} alt='decoration' />
                    : null
               }
                <img src={`${props.imageUrl}`} className={styles.image} alt={props.imageAlt} />
            </div>
        </section>
    );
};

export default FirstScreen;