import React, { useRef, useState, useEffect, useMemo } from 'react';

import styles from './PoemItem.module.scss';

import 'swiper/css';
import 'swiper/css/autoplay';

import PoemSection from '../../components/PoemSection/PoemSection';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import Error from '../../components/Error/Error';
import Pagination from './../../components/Pagination/Pagination';

const PoemItem = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let PoemData = `${server}/api/pantry?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(PoemData, {
                    headers: {
                        Authorization: `Bearer fb7c31a357909346e11a059b41875d56ff2e06aa0ce4103236269fa19590c0d1a6876554250315f0dcaa39a84eb1f47461604a2ad9d37e190465b3cc44ceba8340685182f7c477059f24339e97ed4a689984e5bd7480739e65e6ffa69cd15d1fdc2dbbb770ddb60087e7799f7675b4e129c9b31e51869b5ef10162d5feeab92c`
                    }
                });
                const data = await response.json();
                // articles
                let articlesTitleArray = []
                let articlesTypeArray = []
                let articlesParagraphArray = []
                let articlesParagraphIndentsArray = []
                let articlesIdArray = []
                for (let i = 0; i < data.data.attributes.poemsList.poems.data[0].attributes.item.length; i++) {
                    let articlesBlockParagraph = []
                    let articlesBlockParagraphIndents = []
                    let articlesBlockId = []
                    articlesTitleArray.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].title)
                    articlesTypeArray.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].storiesStyle)
                    for (let j = 0; j < data.data.attributes.poemsList.poems.data[0].attributes.item[i].paragraph.length; j++) {
                        articlesBlockId.splice(0, 1, data.data.attributes.poemsList.poems.data[0].attributes.item[i].id)
                        articlesBlockParagraph.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].paragraph[j].paragraph)
                        articlesBlockParagraphIndents.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].paragraph[j].removeIndentation)
                    }
                    articlesParagraphArray.push(articlesBlockParagraph)
                    articlesParagraphIndentsArray.push(articlesBlockParagraphIndents)
                    articlesIdArray.push(articlesBlockId)
                }
                setArticlesTitle(articlesTitleArray)
                setArticlesParagraph(articlesParagraphArray)
                setArticlesParagraphIndents(articlesParagraphIndentsArray)
                setArticlesId(articlesIdArray)
                setArticlesType(articlesTypeArray)
                for (let i = 0; i < 99; i++) {
                    if (articlesIdArray[i] == window.location.hash.substring(1)) {
                        setArticlesPagination(articlesParagraphArray[i])
                        setArticlesTypePagination(articlesTypeArray[i])
                    }
                }
                console.log(articlesParagraphArray)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);
    // articlesType[index] === true ? setPageSize(2) : setPageSize(25)
    // article
    const [articlesId, setArticlesId] = useState([]);
    const [articlesType, setArticlesType] = useState([]);
    const [articlesTitle, setArticlesTitle] = useState([]);
    const [articlesParagraph, setArticlesParagraph] = useState([]);
    const [articlesParagraphIndents, setArticlesParagraphIndents] = useState([]);
    function handleReloadClick() {
        setTimeout(() => {
            window.location.reload();
        }, 0)
    };
    const [PageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPagination, setArticlesPagination] = useState([]);
    const [articlesTypePagination, setArticlesTypePagination] = useState(false);
    useEffect(() => {
        if (articlesTypePagination === true) {
            if (window.innerWidth >= 580) {
                setPageSize(8)
            } else {
                setPageSize(5)
            }
        } else {
            setPageSize(25)
        }
    }, [articlesTypePagination])
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return articlesPagination.slice(firstPageIndex, lastPageIndex);
    }, [PageSize, currentPage, articlesPagination]);
    return (
        <>
            <Header />
            <main>
                {articlesId.map((blockId, index) => (
                    blockId == window.location.hash.substring(1) ? (
                        <div key={index}>
                            <section className={articlesType[index] === true ? styles.wrapperTwo : styles.wrapper}>
                                <div className="container">
                                    <div className={articlesType[index] === true ? styles.blockTwo : styles.block}>
                                        <h2>
                                            {articlesTitle[index]}
                                        </h2>
                                        <div className={styles.text}>
                                            {currentTableData.map((textId, textIndex) => {
                                                return (
                                                    <p key={textIndex} className={articlesParagraphIndents[index][textIndex] === true ? '' : 'indent'}>
                                                        {textId}</p>
                                                );
                                            })}
                                            <div className={styles.paginationWrapper}>
                                            <Pagination
                                                className="pagination-bar"
                                                currentPage={currentPage}
                                                totalCount={articlesPagination.length}
                                                pageSize={PageSize}
                                                onPageChange={page => setCurrentPage(page)}
                                                />
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ) : null
                ))}
                {!articlesId.some(blockId => blockId == window.location.hash.substring(1)) && <Error />}
                <PoemSection
                    event={handleReloadClick}
                    page='poem-page'
                />
            </main>
            <Footer />
        </>
    );
};

export default PoemItem;