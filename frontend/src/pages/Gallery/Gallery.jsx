import React, { useState, useEffect } from 'react';
import { ImageGroup, Image } from 'react-fullscreen-image'

import styles from './Gallery.module.scss';
import FirstScreen from './../../components/FirstScreen/FirstScreen';
import Masonry from 'react-masonry-css';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import ButtonDark from '../../ui/ButtonDark/ButtonDark';
import Preloader from './../../components/Preloader/Preloader';
import Pagination from '../../components/Pagination/Pagination';

const Gallery = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage');
    const [switched, setSwitched] = useState('');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let galleryPage = `${server}/api/${switched === true ? 'friends-' : ''}gallery-page?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(galleryPage, {
                    headers: {
                        Authorization: `Bearer 58303d79acc986f444df5932f716217edce1c5edfe351b102c6798fa35321513a948f9e0893441006de97f9bee7e431df11705646be6ab8e3421c8a821313abae71eb8d2561561a2bb07eafcf38a43cced71675eb73e65a61ba3c1554719d231ae2bc7f0132064db98e11c19f0bafa3c6f5fe261269c8459b07f0c07b8d20172`
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
                let galleryTitleArray = []
                let galleryMimeArray = []
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
                    let mimeArray = []
                    let imageArray = []
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
                setGalleryId(galleryId)
                setGalleryTitle(galleryTitleArray)
                setGallerySubTitle(gallerySubTitleArray)
                setGalleryDescription(galleryDescriptionArray)
                setGalleryDescriptionIndent(galleryDescriptionIndentArray)
                setGalleryImage(galleryImageArray)
                setGalleryMime(galleryMimeArray)
                setGallerySignature(gallerySignatureArray)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [switched]);

    // mainScreen
    const [mainScreen, setMainScreen] = useState({});
    const [mainScreenTitle, setMainScreenTitle] = useState({});
    const [mainScreenImage, setMainScreenImage] = useState({});
    const [mainScreenDecoration, setMainScreenDecoration] = useState({});
    // gallery
    const [galleryId, setGalleryId] = useState([]);
    const [galleryTitle, setGalleryTitle] = useState([]);
    const [gallerySubTitle, setGallerySubTitle] = useState([]);
    const [galleryDescription, setGalleryDescription] = useState([]);
    const [galleryDescriptionIndent, setGalleryDescriptionIndent] = useState([]);
    const [galleryImage, setGalleryImage] = useState([]);
    const [galleryMime, setGalleryMime] = useState([]);
    const [gallerySignature, setGallerySignature] = useState([]);
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        520: 1,
    };

    const switchedPages = (e) => {
        if (e) {
            setSwitched(false)
        } else {
            setSwitched(true)
        }
    }
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 750)
    }, [switched])

    const PageSize = 7;
    const [currentPage, setCurrentPage] = useState();
    useEffect(() => {
        const initialCurrentPage = Object.fromEntries(galleryImage.map((_, index) => [index, 1]));
        setCurrentPage(initialCurrentPage)
    }, [galleryImage])

    const handlePageChange = (page, index) => {
        setCurrentPage((prevPages) => ({
            ...prevPages,
            [index]: page,
        }));
    };
    return (
        <>
            {switched === '' ?
                <div className={styles.container}>
                    <Header />
                    <div className={styles.switched}>
                        <div className="container">
                            <div className={styles.switchedWrap}>
                                <ButtonDark type='button' name={lang === 'ru' ? 'Галерея Деда Валерия' : "GRANDPA VALERII'S GALLERY"} click={() => switchedPages(true)} />
                                <ButtonDark type='button' name={lang === 'ru' ? 'Галерея друзей Деда Валерия' : "THE GALLERY OF GRANNDPA VALERII'S FRIENDS"} click={() => switchedPages(false)} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                :
                <>
                    {isLoading === true ? (
                        <Preloader />
                    ) : null}
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
                            {galleryImage.map((blockId, index) => {
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
                                                        image.includes('.mp4') ?
                                                            <div key={imageIndex} className={styles.imageTop}>
                                                                <div className={styles.image}>
                                                                    <video src={galleryImage[index][imageIndex]} controls></video>
                                                                </div>
                                                                <h3>{gallerySignature[index][imageIndex]}</h3>
                                                            </div>
                                                            :
                                                            <div key={imageIndex} className={styles.imageTop}>
                                                                <div className={styles.image}>
                                                                    <Image src={image} alt="Картинка" />
                                                                </div>
                                                                <h3>{gallerySignature[index][imageIndex]}</h3>
                                                            </div>
                                                    ))}
                                                </Masonry>
                                            </ImageGroup>
                                            <div className={styles.pagination}>
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
                    </main>
                    <Footer />
                </>
            }
        </>
    );
};

export default Gallery;