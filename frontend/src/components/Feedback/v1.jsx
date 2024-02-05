// import React, { useEffect, useState } from 'react';
// import styles from './Feedback.module.scss';
// import Name from './../../ui/Name/Name';
// import ButtonDark from './../../ui/ButtonDark/ButtonDark';
// import ThankYou from '../ThankYou/ThankYou';
// import emailjs from '@emailjs/browser';

// const Feedback = (props) => {
//   let server = 'http://localhost:1337'
//   let lang = localStorage.getItem('selectedLanguage');
//   const { inputs } = props;
//   const [isOpen, setIsOpen] = useState(false)
//   const handleSubmit = () => {
//     setIsOpen(true)
//   }

//   const templateParams = {
//     from_name: "text",
//     to_name: "te",
//     message: "te",
//     reply_to: "te",
//   };
//   emailjs
//     .send('service_t521m3p', 'service_t521m3p', templateParams, {
//       publicKey: '5cI6hHPYaqMSkDWlb',
//     })
//     .then(
//       (response) => {
//         console.log('SUCCESS!', response.status, response.text);
//       },
//       (err) => {
//         console.log('FAILED...', err);
//       },
//     );
//   return (
//     <section className={styles.wrapper}>
//       <div className="container">
//         <div className={styles.wrap}>
//           <div className={styles.info}>
//             <Name
//               name={props.name} />
//             <h2>{props.title}</h2>
//             <form className={styles.form}>
//               {inputs.map((input, index) => (
//                 <div key={index} className={styles.row}>
//                   <label htmlFor={input.forId}>{input.label}</label>
//                   <input placeholder={input.placeholder} type={input.type} id={input.forId} />
//                 </div>
//               ))}
//               <ButtonDark
//                 name={props.button}
//                 click={() => handleSubmit()}
//               />
//             </form>
//           </div>
//           <div className={styles.image}>
//             <img src={`${props.imageUrl}`} alt={props.imageAlt} />
//           </div>
//         </div>
//       </div>
//       <ThankYou isOpen={isOpen} title={lang === 'ru' ? 'Спасибо. Ваше сообщение отправлено' : 'Thank you. Your message has been sent'} />
//     </section>
//   );
// };

// export default Feedback;