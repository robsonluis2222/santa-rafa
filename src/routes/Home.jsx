import React from 'react'
import background from '../../public/background.jpg'
import santaLogo from '../../public/santa2.png'
import styles from './Home.module.scss'

const Home = () => {

  const handleSelectType = (type) => {
    if(type === 'f'){
      location.href='/client/fisica';
      return
    }
    if(type === 'j'){
      location.href='/client/juridica';
      return
    }
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.subContainer}>
        <img className={styles.logoSanta} src={santaLogo} alt="" />
        <div className={styles.selectType}>
          <span className={styles.informacao}>Selecione o tipo de acesso que deseja realizar.</span>
          <span className={styles.botaoAcao} onClick={() => handleSelectType('f')}>Pessoa física</span>
          <span className={styles.botaoAcao} onClick={() => handleSelectType('j')}>Pessoa jurídica</span>
        </div>
      </div>
    </div>
  )
}

export default Home