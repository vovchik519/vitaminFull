import React from 'react';
import styles from './FourImage.module.scss';

const FourImage = (props) => {
    let server = 'http://localhost:1337'

    const { descriptionsTop } = props;
    const { descriptionsTopIndents } = props;
    const { descriptionsBottom } = props;
    const { descriptionsBottomIndents } = props;
    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.wrap}>
                    <div className={styles.info}>
                        <h2>{props.title}</h2>
                        <div className={styles.descriptionTop}>
                            {descriptionsTop.map((description, index) => (
                                <p className={props.descriptionsTopIndents[index] === true ? '' : 'indent'} key={index}>{description}</p>
                            ))}
                        </div>
                    </div>
                    <div className={styles.image}>
                        <img src={`${props.imageOneUrl}`} alt={props.imageOneAlt} />
                        <img src={`${props.imageTwoUrl}`} alt={props.imageTwoAlt} />
                        <img src={`${props.imageThreeUrl}`} alt={props.imageThreeAlt} />
                        <img src={`${props.imageFourUrl}`} alt={props.imageFourAlt} />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.descriptionBottom}>
                            {descriptionsBottom.map((description, index) => (
                                <p className={props.descriptionsBottomIndents[index] === true ? '' : 'indent'} key={index}>{description}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FourImage;