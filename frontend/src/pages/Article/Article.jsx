import React, { useState, useEffect } from 'react';

import styles from './Article.module.scss';

import FirstScreen from './../../components/FirstScreen/FirstScreen';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';

const Article = ({ onLoading }) => {
    let server = 'https://vitamin-art.ru:4444'

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
                        Authorization: `Bearer f66dbcdd40ea112c1922a33c00ef12399433cecaf44cc622f7ecb965b7462b1930e0bec5bb93f45ba485ada66eab5aaa548c1703eacf201a2a0bea3996cb0e746c94e9e316c737b4080eb53344edc4fe8d8bee794530d46926fdc72b75cb73a0cca89551386776de20138eea544f5458b22044468172b1a40f1a65a645e24998`
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
                let articlesParagraphTitleArray = []
                let articlesImageArray = []
                let articlesIdArray = []
                let articlesParagraphIdArray = []
                for (let i = 0; i < data.data.attributes.articles.data[0].attributes.block.length; i++) {
                    let articlesBlockTitle = []
                    let articlesBlockParagraph = []
                    let articlesBlockId = []
                    let articlesBlockParagraphId = []
                    articlesTitleArray.push(data.data.attributes.articles.data[0].attributes.block[i].title)
                    articlesImageArray.push(data.data.attributes.articles.data[0].attributes.block[i].image.data.attributes.url)
                    for (let j = 0; j < data.data.attributes.articles.data[0].attributes.block[i].paragraph.length; j++) {
                        articlesBlockTitle.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].title)
                        articlesBlockId.splice(0, 1, data.data.attributes.articles.data[0].attributes.block[i].id)
                        articlesBlockParagraphId.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].id)
                        articlesBlockParagraph.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].paragraph)
                    }
                    articlesParagraphTitleArray.push(articlesBlockTitle)
                    articlesParagraphArray.push(articlesBlockParagraph)
                    articlesIdArray.push(articlesBlockId)
                    articlesParagraphIdArray.push(articlesBlockParagraphId)
                }
                setArticlesTitle(articlesTitleArray)
                setArticlesParagraph(articlesParagraphArray)
                setArticlesParagraphTitle(articlesParagraphTitleArray)
                setArticlesImage(articlesImageArray)
                setArticlesId(articlesIdArray)
                setArticlesParagraphId(articlesParagraphIdArray)
                onLoading()
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
    // const [articlesParagraphIndents, setArticlesParagraphIndents] = useState([]);
    const [articlesImage, setArticlesImage] = useState([]);

    console.log(articlesParagraph)
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
                                                        {/* {articlesParagraph[index][paragraphIndex].map((textId, textIndex) => {
                                                            let textIdArray = textId.split('\n')
                                                            return (
                                                                <div key={textIndex}>
                                                                    {textId.indexOf('\n') !== -1 ?
                                                                        <>
                                                                            {textIdArray.map((arrayItem, arrayIndex) => (
                                                                                <p key={arrayIndex} style={{
                                                                                    minHeight: '1.3em'
                                                                                }}>
                                                                                    {arrayItem}
                                                                                </p>
                                                                            ))}
                                                                        </>
                                                                        :
                                                                        <p key={textIndex} className={articlesParagraphIndents[index][paragraphIndex][textIndex] === true ? '' : 'indent'}>
                                                                            {articlesParagraph[index][paragraphIndex][textIndex]}
                                                                        </p>
                                                                    }
                                                                </div>
                                                            )
                                                        })} */}
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