import React from 'react';
import styles from './BlockTextTwo.module.scss';
import Name from './../../ui/Name/Name';
import LinkLight from './../../ui/LinkLight/LinkLight';

const BlockTextTwo = (props) => {
    let server = 'https://vitamin-art.ru:4444'

    const { descriptions } = props;
    const { indents } = props;

    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.wrap}>
                    <div className={styles.image}>
                        <img src={`${props.imageUrl}`} alt={props.imageAlt} />
                    </div>
                    <div className={styles.info}>
                        <Name
                            name={props.name} white={true} />
                        <h2>{props.title}</h2>
                        <div className={styles.description}>
                            {descriptions.map((description, index) => (
                                <p className={props.indents[index] === true ? '' : styles.indent} key={index}>{description}</p>
                            ))}
                        </div>
                        <LinkLight
                            name={props.buttonName}
                            link={props.buttonLink}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlockTextTwo;