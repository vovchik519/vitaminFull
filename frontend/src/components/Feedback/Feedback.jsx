import React, { useEffect, useState } from 'react';
import styles from './Feedback.module.scss';
import Name from './../../ui/Name/Name';
import ButtonDark from './../../ui/ButtonDark/ButtonDark';
import ThankYou from '../ThankYou/ThankYou';
import emailjs from '@emailjs/browser';

const Feedback = (props) => {
  let server = 'http://185.251.88.31:1337'
  let lang = localStorage.getItem('selectedLanguage');
  const [isOpen, setIsOpen] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const serviceID = 'service_0362ci1';
    const templateID = 'template_hck6ft2';

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
    publicKey: 'Fhpa1Ls471A5JsDGg',
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
                <label htmlFor="name">{lang === 'ru' ? 'Имя' : 'Name'}</label>
                <input type="text" name="name" id="name" placeholder={lang === 'ru' ? 'Введите имя' : 'Enter your name'} required />
              </div>
              <div className={styles.row}>
                <label htmlFor="email">{lang === 'ru' ? 'Почта' : 'Email'}</label>
                <input type="email" name="email" id="email" placeholder={lang === 'ru' ? 'Введите адрес электронной почты' : 'Enter your email'} required />
              </div>
              <div className={styles.row}>
                <label htmlFor="phone">{lang === 'ru' ? 'Телефон' : 'Phone'}</label>
                <input type="tel" name="phone" id="phone" placeholder={lang === 'ru' ? 'Введите номер телефона' : 'Enter your phone number'} required />
              </div>
              <div className={styles.row}>
                <label htmlFor="message">{lang === 'ru' ? 'Сообщение' : 'Message'}</label>
                <input type="text" name="message" id="message" placeholder={lang === 'ru' ? 'Введите сообщение' : 'Enter your message'} required />
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