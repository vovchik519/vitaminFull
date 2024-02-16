import React from 'react';
import styles from './NotFound.module.scss';
import Header from '../../components/Header/Header';
import Error from '../../components/Error/Error';
import Footer from '../../components/Footer/Footer';

const NotFound = ({onLoading}) => {
    setTimeout(() =>{
        onLoading()
    },0)
    return (
        <>
            <Header />
            <Error />
            <Footer />
        </>
    );
};
export default NotFound;