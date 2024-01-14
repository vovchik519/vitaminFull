import React, { useState, useEffect } from 'react';

import styles from './Shop.module.scss';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import Name from './../../ui/Name/Name';
import ProductList from '../../components/ProductList/ProductList';

const Shop = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let shopPage = `${server}/api/shop-page?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(shopPage, {
                    headers: {
                        Authorization: `Bearer 58303d79acc986f444df5932f716217edce1c5edfe351b102c6798fa35321513a948f9e0893441006de97f9bee7e431df11705646be6ab8e3421c8a821313abae71eb8d2561561a2bb07eafcf38a43cced71675eb73e65a61ba3c1554719d231ae2bc7f0132064db98e11c19f0bafa3c6f5fe261269c8459b07f0c07b8d20172`
                    }
                });
                const data = await response.json();
                setRoot(data.data.attributes);
                setSection(data.data.attributes.section);
                setParagraph(data.data.attributes.section.paragraph);
                setSubParagraph(data.data.attributes.section.subParagraph);
                const imagesArray = []
                for (let i = 0; i < data.data.attributes.section.image.data.length; i++) {
                    imagesArray.push(data.data.attributes.section.image.data[i].attributes);
                }
                setImages(imagesArray)
                const productArray = []
                for (let i = 0; i < data.data.attributes.catalogs.data.length; i++) {
                    for (let j = 0; j < data.data.attributes.catalogs.data[i].attributes.product.length; j++) {
                        productArray.push(data.data.attributes.catalogs.data[i].attributes.product[j])
                    }
                }
                setProductList(productArray)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // section
    const [section, setSection] = useState({});
    const [root, setRoot] = useState({});
    const [paragraph, setParagraph] = useState({});
    const [subParagraph, setSubParagraph] = useState({});
    const [images, setImages] = useState([]);
    const paragraphArray = []
    const subParagraphArray = []
    multiData(paragraphArray, paragraph, 'paragraph')
    multiData(subParagraphArray, subParagraph, 'paragraph')
    const indentsArray = []
    const subIndentsArray = []
    multiData(indentsArray, paragraph, 'removeIndentation')
    multiData(subIndentsArray, subParagraph, 'removeIndentation')
    // product
    const [productList, setProductList] = useState([]);
    function multiData(array, data, key) {
        for (let i = 0; i < data.length; i++) {
            array.push(data[i][key])
        }
    }
    return (
        <>
            <Header />
            <main className={styles.wrapper}>
                <div className="container">
                    <section className={styles.shop}>
                        <div className={styles.name}>
                            <Name
                                name={root.name}
                            />
                        </div>
                        <h2>{section.title}</h2>
                        {paragraphArray && paragraphArray.map((item, index) => (
                            <p className={indentsArray[index] === true ? '' : 'indent'} key={index}>{item}</p>
                        ))}
                        <div className={styles.images}>
                            {images && images.map((item, index) => (
                                <img src={item.url} alt={item.alternativeText} key={index} />
                            ))}
                        </div>
                        {subParagraphArray && subParagraphArray.map((item, index) => (
                            <p className={subIndentsArray[index] === true ? '' : 'indent'} key={index}>{item}</p>
                        ))}
                    </section>
                    <section>
                        <ProductList product={productList.slice(0,6)} />
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Shop;