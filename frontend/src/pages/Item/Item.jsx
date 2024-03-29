import React, { useRef, useState, useEffect } from 'react';

import styles from './Item.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import sprite from './../../images/icons/sprite.svg';
import Name from './../../ui/Name/Name';
import LinkDark from '../../ui/LinkDark/LinkDark';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import Error from '../../components/Error/Error';

const Item = ({ onLoading }) => {
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

                // articles
                let articlesTitleArray = []
                let articlesParagraphArray = []
                let articlesParagraphTitleArray = []
                let articlesImageArray = []
                let articlesIdArray = []
                let articlesParagraphIdArray = []
                let articlesDataImages = []
                for (let i = 0; i < data.data.attributes.articles.data[0].attributes.block.length; i++) {
                    let articlesBlockTitle = []
                    let articlesBlockParagraph = []
                    let articlesBlockId = []
                    let articlesBlockParagraphId = []
                    let articlesParagraphImages = []
                    articlesTitleArray.push(data.data.attributes.articles.data[0].attributes.block[i].title)
                    articlesImageArray.push(data.data.attributes.articles.data[0].attributes.block[i].image.data.attributes.url)
                    for (let j = 0; j < data.data.attributes.articles.data[0].attributes.block[i].paragraph.length; j++) {
                        let articlesBlockIdImages = []
                        articlesBlockTitle.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].title)
                        articlesBlockId.splice(0, 1, data.data.attributes.articles.data[0].attributes.block[i].id)
                        articlesBlockParagraphId.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].id)
                        articlesBlockParagraph.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].paragraph)
                        if (data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].images.data !== null) {
                            for (let o = 0; o < data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].images.data.length; o++) {
                                articlesBlockIdImages.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].images.data[o].attributes.url)
                            }
                        }
                        articlesParagraphImages.push(articlesBlockIdImages)
                    }
                    articlesDataImages.push(articlesParagraphImages)
                    articlesParagraphTitleArray.push(articlesBlockTitle)
                    articlesParagraphArray.push(articlesBlockParagraph)
                    articlesIdArray.push(articlesBlockId)
                    articlesParagraphIdArray.push(articlesBlockParagraphId)
                }
                setArticlesParagraphImage(articlesDataImages)
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

    // article
    const [articlesId, setArticlesId] = useState([]);
    const [articlesParagraphId, setArticlesParagraphId] = useState([]);
    const [articlesTitle, setArticlesTitle] = useState([]);
    const [articlesParagraphTitle, setArticlesParagraphTitle] = useState([]);
    const [articlesParagraph, setArticlesParagraph] = useState([]);
    const [articlesImage, setArticlesImage] = useState([]);
    const [articlesParagraphImage, setArticlesParagraphImage] = useState([]);
    function handleReloadClick() {
        setTimeout(() => {
            window.location.reload();
        }, 0)
    };
    
    const swiperRef = useRef();
    return (
        <>
            <Header />
            <main>
                <section className={styles.article}>
                    {articlesId.map((blockId, index) => (
                        blockId == window.location.hash.substring(1) ? (
                            <div key={index} className={styles.block}>
                                <div className="container">
                                    <div className={styles.blockWrap}>
                                        <div className={styles.info}>
                                            <h2>
                                                {articlesTitle[index]}
                                            </h2>
                                            {articlesParagraph[index].map((paragraph, paragraphIndex) => {
                                                let textIdArray = paragraph.split('\n')
                                                return <div key={paragraphIndex} className={styles.paragraph}>
                                                    {articlesParagraphTitle[index][paragraphIndex] && <h3>
                                                        {articlesParagraphTitle[index][paragraphIndex]}
                                                    </h3>}
                                                    <div className={styles.text}>
                                                        {textIdArray.map((textId, textIndex) => {
                                                            return (
                                                                <p key={textIndex} style={{ minHeight: '1.3em' }}>{textId}</p>
                                                            )
                                                        })}
                                                        {articlesParagraphImage[index][paragraphIndex].map((image, imageIndex) => (
                                                            <img src={image} alt="image" key={imageIndex} />
                                                        ))}
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}
                    {!articlesId.some(blockId => blockId == window.location.hash.substring(1)) && <Error />}
                </section>
                <section className={styles.otherArticles}>
                    <div className="container">
                        <div className={styles.otherArticlesWrap}>
                            <div className={styles.otherArticlesTitle}>
                                {lang === 'ru' ?
                                    <Name name="Ещё рассказы" />
                                    :
                                    <Name name="More stories" />
                                }
                            </div>
                            <Swiper
                                modules={[Autoplay, Pagination, Navigation]}
                                spaceBetween={20}
                                slidesPerView='1'
                                breakpoints={{
                                    480: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                }}
                                onBeforeInit={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    el: '.otherArticlePagination',
                                    clickable: true,
                                    renderBullet: function (index, className) {
                                        return '<button class="' + className + '">' + (index + 1) + '</button>';
                                    },
                                }}
                                className={styles.slider}
                            >
                                {articlesId.map((blockId, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={styles.otherArticlesBlockWrap}>
                                            <h2>
                                                {articlesTitle[index]}
                                            </h2>
                                            <div className={styles.otherArticlesImage}>
                                                <img src={`${articlesImage[index]}`} alt="image article" />
                                            </div>
                                            <div onClick={handleReloadClick}>
                                                {lang === 'ru' ?
                                                    <LinkDark
                                                        link={`/item#${blockId}`}
                                                        name='Читать полностью'
                                                    /> :
                                                    <LinkDark
                                                        link={`/item#${blockId}`}
                                                        name='read'
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className='paginationWrapper'>
                                <button onClick={() => swiperRef.current?.slidePrev()} className='navigationPrev'>
                                    <svg className='icon'>
                                        <use xlinkHref={`${sprite}#icon-navigation-arrow`}></use>
                                    </svg>
                                </button>
                                <div className='pagination otherArticlePagination'></div>
                                <button onClick={() => swiperRef.current?.slideNext()} className='navigationNext'>
                                    <svg className='icon'>
                                        <use xlinkHref={`${sprite}#icon-navigation-arrow`}></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section >
            </main>
            <Footer />
        </>
    );
};

export default Item;