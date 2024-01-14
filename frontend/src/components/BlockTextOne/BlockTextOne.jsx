import React from 'react';
import styles from './BlockTextOne.module.scss';
import Name from './../../ui/Name/Name';

const BlockTextOne = (props) => {
    let server = 'http://localhost:1337'

    const { descriptions } = props;
    const { indents } = props;
    
    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.wrap}>
                    <div className={styles.info}>
                        <Name
                            name={props.name} />
                        <h2>{props.titleStart} <span>{props.titleColored}</span> {props.titleEnd}</h2>
                        <div className={styles.description}>
                            {descriptions.map((description, index) => (
                                <p className={props.indents[index] === true ? '' : styles.indent} key={index}>{description}</p>
                            ))}
                        </div>
                    </div>
                    <div className={styles.image}>
                        <img src={`${props.imageUrl}`} alt={props.imageAlt} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlockTextOne;