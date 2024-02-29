import React, { useRef, useState, useEffect, useMemo } from 'react';

import styles from './PoemItem.module.scss';

import 'swiper/css';
import 'swiper/css/autoplay';

import PoemSection from '../../components/PoemSection/PoemSection';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import Error from '../../components/Error/Error';
import Pagination from './../../components/Pagination/Pagination';

const PoemItem = ({ onLoading }) => {
    let server = 'http://185.251.88.31:1337'

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
                        Authorization: `Bearer f66dbcdd40ea112c1922a33c00ef12399433cecaf44cc622f7ecb965b7462b1930e0bec5bb93f45ba485ada66eab5aaa548c1703eacf201a2a0bea3996cb0e746c94e9e316c737b4080eb53344edc4fe8d8bee794530d46926fdc72b75cb73a0cca89551386776de20138eea544f5458b22044468172b1a40f1a65a645e24998`
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
                onLoading()
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
                                                let textIdArray = textId.split('\n')
                                                return (
                                                    <div key={textIndex}>
                                                        {textId.indexOf('\n') !== -1?
                                                            <>
                                                                {textIdArray.map((arrayItem, arrayIndex) => (
                                                                    <p key={arrayIndex} style={{
                                                                        height: '1.3em'
                                                                    }}>
                                                                        {arrayItem}
                                                                    </p>
                                                                ))}
                                                            </>
                                                            :
                                                            <p key={textIndex} className={articlesParagraphIndents[index][textIndex] === true ? '' : 'indent'}>
                                                                {textId}</p>
                                                        }
                                                    </div>
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