import React, { useEffect, useState } from 'react';
import styles from './FirstScreen.module.scss';
import Name from './../../ui/Name/Name';

const FirstScreen = (props) => {
    const [position, setPosition] = useState({ mouseX: 0});

    useEffect(() => {
      const handleMouseMove = (e) => {
        setPosition({ mouseX: e.clientX });
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    const calculateParallaxPosition = (strength) => {
      const parallaxX = (position.mouseX - window.innerWidth / 2) / strength;
      return { transform: `translate(${parallaxX}px` };
    };
    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.info}>
                    <div className={styles.titleWrap}>
                        <Name name={props.name} />
                        <h1>{props.titleStart} <span>{props.titleColored}</span> {props.titleEnd}</h1>
                    </div>
                    <div className={styles.description}>
                        <p>{props.description}</p>
                    </div>
                </div>
            </div>
            <div className={styles.images}>
                {props.decoration !== undefined ?
                    <img src={`${props.decoration}`} className={styles.decoration} alt='decoration' style={calculateParallaxPosition(70)}/>
                    : null
                }
                <img src={`${props.imageUrl}`} className={styles.image} alt={props.imageAlt} />
            </div>
        </section>
    );
};

export default FirstScreen;