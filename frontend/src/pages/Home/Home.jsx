import React, { useState, useEffect } from 'react';

import styles from './Home.module.scss';
import FirstScreen from './../../components/FirstScreen/FirstScreen';
import BlockTextOne from './../../components/BlockTextOne/BlockTextOne';
import BlockTextTwo from './../../components/BlockTextTwo/BlockTextTwo';
import GalleryMain from './../../components/GalleryMain/GalleryMain';
import Feedback from './../../components/Feedback/Feedback';
import BannerOne from './../../components/BannerOne/BannerOne';
import BannerTwo from './../../components/BannerTwo/BannerTwo';
import Footer from './../../components/Footer/Footer';
import Header from './../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
import Name from '../../ui/Name/Name';
import { Link } from 'react-router-dom';

const Home = ({onLoading}) => {
    let server = 'http://185.251.88.31:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let homePage = `${server}/api/home-page?locale=${lang}&populate=deep,10`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(homePage, {
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
                // intro
                setIntro(data.data.attributes.intro);
                setIntroTitle(data.data.attributes.intro.title);
                setIntroImage(data.data.attributes.intro.image.data.attributes);
                setIntroDescription(data.data.attributes.intro.description);
                // about
                setAbout(data.data.attributes.about);
                setAboutImage(data.data.attributes.about.image.data.attributes);
                setAboutDescription(data.data.attributes.about.description);
                setAboutButton(data.data.attributes.about.button);
                // forKids
                setForKids(data.data.attributes.forKids);
                setForKidsTitle(data.data.attributes.forKids.title);
                setForKidsDescription(data.data.attributes.forKids.description);
                setForKidsButton(data.data.attributes.forKids.button);
                // gallery
                setGallery(data.data.attributes.gallery);
                setGalleryButton(data.data.attributes.gallery.button);
                let galleryImageArray = []
                let mimeArray = []
                for (let i = 0; i < data.data.attributes.gallery.gallery.data.attributes.Image.length; i++) {
                    mimeArray.push(data.data.attributes.gallery.gallery.data.attributes.Image[i].image.data.attributes.mime)
                    galleryImageArray.push(data.data.attributes.gallery.gallery.data.attributes.Image[i].image.data.attributes.url)
                }
                setGalleryImage(galleryImageArray)
                setGalleryMime(mimeArray)
                // feedback
                setFeedback(data.data.attributes.feedback);
                setFeedbackImage(data.data.attributes.feedback.image.data.attributes);
                // storeroom
                setStoreroom(data.data.attributes.storeroom);
                setStoreroomTitle(data.data.attributes.storeroom.title);
                setStoreroomDescription(data.data.attributes.storeroom.description);
                setStoreroomButton(data.data.attributes.storeroom.button);
                // productList
                const productArray = []
                const productArrayTwo = []
                const productArrayTitle = []
                setProductName(data.data.attributes.productList.name)
                for (let i = 0; i < data.data.attributes.productList.productItem.length; i++) {
                    productArrayTitle.push(data.data.attributes.productList.productItem[i].title)
                    const productArray1 = []
                    for (let g = 0; g < data.data.attributes.productList.productItem[i].catalogs.data.length; g++) {
                        const productArray2 = []
                        for (let j = 0; j < data.data.attributes.productList.productItem[i].catalogs.data[g].attributes.product.length; j++) {
                            productArray2.push(data.data.attributes.productList.productItem[i].catalogs.data[g].attributes.product[j])
                        }
                        productArray1.push(productArray2)
                    }
                    productArray.push(productArray1)
                }
                for (let i = 0; i < productArray.length; i++) {
                    productArrayTwo.push(productArray[i]?.[0].slice(0, 3))
                }
                setProductTitle(productArrayTitle)
                setProductList(productArrayTwo)
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
    // intro
    const [intro, setIntro] = useState({});
    const [introTitle, setIntroTitle] = useState({});
    const [introImage, setIntroImage] = useState({});
    const [introDescription, setIntroDescription] = useState({});
    const introDescriptionsArray = [];
    const introIndentsArray = [];
    multiData(introDescriptionsArray, introDescription, 'paragraph')
    multiData(introIndentsArray, introDescription, 'removeIndentation')

    // about
    const [about, setAbout] = useState({});
    const [aboutImage, setAboutImage] = useState({});
    const [aboutDescription, setAboutDescription] = useState({});
    const [aboutButton, setAboutButton] = useState({});
    const aboutDescriptionsArray = [];
    const aboutIndentsArray = [];
    multiData(aboutDescriptionsArray, aboutDescription, 'paragraph')
    multiData(aboutIndentsArray, aboutDescription, 'removeIndentation')
    // forKids
    const [forKids, setForKids] = useState({});
    const [forKidsTitle, setForKidsTitle] = useState({});
    const [forKidsDescription, setForKidsDescription] = useState({});
    const [forKidsButton, setForKidsButton] = useState({});
    const forKidsTitlesArray = [];
    const forKidsDescriptionsArray = [];
    multiData(forKidsTitlesArray, forKidsTitle, 'title')
    multiData(forKidsDescriptionsArray, forKidsDescription, 'paragraph')
    // gallery
    const [gallery, setGallery] = useState({});
    const [galleryImage, setGalleryImage] = useState([]);
    const [galleryButton, setGalleryButton] = useState({});
    const [galleryMime, setGalleryMime] = useState([]);

    // feedback
    const [feedback, setFeedback] = useState({});
    const [feedbackImage, setFeedbackImage] = useState({});
    // storeroom
    const [storeroom, setStoreroom] = useState({});
    const [storeroomTitle, setStoreroomTitle] = useState({});
    const [storeroomDescription, setStoreroomDescription] = useState({});
    const [storeroomButton, setStoreroomButton] = useState({});
    const storeroomTitlesArray = [];
    const storeroomDescriptionsArray = [];
    multiData(storeroomTitlesArray, storeroomTitle, 'title')
    multiData(storeroomDescriptionsArray, storeroomDescription, 'paragraph')
    // productList
    const [productList, setProductList] = useState([]);
    const [productName, setProductName] = useState('');
    const [productTitle, setProductTitle] = useState('');
    function multiData(array, data, key) {
        for (let i = 0; i < data.length; i++) {
            array.push(data[i][key])
        }
    }
    return (
        <div className={styles.wrapper}>
            <Header />
            <main>
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
                <BlockTextOne
                    name={intro.name}
                    titleStart={introTitle.titleStart}
                    titleColored={introTitle.titleColored}
                    titleEnd={introTitle.titleEnd}
                    descriptions={introDescriptionsArray}
                    indents={aboutIndentsArray}
                    imageUrl={introImage.url}
                    imageAlt={introImage.alternativeText} />
                <BlockTextTwo
                    imageUrl={aboutImage.url}
                    imageAlt={aboutImage.alternativeText}
                    name={about.name}
                    title={about.title}
                    descriptions={aboutDescriptionsArray}
                    indents={introIndentsArray}
                    buttonLink={aboutButton.link}
                    buttonName={aboutButton.name} />
                <BannerOne
                    name={forKids.name}
                    titles={forKidsTitlesArray}
                    descriptions={forKidsDescriptionsArray}
                    buttonName={forKidsButton.name}
                    buttonLink={forKidsButton.link}
                />
                <GalleryMain
                    name={gallery.name}
                    buttonName={galleryButton.name}
                    buttonLink={galleryButton.link}
                    slides={galleryImage}
                    galleryMime={galleryMime}
                />
                <Feedback
                    name={feedback.name}
                    title={feedback.title}
                    button={feedback.button}
                    imageUrl={feedbackImage.url}
                    imageAlt={feedbackImage.alternativeText}
                />
                <BannerTwo
                    name={storeroom.name}
                    titles={storeroomTitlesArray}
                    descriptions={storeroomDescriptionsArray}
                    buttonName={storeroomButton.name}
                    buttonLink={storeroomButton.link}
                />
                {productList.length !== 0 ?
                    <div className={styles.productWrapper}>
                        <div className='container'>
                            <Name name={productName} />
                            <div className={styles.productWrap}>
                                {productList.map((product, index) => (
                                    <div className={styles.productRow} key={index}>
                                        <div className={styles.productTitle}>
                                            <h2>{productTitle[index]}</h2>
                                            <Link to='/store'>{lang === 'ru' ? 'Смотреть все' : 'See all'}</Link>
                                        </div>
                                        <ProductList product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> : null
                }
            </main>
            <Footer />
        </div>
    );
};

export default Home;