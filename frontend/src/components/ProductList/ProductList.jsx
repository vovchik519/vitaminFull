import React, { useState, useEffect, useMemo } from 'react';

import styles from './ProductList.module.scss';

import ProductItem from '../../components/ProductItem/ProductItem';
import Pagination from '../Pagination/Pagination';

const ProductList = (product) => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (Array.isArray(product.product)) {
            setResult(product.product);
        }
    }, [product.product]);

    let PageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return result.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, result]);

    return (
        <div>
            <ul className={styles.list}>
                {result.length > 0 && currentTableData.map((item) => (
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
            <div className='pagination-main'>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={result.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default ProductList;