import React, { useState, useEffect, useRef } from 'react';

import styles from './PoemSection.module.scss';

import sprite from './../../images/icons/sprite.svg';
import PoemList from './../PoemList/PoemList';

const PoemSection = (props) => {
    let server = 'http://185.251.88.31:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let PoemData = `${server}/api/${props.page}?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(PoemData, {
                    headers: {
                        Authorization: `Bearer f66dbcdd40ea112c1922a33c00ef12399433cecaf44cc622f7ecb965b7462b1930e0bec5bb93f45ba485ada66eab5aaa548c1703eacf201a2a0bea3996cb0e746c94e9e316c737b4080eb53344edc4fe8d8bee794530d46926fdc72b75cb73a0cca89551386776de20138eea544f5458b22044468172b1a40f1a65a645e24998`
                    }
                });
                const data = await response.json();
                setPoem(data.data.attributes.poemsList)
                setPoemTextSup(data.data.attributes.poemsList.supText)
                setPoemTextSub(data.data.attributes.poemsList.subText)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const [poem, setPoem] = useState([]);
    const [poemTextSup, setPoemTextSup] = useState([]);
    const [poemTextSub, setPoemTextSub] = useState([]);

    const poemTextSupArray = [];
    const poemTextSubArray = [];

    multiData(poemTextSupArray, poemTextSup, 'paragraph')
    multiData(poemTextSubArray, poemTextSub, 'paragraph')

    function multiData(array, data, key) {
        for (let i = 0; i < data.length; i++) {
            array.push(data[i][key])
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrap}>
                <div className={styles.supText}>
                    {poemTextSupArray.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <h2>{poem.title}</h2>
                <div className={styles.subText}>
                    {poemTextSubArray.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
            <PoemList event={props.event} page={props.page} />
        </div>
    );
};

export default PoemSection;