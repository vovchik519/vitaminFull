import React, { useState, useEffect } from 'react';

import styles from './Article.module.scss';

import FirstScreen from './../../components/FirstScreen/FirstScreen';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';

const Article = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let ArticlePage = `${server}/api/article-page?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(ArticlePage, {
                    headers: {
                        Authorization: `Bearer fb7c31a357909346e11a059b41875d56ff2e06aa0ce4103236269fa19590c0d1a6876554250315f0dcaa39a84eb1f47461604a2ad9d37e190465b3cc44ceba8340685182f7c477059f24339e97ed4a689984e5bd7480739e65e6ffa69cd15d1fdc2dbbb770ddb60087e7799f7675b4e129c9b31e51869b5ef10162d5feeab92c`
                    }
                });
                const data = await response.json();
                // mainScreen
                setMainScreen(data.data.attributes.mainScreen);
                setMainScreenTitle(data.data.attributes.mainScreen.title);
                setMainScreenImage(data.data.attributes.mainScreen.background.data.attributes);
                {
                    data.data.attributes.mainScreen.decoration.data !== null ?
                        setMainScreenDecoration(data.data.attributes.mainScreen.decoration.data.attributes)
                        : setMainScreenDecoration(false)
                }
                // articles
                let articlesTitleArray = []
                let articlesParagraphArray = []
                let articlesParagraphIndentsArray = []
                let articlesParagraphTitleArray = []
                let articlesImageArray = []
                let articlesIdArray = []
                let articlesParagraphIdArray = []
                for (let i = 0; i < data.data.attributes.articles.data[0].attributes.block.length; i++) {
                    let articlesBlockTitle = []
                    let articlesBlockParagraph = []
                    let articlesBlockParagraphIndents = []
                    let articlesBlockId = []
                    let articlesBlockParagraphId = []
                    articlesTitleArray.push(data.data.attributes.articles.data[0].attributes.block[i].title)
                    articlesImageArray.push(data.data.attributes.articles.data[0].attributes.block[i].image.data.attributes.url)
                    for (let j = 0; j < data.data.attributes.articles.data[0].attributes.block[i].paragraph.length; j++) {
                        let paragraphArray = []
                        let paragraphIndentsArray = []
                        articlesBlockTitle.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].title)
                        articlesBlockId.splice(0, 1, data.data.attributes.articles.data[0].attributes.block[i].id)
                        articlesBlockParagraphId.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].id)
                        for (let g = 0; g < data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].paragraph.length; g++) {
                            paragraphArray.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].paragraph[g].paragraph)
                            paragraphIndentsArray.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].paragraph[g].removeIndentation)
                        }
                        articlesBlockParagraph.push(paragraphArray)
                        articlesBlockParagraphIndents.push(paragraphIndentsArray)
                    }
                    articlesParagraphTitleArray.push(articlesBlockTitle)
                    articlesParagraphArray.push(articlesBlockParagraph)
                    articlesParagraphIndentsArray.push(articlesBlockParagraphIndents)
                    articlesIdArray.push(articlesBlockId)
                    articlesParagraphIdArray.push(articlesBlockParagraphId)
                }
                setArticlesTitle(articlesTitleArray)
                setArticlesParagraph(articlesParagraphArray)
                setArticlesParagraphIndents(articlesParagraphIndentsArray)
                setArticlesParagraphTitle(articlesParagraphTitleArray)
                setArticlesImage(articlesImageArray)
                setArticlesId(articlesIdArray)
                setArticlesParagraphId(articlesParagraphIdArray)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // mainScreen
    const [mainScreen, setMainScreen] = useState({});
    const [mainScreenTitle, setMainScreenTitle] = useState({});
    const [mainScreenImage, setMainScreenImage] = useState({});
    const [mainScreenDecoration, setMainScreenDecoration] = useState({});
    // article
    const [articlesId, setArticlesId] = useState([]);
    const [articlesParagraphId, setArticlesParagraphId] = useState([]);
    const [articlesTitle, setArticlesTitle] = useState([]);
    const [articlesParagraphTitle, setArticlesParagraphTitle] = useState([]);
    const [articlesParagraph, setArticlesParagraph] = useState([]);
    const [articlesParagraphIndents, setArticlesParagraphIndents] = useState([]);
    const [articlesImage, setArticlesImage] = useState([]);

    return (
        <>
            <Header />
            <main className={styles.wrapper}>
                <FirstScreen
                    name={mainScreen.name}
                    titleStart={mainScreenTitle.titleStart}
                    titleColored={mainScreenTitle.titleColored}
                    titleEnd={mainScreenTitle.titleEnd}
                    description={mainScreen.description}
                    imageUrl={mainScreenImage.url}
                    imageAlt={mainScreenImage.alternativeText}
                    decoration={mainScreenDecoration.url}
                />
                <section className={styles.articles}>
                    {articlesId.map((blockId, index) => (
                        <div key={index} className={styles.block}>
                            <div className="container">
                                <div className={styles.blockWrap}>
                                    <div className={styles.info}>
                                        <div className={styles.infoWrap}>
                                            <h2>
                                                {articlesTitle[index]}
                                            </h2>
                                            {articlesParagraphId[index].map((paragraphId, paragraphIndex) => (
                                                <div key={paragraphIndex} className={styles.paragraph}>
                                                    <h3>
                                                        {articlesParagraphTitle[index][paragraphIndex]}
                                                    </h3>
                                                    <div className={styles.text}>
                                                        {articlesParagraph[index][paragraphIndex].map((textId, textIndex) => (
                                                            <p key={textIndex} className={articlesParagraphIndents[index][paragraphIndex][textIndex] === true ? '' : 'indent'}>
                                                                {articlesParagraph[index][paragraphIndex][textIndex]}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {lang === 'ru' ?
                                            <a href={`/item#${blockId}`}>Читать полностью</a>
                                            :
                                            <a href={`/item#${blockId}`}>read in full</a>
                                        }
                                    </div>
                                    <div className={styles.image}>
                                        <img src={`${articlesImage[index]}`} alt="image article" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Article;