import React, { useEffect, useState } from 'react';
import styles from './Feedback.module.scss';
import Name from './../../ui/Name/Name';
import ButtonDark from './../../ui/ButtonDark/ButtonDark';
import ThankYou from '../ThankYou/ThankYou';
import emailjs from '@emailjs/browser';

const Feedback = (props) => {
  let server = 'http://localhost:1337'
  let lang = localStorage.getItem('selectedLanguage');
  const [isOpen, setIsOpen] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false);
  
  const handleSubmitForm = (event) => {
    event.preventDefault();

    const serviceID = 'service_t521m3p';
    const templateID = 'template_t5hvbc3';

    emailjs.sendForm(serviceID, templateID, event.target)
      .then(() => {
        setBtnDisabled(true);
        setIsOpen(true)
        setTimeout(() => {
          setIsOpen(false)
          setBtnDisabled(false)
        }, 15000)
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };
  emailjs.init({
    publicKey: '5cI6hHPYaqMSkDWlb',
    limitRate: {
      throttle: 15000,
    },
  })
  
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.info}>
            <Name
              name={props.name} />
            <h2>{props.title}</h2>
            <form className={styles.form} id="form" onSubmit={handleSubmitForm}>
              <div className={styles.row}>
                <label htmlFor="name">Имя</label>
                <input type="text" name="name" id="name" required/>
              </div>
              <div className={styles.row}>
                <label htmlFor="email">Почта</label>
                <input type="email" name="email" id="email" required/>
              </div>
              <div className={styles.row}>
                <label htmlFor="phone">Телефон</label>
                <input type="tel" name="phone" id="phone" required/>
              </div>
              <div className={styles.row}>
                <label htmlFor="message">Сообщение</label>
                <input type="text" name="message" id="message" required/>
              </div>
              <ButtonDark
                type="submit"
                disabled={btnDisabled}
                name={props.button}
              />
            </form>
          </div>
          <div className={styles.image}>
            <img src={`${props.imageUrl}`} alt={props.imageAlt} />
          </div>
        </div>
      </div>
      <ThankYou isOpen={isOpen} title={lang === 'ru' ? 'Спасибо. Ваше сообщение отправлено' : 'Thank you. Your message has been sent'} />
    </section>
  );
};

export default Feedback;