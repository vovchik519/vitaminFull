import React, { useState, useEffect, useMemo } from 'react';
import { ImageGroup, Image } from 'react-fullscreen-image'

import styles from './Pantry.module.scss';
import FirstScreen from './../../components/FirstScreen/FirstScreen';
import Masonry from 'react-masonry-css';
import Poem from './../../components/Poem/Poem';
import PoemSection from '../../components/PoemSection/PoemSection';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const Pantry = () => {
    let server = 'http://185.251.88.31:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let PantryPage = `${server}/api/pantry?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(PantryPage, {
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
                // gallery
                let galleryId = []
                let galleryImageArray = []
                let galleryMimeArray = []
                let galleryTitleArray = []
                let gallerySubTitleArray = []
                let galleryDescriptionArray = []
                let galleryDescriptionIndentArray = []
                let gallerySignatureArray = []
                for (let i = 0; i < data.data.attributes.gallery.length; i++) {
                    galleryId.push(data.data.attributes.gallery[i].id)
                    galleryTitleArray.push(data.data.attributes.gallery[i].title)
                    gallerySubTitleArray.push(data.data.attributes.gallery[i].subTitle)
                    let descriptionArray = []
                    let descriptionIndentArray = []
                    let imageArray = []
                    let mimeArray = []
                    let signatureArray = []
                    for (let g = 0; g < data.data.attributes.gallery[i].gallery.data.attributes.Image.length; g++) {
                        mimeArray.push(data.data.attributes.gallery[i].gallery.data.attributes.Image[g].image.data.attributes.mime)
                        imageArray.push(data.data.attributes.gallery[i].gallery.data.attributes.Image[g].image.data.attributes.url)
                        signatureArray.push(data.data.attributes.gallery[i].gallery.data.attributes.Image[g].signature)
                    }
                    for (let j = 0; j < data.data.attributes.gallery[i].description.length; j++) {
                        descriptionArray.push(data.data.attributes.gallery[i].description[j].paragraph)
                        descriptionIndentArray.push(data.data.attributes.gallery[i].description[j].removeIndentation)
                    }
                    galleryDescriptionArray.push(descriptionArray)
                    galleryDescriptionIndentArray.push(descriptionIndentArray)
                    galleryImageArray.push(imageArray)
                    galleryMimeArray.push(mimeArray)
                    gallerySignatureArray.push(signatureArray)
                }
                setImagePagination(galleryImageArray)
                setGalleryId(galleryId)
                setGalleryTitle(galleryTitleArray)
                setGallerySubTitle(gallerySubTitleArray)
                setGalleryDescription(galleryDescriptionArray)
                setGalleryDescriptionIndent(galleryDescriptionIndentArray)
                setGalleryImage(galleryImageArray)
                setGalleryMime(galleryMimeArray)
                setGallerySignature(gallerySignatureArray)
                // galleryFriends
                let galleryFriendsId = []
                let galleryFriendsImageArray = []
                let galleryFriendsMimeArray = []
                let galleryFriendsTitleArray = []
                let galleryFriendsSubTitleArray = []
                let galleryFriendsDescriptionArray = []
                let galleryFriendsDescriptionIndentArray = []
                let galleryFriendsSignatureArray = []
                for (let i = 0; i < data.data.attributes.galleryFriends.length; i++) {
                    galleryFriendsId.push(data.data.attributes.galleryFriends[i].id)
                    galleryFriendsTitleArray.push(data.data.attributes.galleryFriends[i].title)
                    galleryFriendsSubTitleArray.push(data.data.attributes.galleryFriends[i].subTitle)
                    let descriptionFriendsArray = []
                    let descriptionIndentFriendsArray = []
                    let imageFriendsArray = []
                    let mimeFriendsArray = []
                    let signatureFriendsArray = []
                    for (let g = 0; g < data.data.attributes.galleryFriends[i].gallery.data.attributes.Image.length; g++) {
                        mimeFriendsArray.push(data.data.attributes.galleryFriends[i].gallery.data.attributes.Image[g].image.data.attributes.mime)
                        imageFriendsArray.push(data.data.attributes.galleryFriends[i].gallery.data.attributes.Image[g].image.data.attributes.url)
                        signatureFriendsArray.push(data.data.attributes.galleryFriends[i].gallery.data.attributes.Image[g].signature)
                    }
                    for (let j = 0; j < data.data.attributes.galleryFriends[i].description.length; j++) {
                        descriptionFriendsArray.push(data.data.attributes.galleryFriends[i].description[j].paragraph)
                        descriptionIndentFriendsArray.push(data.data.attributes.galleryFriends[i].description[j].removeIndentation)
                    }
                    galleryFriendsDescriptionArray.push(descriptionFriendsArray)
                    galleryFriendsDescriptionIndentArray.push(descriptionIndentFriendsArray)
                    galleryFriendsImageArray.push(imageFriendsArray)
                    galleryFriendsMimeArray.push(mimeFriendsArray)
                    galleryFriendsSignatureArray.push(signatureFriendsArray)
                }
                setImageFriendsPagination(galleryFriendsImageArray)
                setGalleryFriendsId(galleryFriendsId)
                setGalleryFriendsTitle(galleryFriendsTitleArray)
                setGalleryFriendsSubTitle(galleryFriendsSubTitleArray)
                setGalleryFriendsDescription(galleryFriendsDescriptionArray)
                setGalleryFriendsDescriptionIndent(galleryFriendsDescriptionIndentArray)
                setGalleryFriendsImage(galleryFriendsImageArray)
                setGalleryFriendsMime(galleryFriendsMimeArray)
                setGalleryFriendsSignature(galleryFriendsSignatureArray)
                // poem
                setPoems(data.data.attributes.poem);
                setPoemItem(data.data.attributes.poem.poemItem);
                setPoemBlock(data.data.attributes);
                setPoemBlockImage(data.data.attributes.PoemBlock.image.data.attributes);
                setPoemBlockButton(data.data.attributes.PoemBlock.button)
                setPoemBlockLine(data.data.attributes.PoemBlock.poemLine)
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
    // poem
    const [poems, setPoems] = useState({});
    const [poemItem, setPoemItem] = useState({});
    let poemParagraphArray = []
    let poemIndentsArray = []
    multiData(poemParagraphArray, poemItem, 'paragraph')
    multiData(poemIndentsArray, poemItem, 'removeIndentation')
    // galery
    const [galleryId, setGalleryId] = useState([]);
    const [galleryTitle, setGalleryTitle] = useState([]);
    const [gallerySubTitle, setGallerySubTitle] = useState([]);
    const [galleryDescription, setGalleryDescription] = useState([]);
    const [galleryDescriptionIndent, setGalleryDescriptionIndent] = useState([]);
    const [galleryImage, setGalleryImage] = useState([]);
    const [galleryMime, setGalleryMime] = useState([]);
    const [gallerySignature, setGallerySignature] = useState([]);
    // galeryFriends
    const [galleryFriendsId, setGalleryFriendsId] = useState([]);
    const [galleryFriendsTitle, setGalleryFriendsTitle] = useState([]);
    const [galleryFriendsSubTitle, setGalleryFriendsSubTitle] = useState([]);
    const [galleryFriendsDescription, setGalleryFriendsDescription] = useState([]);
    const [galleryFriendsDescriptionIndent, setGalleryFriendsDescriptionIndent] = useState([]);
    const [galleryFriendsImage, setGalleryFriendsImage] = useState([]);
    const [galleryFriendsMime, setGalleryFriendsMime] = useState([]);
    const [galleryFriendsSignature, setGalleryFriendsSignature] = useState([]);
    // poem
    const [poemBlockImage, setPoemBlockImage] = useState('');
    const [poemBlockButton, setPoemBlockButton] = useState({});
    const [poemBlockLine, setPoemBlockLine] = useState({});
    const [poemBlock, setPoemBlock] = useState({});
    let poemBlockArray = []
    let poemBlockIndents = []
    multiData(poemBlockArray, poemBlockLine, 'paragraph')
    multiData(poemBlockIndents, poemBlockLine, 'removeIndentation')
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        520: 1,
    };

    function multiData(array, data, key) {
        for (let i = 0; i < data.length; i++) {
            array.push(data[i][key])
        }
    }
    const PageSize = 7;
    const [imageFriendsPagination, setImageFriendsPagination] = useState([]);
    const [imagePagination, setImagePagination] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [currentFriendsPage, setCurrentFriendsPage] = useState();
    useEffect(() => {
        const initialCurrentPage = Object.fromEntries(imagePagination.map((_, index) => [index, 1]));
        const initialFriendsCurrentPage = Object.fromEntries(imageFriendsPagination.map((_, index) => [index, 1]));
        setCurrentPage(initialCurrentPage)
        setCurrentFriendsPage(initialFriendsCurrentPage)
    }, [imagePagination, imageFriendsPagination])

    const handlePageChange = (page, index) => {
        setCurrentPage((prevPages) => ({
            ...prevPages,
            [index]: page,
        }));
    };
    const handleFriendsPageChange = (page, index) => {
        setCurrentFriendsPage((prevPages) => ({
            ...prevPages,
            [index]: page,
        }));
    };
    function isVideo(url) {
        let videoType = ['.mp4', '.mov', '.wmv', '.avi', '.avchd', '.flv', '.f4v', '.swf', '.mkv', '.webm', '.html5']
        const lowercasedUrl = url.toLowerCase();
        return videoType.some(ext => lowercasedUrl.endsWith(ext));
    }
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
                <div>
                    {imagePagination.map((blockId, index) => {
                        const currentTableData = () => {
                            const firstPageIndex = (currentPage[index] - 1) * PageSize;
                            const lastPageIndex = firstPageIndex + PageSize;
                            return blockId.slice(firstPageIndex, lastPageIndex);
                        };
                        return <div key={index} className={styles.gallery}>
                            <div className="container">
                                <div className={styles.titleWrap}>
                                    <div className={styles.titleTop}>
                                        <h2>{galleryTitle[index]}</h2>
                                        <div>
                                            {galleryDescription[index].map((paragraph, descriptionIndex) => (
                                                <p className={galleryDescriptionIndent[index][descriptionIndex] === true ? '' : 'indent'} key={descriptionIndex}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <h3>{gallerySubTitle[index]}</h3>
                                </div>
                                <div className={styles.images}>
                                    <ImageGroup>
                                        <Masonry
                                            breakpointCols={breakpointColumnsObj}
                                            className="images-wrap"
                                            columnClassName="images-column">
                                            {currentTableData().map((image, imageIndex) => (
                                                <div key={imageIndex} className={styles.imageTop}>
                                                    <div className={styles.image}>
                                                        {
                                                            isVideo(image) ?
                                                                <video src={image} controls></video>
                                                                :
                                                                <Image src={image} alt="Картинка" />
                                                        }
                                                    </div>
                                                    <h3>{gallerySignature[index][imageIndex]}</h3>
                                                </div>
                                            ))}
                                        </Masonry>
                                    </ImageGroup>
                                    <div className='pagination-main'>
                                        <Pagination
                                            className="pagination-bar"
                                            currentPage={currentPage[index]}
                                            totalCount={blockId.length}
                                            pageSize={PageSize}
                                            onPageChange={(page) => handlePageChange(page, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                {poemParagraphArray.length !== 0 ?
                    <Poem
                        title={poems.description}
                        description={poems.title}
                        titleTwo={poems.titleTwo}
                        content={poemParagraphArray}
                        indents={poemIndentsArray}
                    /> : null
                }
                {poemBlockArray.length !== 0 ?
                    <div className="container">
                        <div className={styles.poemBlock}>
                            <div className={styles.poemBlockImage}>
                                <img src={poemBlockImage.url} alt={poemBlockImage.alternativeText} />
                            </div>
                            <div className={styles.poemBlockInfo}>
                                <div className={styles.poemBlockInfoWrap}>
                                    <div className={styles.poemBlockParagraph}>
                                        {poemBlockArray.map((paragraph, index) => (
                                            <p className={poemBlockIndents[index] === true ? '' : 'indent'} key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                                <Link to={poemBlockButton.link}>{poemBlockButton.name}</Link>
                            </div>
                        </div>
                    </div> : null
                }
                <PoemSection page='pantry' />
                <div>
                    {imageFriendsPagination.map((blockId, index) => {
                        const currentTableDataFriends = () => {
                            const firstPageIndex = (currentFriendsPage[index] - 1) * PageSize;
                            const lastPageIndex = firstPageIndex + PageSize;
                            return blockId.slice(firstPageIndex, lastPageIndex);
                        };
                        return <div key={index} className={styles.gallery}>
                            <div className="container">
                                <div className={styles.titleWrap}>
                                    <div className={styles.titleTop}>
                                        <h2>{galleryFriendsTitle[index]}</h2>
                                        <div>
                                            {galleryFriendsDescription[index].map((paragraph, descriptionIndex) => (
                                                <p className={galleryFriendsDescriptionIndent[index][descriptionIndex] === true ? '' : 'indent'} key={descriptionIndex}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <h3>{galleryFriendsSubTitle[index]}</h3>
                                </div>
                                <div className={styles.images}>
                                    <ImageGroup>
                                        <Masonry
                                            breakpointCols={breakpointColumnsObj}
                                            className="images-wrap"
                                            columnClassName="images-column">
                                            {currentTableDataFriends().map((image, imageIndex) => (
                                                <div key={imageIndex} className={styles.imageTop}>
                                                    <div className={styles.image}>
                                                        {isVideo(image) ?
                                                            <video src={image} controls></video>
                                                            :
                                                            <Image src={image} alt="Картинка" />
                                                        }
                                                    </div>
                                                    <h3>{galleryFriendsSignature[index][imageIndex]}</h3>
                                                </div>
                                            ))}
                                        </Masonry>
                                    </ImageGroup>
                                    <div className='pagination-main'>
                                        <Pagination
                                            className="pagination-bar"
                                            currentPage={currentFriendsPage[index]}
                                            totalCount={blockId.length}
                                            pageSize={PageSize}
                                            onPageChange={(page) => handleFriendsPageChange(page, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Pantry;