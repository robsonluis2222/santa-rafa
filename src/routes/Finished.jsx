import React from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './Finished.module.scss';


const Finished = () => {
  return (
    <div className={styles.finishContainer}>
      <img className={styles.logoSanta} src="../../public/santa2.png" alt="" />
      <i className="bi bi-check-circle-fill"></i>
      <span className={styles.titulo}>Agrademos a sua atenção!</span>
      <span className={styles.subtitulo}>Seu resgate foi solicitado com sucesso e em breve você receberá um e-mail de confirmação.</span>
    </div>
  )
}

export default Finished