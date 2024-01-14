import React, { useState, useEffect } from 'react';

import styles from './ProductList.module.scss';

import ProductItem from '../../components/ProductItem/ProductItem';

const ProductList = (product) => {
    const [result, setResult] = useState({})
    useEffect(() => {
        setTimeout(() => {
            setResult(product.product)
        }, 0)
    })
    return (
        <ul className={styles.list}>
            {result.length > 0 && result.map((item) => (
                <ProductItem
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    size={item.size}
                    price={item.price}
                    id={item.id}
                />
            ))}
        </ul>
    );
};

export default ProductList;