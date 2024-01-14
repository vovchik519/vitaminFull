import React from 'react';
import styles from './Poem.module.scss';

const Poem = (props) => {

    const { content } = props;
    const { indents } = props;
    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.wrap}>
                    {props.title !== undefined ?
                        <h2>
                            {props.title}
                        </h2> : null
                    }
                    {props.description !== undefined ?
                        <p className={styles.subTitle}>
                            {props.description}
                        </p> : null
                    }
                    {props.titleTwo !== undefined ?
                        <h3>
                            {props.titleTwo}
                        </h3> : null
                    }
                    {content.map((paragraph, index) => (
                        <p className={props.indents[index] === true ? '' : 'indent'} key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Poem;