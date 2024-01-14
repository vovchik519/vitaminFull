import React from 'react';
import styles from './BannerTwo.module.scss';
import Name from './../../ui/Name/Name';
import LinkLight from './../../ui/LinkLight/LinkLight';

const BannerTwo = (props) => {
    const { titles } = props;
    const { descriptions } = props;

    return (
        <section className={styles.wrapper}>
            <div className={styles.wrap}>
                <Name
                    name={props.name}
                />
                <h2>
                    {
                        titles.map((title, index) => (
                            <span key={index}>{title}</span>
                        ))
                    }
                </h2>
                {descriptions.map((description, index) => (
                    <p key={index}>{description}</p>
                ))}
                <LinkLight
                    name={props.buttonName}
                    link={props.buttonLink}
                />
            </div>
        </section>
    );
};

export default BannerTwo;