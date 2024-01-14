import React from 'react';
import styles from './Feedback.module.scss';
import Name from './../../ui/Name/Name';
import ButtonDark from './../../ui/ButtonDark/ButtonDark';

const Feedback = (props) => {
    let server = 'http://localhost:1337'

    const { inputs } = props;

    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.wrap}>
                    <div className={styles.info}>
                        <Name 
                        name={props.name} />
                        <h2>{props.title}</h2>
                        <form className={styles.form}>
                            {inputs.map((input, index) => (
                                <div key={index} className={styles.row}>
                                    <label htmlFor={input.forId}>{input.label}</label>
                                    <input placeholder={input.placeholder} type={input.type} id={input.forId} />
                                </div>
                            ))}
                            <ButtonDark
                                name={props.button}
                            />
                        </form>
                    </div>
                    <div className={styles.image}>
                        <img src={`${props.imageUrl}`} alt={props.imageAlt} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;