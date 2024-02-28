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
import sprite from './../../images/icons/sprite.svg';

const Gallery = ({onLoading}) => {
    let server = 'http://185.251.88.31:1337'

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
                let galleryTitleArray = []
                let gallerySubTitleArray = []
                let galleryDescriptionArray = []
                let galleryDescriptionIndentArray = []
                for (let i = 0; i < data.data.attributes.gallery.length; i++) {
                    galleryId.push(data.data.attributes.gallery[i].id)
                    galleryTitleArray.push(data.data.attributes.gallery[i].title)
                    gallerySubTitleArray.push(data.data.attributes.gallery[i].subTitle)
                    let descriptionArray = []
                    let descriptionIndentArray = []
                    let imageArray = []
                    for (let g = 0; g < data.data.attributes.gallery[i].gallery.data.attributes.Image.length; g++) {
                        let galleryArray = []
                        galleryArray.push(data.data.attributes.gallery[i].gallery.data.attributes.Image[g].image.data.attributes.url)
                        galleryArray.push(data.data.attributes.gallery[i].gallery.data.attributes.Image[g].signature)
                        imageArray.push(galleryArray)
                    }
                    for (let j = 0; j < data.data.attributes.gallery[i].description.length; j++) {
                        descriptionArray.push(data.data.attributes.gallery[i].description[j].paragraph)
                        descriptionIndentArray.push(data.data.attributes.gallery[i].description[j].removeIndentation)
                    }
                    galleryDescriptionArray.push(descriptionArray)
                    galleryDescriptionIndentArray.push(descriptionIndentArray)
                    galleryImageArray.push(imageArray)
                }
                setGalleryId(galleryId)
                setGalleryTitle(galleryTitleArray)
                setGallerySubTitle(gallerySubTitleArray)
                setGalleryDescription(galleryDescriptionArray)
                setGalleryDescriptionIndent(galleryDescriptionIndentArray)
                setGalleryImage(galleryImageArray)
                onLoading()
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

    const PageSize = 12;
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
    function isVideo(url) {
        let videoType = ['.mp4', '.mov', '.wmv', '.avi', '.avchd', '.flv', '.f4v', '.swf', '.mkv', '.webm', '.html5']
        const lowercasedUrl = url.toLowerCase();
        return videoType.some(ext => lowercasedUrl.endsWith(ext));
    }
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
                    ) :
                        <>
                            <Header />
                            <main className={styles.wrapper}>
                                <button type='button' onClick={() => switchedPages(switched)} title={lang === 'ru' ? 'переключить галерею' : 'switch gallery'} className={styles.reverse}>
                                    <svg className='icon'>
                                        <use xlinkHref={`${sprite}#icon-reverse`}></use>
                                    </svg>
                                </button>
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
                                                                <div key={imageIndex} className={styles.imageTop}>
                                                                    <div className={styles.image}>
                                                                        {isVideo(image[0]) ?
                                                                            <video src={image[0]} controls loading='lazy'></video>
                                                                            :
                                                                            <Image src={image[0]} alt="Картинка" />
                                                                        }
                                                                    </div>
                                                                    <h3>{image[1]}</h3>
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
                            </main>
                            <Footer />
                        </>
                    }
                </>
            }
        </>
    );
};

export default Gallery;