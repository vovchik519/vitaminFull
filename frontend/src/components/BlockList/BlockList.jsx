import React from 'react';
import styles from './BlockList.module.scss';
import { Link } from 'react-router-dom';

const BlockList = (props) => {
    let server = 'https://vitamin-art.ru:4444'

    const { descriptions } = props;
    const { descriptionsIndents } = props;
    const { list } = props;
    const { listIndents } = props;
    const { images } = props;
    let listId = [];

    multiData(listId, list, 'id')

    function multiData(array, data, key) {
        for (let i = 0; i < data.length; i++) {
            array.push(data[i][key])
        }
    }
    return (
        <section className={`${styles.wrapper} ${props.type !== undefined ? styles[props.type] : ''}`}>
            <div className="container">
                <div className={styles.wrap}>
                    <div className={styles.info}>
                        <h2>{props.title}</h2>
                        <ul className={styles.list}>
                            {listId.map((item, index) => (
                                <li className={props.listIndents[index] === true ? '' : styles.indent} key={index}>
                                    {list[index].textStart !== null ? list[index].textStart : ''}
                                    {list[index].link !== null ? <a href={`http://${list[index].link}`} target='_blank'>{list[index].link}</a> : ''}
                                    {list[index].textEnd !== null ? list[index].textEnd : ''}</li>
                            ))}
                        </ul>
                        {images && images.length > 0 &&
                            <div className={styles.images}>
                                {images.map((item, index) => (
                                    <div key={index} className={images.length <= 2 ? `${styles.imagesWrap} block__list-images${images.length}` : `${styles.imagesWrap}`}>
                                        <img src={item} alt='изображение' />
                                    </div>
                                ))}
                            </div>
                        }
                        <div className={styles.description}>
                            {descriptions.map((description, index) => (
                                <p className={props.descriptionsIndents[index] === true ? '' : styles.indent} key={index}>{description}</p>
                            ))}
                        </div>
                    </div>
                    <div className={`${props.class} ${styles.image}`}>
                        <img src={`${props.imageUrl}`} alt={props.imageAlt} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlockList;