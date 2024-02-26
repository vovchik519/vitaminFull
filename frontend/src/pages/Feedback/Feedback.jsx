import React, { useState, useEffect } from 'react';

import styles from './Feedback.module.scss';
import Feedback from './../../components/Feedback/Feedback';
import Footer from './../../components/Footer/Footer';
import Header from './../../components/Header/Header';

const FeedbackPage = ({onLoading}) => {
    let server = 'http://185.251.88.31:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        const homePage = `${server}/api/home-page?locale=${lang}&populate=deep,10`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(homePage, {
                    headers: {
                        Authorization: `Bearer f66dbcdd40ea112c1922a33c00ef12399433cecaf44cc622f7ecb965b7462b1930e0bec5bb93f45ba485ada66eab5aaa548c1703eacf201a2a0bea3996cb0e746c94e9e316c737b4080eb53344edc4fe8d8bee794530d46926fdc72b75cb73a0cca89551386776de20138eea544f5458b22044468172b1a40f1a65a645e24998`
                    }
                });
                const data = await response.json();
                setFeedback(data.data.attributes.feedback);
                setFeedbackImage(data.data.attributes.feedback.image.data.attributes);
                onLoading()
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);
    // feedback
    const [feedback, setFeedback] = useState({});
    const [feedbackImage, setFeedbackImage] = useState({});
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>
                <Feedback
                    name={feedback.name}
                    title={feedback.title}
                    button={feedback.button}
                    imageUrl={feedbackImage.url}
                    imageAlt={feedbackImage.alternativeText}
                />
            </main>
            <Footer />
        </div>
    );
};

export default FeedbackPage;