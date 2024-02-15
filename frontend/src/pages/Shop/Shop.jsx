import React, { useState, useEffect } from 'react';

import styles from './Shop.module.scss';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import Name from './../../ui/Name/Name';
import ProductList from '../../components/ProductList/ProductList';

const Shop = () => {
    let server = 'http://185.251.88.31:1337'

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
                        Authorization: `Bearer f66dbcdd40ea112c1922a33c00ef12399433cecaf44cc622f7ecb965b7462b1930e0bec5bb93f45ba485ada66eab5aaa548c1703eacf201a2a0bea3996cb0e746c94e9e316c737b4080eb53344edc4fe8d8bee794530d46926fdc72b75cb73a0cca89551386776de20138eea544f5458b22044468172b1a40f1a65a645e24998`
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
    const [sortOption, setSortOption] = useState('bestSales');

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const sortedProductList = [...productList]; // Создаем копию массива перед сортировкой

    switch (sortOption) {
        case 'bestSales':
            sortedProductList.sort((a, b) => b.rating - a.rating);
            break;
        case 'alphabeticalAsc':
            sortedProductList.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'alphabeticalDesc':
            sortedProductList.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'priceAsc':
            sortedProductList.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            sortedProductList.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }
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
                        <label className={styles.sort}>
                            {lang === 'ru' ? 'Сортировать по:' : 'Sort by:'}
                            <select value={sortOption} onChange={handleSortChange}>
                                <option value="bestSales">{lang === 'ru' ? 'Лучшие продажи' : 'Best sales'}</option>
                                <option value="alphabeticalAsc">{lang === 'ru' ? 'По алфавиту А-Я' : 'Alphabetically AZ'}</option>
                                <option value="alphabeticalDesc">{lang === 'ru' ? 'По алфавиту Я-А' : 'Alphabetically ZA'}</option>
                                <option value="priceAsc">{lang === 'ru' ? 'По возрастанию цены' : 'In descending order of price'}</option>
                                <option value="priceDesc">{lang === 'ru' ? 'По убыванию цены' : 'In ascending order of price'}</option>
                            </select>
                        </label>
                        <ProductList product={sortedProductList} />
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Shop;